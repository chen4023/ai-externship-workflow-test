// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1992&m=dev
// Figma-states: signup
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";

export function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-[480px]">
          <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
