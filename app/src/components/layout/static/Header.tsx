import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
      <img src="/image/cours.png" alt="out" title="L-OKOTTi" id="logo" />
      </div>
      <div className="head">
        <Link href="/">
        <img src="/logo/booli.png" alt="" id="log" style={{ backgroundColor: "transparent" }} />
        </Link>
      </div>
    </header>
  );
}