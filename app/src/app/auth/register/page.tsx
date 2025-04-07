"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";
import { registerUser } from "@/features/auth/authApi";
import { AxiosError } from "axios";

interface Country {
  name: string;
  code: string;
  phoneCode: string;
}

interface FormData {
  email: string;
  contactCode: string;
  contactNumber: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  birthDate: string;
  profession: string;
  customProfession: string;
  gender: string;
  acceptsPolicy: boolean;
}

// Interface pour les données de countryapi.io
interface CountryApiData {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
}

// Interface pour les données de restcountries.com
interface RestCountryData {
  name: { common: string };
  cca2: string;
  idd: { root: string; suffixes?: string[] };
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(() => {
    const savedDraft = localStorage.getItem("registerDraft");
    return savedDraft
      ? JSON.parse(savedDraft)
      : {
          email: "",
          contactCode: "",
          contactNumber: "",
          password: "",
          rePassword: "",
          firstName: "",
          lastName: "",
          country: "",
          city: "",
          birthDate: "",
          profession: "",
          customProfession: "",
          gender: "",
          acceptsPolicy: false,
        };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    match: true,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const COUNTRY_API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY || "";

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const cachedCountries = localStorage.getItem("countriesCache");
        if (cachedCountries) {
          setCountries(JSON.parse(cachedCountries));
          return;
        }

        // Tentative avec countryapi.io
        try {
          const response = await fetch("https://countryapi.io/api/all", {
            headers: { Authorization: `Bearer ${COUNTRY_API_KEY}` },
          });
          if (response.ok) {
            const data: { [key: string]: CountryApiData } = await response.json();
            const countryList: Country[] = Object.values(data)
              .map((country) => ({
                name: country.name,
                code: country.alpha2Code,
                phoneCode: country.callingCodes?.[0] || "",
              }))
              .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
            setCountries(countryList);
            localStorage.setItem("countriesCache", JSON.stringify(countryList));
            console.log("Countries loaded from countryapi.io:", countryList.length);
            return;
          }
        } catch (e) {
          console.log("countryapi.io failed, falling back to restcountries.com:", e);
        }

        // Fallback avec restcountries.com
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: RestCountryData[] = await response.json();
        const countryList: Country[] = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            phoneCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(countryList);
        localStorage.setItem("countriesCache", JSON.stringify(countryList));
        console.log("Countries loaded from restcountries.com:", countryList.length);
      } catch (e) {
        console.log("Failed to load countries from both APIs:", e);
        toast.error("Impossible de charger les pays, réessayez.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, [COUNTRY_API_KEY]);

  useEffect(() => {
    if (!isSubmitting) {
      localStorage.setItem("registerDraft", JSON.stringify(formData));
    }
  }, [formData, isSubmitting]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

      setFormData((prev: FormData) => {
        const updatedData = { ...prev, [name]: newValue };
        if (name === "country") {
          const selectedCountry = countries.find((c) => c.name === value);
          updatedData.contactCode = selectedCountry?.phoneCode || "";
        }
        if (name === "password") {
          setPasswordRules({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            match: value === updatedData.rePassword,
          });
        }
        if (name === "rePassword") {
          setPasswordRules((prevRules) => ({
            ...prevRules,
            match: value === updatedData.password,
          }));
        }
        return updatedData;
      });
    },
    [countries]
  );

  const validateForm = () => {
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      toast.error("Email invalide.");
      return false;
    }
    if (!formData.contactNumber.match(/^\d{6,}$/)) {
      toast.error("Numéro de contact invalide (minimum 6 chiffres).");
      return false;
    }
    if (!Object.values(passwordRules).every(Boolean)) {
      toast.error("Le mot de passe ne respecte pas les critères.");
      return false;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.city ||
      !formData.birthDate ||
      !formData.gender ||
      (!formData.profession && !formData.customProfession)
    ) {
      toast.error("Tous les champs sont requis.");
      return false;
    }
    if (!formData.acceptsPolicy) {
      toast.error("Vous devez accepter la politique de confidentialité.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await registerUser({
        email: formData.email,
        contact: formData.contactCode + formData.contactNumber,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country: formData.country,
        city: formData.city,
        birth_date: formData.birthDate,
        profession: formData.profession === "Autre" ? formData.customProfession : formData.profession,
        gender: formData.gender,
      });
      toast.success("Inscription réussie ! Vérifiez votre email pour activer votre compte.");
      localStorage.removeItem("registerDraft");
      router.push("/auth/login");
    } catch (e) {
      console.log("Registration failed:", e);
      const errorMsg =
        e instanceof AxiosError ? "Erreur lors de l’inscription, réessayez." : "Une erreur est survenue, réessayez.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem("registerDraft");
    setFormData({
      email: "",
      contactCode: "",
      contactNumber: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      birthDate: "",
      profession: "",
      customProfession: "",
      gender: "",
      acceptsPolicy: false,
    });
    toast.success("Brouillon effacé !");
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3 x-auth-container">
      {isLoading && (
        <div className="x-auth-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="container">
          <h1 className="text-center mb-4 fw-bold">BOOLi-STORE.world</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 bg-white rounded-5 p-4 shadow x-auth-form">
              <h2 className="text-center mb-4 fw-semibold text-primary">-- Inscription --</h2>
              <p className="text-center mb-4 text-muted">Inscrivez-vous pour profiter de nos offres</p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control x-auth-input"
                      placeholder="Adresse email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-label="Adresse email"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <select
                      name="country"
                      className="form-select x-auth-input"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      aria-label="Pays"
                    >
                      <option value="">Sélectionnez un pays</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 d-flex gap-2">
                    <input
                      type="text"
                      name="contactCode"
                      className="form-control x-auth-input"
                      value={formData.contactCode}
                      readOnly
                      aria-label="Code téléphonique"
                      style={{ maxWidth: "80px" }}
                    />
                    <input
                      type="text"
                      name="contactNumber"
                      className="form-control x-auth-input"
                      placeholder="Numéro de téléphone"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      aria-label="Numéro de téléphone"
                    />
                  </div>
                  <div className="col-12 position-relative">
                    <input
                      type={passwordVisible1 ? "text" : "password"}
                      name="password"
                      className="form-control x-auth-input"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                      aria-label="Mot de passe"
                      aria-describedby="password-rules"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={() => setPasswordVisible1((prev) => !prev)}
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="col-12 position-relative">
                    <input
                      type={passwordVisible2 ? "text" : "password"}
                      name="rePassword"
                      className="form-control x-auth-input"
                      placeholder="Confirmez le mot de passe"
                      value={formData.rePassword}
                      onChange={handleChange}
                      required
                      aria-label="Confirmation du mot de passe"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={() => setPasswordVisible2((prev) => !prev)}
                      aria-label="Afficher/masquer la confirmation"
                    >
                      <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  {isPasswordFocused && (
                    <div className="col-12" id="password-rules">
                      <ul className="list-unstyled x-auth-password-rule">
                        <li className={passwordRules.length ? "text-success" : "text-danger"}>
                          <i className={passwordRules.length ? "fa fa-check" : "fa fa-times"}></i> 8 caractères min
                        </li>
                        <li className={passwordRules.uppercase ? "text-success" : "text-danger"}>
                          <i className={passwordRules.uppercase ? "fa fa-check" : "fa fa-times"}></i> Une majuscule
                        </li>
                        <li className={passwordRules.number ? "text-success" : "text-danger"}>
                          <i className={passwordRules.number ? "fa fa-check" : "fa fa-times"}></i> Un chiffre
                        </li>
                        <li className={passwordRules.special ? "text-success" : "text-danger"}>
                          <i className={passwordRules.special ? "fa fa-check" : "fa fa-times"}></i> Un caractère spécial
                        </li>
                        <li className={passwordRules.match ? "text-success" : "text-danger"}>
                          <i className={passwordRules.match ? "fa fa-check" : "fa fa-times"}></i> Mots de passe identiques
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control x-auth-input"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      aria-label="Prénom"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control x-auth-input"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      aria-label="Nom"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="city"
                      className="form-control x-auth-input"
                      placeholder="Ville"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      aria-label="Ville"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="date"
                      name="birthDate"
                      className="form-control x-auth-input"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                      aria-label="Date de naissance"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <select
                      name="gender"
                      className="form-select x-auth-input"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      aria-label="Genre"
                    >
                      <option value="">Genre</option>
                      <option value="male">Masculin</option>
                      <option value="female">Féminin</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <select
                      name="profession"
                      className="form-select x-auth-input"
                      value={formData.profession}
                      onChange={handleChange}
                      required
                      aria-label="Profession"
                    >
                      <option value="">Profession</option>
                      <option value="Etudiant">Etudiant</option>
                      <option value="Commerçant">Commerçant</option>
                      <option value="Fonctionnaire">Fonctionnaire</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  {formData.profession === "Autre" && (
                    <div className="col-12">
                      <input
                        type="text"
                        name="customProfession"
                        className="form-control x-auth-input"
                        placeholder="Précisez votre profession"
                        value={formData.customProfession}
                        onChange={handleChange}
                        required
                        aria-label="Profession personnalisée"
                      />
                    </div>
                  )}
                  <div className="col-12 form-check">
                    <input
                      type="checkbox"
                      id="policy"
                      name="acceptsPolicy"
                      className="form-check-input"
                      checked={formData.acceptsPolicy}
                      onChange={handleChange}
                      aria-label="Accepter la politique de confidentialité"
                    />
                    <label htmlFor="policy" className="form-check-label">
                      J’accepte la{" "}
                      <Link href="/politique-confidentialite" target="_blank">
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                  <div className="col-12 d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg x-auth-button"
                      disabled={isSubmitting || !formData.acceptsPolicy}
                    >
                      {isSubmitting ? "Inscription..." : "S’inscrire"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg x-auth-button"
                      onClick={clearDraft}
                    >
                      Effacer le brouillon
                    </button>
                    <Link href="/auth/login" className="btn btn-link x-auth-link">
                      J’ai déjà un compte
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}