import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/Landing/LandingPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { FindIdPage } from "../pages/Login/FindIdPage";
import { FindPasswordPage } from "../pages/Login/FindPasswordPage";
import { ResetPasswordPage } from "../pages/Login/ResetPasswordPage";
import { AccountRecoveryPage } from "../pages/Login/AccountRecoveryPage";
import { SignupPage } from "../pages/Signup/SignupPage";
import { StudentRegistrationPage } from "../pages/StudentRegistration/StudentRegistrationPage";
import { MypagePage } from "../pages/Mypage/MypagePage";
import { PasswordChangePage } from "../pages/Mypage/PasswordChangePage";
import { MypageQuizPage } from "../pages/MypageQuiz/MypageQuizPage";
import { QuizPage } from "../pages/Quiz/QuizPage";
import { QuizResultPage } from "../pages/Quiz/QuizResultPage";
import { QnaListPage } from "../pages/QnaList/QnaListPage";
import { QnaDetailPage } from "../pages/QnaDetail/QnaDetailPage";
import { QnaCreatePage } from "../pages/QnaCreate/QnaCreatePage";
import { CommunityListPage } from "../pages/CommunityList/CommunityListPage";
import { CommunityDetailPage } from "../pages/CommunityDetail/CommunityDetailPage";
import { CommunityCreatePage } from "../pages/CommunityCreate/CommunityCreatePage";
import { CommunityEditPage } from "../pages/CommunityEdit/CommunityEditPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { ComponentShowcasePage } from "../pages/ComponentShowcase/ComponentShowcasePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 랜딩 */}
          <Route path="/" element={<LandingPage />} />

          {/* 인증 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/find-id" element={<FindIdPage />} />
          <Route path="/login/find-password" element={<FindPasswordPage />} />
          <Route path="/login/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login/account-recovery" element={<AccountRecoveryPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 수강생 등록 */}
          <Route path="/register" element={<StudentRegistrationPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/mypage/password" element={<PasswordChangePage />} />
          <Route path="/mypage/quiz" element={<MypageQuizPage />} />

          {/* 쪽지시험 */}
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/quiz/:quizId/result" element={<QuizResultPage />} />

          {/* 질의응답 */}
          <Route path="/qna" element={<QnaListPage />} />
          <Route path="/qna/new" element={<QnaCreatePage />} />
          <Route path="/qna/:questionId" element={<QnaDetailPage />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<CommunityListPage />} />
          <Route path="/community/new" element={<CommunityCreatePage />} />
          <Route path="/community/:postId" element={<CommunityDetailPage />} />
          <Route path="/community/:postId/edit" element={<CommunityEditPage />} />

          {/* 개발용 */}
          <Route path="/showcase" element={<ComponentShowcasePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
