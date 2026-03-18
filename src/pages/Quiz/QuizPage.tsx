// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3969&m=dev
// Figma-states: quiz
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";

export function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold">쪽지시험 응시</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
