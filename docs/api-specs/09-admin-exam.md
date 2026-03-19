# 어드민 - 쪽지시험 관리 (Admin Exam Management)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 시험 CRUD, 문제 등록/수정/삭제, 배포 관리, 응시 내역 관리
> **API 수**: 17개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/api/v1/admin/exams` | 쪽지시험 생성 API |
| `GET` | `/api/v1/admin/exams` | 쪽지시험 목록조회 API |
| `GET` | `/api/v1/admin/exams/{exam_id}` | 쪽지시험 상세 조회 API |
| `PUT` | `/api/v1/admin/exams/{exam_id}` | 쪽지시험 수정 API |
| `DELETE` | `/api/v1/admin/exams/{exam_id}` | 쪽지시험 삭제 API |
| `POST` | `/api/v1/admin/exams/{exam_id}/questions` | 쪽지시험 문제 등록 API |
| `PUT` | `/api/v1/admin/exams/questions/{question_id}` | 쪽지시험 문제 수정 API |
| `DELETE` | `/api/v1/admin/exams/questions/{question_id}` | 쪽지시험 문제 삭제 API |
| `POST` | `/api/v1/admin/exams/deployments` | 쪽지시험 배포 생성 API |
| `GET` | `/api/v1/admin/exams/deployments` | 쪽지시험 배포 목록 조회 API |
| `GET` | `/api/v1/admin/exams/deployments/{deployment_id}` | 쪽지시험 배포 상세 조회 API |
| `PATCH` | `/api/v1/admin/exams/deployments/{deployment_id}` | 쪽지시험 배포 정보 수정 API |
| `PATCH` | `/api/v1/admin/exams/deployments/{deployment_id}/status` | 쪽지시험 배포 on/off API |
| `DELETE` | `/api/v1/admin/exams/deployments/{deployment_id}` | 쪽지시험 배포 삭제 API |
| `GET` | `/api/v1/admin/exams/submissions` | 쪽지시험 응시 내역 목록 조회 API |
| `GET` | `/api/v1/admin/exams/submissions/{submission_id}` | 쪽지시험 응시 내역 상세 조회 API |
| `DELETE` | `/api/v1/admin/exams/submissions/{submission_id}` | 쪽지시험 응시 내역 삭제 API |

## API 상세 명세

### `POST /api/v1/admin/exams`
**설명**: 쪽지시험 생성 API

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
  "title": str,
  "subject_id": bigint,
  "thumbnail_img": binary file (image/jpeg, image/png, image/jpg)
}
```
**Example:**
```json
{
  "title": "Python 기초 문법 테스트",
  "subject_id": 5,
  "thumbnail_img": "<binary image file>"
}
```

#### Success Response
```json
{
  "id": bigint,
  "title": str,
  "subject_id": bigint,
  "thumbnail_img_url": str
}
```
**Example:**
```json
{
  "id": 101,
  "title": "Python 기초 문법 테스트",
  "subject_id": 5,
  "thumbnail_img_url": "https://oz-externship.s3.ap-northeast-2.amazonaws.com/exams/image.png"
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 시험 생성 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 생성 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 과목 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "동일한 이름의 시험이 이미 존재합니다."
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

### `GET /api/v1/admin/exams`
**설명**: 쪽지시험 목록조회 API

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
  "subject_id": bigint,
  "sort": str,
  "order": str
}
```
**Example:**
```json
{
  "page": 1,
  "size": 10,
  "search_keyword": "Python",
  "subject_id": 3,
  "sort": "created_at",
  "order": "desc"
}
```

#### Success Response
```json
{
  "page": int,
  "size": int,
  "total_count": int,
  "exams": [
    {
      "exam_id": bigint,
      "exam_title": str,
      "subject_name": str,
      "question_count": int,
      "submit_count": int,
      "created_at": str,
      "updated_at": str,
      "detail_url": str
    }
  ]
}
```
**Example:**
```json
{
  "page": 1,
  "size": 10,
  "total_count": 42,
  "exams": [
    {
      "id": 101,
      "title": "Python 기본 문법 테스트",
      "subject_name": "Python",
      "question_count": 20,
      "submit_count": 65,
      "created_at": "2025-02-01 13:20:33",
      "updated_at": "2025-02-05 15:10:20",
      "detail_url": "/admin/exams/101"
    }
  ]
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 조회 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 목록 조회 권한이 없습니다."
  },
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
}
```

---

