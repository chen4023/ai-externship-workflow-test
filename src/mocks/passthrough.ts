/**
 * 배포 완료된 API 목록
 *
 * 여기에 등록된 엔드포인트는 MSW를 우회(passthrough)하여 실제 서버로 요청을 전달한다.
 * 새 API가 배포되면 해당 패턴을 이 배열에 추가하고, MSW 핸들러에서는 제거한다.
 *
 * 패턴 형식: RegExp — 요청 URL에 대해 test() 수행
 */
export const deployedApiPatterns: RegExp[] = [
  // 예시: 아래 주석을 해제하면 해당 API가 실서버로 연결됨
  // /\/api\/v1\/posts\/categories$/,
  // /\/api\/v1\/posts(\?.*)?$/,
];
