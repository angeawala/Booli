// components/AgencyList.tsx
"use client";

import React from "react";
import { Agency } from "@/types/agency";
import Link from "next/link";

interface AgencyListProps {
  agencies: Agency[];
}

const AgencyList: React.FC<AgencyListProps> = ({ agencies }) => {
  return (
    <div className="agency-grid">
      {agencies.map((agency) => (
        <div key={agency.id} className="agency-card">
          <img src={agency.image} alt={agency.name} />
          <h2>{agency.name}</h2>
          <p className="description">{agency.description}</p>
          <div className="detail">
            <p><strong>Services :</strong> {agency.services}</p>
            <p><strong>Adresse :</strong> {agency.address}</p>
            <p><strong>Téléphone :</strong> {agency.phone}</p>
            <p><strong>Horaires :</strong> {agency.hours}</p>
            <p><strong>Email :</strong> {agency.email}</p>
          </div>
          <Link href={agency.website} className="btn" target="_blank">
            Visiter le Site
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AgencyList;