### `GET /api/v1/admin/exams/{exam_id}`
**설명**: 쪽지시험 상세 조회 API

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
  "id": bigint,
  "title": str,
  "subject": {
    "id": int,
    "title": str,
  },
  "questions": [
    {
      "question_id": bigint,
      "type": str,
      "question": str,
      "prompt": str,
      "point": int,
      "options": list[str],
      "correct_answer": any
      "explanation":str
    }
  ],
  "thumbnail_img_url": str,
  "created_at": str,
  "updated_at": str,
}
```
**Example:**
```json
{
  "id": 101,
  "title": "Python 기본 문법 테스트",
  "subject": {
    "id": 1,
    "title": "Python"
  },
  "questions": [
    {
      "id": 301,
      "type": "single_choice",
      "question": "다음 중 Python의 특징으로 가장 알맞은 것은?",
      "prompt": "",
      "point": 10,
      "options": [
        "정적 타이핑 언어",
        "인터프리터 언어",
        "컴파일 방식만을 지원",
        "메모리 직접 관리 필요"
      ],
      "correct_answer": "인터프리터 언어"
      "explanation": "해설"
    }
  ],
  "thumbnail_img_url": "https://oz-externship.s3.ap-northeast-2.amazonaws.com/exams/image.png",
  "created_at": "2025-02-01 13:20:33",
  "updated_at": "2025-02-05 15:10:20",
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

### `PUT /api/v1/admin/exams/{exam_id}`
**설명**: 쪽지시험 수정 API

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
  "title": str,
  "subject_id": bigint,
  "thumbnail_img": binary file (image/jpeg, image/png, image/jpg)
}
```
**Example:**
```json
{
  "title": "Python 심화 문법 테스트",
  "subject_id": 5,
  "thumbnail_img": "binary file (image/jpeg, image/png, image/jpg)"
}
```

#### Success Response
```json
{
  "id": bigint,
  "title": str,
  "subject_id": bigint,
  "thumbnail_img_url": str
}
```
**Example:**
```json
{
  "id": 101,
  "title": "Python 심화 문법 테스트",
  "subject_id": 5,
  "thumbnail_img_url": "https://oz-externship.s3.ap-northeast-2.amazonaws.com/exams/image.png"
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 요청 데이터입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 수정 권한이 없습니다."
  },
  "404": {
    "error_detail": "수정할 쪽지시험 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "동일한 이름의 쪽지시험이 이미 존재합니다."
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

### `DELETE /api/v1/admin/exams/{exam_id}`
**설명**: 쪽지시험 삭제 API

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
  "id": bigint,
}
```
**Example:**
```json
{
  "id": 101,
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제하려는 쪽지시험 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "쪽지시험 삭제 중 충돌이 발생했습니다."
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

### `POST /api/v1/admin/exams/{exam_id}/questions`
**설명**: 쪽지시험 문제 등록 API

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
  "type": str,
  "question": str,
  "prompt": str,
  "options": [str],
  "blank_count": int,
  "correct_answer": any,
  "point": int,
  "explanation": str
}
```
**Example:**
```json
{
  "type": "multiple_choice",
  "question": "다음 중 TypeScript의 특징으로 올바른 것을 모두 고르시오.",
  "prompt": "",
  "options": [
    "정적 타입 검사 지원",
    "런타임 시에만 타입 검사",
    "자바스크립트와 호환됨",
    "브라우저가 직접 TypeScript를 실행함"
  ],
  "blank_count": 0,
  "correct_answer": [
    "정적 타입 검사 지원",
    "자바스크립트와 호환됨"
  ],
  "point": 10,
  "explanation": "TypeScript는 정적 타입 검사 및 자바스크립트 상위 호환 언어입니다."
}
```

#### Success Response
```json
{
  exam_id: bigint,
  type: str,
  question: str,
  prompt: str,
  options: [str] | null,
  blank_count: int | null,
  correct_answer: any,
  point: int,
  explanation: str
}
```
**Example:**
```json
{
  "exam_id": 1,
  "type": "multiple_choice",
  "question": "다음 중 TypeScript의 특징으로 올바른 것을 모두 고르시오.",
  "prompt": "",
  "options": [
    "정적 타입 검사 지원",
    "런타임 시에만 타입 검사",
    "자바스크립트와 호환됨",
    "브라우저가 직접 TypeScript를 실행함"
  ],
  "blank_count": 0,
  "correct_answer": [
    "정적 타입 검사 지원",
    "자바스크립트와 호환됨"
  ],
  "point": 10,
  "explanation": "TypeScript는 정적 타입 검사 및 JS 상위 호환 언어입니다."
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 문제 등록 데이터입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 문제 등록 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 쪽지시험 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "해당 쪽지시험에 등록 가능한 문제 수 또는 총 배점을 초과했습니다."
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

### `PUT /api/v1/admin/exams/questions/{question_id}`
**설명**: 쪽지시험 문제 수정 API

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
  "type": str,
  "question": str,
  "prompt": str,
  "options": [str],
  "blank_count": int,
  "correct_answer": any,
  "point": int,
  "explanation": str
}
```
**Example:**
```json
{
  "type": "ordering",
  "question": "다음 과정을 올바른 순서대로 정렬하세요.",
  "prompt": "",
  "options": [
    "Dockerfile 작성",
    "이미지 빌드",
    "컨테이너 실행",
    "코드 변경 후 재배포"
  ],
  "blank_count": 0,
  "correct_answer": [
    "Dockerfile 작성",
    "이미지 빌드",
    "컨테이너 실행",
    "코드 변경 후 재배포"
  ],
  "point": 10,
  "explanation": "컨테이너 기반 배포 기본 순서입니다."
}
```

#### Success Response
```json
{
  question_id: bigint,
  type: str,
  question: str,
  prompt: str,
  options: [str] | null,
  blank_count: int | null,
  correct_answer: any,
  point: int,
  explanation: str
}
```
**Example:**
```json
{
  "question_id": 25,
  "type": "ordering",
  "question": "다음 과정을 올바른 순서대로 정렬하세요.",
  "prompt": "",
  "options": [
    "Dockerfile 작성",
    "이미지 빌드",
    "컨테이너 실행",
    "코드 변경 후 재배포"
  ],
  "blank_count": 0,
  "correct_answer": [
    "Dockerfile 작성",
    "이미지 빌드",
    "컨테이너 실행",
    "코드 변경 후 재배포"
  ],
  "point": 10,
  "explanation": "컨테이너 기반 배포 기본 순서입니다."
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 문제 수정 데이터입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 문제 수정 권한이 없습니다."
  },
  "404": {
    "error_detail": "수정하려는 문제 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "시험 문제 수 제한 또는 총 배점을 초과하여 문제를 수정할 수 없습니다."
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

### `DELETE /api/v1/admin/exams/questions/{question_id}`
**설명**: 쪽지시험 문제 삭제 API

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
  "exam_id": bigint,
  "question_id": bigint,
}
```
**Example:**
```json
{
  "exam_id": 1,
  "question_id": 25,
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 문제 삭제 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 문제 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제할 문제 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "쪽지시험 문제 삭제 처리 중 충돌이 발생했습니다."
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

### `POST /api/v1/admin/exams/deployments`
**설명**: 쪽지시험 배포 생성 API

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
  "exam_id": bigint,
  "cohort_id": bigint,
  "duration_time": int,
  "open_at": str,
  "close_at": str
}
```
**Example:**
```json
{
  "exam_id": 1,
  "cohort_id": 12,
  "duration_time": 45,
  "open_at": "2025-03-02 10:00:00",
  "close_at": "2025-03-02 12:00:00"
}
```

#### Success Response
```json
{
  "pk": int
}
```
**Example:**
```json
{
  "pk": 1
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 배포 생성 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 배포 생성 권한이 없습니다."
  },
  "404": {
    "error_detail": "배포 대상 과정-기수 또는 시험 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "동일한 조건의 배포가 이미 존재합니다."
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

### `GET /api/v1/admin/exams/deployments`
**설명**: 쪽지시험 배포 목록 조회 API

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
  "subject_id": bigint,
  "cohort_id": bigint,
  "sort": str,
  "order": str
}
```
**Example:**
```json
{
  "page": 1,
  "size": 10,
  "search_keyword": "Python",
  "subject_id": 3,
  "cohort_id": 12,
  "sort": "created_at",
  "order": "desc"
}
```

#### Success Response
```json
{
  "count": int,
  "previous": str | null,
  "next": str | null,
  "results": [
    {
      "id": bigint,
      "submit_count": int,
      "avg_score": float,
      "status": str,
      "exam": {
        "id": int,
        "title": str,
        "thumbnail_img_url": str
      },
      "subject": {
        "id": int,
        "name": str
      },
      "cohort": {
        "id": int,
        "number": int,
        "display": str,
        "course": {
          "id": int,
          "name": str,
          "tag": str
        }
      },
      "created_at": str
    }
  ]
}
```
**Example:**
```json
{
  "count": 2000,
  "previous": "https://api.ozcodingschool.site/api/v1/admin/exams/deployments?page=1&page_size=10",
  "next": null,
  "results": [
    {
      "id": 77,
      "submit_count": 58,
      "avg_score": 72.3,
      "status": "Activated",
      "exam": {
        "id": 101,
        "title": "Python 기본 문법 테스트",
        "thumbnail_img_url": "https://img.com/images/sample.png"
      },
      "subject": {
        "id": 10,
        "name": "Python"
      },
      "cohort": {
        "id": 21,
        "number": 12,
        "display": 백엔드 12기,
        "course": {
          "id": 23,
          "name": "Backend Bootcamp",
          "tag": "BE"
        }
      },
    "created_at": "2025-03-01 14:20:33"
    }
  ]
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 조회 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 배포 목록 조회 권한이 없습니다."
  }
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
}
```

---

### `GET /api/v1/admin/exams/deployments/{deployment_id}`
**설명**: 쪽지시험 배포 상세 조회 API

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
  "id": int,
  "exam_access_url": str,
  "access_code": str,
  "cohort": {
    "id": int,
    "number": int,
    "display": str,
    "course": {
      "id": int,
      "name": str,
      "tag": str
      }
    },
  "submit_count": int,
  "not_submitted_count": int,
  "duration_time": int,
  "open_at": str,
  "close_at": str,
  "created_at": str
  "exam": {
    "id": bigint,
    "title": str,
    "thumbnail_img_url": str
  },
  "subject": {
    "id": int,
    "name": str
  },
}
```
**Example:**
```json
{
  "id": 77,
  "exam_access_url": "https://exam.site/start/77",
  "access_code": "A7Bd9K",
  "cohort": {
    "id": 11,
    "number": 11,
    "display": 백엔드 11기,
    "course": {
      "id": 12,
      "name": "백엔드",
      "tag": "BE"
      }
    },
  "submit_count": 58,
  "not_submitted_count": 12,
  "duration_time": 45,
  "open_at": "2025-03-02 10:00:00",
  "close_at": "2025-03-02 12:00:00",
  "created_at": "2025-03-01 14:20:33"
  "exam": {
    "id": 101,
    "title": "Python 기본 문법 테스트"
    "thumbnail_img_url": "https://img.com/images/sample.png"
  },
  "subject": {
    "id": 32,
    "name": "Python"
  },
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 배포 상세 조회 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 배포 상세 조회 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 배포 정보를 찾을 수 없습니다."
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

### `PATCH /api/v1/admin/exams/deployments/{deployment_id}`
**설명**: 쪽지시험 배포 정보 수정 API

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
    "open_at": str,
    "close_at": str,
    "duration_time": int
}
```
**Example:**
```json
{
  "open_at": "2025-03-02 10:30:00",
  "close_at": "2025-03-02 12:30:00",
  "duration_time": 50
}
```

