"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function Panier() {
  const { totalItems } = useCart();

  return (
    <Link href="/store/panier">
      <i className="fas fa-cart-plus" id="conu"></i> Panier (
      <span id="zero">{totalItems}</span>)
    </Link>
  );
}