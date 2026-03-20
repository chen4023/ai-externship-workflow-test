// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

import type { QnaDetailResponse } from './types';

export const MOCK_QNA_DETAIL: QnaDetailResponse = {
  id: 10501,
  title: "Django에서 ForeignKey 역참조는 어떻게 하나요?",
  content:
    "Django 모델에서 related_name을 지정했을 때 역참조 하는 방법이 궁금합니다.\n\n예를 들어 Comment 모델에서 Post를 ForeignKey로 참조하고 있을 때, Post에서 Comment를 역참조하려면 어떻게 해야 하나요?",
  category: { id: 12, depth: 2, names: ["백엔드", "Django", "ORM"] },
  images: [],
  view_count: 88,
  created_at: "2025-03-01 10:25:33",
  author: {
    id: 211,
    nickname: "한솔_회장",
    profile_image_url: null,
  },
  answers: [
    {
      id: 801,
      content:
        "related_name을 지정하면 해당 이름으로 역참조가 가능합니다.\n\n```python\nclass Comment(models.Model):\n    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')\n\n# 역참조\npost.comments.all()\n```",
      created_at: "2025-03-01 14:30:00",
      is_adopted: false,
      author: {
        id: 212,
        nickname: "김멘토",
        profile_image_url: null,
      },
      comments: [
        {
          id: 91001,
          content: "관련 예제 코드도 공유해주실 수 있나요?",
          created_at: "2025-03-02 16:30:18",
          author: {
            id: 211,
            nickname: "한솔_회장",
            profile_image_url: null,
          },
        },
      ],
    },
    {
      id: 802,
      content:
        "related_name을 지정하지 않으면 기본적으로 '모델명_set'으로 역참조할 수 있습니다.\n\n```python\npost.comment_set.all()\n```",
      created_at: "2025-03-02 09:15:00",
      is_adopted: false,
      author: {
        id: 213,
        nickname: "이수강",
        profile_image_url: null,
      },
      comments: [],
    },
  ],
};
