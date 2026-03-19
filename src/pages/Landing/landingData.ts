// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

export type LandingTab = 'quiz' | 'qna' | 'community';

export interface FeatureCard {
  title: string;
  description: string;
}

export interface LandingTabData {
  key: LandingTab;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  featureCards: FeatureCard[];
  bannerTitle: string;
  ctaLink: string;
}

export const LANDING_TABS: LandingTabData[] = [
  {
    key: 'quiz',
    label: '쪽지시험',
    heroTitle: '쪽지시험으로',
    heroSubtitle: '실력을 차곡차곡 쌓아보세요',
    featureCards: [
      {
        title: '참가 코드로 간편 입장',
        description: '선생님이 공유한 참가 코드만 입력하면 바로 시험에 참여할 수 있어요.',
      },
      {
        title: '실시간 시험 응시',
        description: '제한 시간 내에 문제를 풀고, 바로 제출할 수 있어요.',
      },
      {
        title: '결과 즉시 확인',
        description: '시험이 끝나면 점수와 정답을 바로 확인할 수 있어요.',
      },
    ],
    bannerTitle: '정기적인 쪽지시험으로\n학습 효과를 높여보세요',
    ctaLink: '/mypage/quiz',
  },
  {
    key: 'qna',
    label: '질의응답',
    heroTitle: '궁금한 건 바로 물어보세요,',
    heroSubtitle: '함께 해결해요',
    featureCards: [
      {
        title: '자유롭게 질문하기',
        description: '학습 중 궁금한 점을 자유롭게 질문하고 답변을 받아보세요.',
      },
      {
        title: 'AI 답변 지원',
        description: 'AI가 빠르게 답변을 제공하고, 현직자가 보완해줘요.',
      },
      {
        title: '답변 채택 시스템',
        description: '가장 도움이 된 답변을 채택해서 다른 학습자에게도 도움을 줄 수 있어요.',
      },
    ],
    bannerTitle: '함께 묻고 답하며,\n현직자의 피드백으로 빠르게 성장할 수 있어요',
    ctaLink: '/qna',
  },
  {
    key: 'community',
    label: '커뮤니티',
    heroTitle: '소통하고 공유하며',
    heroSubtitle: '함께 성장하는 공간',
    featureCards: [
      {
        title: '자유로운 소통',
        description: '학습 이야기, 고민, 꿀팁 등을 자유롭게 나눠보세요.',
      },
      {
        title: '댓글로 소통하기',
        description: '게시글에 댓글을 달며 동료들과 활발하게 소통할 수 있어요.',
      },
      {
        title: '같은 목표, 다른 경험',
        description: '같은 목표를 가진 동료들의 다양한 경험을 공유받을 수 있어요.',
      },
    ],
    bannerTitle: '자유롭게 이야기하며,\n같은 목표를 가진 동료들과 연결되세요',
    ctaLink: '/community',
  },
];

export function getTabData(tab: LandingTab): LandingTabData {
  return LANDING_TABS.find((t) => t.key === tab)!;
}
