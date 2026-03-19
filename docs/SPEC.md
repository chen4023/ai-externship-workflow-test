# Feature: Landing Page (랜딩 페이지)

> Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/
> Figma Nodes: 1:12014 (쪽지시험), 1:11962 (질의응답), 1:12113 (커뮤니티)

## 배경 (Background)
- 서비스의 첫 진입 페이지로, 핵심 기능(쪽지시험/질의응답/커뮤니티)을 소개
- 비로그인 사용자에게 서비스 가치를 전달하고, 가입/로그인을 유도
- 3개 탭을 통해 각 기능의 미리보기 스크린샷과 설명을 제공

## 페이지 구조

### 1. Header (기존 공통 컴포넌트)
- guest 모드 헤더 사용 (로그인/회원가입 버튼)
- 상단 배너 + 네비게이션 바

### 2. Hero Section
- 탭에 따라 변경되는 메인 카피 (타이틀 + 서브타이틀)
- 각 탭별 카피:
  - 쪽지시험: "쪽지시험으로 / 실력을 차곡차곡 쌓아보세요"
  - 질의응답: "궁금한 건 바로 물어보세요, / 함께 해결해요"
  - 커뮤니티: "소통하고 공유하며 / 함께 성장하는 공간"

### 3. Tab Selector (Pill 형태)
- 3개 탭: 쪽지시험 / 질의응답 / 커뮤니티
- 활성 탭: primary 배경 + 밝은 텍스트
- 비활성 탭: 투명 배경 + gray-disabled 텍스트
- 둥근 pill 형태의 컨테이너 (border, 흰색 배경)

### 4. Feature Showcase Section
- 각 탭에 해당하는 기능 미리보기 영역
- 메인 스크린샷 (큰 프레임, primary-900 보더, 둥근 모서리)
- 스크린샷 좌우에 기능 설명 카드 배치:
  - 쪽지시험: 시험 목록, 응시 화면, 결과 화면 등의 미리보기
  - 질의응답: 질문 목록, 상세 페이지, AI 답변 등의 미리보기
  - 커뮤니티: 게시글 목록, 상세 페이지, 댓글 등의 미리보기
- 각 설명 카드에는 아이콘 + 제목 + 설명 텍스트

### 5. CTA Banner Section
- primary-600 배경의 배너
- 탭별로 다른 메시지:
  - 쪽지시험: "정기적인 쪽지시험으로 / 학습 효과를 높여보세요"
  - 질의응답: "함께 묻고 답하며, / 현직자의 피드백으로 빠르게 성장할 수 있어요"
  - 커뮤니티: "자유롭게 이야기하며, / 같은 목표를 가진 동료들과 연결되세요"
- "시작하기" 버튼 (outline 스타일, 밝은 색상)

### 6. Footer (기존 공통 컴포넌트)
- 회사 정보, 링크, 정책 등

## 요구사항 (Requirements)

### 기능 요구사항
- [x] 3개 탭(쪽지시험/질의응답/커뮤니티) 전환 가능
- [x] 탭 전환 시 Hero 카피, Feature Showcase, Banner 내용이 변경
- [x] Header guest 모드 표시 (로그인/회원가입)
- [x] Footer 표시
- [x] "시작하기" 버튼 클릭 시 해당 기능 페이지로 이동
- [x] 기본 활성 탭: 쪽지시험

### 비기능 요구사항
- [x] 접근성: 탭 전환에 적절한 ARIA 속성 적용
- [x] 시맨틱 HTML 사용 (section, nav, h1-h2 등)
- [x] 컴포넌트 파일 200줄 이하
- [x] 디자인 토큰 기반 색상/간격 사용 (arbitrary value 금지)

## 수락 기준 (Acceptance Criteria)

- [x] Given 사용자가 랜딩 페이지에 진입 When 페이지가 로드 Then 쪽지시험 탭이 기본 활성 상태
- [x] Given 사용자가 탭을 클릭 When "질의응답" 탭 선택 Then Hero 카피와 Showcase, Banner가 질의응답 내용으로 변경
- [x] Given 사용자가 탭을 클릭 When "커뮤니티" 탭 선택 Then Hero 카피와 Showcase, Banner가 커뮤니티 내용으로 변경
- [x] Given 사용자가 "시작하기" 버튼 클릭 When 쪽지시험 탭 활성 Then /mypage/quiz로 이동
- [x] Given 사용자가 "시작하기" 버튼 클릭 When 질의응답 탭 활성 Then /qna로 이동
- [x] Given 사용자가 "시작하기" 버튼 클릭 When 커뮤니티 탭 활성 Then /community로 이동
- [x] TypeScript 타입 체크 통과 (pnpm tsc --noEmit)
- [x] 빌드 성공 (pnpm build)

## 디자인 참조
- Figma 파일: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/
- 쪽지시험 탭: nodeId 1:12014
- 질의응답 탭: nodeId 1:11962
- 커뮤니티 탭: nodeId 1:12113
- 재사용 컴포넌트: Header (guest), Footer

## 아키텍처 결정
- 상태 관리: useState (탭 전환만 관리, 서버 상태 불필요)
- 라우팅: react-router-dom의 useNavigate로 CTA 이동
- 컴포넌트 분리: LandingPage + 서브컴포넌트 (HeroSection, TabSelector, FeatureShowcase, CtaBanner)

## 범위 외 (Out of Scope)
- 실제 스크린샷 이미지 삽입 (placeholder 사용)
- 애니메이션/트랜지션 효과
- 반응형 (모바일/태블릿) 레이아웃
- 로그인/회원가입 기능 연동
