# 어드민 - 질의응답 관리 (Admin Q&A Management)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 카테고리 관리, 질의응답 조회/삭제, 답변 삭제
> **API 수**: 7개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/api/v1/admin/qna/categories` | 카테고리 등록 API |
| `GET` | `/api/v1/admin/qna/categories` | 카테고리 목록 조회 API |
| `DELETE` | `/api/v1/admin/qna/categories/{category_id}` | 카테고리 삭제 API |
| `GET` | `/api/v1/admin/qna/questions` | 어드민 질의응답 목록 조회 API |
| `GET` | `/api/v1/admin/qna/questions/{question_id}` | 어드민 질의응답 상세 조회 API |
| `DELETE` | `/api/v1/admin/qna/questions/{question_id}` | 어드민 질의응답 삭제 API |
| `DELETE` | `/api/v1/admin/qna/answers/{answer_id}` | 어드민 답변 삭제 API |

## API 상세 명세

### `POST /api/v1/admin/qna/categories`
**설명**: 카테고리 등록 API

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
  "category_type": str,
  "name": str,
  "parent_id": bigint
}
```
**Example:**
```json
{
  "category_type": "large",
  "name": "백엔드",
  "parent_id": null
}
```

#### Success Response
```json
{
  "category_id": bigint,
  "name": str,
  "category_type": str,
  "parent_id": bigint,
  "created_at": str
}
```
**Example:**
```json
{
  "category_id": 55,
  "name": "FastAPI",
  "category_type": "small",
  "parent_id": 12,
  "created_at": "2025-03-03 14:11:22"
}
```

#### Error Response
```json
400: {
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
    "error_detail": "카테고리 종류와 이름은 필수 입력값입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "카테고리 등록 권한이 없습니다."
  },
  "404": {
    "error_detail": "부모 카테고리를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "동일한 이름의 카테고리가 이미 존재합니다."
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

### `GET /api/v1/admin/qna/categories`
**설명**: 카테고리 목록 조회 API

#### Headers
```json
{
    "Authorization": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value"
}
```

#### Query Parameters
```json
{
  "page": int,
  "size": int,
  "search_keyword": str,
  "category_type": str
}
```
**Example:**
```json
{
  "page": 1,
  "size": 20,
  "search_keyword": "Django",
  "category_type": "small"
}
```

#### Success Response
```json
{
  "page": int,
  "size": int,
  "total_count": int,
  "categories": [
    {
      "category_id": bigint,
      "name": str,
      "category_type": str,
      "parent_category": str,
      "child_categories": [str],
      "created_at": str,
      "updated_at": str
    }
  ]
}
```
**Example:**
```json
{
  "page": 1,
  "size": 20,
  "total_count": 54,
  "categories": [
    {
      "category_id": 12,
      "name": "Django",
      "category_type": "small",
      "parent_category": "웹 프레임워크",
      "child_categories": [],
      "created_at": "2025-03-03 14:11:22",
      "updated_at": "2025-03-03 15:21:09"
    },
    {
      "category_id": 5,
      "name": "웹 프레임워크",
      "category_type": "medium",
      "parent_category": "백엔드",
      "child_categories": ["Django", "FastAPI", "Spring Boot"],
      "created_at": "2025-02-15 10:17:42",
      "updated_at": "2025-03-02 21:01:10"
    }
  ]
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
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 목록 조회 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "카테고리 목록 조회 권한이 없습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden"
}
```

---

### `DELETE /api/v1/admin/qna/categories/{category_id}`
**설명**: 카테고리 삭제 API

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
  "category_id": bigint,
  "category_type": str,
  "migrated_question_count": int
}
```
**Example:**
```json
{
  "category_id": 5,
  "category_type": "medium",
  "migrated_question_count": 128
}
```

