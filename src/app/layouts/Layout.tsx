import { Outlet } from 'react-router-dom';
import { Header } from '../../shared/ui/Header/Header';
import { Footer } from '../../shared/ui/Footer/Footer';

type HeaderVariant = 'guest' | 'unregistered' | 'registered';

interface LayoutProps {
  headerVariant: HeaderVariant;
}

export function Layout({ headerVariant }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant={headerVariant} />
      <main className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
