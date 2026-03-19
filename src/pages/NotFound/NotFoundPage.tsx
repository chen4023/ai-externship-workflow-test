// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3363&m=dev
import { NotFound } from "../../shared/ui/NotFound/NotFound";

export function NotFoundPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <NotFound variant="404" />
    </div>
  );
}
