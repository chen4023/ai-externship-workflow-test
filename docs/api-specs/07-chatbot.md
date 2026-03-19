# AI 챗봇 (Chatbot)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 챗봇 세션 관리, AI 응답 생성, 대화 내역 조회/초기화
> **API 수**: 6개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/api/v1/chatbot/sessions` | AI 챗봇 세션 생성 API |
| `GET` | `/api/v1/chatbot/sessions` | AI 챗봇 세션 조회 API |
| `DELETE` | `/api/v1/chatbot/sessions/{session_id}` | AI 챗봇 세션 삭제 API |
| `POST` | `/api/v1/chatbot/sessions/{session_id}/completions` | AI 챗봇 응답 생성 API |
| `GET` | `/api/v1/chatbot/sessions/{session_id}/completions
/api/v1/chatbot/sessions/{session_id}/completions/?cursor={cursor}&page_size={page_size}` | AI 챗봇 대화내역 조회 API |
| `DELETE` | `/api/v1/chatbot/sessions/{session_id}/completions` | AI 챗봇 대화내역 초기화 API |

## API 상세 명세

### `POST /api/v1/chatbot/sessions`
**설명**: AI 챗봇 세션 생성 API

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

#### Request Body
```json
{
  "user": int,
  "question": int,
  "using_model": str
}
```
**Example:**
```json
{
  "user": 10
  "question": 1,
  "title": "Django ORM 질문"
  "using_model": "gemini-2.5-flash"
}
```

#### Success Response
```json
200: {
  "id": int,
  "user": int,
  "question": int,
  "title": str,
  "using_model": str,
  "created_at": datetime,
  "updated_at": datetime
}
```
**Example:**
```json
200: {
  "id": 56,
  "user": 1,
  "question": 1,
  "title": "파이썬 불변객체",
  "using_model": "gemini",
  "created_at": "2025-12-11T13:37:48.574687",
  "updated_at": "2025-12-11T13:37:48.574693"
}
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  400: {
    "error_detail": "유효하지 않은 세션 생성 요청입니다."
  },
  401: {
    "error_detail": "로그인한 사용자만 세션 생성을 할 수 있습니다."
  },
  403: {
    "error_detail": "세션 생성 권한이 없습니다."
  }
}
```

#### Status Codes
```
{
  200: "OK",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden"
}
```

---

### `GET /api/v1/chatbot/sessions`
**설명**: AI 챗봇 세션 조회 API

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
  "cursor": str,
  "page_size": int,
}
page_size default = 10
```
**Example:**
```json
{
  "cursor": "sdvknmnqls",
  "page_size": 10,
}
```

#### Success Response
```json
200: {
  "next": str | null,
  "previous": str | null,
  "result": [
    {
      "id": int,
      "user": int,
      "title": str,
      "using_model": str,
      "created_at": datettime,
      "updated_at"; datetime,
    }
  ]
}
```
**Example:**
```json
200: {
"next": "https://api.ozcodingschool.site/api/v1/chatbot/sessions",
"previous": None,
"results": [
    {
        "id": 2,
        "user": 1,
        "question_id": 1,
        "title": "python try-exception 질문",
        "using_model": "GEMINI",
        "created_at": "2025-01-01T01:01:01+09:00",
    },
    {
        "id": 54,
        "user": 10,
        "question": 99,
        "title": "Django ORM 질문",
        "using_model": "gemini-2.5-flash",
        "created_at": "2025-01-14T10:00:00+09:00",
        "updated_at": "2025-01-14T10:30:00+09:00",
    },
    ],
}
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  401: {
    "error_detail": "로그인한 사용자만 조회할 수 있습니다."
  },
  403: {
    "error_detail": "조회 권한이 없습니다."
  },
  404: {
    "error_detail": "등록된 세션이(가) 없습니다."
  },
}
```

#### Status Codes
```
{
  201 "Created",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found"
}
```

---

