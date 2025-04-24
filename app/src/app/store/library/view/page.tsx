"use client";

import React from "react";
import dynamic from "next/dynamic";
import '@/styles/pdf-reader.css';

// Charger le composant ViewDocument dynamiquement sans SSR
const ViewDocument = dynamic(() => import("./ViewDocument"), {
  ssr: false,
  loading: () => (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  ),
});

export default function ViewDocumentPage() {
  return <ViewDocument />;
}