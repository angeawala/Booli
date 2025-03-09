'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <section>
      <div id="loading-screen" className="animate-fade-in">
        <Image
          src="/logo/booliblanc.jpg" // Chemin absolu depuis public/
          alt="Logo BOOLi"
          width={100}
          height={100}
          className="logo22"
          priority
        />
        <div className="loading-bar">
          <div className="loading-progress animate-progress"></div>
        </div>
      </div>
    </section>
  );
}