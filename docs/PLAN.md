# Implementation Plan: Landing Page (랜딩 페이지)

> spec.md 확정 기반. 각 Step은 독립적으로 구현/테스트 가능.

## 선행 조건
- [x] SPEC.md 확정
- [x] Figma 디자인 확인 (nodeId 1:12014, 1:11962, 1:12113)
- [x] 기존 공통 컴포넌트 확인 (Header, Footer)

## 파일 구조
```
src/pages/Landing/
  LandingPage.tsx          # 메인 페이지 (레이아웃 + 상태)
  HeroSection.tsx          # Hero 카피 영역
  TabSelector.tsx          # Pill 형태 탭 선택기
  FeatureShowcase.tsx      # 기능 미리보기 영역
  CtaBanner.tsx            # CTA 배너 영역
  useLandingTab.ts         # 탭 상태 관리 커스텀 훅
  landingData.ts           # 탭별 정적 데이터 (카피, 설명 등)
```

## Step 1: 데이터 모델 + 커스텀 훅
- **파일**: `landingData.ts`, `useLandingTab.ts`
- **작업 내용**:
  - LandingTab 타입 정의 ("quiz" | "qna" | "community")
  - 탭별 데이터 상수 정의 (타이틀, 서브타이틀, 기능 설명, 배너 카피, CTA 링크)
  - useLandingTab 훅 (activeTab 상태 + setActiveTab + 현재 탭 데이터)
- **검증**: pnpm tsc --noEmit

## Step 2: TabSelector 컴포넌트
- **파일**: `TabSelector.tsx`
- **작업 내용**:
  - Pill 형태 탭 UI
  - 활성/비활성 스타일 (primary / gray-disabled)
  - ARIA role="tablist", role="tab", aria-selected
- **검증**: pnpm tsc --noEmit

## Step 3: HeroSection 컴포넌트
- **파일**: `HeroSection.tsx`
- **작업 내용**:
  - 탭별 타이틀/서브타이틀 표시
  - 중앙 정렬 레이아웃
- **검증**: pnpm tsc --noEmit

## Step 4: FeatureShowcase 컴포넌트
- **파일**: `FeatureShowcase.tsx`
- **작업 내용**:
  - 메인 스크린샷 프레임 (primary-900 보더)
  - 좌우 기능 설명 카드 배치
  - 탭별 다른 기능 카드 렌더링
- **검증**: pnpm tsc --noEmit

## Step 5: CtaBanner 컴포넌트
- **파일**: `CtaBanner.tsx`
- **작업 내용**:
  - primary-600 배경 배너
  - 탭별 다른 메시지
  - "시작하기" 버튼 (해당 탭 페이지로 이동)
- **검증**: pnpm tsc --noEmit

## Step 6: LandingPage 통합
- **파일**: `LandingPage.tsx`
- **작업 내용**:
  - Header (guest) + Hero + Tab + Showcase + Banner + Footer 조합
  - useLandingTab 훅으로 상태 공유
  - 전체 레이아웃 조립
- **검증**: pnpm tsc --noEmit && pnpm build

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
