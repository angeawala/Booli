"use client";

import { useCart } from '@/hooks/useCart'
import Link from "next/link";

export default function Panier() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/Panier">
      <i className="fas fa-cart-plus" id="conu"></i> Panier (
      <span id="zero">{totalItems}</span>)
    </Link>
  );
}