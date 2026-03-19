// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

export type LandingTab = "quiz" | "qna" | "community";

export interface FeatureCard {
  icon: "edit" | "file" | "category" | "answer" | "question";
  title: string;
  description: string;
  position: "left" | "right";
}

export interface ChatBubble {
  text: string;
  align: "right" | "left";
}

export interface LandingTabData {
  key: LandingTab;
  label: string;
  heroLines: string[];
  featureCards: FeatureCard[];
  bannerTitle: string;
  chatBubbles: ChatBubble[];
}

export const LANDING_TABS: LandingTabData[] = [
  {
    key: "quiz",
    label: "쪽지시험",
    heroLines: ["쪽지시험으로", "실력을 차곡차곡 쌓아보세요"],
    featureCards: [
      {
        icon: "edit",
        title: "과목별 쪽지시험",
        description: "매일 조금씩 풀며 실력을\n단단히 쌓아보세요",
        position: "left",
      },
      {
        icon: "file",
        title: "한눈에 보는 오답노트",
        description: "답안과 풀이를 바로 확인하며\n배운 내용을 복습해 보세요",
        position: "right",
      },
    ],
    bannerTitle: "함께 묻고 답하며,\n현직자의 피드백으로 빠르게 성장할 수 있어요",
    chatBubbles: [
      { text: "JavaScript 질문있어요!", align: "right" },
      { text: "오즈코치님의 답변이 등록되었어요", align: "left" },
    ],
  },
  {
    key: "qna",
    label: "질의응답",
    heroLines: ["질문하고 배우고,", "동료 수강생과 함께 성장해요"],
    featureCards: [
      {
        icon: "question",
        title: "질문하기",
        description: "과제하다 막히는 부분이 있다면\n언제든 질문해보세요",
        position: "left",
      },
      {
        icon: "answer",
        title: "답변 확인하기",
        description: "코치와 동료들의 답변을 확인하고\n미흡한 부분을 함께 해결해보세요",
        position: "right",
      },
    ],
    bannerTitle: "함께 묻고 답하며,\n현직자의 피드백으로 빠르게 성장할 수 있어요",
    chatBubbles: [
      { text: "JavaScript 질문있어요!", align: "right" },
      { text: "오즈코치님의 답변이 등록되었어요", align: "left" },
    ],
  },
  {
    key: "community",
    label: "커뮤니티",
    heroLines: ["정보 공유부터 팀원 모집까지", "커뮤니티에서 함께해요"],
    featureCards: [
      {
        icon: "category",
        title: "카테고리",
        description: "다양한 주제 속에서 나에게\n딱 맞는 공간을 골라보세요.",
        position: "left",
      },
      {
        icon: "edit",
        title: "커뮤니티",
        description: "같은 과정을 걷는 사람들과\n소통하며 성장할 수 있어요.",
        position: "right",
      },
    ],
    bannerTitle: "함께 묻고 답하며,\n현직자의 피드백으로 빠르게 성장할 수 있어요",
    chatBubbles: [
      { text: "JavaScript 질문있어요!", align: "right" },
      { text: "오즈코치님의 답변이 등록되었어요", align: "left" },
    ],
  },
];

export function getTabData(tab: LandingTab): LandingTabData {
  return LANDING_TABS.find((t) => t.key === tab)!;
}
