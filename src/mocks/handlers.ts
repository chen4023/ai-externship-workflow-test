import { http, passthrough } from 'msw';
import { communityHandlers } from './communityHandlers';
import { communityDetailHandlers } from './communityDetailHandlers';
import { deployedApiPatterns } from './passthrough';

/**
 * 배포된 API를 실서버로 통과시키는 핸들러를 자동 생성한다.
 * passthrough 핸들러가 도메인 핸들러보다 앞에 위치하여 우선 매칭된다.
 */
const passthroughHandlers = deployedApiPatterns.map((pattern) =>
  http.all(pattern, () => passthrough()),
);

export const handlers = [
  ...passthroughHandlers,
  ...communityHandlers,
  ...communityDetailHandlers,
];
