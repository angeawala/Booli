// LibraryPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import Loader from "@/components/layout/section/library/Loader";
import NewsletterPopup from "@/components/layout/section/library/NewsletterPopup";
import Header from "@/components/layout/listing/Header";
import SearchBar from "@/components/layout/section/library/SearchBar";
import AnnouncementCards from "@/components/layout/section/library/AnnouncementCards";
import FilterBox from "@/components/layout/section/library/FilterBox";
import DocumentList from "@/components/layout/section/library/DocumentList";
import DocumentModal from "@/components/modals/DocumentModal";
import Footer from "@/components/Footer";
import ErrorModal from "@/components/modals/ErrorModal";
import "@/styles/css/library.css";
import "@/styles/pagination.css";

const LibraryPage: React.FC = () => {
  const { loading, books, error, getBooks } = useLibrary();
  const [modalData, setModalData] = useState<{
    imageSrc: string;
    description: string;
    documentUrl: string;
    bookId: string;
  } | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) return;

    console.log("useEffect déclenché pour chargement initial");
    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout après 10s")), 10000)
        );
        await Promise.race([
          getBooks({ limit: 12, offset: 0 }).unwrap(),
          timeoutPromise,
        ]);
        console.log("Chargement terminé avec succès");
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        console.log("hasFetched défini à true");
        setHasFetched(true);
      }
    };

    fetchData();
  }, [getBooks, hasFetched]);

  const openModal = (imageSrc: string, description: string, documentUrl: string) => {
    const book = books.find((b) => b.pdf?.file === documentUrl);
    setModalData({
      imageSrc,
      description,
      documentUrl,
      bookId: book?.id || "",
    });
  };

  const closeModal = () => setModalData(null);
  const closeErrorModal = () => {
    console.log("closeErrorModal appelé, relance du fetch");
    setHasFetched(false); // Permet de relancer le fetch
    getBooks({ limit: 12, offset: 0 });
  };

  console.log("Rendu de LibraryPage - État actuel :", {
    loading,
    hasFetched,
    booksLength: books.length,
    error,
  });

  return (
    <>
      <NewsletterPopup />
      <div id="content" style={{ display: "block" }}>
        <Header />
        <SearchBar />
        <AnnouncementCards />
        <FilterBox />
        {loading && !hasFetched ? (
          <Loader />
        ) : books.length === 0 && !error ? (
          <p>Aucun document trouvé</p>
        ) : (
          <DocumentList onOpenModal={openModal} />
        )}
        {modalData && (
          <DocumentModal
            isVisible={true}
            imageSrc={modalData.imageSrc}
            description={modalData.description}
            documentUrl={modalData.documentUrl}
            bookId={modalData.bookId}
            onClose={closeModal}
          />
        )}
        <ErrorModal message={error || null} onClose={closeErrorModal} />
        <Footer />
      </div>
    </>
  );
};

export default LibraryPage;