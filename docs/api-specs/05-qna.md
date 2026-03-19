# 질의응답 (Q&A)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 질문 등록/조회/수정, 답변 등록/수정/채택, 답변 댓글, AI 답변 생성
> **API 수**: 9개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/api/v1/qna/questions` | 질문등록 API |
| `GET` | `/api/v1/qna/questions` | 질의응답 목록 조회 API |
| `GET` | `/api/v1/qna/questions/{question_id}` | 질의응답 상세 조회 API |
| `PUT` | `/api/v1/qna/questions/{question_id}` | 질문 수정 API |
| `POST` | `/api/v1/qna/questions/{question_id}/answers` | 답변 등록 API |
| `GET` | `/api/v1/qna/questions/{question_id}/ai-answer` | AI 답변 생성 |
| `PUT` | `/api/v1/qna/answers/{answer_id}` | 답변 수정 API |
| `POST` | `/api/v1/qna/answers/{answer_id}/accept` | 답변 채택 API |
| `POST` | `/api/v1/qna/answers/{answer_id}/comments` | 답변 댓글 작성 API |

## API 상세 명세

### `POST /api/v1/qna/questions`
**설명**: 질문등록 API

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Request Body
```json
{
  "title": "str",
  "content": "str",
  "category": "bigint",
```
**Example:**
```json
{
  "title": "Django에서 ForeignKey 역참조는 어떻게 하나요?",
  "content": "Django 모델에서 related_name을 지정했을 때 역참조 하는 방법이 궁금합니다.",
  "category": 32
}
```

#### Success Response
```json
{
  "message": "str",
  "question_id": "bigint"
}
```
**Example:**
```json
{
  "message": "질문이 성공적으로 등록되었습니다.",
  "question_id": 10501
}
```

#### Error Response
```json
400: {
  "error_detail": "str"
}
401: {
  "error_detail": "str"
}
403: {
  "error_detail": "str"
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 질문 등록 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 수강생만 질문을 등록할 수 있습니다."
  },
  "403": {
    "error_detail": "질문 등록 권한이 없습니다."
  }
}
```

#### Status Codes
```
{
  "201": "Created",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
}
```

---

### `GET /api/v1/qna/questions`
**설명**: 질의응답 목록 조회 API

#### Query Parameters
```json
{
  "page": "int",
  "size": "int",
  "search_keyword": "str",
  "category_id": "bigint",
  "answer_status": "str",
  "sort": "str"
}
```
**Example:**
```json
{
  "page": 1,
  "size": 10,
  "search_keyword": "django",
  "category_id": 12,
  "answer_status": "answered",
  "sort": "latest"
}
```

#### Success Response
```json
{
  "count": "int",
  "next": "str | null",
  "previous": "str | null",
  "results": [
    {
      "id": "bigint",
      "category": {
        "id": "bigint",
        "depth": "int",
        "names": ["str"]
      },
      "author": {
        "id": "bigint",
        "nickname": "str",
        "profile_image_url": "str | null"
      },
      "title": "str",
      "content_preview": "str",
      "answer_count": "int",
      "view_count": "int",
      "created_at": "str",
      "thumbnail_img_url": "str | null"
    }
  ]
}
```
**Example:**
```json
{
  "count": 152,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 10501,
      "category": {
        "id": 12,
        "depth": 2,
        "names": ["백엔드", "Django", "ORM"]
      },
      "author": {
        "id": 211,
        "nickname": "한율_회장",
        "profile_image_url": "https://cdn.ozcodingschool.com/profiles/user_123.png"
      },
      "title": "Django ORM 역참조는 어떻게 사용하나요?",
      "content_preview": "ForeignKey에 related_name을 지정하면...",
      "answer_count": 3,
      "view_count": 87,
      "created_at": "2025-03-01 10:03:21",
      "thumbnail_img_url": "https://cdn.ozcodingschool.com/qna/thumb_10501_01.png"
    }
  ]
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 목록 조회 요청입니다."
  },
  "404": {
    "error_detail": "조회 가능한 질문이 존재하지 않습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "404": "Not Found"
}
```

---

### `GET /api/v1/qna/questions/{question_id}`
**설명**: 질의응답 상세 조회 API

#### Success Response
```json
{
  "id": "bigint",
  "title": "str",
  "content": "str",
  "category": {
    "id": "bigint",
    "depth": "int",
    "names": ["str"]
  },
  "images": [
    {
      "id": "bigint",
      "img_url": "str"
    }
  ],
  "view_count": "int",
  "created_at": "str",
  "author": {
    "id": "bigint",
    "nickname": "str",
    "profile_image_url": "str | null"
  },
  "answers": [
    {
      "id": "bigint",
      "content": "str",
      "created_at": "str",
      "is_adopted": "bool",
      "author": {
        "id": "bigint",
        "nickname": "str",
        "profile_image_url": "str | null"
      },
      "comments": [
        {
          "id": "bigint",
          "content": "str",
          "created_at": "str",
          "author": {
            "id": "bigint",
            "nickname": "str",
            "profile_image_url": "str | null"
          }
        }
      ]
    }
  ]
}
```
**Example:**
```json
{
  "id": 10501,
  "title": "Django에서 ForeignKey 역참조는 어떻게 하나요?",
  "content": "Django 모델에서 related_name을 지정했을 때...",
  "category": {
    "id": 12,
    "depth": 2,
    "names": ["백엔드", "Django", "ORM"]
  },
  "images": [
    {
      "id": 3,
      "img_url": "https://cdn.ozcodingschool.com/qna/img_20250301_101530.png"
    }
  ],
  "view_count": 88,
  "created_at": "2025-03-01 10:25:33",
  "author": {
    "id": 211,
    "nickname": "한솔_회장",
    "profile_image_url": null
  },
  "answers": []
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 질문 싱세 조회 요청입니다."
  }, "404": {
    "error_detail": "해당 질문을 찾을 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "404": "Not Found"
}
```

---

### `PUT /api/v1/qna/questions/{question_id}`
**설명**: 질문 수정 API

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Request Body
```json
{
  "title": str,
  "content": str,
  "category": bigint,
}
```
**Example:**
```json
{
  "title": "Django ORM 역참조 사용 방법 정리",
  "content": "ForeignKey의 related_name을 지정하면 역참조가 가능합니다.\n\n예시 코드:\n```python\npost.comment_set.all()\n```",
  "category": 32,
}
```

#### Success Response
```json
{
  "question_id": bigint,
  "updated_at": str
}
```
**Example:**
```json
{
  "question_id": 10501,
  "updated_at": "2025-03-02 14:14:22"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 질문 수정 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 질문을 수정할 수 있습니다."
  },
  "403": {
    "error_detail": "본인이 작성한 질문만 수정할 수 있습니다."
  },
  "404": {
    "error_detail": "해당 질문을 찾을 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found"
}
```

---

### `POST /api/v1/qna/questions/{question_id}/answers`
**설명**: 답변 등록 API

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Request Body
```json
{
  "content": str,
  "image_urls": [str]
}
```
**Example:**
```json
{
  "content": "Django ORM 역참조는 `related_name`을 사용하여 접근할 수 있습니다.\n\n```python\npost.comment_set.all()\n```",
  "image_urls": [
    "https://cdn.ozcodingschool.com/qna/answer_img_1001.png"
  ]
}
```

#### Success Response
```json
{
  "answer_id": bigint,
  "question_id": bigint,
  "author_id": bigint,
  "created_at": str
}
```
**Example:**
```json
{
  "answer_id": 801,
  "question_id": 10501,
  "author_id": 211,
  "created_at": "2025-03-02 11:43:20"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 답변 등록 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 답변을 작성할 수 있습니다."
  },
  "403": {
    "error_detail": "답변 작성 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 질문을 찾을 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "201": "Created",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found"
}
```

---

### `GET /api/v1/qna/questions/{question_id}/ai-answer`
**설명**: AI 답변 생성

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Success Response
```json
{
  "id": bigint,
  "question_id": bigint,
  "output": str,
  "using_model": str,
  "created_at": str
}
```
**Example:**
```json
{
  "id": 8751,
  "question_id": 10221,
  "output": "리스트는 수정 가능한 자료구조이며, 튜플은 수정이 불가능한 자료구조입니다. 리스트는 [], 튜플은 () 를 사용합니다.",
  "using_model": "gemini-2.5-pro",
  "created_at": "2025-03-01 14:20:33"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}

