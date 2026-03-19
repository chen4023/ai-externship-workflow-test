# OzCodingSchool LMS API 명세서 - 관심사별 분류

> **Base URL**: `https://api.ozcodingschool.site`
> **총 API 수**: 104개
> **분류 기준**: 도메인(관심사) 단위로 분리하여 서브에이전트에 독립적으로 전달 가능

## 파일 구조

| 파일 | 도메인 | API 수 | 용도 |
|------|--------|--------|------|
| `01-auth.md` | 인증/계정 (Auth & Account) | 18개 | 인증 서비스 개발 |
| `02-user-profile.md` | 사용자 프로필 (User Profile) | 8개 | 마이페이지 개발 |
| `03-course.md` | 과정/기수 (Course & Cohort) | 3개 | 과정/기수 관련 기능 |
| `04-community.md` | 커뮤니티 (Community Posts & Comments) | 12개 | 커뮤니티 게시판 개발 |
| `05-qna.md` | 질의응답 (Q&A) | 9개 | Q&A 게시판 개발 |
| `06-exam-student.md` | 쪽지시험 - 수강생 (Exam Student) | 6개 | 시험 응시 화면 개발 |
| `07-chatbot.md` | AI 챗봇 (Chatbot) | 6개 | AI 챗봇 기능 개발 |
| `08-admin-user.md` | 어드민 - 회원/수강생 관리 (Admin User Management) | 16개 | 어드민 회원관리 개발 |
| `09-admin-exam.md` | 어드민 - 쪽지시험 관리 (Admin Exam Management) | 17개 | 어드민 시험관리 개발 |
| `10-admin-qna.md` | 어드민 - 질의응답 관리 (Admin Q&A Management) | 7개 | 어드민 Q&A 관리 개발 |
| `11-file-upload.md` | 파일 업로드 (File Upload) | 2개 | 파일 업로드 유틸리티 |

## 서브에이전트 전달 가이드

각 파일은 독립적인 관심사(도메인)로 분리되어 있어, 서브에이전트에 해당 파일만 전달하면 됩니다.

### 프론트엔드 개발 시 권장 분배

| 에이전트 | 전달 파일 | 담당 범위 |
|----------|----------|----------|
| Agent A (인증) | `01-auth.md` + `02-user-profile.md` | 로그인/회원가입, 마이페이지 |
| Agent B (학습) | `03-course.md` + `06-exam-student.md` | 과정 선택, 시험 응시 |
| Agent C (소통) | `04-community.md` + `05-qna.md` + `07-chatbot.md` | 커뮤니티, Q&A, AI 챗봇 |
| Agent D (어드민) | `08-admin-user.md` + `09-admin-exam.md` + `10-admin-qna.md` | 관리자 페이지 전체 |
| 공통 | `11-file-upload.md` | S3 이미지 업로드 (Q&A, 커뮤니티에서 공유) |

### 백엔드 개발 시 권장 분배

| 에이전트 | 전달 파일 | 담당 범위 |
|----------|----------|----------|
| Agent A (accounts) | `01-auth.md` + `02-user-profile.md` + `08-admin-user.md` | accounts 앱 |
| Agent B (posts) | `04-community.md` | posts 앱 |
| Agent C (exams) | `06-exam-student.md` + `09-admin-exam.md` | exams 앱 |
| Agent D (qna) | `05-qna.md` + `10-admin-qna.md` + `11-file-upload.md` | qna 앱 |
| Agent E (chatbot) | `07-chatbot.md` | chatbot 앱 |
| Agent F (course) | `03-course.md` | course 앱 |