#### Error Response
```json
400: {
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
    "error_detail": "유효하지 않은 카테고리 삭제 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "카테고리 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 카테고리를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "기본 카테고리는 삭제할 수 없습니다."
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

### `GET /api/v1/admin/qna/questions`
**설명**: 어드민 질의응답 목록 조회 API

#### Headers
```json
{
    "Authorization": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value"
}
```

#### Query Parameters
```json
{
  "page": int,
  "size": int,
  "search_keyword": str,
  "category_id": bigint,
  "answer_status": str,
  "sort": str
}
```
**Example:**
```json
{
  "page": 1,
  "size": 20,
  "search_keyword": "ORM",
  "category_id": 12,
  "answer_status": "Y",
  "sort": "latest"
}
```

#### Success Response
```json
{
  "page": int,
  "size": int,
  "total_count": int,
  "questions": [
    {
      "question_id": bigint,
      "title": str,
      "category_path": str,
      "content_preview": str,
      "nickname": str,
      "view_count": int,
      "has_answer": bool,
      "created_at": str,
      "updated_at": str
    }
  ]
}
```
**Example:**
```json
{
  "page": 1,
  "size": 20,
  "total_count": 233,
  "questions": [
    {
      "question_id": 10501,
      "title": "Django ORM 역참조는 어떻게 사용하나요?",
      "category_path": "백엔드 > 웹프레임워크 > Django",
      "content_preview": "ForeignKey에 related_name을 지정하면 역참조가 가능합니다...",
      "nickname": "한율_회장",
      "view_count": 132,
      "has_answer": true,
      "created_at": "2025-03-01 10:03:21",
      "updated_at": "2025-03-02 11:20:10"
    }
  ]
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
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 목록 조회 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "질의응답 목록 조회 권한이 없습니다."
  }
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden"
}
```

---

### `GET /api/v1/admin/qna/questions/{question_id}`
**설명**: 어드민 질의응답 상세 조회 API

#### Headers
```json
{
    "Authorization": str
}
```
**Example:**
```json
{
    "Authorization": "Bearer token_value"
}
```

#### Success Response
```json
{
  "question_id": bigint,
  "title": str,
  "content": str,
  "images": [str],
  "author": {
    "profile_img_url": str,
    "nickname": str,
    "course_generation": str
  },
  "view_count": int,
  "has_answer": bool,
  "created_at": str,
  "updated_at": str,
  "answers": [
    {
      "answer_id": bigint,
      "author": {
        "profile_img_url": str,
        "nickname": str,
        "role_title": str,
        "course_generation": str
      },
      "content": str,
      "is_adopted": bool,
      "created_at": str,
      "updated_at": str
    }
  ]
}
```
**Example:**
```json
{
  "question_id": 10501,
  "title": "Django ORM 역참조는 어떻게 사용하나요?",
  "content": "ForeignKey에 related_name을 지정하면 역참조가 가능합니다...",
  "images": [
    "https://cdn.ozcodingschool.com/qna/img_10501_01.png"
  ],
  "author": {
    "profile_img_url": "https://cdn.ozcodingschool.com/profiles/user_123.png",
    "nickname": "한율_회장",
    "course_generation": "초격차 백엔드 14기"
  },
  "view_count": 134,
  "has_answer": true,
  "created_at": "2025-03-01 10:03:21",
  "updated_at": "2025-03-02 11:20:10",
  "answers": [
    {
      "answer_id": 801,
      "author": {
        "profile_img_url": "https://cdn.ozcodingschool.com/profiles/user_ta.png",
        "nickname": "PythonKing",
        "role_title": "초격차 백엔드 14기 조교",
        "course_generation": "초격차 백엔드 14기"
      },
      "content": "post.comment_set.all() 로 접근하면 됩니다.",
      "is_adopted": true,
      "created_at": "2025-03-02 12:10:11",
      "updated_at": "2025-03-02 12:40:08"
    }
  ]
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
}"
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 상세 조회 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "질의응답 상세 조회 권한이 없습니다."
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

### `DELETE /api/v1/admin/qna/questions/{question_id}`
**설명**: 어드민 질의응답 삭제 API

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
  "deleted_answer_count": int,
  "deleted_comment_count": int
}
```
**Example:**
```json
{
  "question_id": 10501,
  "deleted_answer_count": 12,
  "deleted_comment_count": 45
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
}"
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 삭제 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "질의응답 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제할 질문을 찾을 수 없습니다."
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

### `DELETE /api/v1/admin/qna/answers/{answer_id}`
**설명**: 어드민 답변 삭제 API

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
  "answer_id": bigint,
  "deleted_comment_count": int
}
```
**Example:**
```json
{
  "answer_id": 801,
  "deleted_comment_count": 9
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
}"
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 답변 삭제 요청입니다."
  },
  "401": {
    "error_detail": "로그인이 필요합니다."
  },
  "403": {
    "error_detail": "답변 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제할 답변을 찾을 수 없습니다."
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