409: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 데이터 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 요청할 수 있습니다."
  },
  "403": {
    "error_detail": "AI 답변 생성 권한이 없습니다."
  },
  "404": {
    "error_detail": "질문 데이터를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "이미 AI가 답변을 생성했습니다."
  }
}
```

#### Status Codes
```
{
  "201": "Created",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "409": "Conflict"
}
```

---

### `PUT /api/v1/qna/answers/{answer_id}`
**설명**: 답변 수정 API

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Request Body
```json
{
  "content": str,
  "image_urls": [str]
}
```
**Example:**
```json
{
  "content": "Django ORM에서 `related_name`을 설정하면 역참조가 가능합니다.\n\n예시:\n```python\npost.comment_set.all()\n```",
  "image_urls": [
    "https://cdn.ozcodingschool.com/qna/answer_img_1001.png"
  ]
}
```

#### Success Response
```json
{
  "answer_id": bigint,
  "updated_at": str
}
```
**Example:**
```json
{
  "answer_id": 801,
  "updated_at": "2025-03-02 15:22:41"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 답변 수정 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 답변을 수정할 수 있습니다."
  },
  "403": {
    "error_detail": "본인이 작성한 답변만 수정할 수 있습니다."
  },
  "404": {
    "error_detail": "해당 답변을 찾을 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found"
}
```

---

### `POST /api/v1/qna/answers/{answer_id}/accept`
**설명**: 답변 채택 API

#### Headers
```json
{
    "Authorization": str,
    "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Success Response
```json
{
  "question_id": bigint,
  "answer_id": bigint,
  "is_adopted": bool
}
```
**Example:**
```json
{
  "question_id": 10501,
  "answer_id": 801,
  "is_adopted": true
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}

409: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 답변 채택 요청입니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 답변을 채택할 수 있습니다."
  },
  "403": {
    "error_detail": "본인이 작성한 질문의 답변만 채택할 수 있습니다."
  },
  "404": {
    "error_detail": "해당 질문 또는 답변을 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "이미 채택된 답변이 존재합니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "409": "Conflict"
}
```

---

### `POST /api/v1/qna/answers/{answer_id}/comments`
**설명**: 답변 댓글 작성 API

#### Headers
```json
{
  "Authorization": str,
  "Content-Type": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value",
    "Content-Type": "application/json"
}
```

#### Request Body
```json
{
  "content": str
}
```
**Example:**
```json
{
  "content": "관련 예제 코드도 공유해주실 수 있나요?"
}
```

#### Success Response
```json
{
  "comment_id": bigint,
  "answer_id": bigint,
  "author_id": bigint,
  "created_at": datetime
}
```
**Example:**
```json
{
  "comment_id": 91001,
  "answer_id": 801,
  "author_id": 211,
  "created_at": "2025-03-02 16:30:18"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}

401: {
    ""error_detail"": str
}

403: {
    ""error_detail"": str
}

404: {
    ""error_detail"": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "댓글 내용은 1~500자 사이로 입력해야 합니다."
  },
  "401": {
    "error_detail": "로그인한 사용자만 댓글을 작성할 수 있습니다."
  },
  "403": {
    "error_detail": "댓글 작성 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 답변을 찾을 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "201": "Created",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found"
}
```

---
