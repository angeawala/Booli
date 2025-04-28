'use client';
import { useState, useEffect } from 'react';
import '@/styles/comment.css'

const CommentPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logique de soumission du formulaire ici (par exemple, envoyer à une API)
    console.log('Formulaire soumis');
  };

  return (
    <div className="img-connexion min-h-screen flex flex-col">
      {/* Loading Container */}
      <div className="loading-container" id="loading" style={{ display: isLoading ? 'block' : 'none' }}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Main Content */}
      <div id="form-container" style={{ display: isLoading ? 'none' : 'block' }}>
        <h1 className="Logo text-center text-3xl font-bold mt-4">BOOLi-STORE.world"</h1>

        {/* Form Section */}
        <div className="container mt-4 px-1">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 bg-white rounded-5 cadre p-6">
              <h5 className="text-center mb-4">SUGGESTION</h5>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-1 mt-5">
                  <input
                    type="text"
                    name="Nom"
                    className="form-control border-2 shadow-none custom-input e-recover"
                    placeholder="Votre Nom (Facultatif)"
                  />
                </div>
                <div className="input-group mb-1 mt-3">
                  <input
                    type="text"
                    name="Prénom"
                    className="form-control border-2 shadow-none custom-input e-recover"
                    placeholder="Votre Prénom (Facultatif)"
                  />
                </div>
                <div className="d-block text-center mb- mt-3">
                  <textarea
                    id="description_produit"
                    name="description_produit"
                    required
                    className="form-control border-2 shadow-none custom-input e-recover"
                    placeholder="Entrez votre message ici...."
                  ></textarea>
                </div>
                <div className="d-block text-center mb-4">
                  <button type="submit" className="btn btn-lg text-white connex">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;