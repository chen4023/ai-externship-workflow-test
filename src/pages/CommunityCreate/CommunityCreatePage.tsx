// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5561&m=dev
// Figma-states: communityCreate
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";

export function CommunityCreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold">글 작성하기</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