### `DELETE /api/v1/chatbot/sessions/{session_id}`
**설명**: AI 챗봇 세션 삭제 API

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
  "session_id": int
}
```
**Example:**
```json
{
  "session_id": 11
}
```

#### Success Response
```json
None
```
**Example:**
```json
None
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  401: {
    "error_detail": "로그인한 사용자만 삭제할 수 있습니다."
  },
  403: {
    "error_detail": "삭제 권한이 없습니다."
  },
  404: {
    "error_detail": "등록된 세션이(가) 없습니다."
  },
}
```

#### Status Codes
```
{
  204 "No Content",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found"
}
```

---

### `POST /api/v1/chatbot/sessions/{session_id}/completions`
**설명**: AI 챗봇 응답 생성 API

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

#### Request Body
```json
{
  "message": 
    type: str,
    required: True
}
```
**Example:**
```json
{
  "message": "아까 질문했던 거 좀더 구체적으로 알려줘"
}
```

#### Success Response
```json
201:
data: {  
  "content": str,
}
```
**Example:**
```json
data: {"content": "select_related는"}\n\n
data: {"content": " JOIN을 사용하여"}\n\n
data: {"content": " 쿼리를 최적화합니다."}\n\n

모든 청크 전송 후:
data: [DONE]\n\n
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  400: {
      "message": "이 필드는 필수 항목입니다."
      or
      "message": "이 필드는 blank일 수 없습니다."
  }
  401: {
    "error_detail": "로그인한 사용자만 채팅할 수 있습니다."
  },
  404: {
    "error_detail": "챗봇 세션이 존재하지 않습니다."
  },
}
```

#### Status Codes
```
{
  201: "Created"
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found"
}
```

---

### `GET /api/v1/chatbot/sessions/{session_id}/completions
/api/v1/chatbot/sessions/{session_id}/completions/?cursor={cursor}&page_size={page_size}`
**설명**: AI 챗봇 대화내역 조회 API

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
  "cursor": str,
  "page_size": int,
}
```
**Example:**
```json
{
  "cursor": "sdvknmnqls",
  "page_size": 10,
}
```

#### Success Response
```json
200: 
{
  "next": str | null
  "previous": str | null,
  "results": [
    {
      "id": int,
      "message": str,
      "role": str (user | assistant),
      "created_at": datetime
    }
  ]
}
```
**Example:**
```json
200: {
  "next": "https://api.ozcodingschool.site/api/v1/chatbot/session/{session_id}/completions?cursor=sdasddasj1ka",
  "previous": null,
  "result": [
    {
      "id": 502,
      "message": "select_related는 JOIN을 사용하여 쿼리를 최적화합니다...",
      "role": "assistant",
      "created_at": "2025-01-15T14:30:05+09:00"
    }
    {
      "id": 501,
      "message": "Django에서 select_related와 prefetch_related 차이점 알려줘",
      "role": "user",
      "created_at": "2025-01-15T14:30:00+09:00"
    }
  ]
}
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  401: {
    "error_detail": "로그인한 사용자만 조회할 수 있습니다."
  },
  404: {
    "error_detail": "챗봇 세션이 존재하지 않습니다."
  }
}
```

#### Status Codes
```
{
  200: "OK",
  401: "Unauthorized",
  404: "Not Found"
}
```

---

### `DELETE /api/v1/chatbot/sessions/{session_id}/completions`
**설명**: AI 챗봇 대화내역 초기화 API

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
None
```
**Example:**
```json
None
빈 응답 - 세션은 유지, 메세지만 삭제
```

#### Error Response
```json
{
  "error_detail": str
}
```
**Example:**
```json
{
  401: {
    "error_detail": "로그인한 사용자만 삭제할 수 있습니다."
  },
  "403": {
    "error_detail": "삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "챗봇 세션이 존재하지 않습니다."
  }
}
```

#### Status Codes
```
{
  204: "No Content",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found"
}
```

---