#### Success Response
```json
{
  "deployment_id": bigint,
  "duration_time": int,
  "open_at": str,
  "close_at": str,
  "updated_at": str
}
```
**Example:**
```json
{
  "deployment_id": 77,
  "duration_time": 50,
  "open_at": "2025-03-02 10:30:00",
  "close_at": "2025-03-02 12:30:00",
  "updated_at": "2025-03-01 16:10:22"
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}
```
**Example:**
```json
400: {
  "error_detail": "유효하지 않은 배포 수정 요청입니다."
}

401: {
  "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
  "error_detail": "쪽지시험 배포 수정 권한이 없습니다."
}

404: {
  "error_detail": "수정할 배포 정보를 찾을 수 없습니다."
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
}
```

---

### `PATCH /api/v1/admin/exams/deployments/{deployment_id}/status`
**설명**: 쪽지시험 배포 on/off API

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
  "status": str
}
```
**Example:**
```json
{
  "status": "deactivated"
}
```

#### Success Response
```json
{
  "deployment_id": bigint,
  "status": str
}
```
**Example:**
```json
{
  "deployment_id": 77,
  "status": "deactivated"
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 배포 상태 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 배포 상태 변경 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 배포 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "배포 상태 변경 중 충돌이 발생했습니다."
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

### `DELETE /api/v1/admin/exams/deployments/{deployment_id}`
**설명**: 쪽지시험 배포 삭제 API

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
  "deployment_id": bigint
}
```
**Example:**
```json
{
  "deployment_id": 77
}
```

#### Error Response
```json
400: {
    "error_detail": str
}

