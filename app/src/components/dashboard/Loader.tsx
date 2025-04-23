'use client';

import './../../styles/dashboard/loader.css';

const Loader = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <div className="x-loader">
      <div className="x-spinner"></div>
      <p className="x-loader-text">Chargement...</p>
    </div>
  );
};

export default Loader;