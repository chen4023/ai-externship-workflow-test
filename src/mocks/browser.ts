import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { deployedApiPatterns } from './passthrough';

export const worker = setupWorker(...handlers);

/**
 * 배포된 API는 MSW를 우회하여 실서버로 요청을 전달한다.
 * - deployedApiPatterns에 등록된 패턴과 매칭되면 passthrough
 * - 등록되지 않은 API는 MSW 핸들러가 처리
 * - MSW 핸들러도 없는 요청은 onUnhandledRequest: 'warn'으로 경고 출력
 */
export function startWorker() {
  return worker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url);

      // API 요청이 아닌 경우 (정적 리소스 등) 무시
      if (!url.pathname.startsWith('/api/')) {
        return;
      }

      // 배포된 API 패턴에 매칭되면 경고 없이 통과
      if (deployedApiPatterns.some((pattern) => pattern.test(url.pathname))) {
        return;
      }

      // MSW 핸들러가 없는 미배포 API 요청 → 경고
      print.warning();
    },
  });
}
