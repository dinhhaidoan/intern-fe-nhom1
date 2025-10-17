import Header from './Header';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}