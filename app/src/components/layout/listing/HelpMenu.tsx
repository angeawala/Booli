"use client";

import Link from "next/link";

export default function HelpMenu() {
  return (
    <div className="helf col-sm-1 text-center x-menu-header">
      <Link href="#" id="connect1-btn">
        <i className="fas fa-question-circle" id="conu"></i> Aide
      </Link>
      <div className="dropdown1-menu">
        <Link href="/help">
          <i className="fas fa-question-circle"></i> FAQs
        </Link>
        <Link href="contact">
          <i className="fas fa-shopping-cart"></i> Commander
        </Link>
        <Link href="/command_annul">
          <i className="fas fa-times-circle"></i> Annulation
        </Link>
        <Link href="service_client">
          <i className="fas fa-truck"></i> Service Client
        </Link>
      </div>
    </div>
  );
}