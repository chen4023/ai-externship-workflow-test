# Implementation Plan: API 레이어 axios 기반 리팩토링

> spec.md 확정 기반. 각 Step은 독립적으로 구현/테스트 가능.

## 선행 조건
- [x] SPEC.md 확정 (Gate 1 통과)
- [x] axios 이미 설치됨 (package.json 확인)

## Step 1: axios 인스턴스 + 인터셉터 구현
- **파일**: `src/api/instance.ts`
- **작업 내용**:
  - publicApi 인스턴스 생성 (baseURL, timeout, headers)
  - authApi 인스턴스 생성 (동일 기본 설정)
  - authApi Request 인터셉터: localStorage에서 access token 꺼내 Bearer 헤더 첨부
  - authApi Response 인터셉터: 401 시 refresh token 재발급 + 큐 패턴
  - 토큰 재발급 실패 시 로그아웃 처리
- **검증**: pnpm tsc --noEmit

## Step 2: auth.ts 인증 API 함수 구현
- **파일**: `src/api/auth.ts`
- **작업 내용**:
  - login 함수 (publicApi)
  - signup 함수 (publicApi)
  - refreshToken 함수 (publicApi)
  - 응답 타입 정의
- **검증**: pnpm tsc --noEmit

## Step 3: community.ts fetch -> axios 리팩토링
- **파일**: `src/api/community.ts`
- **작업 내용**:
  - fetch 호출을 authApi 인스턴스로 교체
  - 수동 에러 핸들링 제거 (인터셉터에서 처리)
  - TanStack Query queryFn에서 .data 반환
- **검증**: pnpm tsc --noEmit

## Step 4: CLAUDE.md API 규칙 추가
- **파일**: `CLAUDE.md`
- **작업 내용**:
  - API 호출 규칙 섹션 추가
  - publicApi / authApi 사용 가이드라인
  - 직접 fetch() / axios.get() 호출 금지 규칙
- **검증**: 문서 확인

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
