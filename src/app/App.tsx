import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "../shared/ui/Loading/Loading";
import { Layout } from "./layouts/Layout";

const LandingPage = lazy(() => import("../pages/Landing/LandingPage").then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import("../pages/Login/LoginPage").then(m => ({ default: m.LoginPage })));
const ResetPasswordPage = lazy(() => import("../pages/Login/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage })));
const AccountRecoveryPage = lazy(() => import("../pages/Login/AccountRecoveryPage").then(m => ({ default: m.AccountRecoveryPage })));
const SignupPage = lazy(() => import("../pages/Signup/SignupPage").then(m => ({ default: m.SignupPage })));
const SignupFormPage = lazy(() => import("../pages/Signup/SignupFormPage").then(m => ({ default: m.SignupFormPage })));
const StudentRegistrationPage = lazy(() => import("../pages/StudentRegistration/StudentRegistrationPage").then(m => ({ default: m.StudentRegistrationPage })));
const MypagePage = lazy(() => import("../pages/Mypage/MypagePage").then(m => ({ default: m.MypagePage })));
const PasswordChangePage = lazy(() => import("../pages/Mypage/PasswordChangePage").then(m => ({ default: m.PasswordChangePage })));
const MypageQuizPage = lazy(() => import("../pages/MypageQuiz/MypageQuizPage").then(m => ({ default: m.MypageQuizPage })));
const QuizPage = lazy(() => import("../pages/Quiz/QuizPage").then(m => ({ default: m.QuizPage })));
const QuizResultPage = lazy(() => import("../pages/Quiz/QuizResultPage").then(m => ({ default: m.QuizResultPage })));
const QnaListPage = lazy(() => import("../pages/QnaList/QnaListPage").then(m => ({ default: m.QnaListPage })));
const QnaDetailPage = lazy(() => import("../pages/QnaDetail/QnaDetailPage").then(m => ({ default: m.QnaDetailPage })));
const QnaCreatePage = lazy(() => import("../pages/QnaCreate/QnaCreatePage").then(m => ({ default: m.QnaCreatePage })));
const CommunityListPage = lazy(() => import("../pages/CommunityList/CommunityListPage").then(m => ({ default: m.CommunityListPage })));
const CommunityDetailPage = lazy(() => import("../pages/CommunityDetail/CommunityDetailPage").then(m => ({ default: m.CommunityDetailPage })));
const CommunityCreatePage = lazy(() => import("../pages/CommunityCreate/CommunityCreatePage").then(m => ({ default: m.CommunityCreatePage })));
const CommunityEditPage = lazy(() => import("../pages/CommunityEdit/CommunityEditPage").then(m => ({ default: m.CommunityEditPage })));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const ComponentShowcasePage = lazy(() => import("../pages/ComponentShowcase/ComponentShowcasePage").then(m => ({ default: m.ComponentShowcasePage })));

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
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Guest 레이아웃 (비인증) */}
            <Route element={<Layout headerVariant="guest" />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/reset-password" element={<ResetPasswordPage />} />
              <Route path="/login/account-recovery" element={<AccountRecoveryPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/form" element={<SignupFormPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Unregistered 레이아웃 (수강생 등록 전) */}
            <Route element={<Layout headerVariant="unregistered" />}>
              <Route path="/register" element={<StudentRegistrationPage />} />
            </Route>

            {/* Registered 레이아웃 (인증 완료) */}
            <Route element={<Layout headerVariant="registered" />}>
              <Route path="/mypage" element={<MypagePage />} />
              <Route path="/mypage/password" element={<PasswordChangePage />} />
              <Route path="/mypage/quiz" element={<MypageQuizPage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/quiz/:quizId/result" element={<QuizResultPage />} />
              <Route path="/qna" element={<QnaListPage />} />
              <Route path="/qna/new" element={<QnaCreatePage />} />
              <Route path="/qna/:questionId" element={<QnaDetailPage />} />
              <Route path="/community" element={<CommunityListPage />} />
              <Route path="/community/new" element={<CommunityCreatePage />} />
              <Route path="/community/:postId" element={<CommunityDetailPage />} />
              <Route path="/community/:postId/edit" element={<CommunityEditPage />} />
              <Route path="/showcase" element={<ComponentShowcasePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