401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

409: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 배포 삭제 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "배포 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제할 배포 정보를 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "배포 삭제 처리 중 충돌이 발생했습니다."
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

### `GET /api/v1/admin/exams/submissions`
**설명**: 쪽지시험 응시 내역 목록 조회 API

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
  "cohort_id": bigint,
  "exam_id": bigint,
  "sort": str,
  "order": str
}
```
**Example:**
```json
{
  "page": 1,
  "size": 10,
  "search_keyword": "한율",
  "cohort_id": 12,
  "exam_id": 101,
  "sort": "score",
  "order": "desc"
}
```

#### Success Response
```json
{
  "count": int,
  "previous": int,
  "next": int,
  "results": [
    {
      "submission_id": bigint,
      "nickname": str,
      "name": str,
      "course_name": str,
      "cohort_number": int,
      "exam_title": str,
      "subject_name": str,
      "score": int,
      "cheating_count": int,
      "started_at": str,
      "finished_at": str
    }
  ]
}
```
**Example:**
```json
{
  "count": 120,
  "previous": null,
  "next": "https://api.ozcodingschool.site/api/v1/admin/exams/submissions?page_size=10&page=2",
  "results": [
    {
      "submission_id": 5501,
      "nickname": "한율_회장",
      "name": "한율",
      "course_name": "초격차 백엔드 부트캠프",
      "cohort_number": 14,
      "exam_title": "Python 기본 문법 테스트",
      "subject_name": "Python",
      "score": 87,
      "cheating_count": 0,
      "started_at": "2025-03-01 10:03:12",
      "finished_at": "2025-03-01 10:32:19"
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
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 조회 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 응시 내역 조회 권한이 없습니다."
  },
  "404": {
    "error_detail": "조회된 응시 내역이 없습니다."
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

### `GET /api/v1/admin/exams/submissions/{submission_id}`
**설명**: 쪽지시험 응시 내역 상세 조회 API

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
  "exam": {
    "exam_title": str,
    "subject_name": str,
    "duration_time": int,
    "open_at": str,
    "close_at": str
  },
  "student": {
    "nickname": str,
    "name": str,
    "course_name": str,
    "cohort_number": int
  },
  "result": {
    "score": int,
    "correct_answer_count": int,
    "total_question_count": int,
    "cheating_count": int,
    "elapsed_time": int
  },
  "questions": [
    {
      "id": bigint,
      "number": int,
      "type": str,
      "question": str,
      "prompt": str,
      "options": [str],
      "point": int,
      "answer": any,
      "submitted_answer": any,
      "is_correct": bool,
      "explanation": str
    }
  ]
}
```
**Example:**
```json
{
  "exam": {
    "exam_title": "Python 기본 문법 테스트",
    "subject_name": "Python",
    "duration_time": 45,
    "open_at": "2025-03-02 10:00:00",
    "close_at": "2025-03-02 12:00:00"
  },
  "student": {
    "nickname": "한율_회장",
    "name": "한율",
    "course_name": "초격차 백엔드 부트캠프",
    "cohort_number": 14
  },
  "result": {
    "score": 87,
    "correct_answer_count": 8,
    "total_question_count": 10,
    "cheating_count": 0,
    "elapsed_time": 29
  },
  "questions": [
    {
      "id": 1,
      "number": 1,
      "type": "multiple_choice",
      "question": "다음 중 Python의 특징으로 가장 알맞은 것은?",
      "prompt": null,
      "options": [
        "인터프리터 언어이다.",
        "정적 타입 언어이다.",
        "메모리 수동 관리가 필요하다."
      ],
      "point": 10,
      "answer": "인터프리터 언어이다.",
      "submitted_answer": "인터프리터 언어이다.",
      "is_correct": true,
      "explanation": "Python은 인터프리터 방식으로 동작하는 언어입니다. 동적 타입 언어이며, 자동 메모리 관리(가비지 컬렉션)을 제공합니다."
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
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "유효하지 않은 상세 조회 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 응시 상세 조회 권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 응시 내역을 찾을 수 없습니다."
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

### `DELETE /api/v1/admin/exams/submissions/{submission_id}`
**설명**: 쪽지시험 응시 내역 삭제 API

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
  "submission_id": bigint
}
```
**Example:**
```json
{
  "submission_id": 5501
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
    "error_detail": "유효하지 않은 응시 내역 삭제 요청입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "쪽지시험 응시 내역 삭제 권한이 없습니다."
  },
  "404": {
    "error_detail": "삭제할 응시 내역을 찾을 수 없습니다."
  },
  "409": {
    "error_detail": "응시 내역 삭제 처리 중 충돌이 발생했습니다."
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
