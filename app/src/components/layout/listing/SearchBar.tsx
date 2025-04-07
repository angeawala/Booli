"use client";

import { useState} from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const items = [
    "Accessoires", "Appareils photo", "Bijoux", "Chaussures",
    "Électronique", "Formation", "Jouets", "Livres", "Documents",
    "Meubles", "Ordinateurs", "Téléphones", "Vêtements"
  ];

  const showSuggestions = (query: string) => {
    if (query) {
      const filteredItems = items
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .sort()
        .slice(0, 6);
      setSuggestions(filteredItems);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (value: string) => {
    setSearchQuery(value);
    setSuggestions([]);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    showSuggestions(query);
  };

  const handleCameraClick = () => {
    const cameraInput = document.getElementById("camera-input") as HTMLInputElement;
    if (cameraInput) cameraInput.click();
  };

  const handleCameraInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        console.log("Image Data:", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="search-container col-4 ml-2">
      <input
        type="text"
        className="search-input"
        id="search-input"
        placeholder="Recherchez un produit, service, autres solutions..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button id="search-button">
        <i className="fas fa-search"> Rechercher</i>
      </button>
      <i className="fa fa-camera camera-icon" id="camera-icon" onClick={handleCameraClick}></i>
      <div className="suggestions" id="suggestionslist">
        {suggestions.length > 0 ? (
          suggestions.map((item) => (
            <div
              key={item}
              className="suggestionslist"
              onClick={() => selectSuggestion(item)}
            >
              {item}
            </div>
          ))
        ) : (
          <>
            <div className="suggestion-item">Agriculture, Mode Africaine</div>
            <div className="suggestion-item">HITECH, Réservation</div>
          </>
        )}
      </div>
      <input
        type="file"
        id="camera-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleCameraInputChange}
      />
    </div>
  );
}