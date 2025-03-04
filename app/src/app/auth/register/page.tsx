"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "@/api/authApi"; // À ajouter
import SuccessModal from "@/components/modals/SuccessModal"; // Corrigé pour la nouvelle structure

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
  const [countries, setCountries] = useState<{ name: string; code: string; phoneCode: string }[]>([]);
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
        const countryList = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            phoneCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
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

      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement && activeElement.id === "password1") {
        if (!rules.length) toast.error("Le mot de passe doit contenir au moins 8 caractères.");
        else if (!rules.uppercase) toast.error("Le mot de passe doit contenir une majuscule.");
        else if (!rules.number) toast.error("Le mot de passe doit contenir un chiffre.");
        else if (!rules.special) toast.error("Le mot de passe doit contenir un caractère spécial.");
      }
    }
    if (name === "rePassword") {
      setPasswordMatch(value === formData.password);
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement && activeElement.id === "password2" && value !== formData.password) {
        toast.error("Les mots de passe ne correspondent pas.");
      }
    }
  };

  const validateForm = () => {
    const activeElement = document.activeElement as HTMLInputElement;

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      if (activeElement && activeElement.name === "email") {
        toast.error("Email invalide.");
      }
      return false;
    }
    if (!formData.contact.match(/^\+\d{1,3}\d{6,}$/)) {
      if (activeElement && activeElement.name === "contact") {
        toast.error("Numéro de contact invalide (ex. +33123456789).");
      }
      return false;
    }
    if (!passwordRules.length || !passwordRules.uppercase || !passwordRules.number || !passwordRules.special) {
      return false;
    }
    if (formData.password !== formData.rePassword) {
      return false;
    }
    if (!formData.firstName || !formData.lastName) {
      if (activeElement && (activeElement.name === "firstName" || activeElement.name === "lastName")) {
        toast.error("Le prénom et le nom sont requis.");
      }
      return false;
    }
    if (!formData.country || !formData.city) {
      if (activeElement && (activeElement.name === "country" || activeElement.name === "city")) {
        toast.error("Le pays et la ville sont requis.");
      }
      return false;
    }
    if (!formData.birthDate) {
      if (activeElement && activeElement.name === "birthDate") {
        toast.error("La date de naissance est requise.");
      }
      return false;
    }
    if (!formData.profession) {
      if (activeElement && activeElement.name === "profession") {
        toast.error("La profession est requise.");
      }
      return false;
    }
    if (!formData.gender) {
      if (activeElement && activeElement.name === "gender") {
        toast.error("Le genre est requis.");
      }
      return false;
    }
    if (!formData.acceptsPolicy) {
      if (activeElement && activeElement.name === "acceptsPolicy") {
        toast.error("Vous devez accepter la politique de confidentialité.");
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await registerUser({
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
      console.log("Register response:", response);
      setSuccessMessage(
        "Inscription réussie ! Un email d’activation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception (ou vos spams) pour activer votre compte."
      );
    } catch (error: any) {
      console.error("Erreur lors de l’inscription:", error);
      const errorMsg = error.response?.data?.detail || error.response?.data?.email?.[0] || "Erreur lors de l’inscription.";
      toast.error(errorMsg);
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
    <div className="img-inscription">
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="Logo">BOOLi-STORE.world</h1>
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-6 bg-white rounded-5 cadre">
                <h2 className="mx-0 mt-3 mb-3 connex1">-- Inscription --</h2>
                <p className="text-center mb-5 entete2">Inscrivez-vous pour profiter de nos offres</p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4">
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
                  <div className="input-group mb-4">
                    <select
                      name="country"
                      className="form-control border-2 shadow-none custom-input select"
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
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      name="contact"
                      className="form-control border-2 shadow-none custom-input"
                      placeholder="Entrez votre numéro de contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="passType mb-3">Entrez un mot de passe fort :</p>
                  <ul className="text-muted mb-3" style={{ fontSize: "14px" }}>
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
                  <div className="input-group password-container mb-4">
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
                    <span className="toggle-password" onClick={togglePassword1}>
                      <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="input-group password-container mb-4">
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
                    <span className="toggle-password" onClick={togglePassword2}>
                      <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="input-group mb-4">
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
                  <div className="input-group mb-4">
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
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      name="city"
                      className="form-control border-2 shadow-none custom-input"
                      placeholder="Entrez votre ville actuelle"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="date"
                      name="birthDate"
                      className="form-control border-2 shadow-none custom-input"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-4">
                    <select
                      name="gender"
                      className="form-control border-2 shadow-none custom-input select"
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
                  <div className="input-group mb-4">
                    <select
                      name="profession"
                      className="form-control border-2 shadow-none custom-input select"
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
                  <div className="input-group mb-4">
                    <input
                      type="checkbox"
                      id="policy"
                      name="acceptsPolicy"
                      checked={formData.acceptsPolicy}
                      onChange={handleChange}
                    />
                    <label htmlFor="policy" id="policy" className="ms-2">
                      J’accepte la{" "}
                      <Link href="/politique-confidentialite" target="_blank">
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                  <div className="d-block text-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-lg text-white connex"
                      disabled={isLoading || !formData.acceptsPolicy}
                      style={{
                        backgroundColor: formData.acceptsPolicy ? "#007bff" : "#ccc",
                        cursor: formData.acceptsPolicy ? "pointer" : "not-allowed",
                      }}
                    >
                      S’inscrire
                    </button>
                  </div>
                  <div className="d-block text-center">
                    <Link href="/auth/login" className="haveaccount btn">
                      Continuez avec mon compte
                    </Link>
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