// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1100&m=dev
// Figma-states: login
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";

export function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-[348px]">
          <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
