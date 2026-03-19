# Feature: API 레이어 axios 기반 리팩토링

## 배경 (Background)
- 현재 src/api/community.ts에서 브라우저 내장 fetch API를 직접 사용 중
- 인증 토큰 관리, 에러 핸들링, 요청/응답 인터셉팅 등의 공통 로직이 없음
- axios 인스턴스 + 인터셉터 패턴으로 통일하여 인증 자동화, 토큰 재발급, 에러 핸들링을 중앙화

## 요구사항 (Requirements)

### 기능 요구사항
- [x] axios 인스턴스 2개 구성 (publicApi, authApi)
- [x] Request 인터셉터: authApi에서 access token 자동 첨부
- [x] Response 인터셉터: 401 시 refresh token으로 재발급 + 원래 요청 재시도
- [x] 토큰 재발급 실패 시 로그아웃 처리 (토큰 제거 + 리다이렉트)
- [x] 동시 401 요청 시 토큰 재발급 중복 방지 (큐 패턴)
- [x] 기존 fetch 코드를 axios 인스턴스로 교체
- [x] auth.ts에 인증 관련 API 함수 추가 (로그인, 회원가입, 토큰 재발급)

### 비기능 요구사항
- [x] 타입 안전성: 모든 API 함수에 제네릭 타입 적용
- [x] 보안: access token은 메모리/localStorage, refresh token은 localStorage
- [x] 유지보수: 공통 설정 중앙화 (baseURL, timeout, headers)

## 수락 기준 (Acceptance Criteria)

- [x] src/api/instance.ts에 publicApi, authApi 두 인스턴스가 존재한다
- [x] authApi의 Request 인터셉터가 Authorization: Bearer 헤더를 자동 첨부한다
- [x] authApi의 Response 인터셉터가 401 응답 시 토큰 재발급을 시도한다
- [x] 토큰 재발급 성공 시 원래 요청을 재시도한다
- [x] 토큰 재발급 실패 시 localStorage의 토큰을 제거하고 /login으로 리다이렉트한다
- [x] 동시 여러 요청이 401일 때 토큰 재발급이 한 번만 실행된다 (큐 패턴)
- [x] community.ts가 fetch 대신 authApi 인스턴스를 사용한다
- [x] auth.ts에 refreshToken, login, signup 함수가 존재한다
- [x] pnpm tsc --noEmit 통과
- [x] pnpm lint 통과
- [x] CLAUDE.md에 API 호출 규칙이 추가되어 있다

## 엣지 케이스
- refresh token도 만료된 경우 -> 로그아웃 처리
- 네트워크 에러 (서버 다운) -> axios 에러로 전파
- 토큰 재발급 중 추가 401 요청 -> 큐에 대기 후 일괄 재시도
- baseURL 미설정 시 -> 상대 경로로 동작 (프록시 사용)

## 아키텍처 결정 (Architecture Decisions)
- axios 인터셉터 패턴으로 인증 로직 중앙화
- TanStack Query의 queryFn에서 axios 응답의 .data를 반환
- 토큰 저장: localStorage (access token, refresh token)
- 큐 패턴: isRefreshing 플래그 + failedQueue 배열

## 파일 구조
```
src/api/
├── instance.ts          # publicApi, authApi 인스턴스 + 인터셉터
├── community.ts         # 커뮤니티 API (authApi 사용)
└── auth.ts              # 인증 API (publicApi 사용, 토큰 재발급)
```

## 테스팅 전략
- **Unit**: axios 인스턴스 설정 검증, 인터셉터 로직 테스트
- **Integration**: API 함수 호출 -> 올바른 인스턴스 사용 확인

## 범위 외 (Out of Scope)
- UI 컴포넌트 변경
- 새로운 API 엔드포인트 추가 (auth 기본 함수 제외)
- E2E 테스트
