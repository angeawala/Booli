// src/app/dashboard/layout.tsx
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import Footer from '@/components/dashboard/Footer';
import '@/styles/dashboard/layout.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="x-layout">
      <Header /> {/* Le Header n'a plus besoin du contexte */}
      <Sidebar />
      <main className="x-main-content">{children}</main>
      <Footer />
    </div>
  );
}
