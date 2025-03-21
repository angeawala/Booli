import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="index_footer">
      <div className="row foot-content-wrapper">
        <div className="col-sm-4 content1">
          <Link href="/about/" target="_blank">A propos</Link><br /><br />
          <Link href="/enterprise/" target="_blank">Entreprise</Link><br /><br />
          <Link href="/contact/" target="_blank">Contact</Link><br /><br />
          <Link href="/Forum/" target="_blank">Forum</Link><br />
        </div>
        <div className="col-sm-4 content2">
          <form>
            <div className="form-row">
              <div className="form-group col-xs-12 col-md-12">
                <input type="search" className="form-control form-control-sm" name="search" id="search" placeholder="Que voulez vous savoir de BOOLi.com ?...." />
                <input type="submit" className="btn btn-primary my-2" value="Rechercher" />
              </div>
              <p className="Copyright">Copyright © 2024 BOOLi-STORE.world Tout droit réservé.</p>
              <p className="Copyright">✉️ Abonnement gratuit.</p>
            </div>
          </form>
        </div>
        <div className="col-sm-4 content3">
          <Link href="/professionnal" target="_blank">Professionnel</Link><br /><br />
          <Link href="/comment" target="_blank">Commentaire</Link><br /><br />
          <Link href="/condition" target="_blank">Conditions</Link><br /><br />
          <Link href="/help" target="_blank">FAQ</Link><br /><br />
        </div>
      </div>
    </footer>
  );
}