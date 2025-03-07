"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "@/api/authApi";
import SuccessModal from "@/components/modals/SuccessModal";
import { AxiosError } from "axios";

interface Country {
  name: string;
  code: string;
  phoneCode: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    birthDate: "",
    profession: "",
    gender: "",
    acceptsPolicy: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList: Country[] = data
          .map((country: { name: { common: string }; cca2: string; idd: { root: string; suffixes?: string[] } }) => ({
            name: country.name.common,
            code: country.cca2,
            phoneCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error: unknown) {
        console.error("Erreur lors du chargement des pays:", error);
        toast.error("Impossible de charger les pays.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "country") {
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        setFormData((prev) => ({
          ...prev,
          contact: selectedCountry.phoneCode,
        }));
      }
    }

    if (name === "password") {
      const rules = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      };
      setPasswordRules(rules);
      setPasswordMatch(value === formData.rePassword);
    }
    if (name === "rePassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const validateForm = () => {
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast.error("Email invalide.");
      return false;
    }
    if (!formData.contact.match(/^\+\d{1,3}\d{6,}$/)) {
      toast.error("Numéro de contact invalide (ex. +33123456789).");
      return false;
    }
    if (!passwordRules.length || !passwordRules.uppercase || !passwordRules.number || !passwordRules.special) {
      toast.error("Le mot de passe ne respecte pas les critères.");
      return false;
    }
    if (!passwordMatch) {
      toast.error("Les mots de passe ne correspondent pas.");
      return false;
    }
    if (!formData.firstName || !formData.lastName || !formData.country || !formData.city || !formData.birthDate || !formData.profession || !formData.gender) {
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
    if (!validateForm()) return;

    setIsLoading(true);
    try {
        await registerUser({
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country: formData.country,
        city: formData.city,
        birth_date: formData.birthDate,
        profession: formData.profession,
        gender: formData.gender,
      });
      setSuccessMessage(
        "Inscription réussie ! Un email d’activation a été envoyé. Vérifiez votre boîte de réception (ou spams)."
      );
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ detail?: string; email?: string[] }>;
      const errorMsg = axiosError.response?.data?.detail || axiosError.response?.data?.email?.[0] || "Erreur lors de l’inscription.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setSuccessMessage(null);
    router.push("/auth/login");
  };

  const togglePassword1 = () => setPasswordVisible1((prev) => !prev);
  const togglePassword2 = () => setPasswordVisible2((prev) => !prev);

  return (
    <div className="img-inscription min-vh-100 d-flex flex-column align-items-center justify-content-center">
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="Logo mb-4 text-center">BOOLi-STORE.world</h1>
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 bg-white rounded-5 cadre p-4">
                <h2 className="mx-0 mt-3 mb-3 connex1 text-center">-- Inscription --</h2>
                <p className="text-center mb-5 entete2">Inscrivez-vous pour profiter de nos offres</p>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <input
                        type="email"
                        name="email"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Entrez votre adresse email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <select
                        name="country"
                        className="form-select border-2 shadow-none custom-input"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Pays</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        name="contact"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Numéro de contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <p className="passType mb-3">Entrez un mot de passe fort :</p>
                      <ul className="list-unstyled text-muted mb-3" style={{ fontSize: "14px" }}>
                        <li className={passwordRules.length ? "text-success" : "text-danger"}>
                          Au moins 8 caractères : {passwordRules.length ? "✓" : "✗"}
                        </li>
                        <li className={passwordRules.uppercase ? "text-success" : "text-danger"}>
                          Une majuscule : {passwordRules.uppercase ? "✓" : "✗"}
                        </li>
                        <li className={passwordRules.number ? "text-success" : "text-danger"}>
                          Un chiffre : {passwordRules.number ? "✓" : "✗"}
                        </li>
                        <li className={passwordRules.special ? "text-success" : "text-danger"}>
                          Un caractère spécial : {passwordRules.special ? "✓" : "✗"}
                        </li>
                        <li className={passwordMatch ? "text-success" : "text-danger"}>
                          Mots de passe identiques : {passwordMatch ? "✓" : "✗"}
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6 position-relative">
                      <input
                        type={passwordVisible1 ? "text" : "password"}
                        name="password"
                        id="password1"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Entrez un mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span className="toggle-password position-absolute end-0 top-50 translate-middle-y pe-2" onClick={togglePassword1}>
                        <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </span>
                    </div>
                    <div className="col-12 col-md-6 position-relative">
                      <input
                        type={passwordVisible2 ? "text" : "password"}
                        name="rePassword"
                        id="password2"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Confirmez le mot de passe"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                      />
                      <span className="toggle-password position-absolute end-0 top-50 translate-middle-y pe-2" onClick={togglePassword2}>
                        <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </span>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        name="firstName"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        name="lastName"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        name="city"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Ville actuelle"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="date"
                        name="birthDate"
                        className="form-control border-2 shadow-none custom-input"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <select
                        name="gender"
                        className="form-select border-2 shadow-none custom-input"
                        value={formData.gender}
                        onChange={handleChange}
                        required
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
                        className="form-select border-2 shadow-none custom-input"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Profession</option>
                        <option value="Etudiant">Etudiant</option>
                        <option value="Commerçant">Commerçant</option>
                        <option value="Fonctionnaire">Fonctionnaire</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="policy"
                          name="acceptsPolicy"
                          className="form-check-input"
                          checked={formData.acceptsPolicy}
                          onChange={handleChange}
                        />
                        <label htmlFor="policy" className="form-check-label">
                          J’accepte la{" "}
                          <Link href="/politique-confidentialite" target="_blank">
                            politique de confidentialité
                          </Link>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
                      <button
                        type="submit"
                        className="btn-lg connex w-100 w-md-auto"
                        disabled={isLoading || !formData.acceptsPolicy}
                      >
                        {isLoading ? "Inscription..." : "S’inscrire"}
                      </button>
                      <Link href="/auth/login" className="haveaccount w-100 w-md-auto text-center">
                        Continuez avec mon compte
                      </Link>
                    </div>
                  </div>
                </form>
                <SuccessModal message={successMessage} onClose={closeSuccessModal} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}