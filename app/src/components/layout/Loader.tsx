import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
  const [load, setLoad] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (load < 100) {
        setLoad((prev) => prev + 1);
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30); // Ralentis à 30ms pour une animation plus fluide
    return () => clearInterval(interval);
  }, [load]);

  if (isComplete) return null; // Disparaît après 100%

  return (
    <section>
      <div id="loader-container">
        <div id="circular-loader"></div>
        <div id="percentage">{load}%</div>
      </div>
    </section>
  );
};

export default Loader;