// app/reservation/bus/guide/page.tsx
'use client';
import { useRef } from 'react';
import Head from 'next/head';
import '@/styles/css/style3-2.css';
import '@/styles/css/abonné.css';
import '@/styles/css/library.css';

export default function Guide() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="body1">
      <Head>
        <title>BOOLi | Guide du voyage par bus</title>
        <link rel="icon" href="/Photo/booli.blanc.jpg" type="image/png" />
      </Head>
      <link rel="stylesheet" href="/Page_touristique/style3.css" />
      <link rel="stylesheet" href="/Page_touristique/market.css" />

      <div className="header1">
        <h1 className="h1_voyage">Guide d'Achat de votre billet de voyage en Bus</h1>
      </div>

      <div className="video-container">
        <h2 className="h2_voyage" style={{ fontWeight: 1000 }}>
          BON VOYAGE MR & MDM !
        </h2>
        <video
          width="900"
          height="360"
          autoPlay
          loop
          muted
          id="myVideo"
          className="hidden-controls"
          onClick={toggleVideo}
          ref={videoRef}
        >
          <source src="/demo/voyage.demo.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>

      <h2 style={{ color: '#fff' }}>Processus de Réservation</h2>

      <div className="phase">
        <div className="circle">0</div>
        <div>
          <strong>Filtration des Agences de la localité</strong>
          <p>
            La première étape consiste à filter les bus ou agences de voyage de votre localité en
            entrant dans les deux barres indiquer à la page de reservation, votre pays et votre ville
            puis filtrer sur le boutton filtrer.
          </p>
          <img src="/Photo/filter.png" alt="filtrer" />
        </div>
      </div>

      <div className="phase">
        <div className="circle">1</div>
        <div>
          <strong>Choisir une destination</strong>
          <p>
            La seconde étape pour votre voyage en bus est de choisir votre destination. Que vous
            souhaitiez vous rendre à la plage, à la montagne ou dans une ville voisine, sélectionnez
            le lieu qui vous attire le plus. Pensez également aux dates de votre voyage pour vérifier
            la disponibilité des bus.
          </p>
          <img src="/Photo/destination.png" alt="Choisir une destination" />
        </div>
      </div>

      <div className="phase">
        <div className="circle">2</div>
        <div>
          <strong>Rechercher des horaires de bus</strong>
          <p>
            Après avoir choisi votre destination, consultez les horaires de bus disponibles. Les
            horaires peuvent varier en fonction de la saison et de la demande. Assurez-vous de
            choisir un horaire qui vous convient le mieux pour votre départ et votre retour.
          </p>
          <img src="/Photo/horaire_bus.png" alt="Rechercher des horaires de bus" />
        </div>
      </div>

      <div className="phase">
        <div className="circle">3</div>
        <div>
          <strong>Réserver votre billet</strong>
          <p>
            Une fois que vous avez choisi votre destination et vos horaires, il est temps de réserver
            votre billet. Remplissez les informations nécessaires, comme votre nom et vos
            coordonnées, et procédez au paiement en ligne. Vérifiez bien les détails avant de
            confirmer votre réservation.
          </p>
          <img src="/Photo/billet.png" alt="Réserver votre billet" />
        </div>
      </div>

      <div className="phase">
        <div className="circle">4</div>
        <div>
          <strong>Recevoir la confirmation</strong>
          <p>
            Après votre réservation, vous recevrez une confirmation par e-mail. Ce document est
            essentiel, car il contient des informations importantes telles que votre numéro de
            réservation, les horaires et les conditions d'annulation. Assurez-vous de le conserver à
            portée de main.
          </p>
          <img src="/Photo/confirm.png" alt="Recevoir la confirmation" />
        </div>
      </div>

      <div className="phase">
        <div className="circle">5</div>
        <div>
          <strong>Préparer votre voyage</strong>
          <p>
            Avant de partir, vérifiez que vous avez tous les documents nécessaires, y compris votre
            billet et une pièce d'identité. Prévoyez d'arriver à la gare au moins 30 minutes avant le
            départ pour éviter tout stress de dernière minute. Pensez également à emporter de quoi
            vous occuper pendant le trajet.
          </p>
          <img src="/Photo/valise.png" alt="Préparer votre voyage" />
        </div>
      </div>

      <h2>BOOLi-STORE.world</h2>
      <p>
        Nous espérons que ce guide vous a aidé ! Réservez dès maintenant votre voyage en bus et
        profitez d'une expérience mémorable.
      </p>
    </div>
  );
}