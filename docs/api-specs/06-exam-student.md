# 쪽지시험 - 수강생 (Exam Student)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 시험 목록 조회, 참가 코드 검증, 문제 풀이, 상태 확인, 제출, 결과 확인
> **API 수**: 6개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `GET` | `/api/v1/exams/deployments` | 쪽지시험 목록 조회 API |
| `POST` | `/api/v1/exams/deployments/{deployment_id}/check-code` | 쪽지시험 참가 코드 검증 API |
| `GET` | `/api/v1/exams/deplayments/{deployment_id}` | 쪽지시험 응시 문제풀이 API |
| `GET` | `/api/v1/exams/deplayments/{deployment_id}/status` | 쪽지시험 상태 확인 API |
| `POST` | `/api/v1/exams/submissions` | 쪽지시험 제출 API |
| `GET` | `/api/v1/exams/submissions/{subbmission_id}` | 쪽지시험 결과 확인 API |

## API 상세 명세

### `GET /api/v1/exams/deployments`
**설명**: 쪽지시험 목록 조회 API

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
  "page": {
    "type": "int",
    "required": false,
    "default": 1
  },
  "status": {
    "type": "string",
    "required": false,
    "enum": ["all", "done", "pending"],
    "default": "all"
  }
}
```
**Example:**
```json
{
  "page": 1,
  "status": "pending"
}
```

#### Success Response
```json
{
  page: int,
  has_next: bool,
  results: [
    {
      id: bigint,  
      submission_id: bigint | null
      exam: {
        id: bigint,
        title: str,    
        thumbnail_img_url: str, 
        subject: {
          id: bigint,
          title: str,  
          thumbnail_img_url: str | null
        }
      },
      question_count: int,
      total_score: int,     
      exam_info: {
        status: enum(done, pending),
        score: int | null,     
        correct_answer_count: int | null
      },
      is_done: bool,
      duration_time: int 
    }
  ]
}
```
**Example:**
```json
{
  "page": 1,
  "has_next": true,
  "results": [
    {
      "id": 101,
      "submission_id": 333,
      "exam": {
        "id": 1,
        "title": "HTML 기초",
        "thumbnail_img_url": "default_img_url",
        "subject": {
          "id": 10,
          "title": "HTML",
          "thumbnail_img_url": "https://cdn.ozcoding/html.png"
        }
      },
      "question_count": 10,
      "total_score": 100,
      "exam_info": {
        "status": "done",
        "score": 80,
        "correct_answer_count": 8
      },
      "is_done": true,
      "duration_time": 20
    }
  ]
}
```

#### Error Response
```json
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
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}

404: {
    "error_detail": "사용자 정보를 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden,
    404: Not Found
}
```

---

### `POST /api/v1/exams/deployments/{deployment_id}/check-code`
**설명**: 쪽지시험 참가 코드 검증 API

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
  "code": str,
}
```
**Example:**
```json
{
  "code": "124312"
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

423: {
    "error_detail": str
}
```
**Example:**
```json
{
  "400": {
    "error_detail": "응시 코드가 일치하지 않습니다. "
  },
  "400": {
    "error_detail": {
      "code": "이 필드는 필수 항목입니다."
    }
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "시험에 응시할 권한이 없습니다."
  },
  "404": {
    "error_detail": "배포 정보를 찾을 수 없습니다."
  },
  "423": {
    "error_detail": "아직 응시할 수 없습니다."
  }
}
```

#### Status Codes
```
{
  "204": "No Content",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "423": "Locked"
}
```

---

### `GET /api/v1/exams/deplayments/{deployment_id}`
**설명**: 쪽지시험 응시 문제풀이 API

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
  "deployment_id": {
    "type": "int",
    "required": true
  }
}
```
**Example:**
```json
{
  "deployment_id": 21
}
```

#### Success Response
```json
{
  exam_id: bigint,               
  exam_name: str,              
  duration_time: int,           
  elapsed_time: int,            
  cheating_count: int,          
  questions: [
    {
      question_id: bigint,      
      number: int,               
      type: enum(
        single_choice,
        multiple_choice,
        ox,
        short_answer,
        ordering,
        fill_blank
      ),
      question: str,         
      point: int,            
      prompt: str | null,        
      blank_count: int | null,   
      options: [str] | null,  
      answer_input: str | [str] | null
    }
  ]
}
```
**Example:**
```json
{
  "exam_id": 1,
  "exam_name": "TypeScript 기본 문법 테스트",
  "duration_time": 30,
  "elapsed_time": 0,
  "cheating_count": 0,
  "questions": [
    {
      "question_id": 1,
      "number": 1,
      "type": "single_choice",
      "question": "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
      "point": 10,
      "prompt": null,
      "blank_count": null,
      "options": [
        "상위 타입 값을 하위 타입 변수에 할당",
        "하위 타입 값을 상위 타입 변수에 할당",
        "서로소 유니온 타입 간 값은 일부 유니온 타입 변수에 할당",
        "하위 타입 값을 상위 타입 변수에 할당"
      ],
      "answer_input": null
    },
    {
      "question_id": 5,
      "number": 5,
      "type": "fill_blank",
      "question": "다음 빈칸을 채우세요.",
      "point": 10,
      "prompt": "변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을 __ 이라고 한다. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 __ 이라고 부른다.",
      "blank_count": 2,
      "options": null,
      "answer_input": ["", ""]
    }
  ]
}
```

#### Error Response
```json
401: {
    "error_detail": str
}

403: {
    "error_detail": str
}

404: {
    "error_detail": str
}

410: {
    "error_detail": str
}
```
**Example:**
```json
401: {
  "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
403: {
  "error_detail": "권한이 없습니다."
}
404: {
  "error_detail": "해당 시험 정보를 찾을 수 없습니다."
}
410: {
  "error_detail": "시험이 종료되었습니다."
}
```

#### Status Codes
```
{
  "200": "OK",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "410": "Gone"
}
```

---

### `GET /api/v1/exams/deplayments/{deployment_id}/status`
**설명**: 쪽지시험 상태 확인 API

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
  "exam_status": str,
  "force_submit": bool
}
```
**Example:**
```json
{
  "exam_status": "activated",
  "force_submit": false
}

{  // 종료케이스 (비공개, 종료, 시간초과, 관리자 비활성화)
  "exam_status": "closed",
  "force_submit": true
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

410: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": "유효하지 않은 시험 응시 세션입니다."
  },
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  403: {
    "error_detail": "권한이 없습니다."
  },
  404: {
    "error_detail": "해당 시험 정보를 찾을 수 없습니다."
  },
  410: {
    "error_detail": "시험이 이미 종료되었습니다."
  }
```

#### Status Codes
```
{
  "200": "OK",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "410": "Gone"
}
```

---

### `POST /api/v1/exams/submissions`
**설명**: 쪽지시험 제출 API

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
  "deployment_id": int,
  "started_at": str,
  "cheating_count": int,
  "answers": [
    {
      "question_id": bigint,
      "type": str,
      "submitted_answer": any
    }
  ]
}
```
**Example:**
```json
{
  "deployment_id": 1,
  "started_at": "2025-02-01T11:20:00",
  "cheating_count": 0,
  "answers": [
    {
      "question_id": 1,
      "type": "single_choice",
      "submitted_answer": "하위 타입 값을 상위 타입 변수에 할당"
    },
    {
      "question_id": 2,
      "type": "multiple_choice",
      "submitted_answer": [
        "정적 타입 검사 지원",
        "자바스크립트와 호환됨",
        "인터페이스와 제네릭을 지원함"
      ]
    },
    {
      "question_id": 3,
      "type": "short_answer",
      "submitted_answer": "하위 타입을 상위 타입 변수에 할당"
    },
    {
      "question_id": 5,
      "type": "fill_blank",
      "submitted_answer": [
        "타입 주석",
        "타입 정의"
      ]
    },
    {
      "question_id": 6,
      "type": "ox",
      "submitted_answer": "O"
    },
    {
      "question_id": 7,
      "type": "ordering",
      "submitted_answer": [
        "Typescript 파일 작성",
        "Transpile 작업 실행",
        "자바스크립트로 변환",
        "컴파일 결과 실행"
      ]
    }
  ]
}
```

#### Success Response
```json
{
  "submission_id": bigint,
  "score": int,
  "correct_answer_count": int,
  "redirect_url": str
}
```
**Example:**
```json
{
  "submission_id": 350,
  "score": 85,
  "correct_answer_count": 17,
  "redirect_url": "/exam/result/350"
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
400: {
    "error_detail": "유효하지 않은 시험 응시 세션입니다."
  },
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  403: {
    "error_detail": "권한이 없습니다."
  },
  404: {
    "error_detail": "해당 시험 정보를 찾을 수 없습니다."
  },
  409: {
    "error_detail": "이미 제출된 시험입니다."
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

### `GET /api/v1/exams/submissions/{subbmission_id}`
**설명**: 쪽지시험 결과 확인 API

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
  "id": 0,
  "submitter_id": 0,
  "deployment_id": 0,
  "exam": {
    "id": 0,
    "title": "string",
    "thumbnail_img_url": "string"
  },
  "questions": [
    {
      "id": int,
      "question": "string",
      "prompt": "string",
      "blank_count": int,
      "options": [
        "string"
      ],
      "type": "single_choice",
      "answer": [
        "string"
      ],
      "point": int,
      "explanation": "string",
      "is_correct": bool,
      "submitted_answer": [
        "string"
      ]
    }
  ],
  "cheating_count": int,
  "total_score": int,
  "correct_answer_count": int,
  "elapsed_time": int,
  "started_at": "string",
  "submitted_at": "string"
}
```
**Example:**
```json
{
  "id": 3,
  "submitter_id": 5,
  "deployment_id": 8,
  "exam": {
    "id": 1,
    "title": "중간고사",
    "thumbnail_img_url": "https://img.com"
  },
  "questions": [
    {
      "id": 3,
      "question": "배고픈 사람은?",
      "prompt": "string",
      "blank_count": 0,
      "options": [
        "string"
      ],
      "type": "single_choice",
      "answer": [
        "나"
      ],
      "point": 10,
      "explanation": "아임 스틸 헝그리",
      "is_correct": true,
      "submitted_answer": [
        "나"
      ]
    }
  ],
  "cheating_count": 0,
  "total_score": 10,
  "correct_answer_count": 1,
  "elapsed_time": 15,
  "started_at": "2025-12-31T14:18:40.762Z",
  "submitted_at": "2025-12-31T14:33:40.762Z"
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
    "error_detail": "유효하지 않은 시험 응시 세션입니다."
  },
  "401": {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
  },
  "403": {
    "error_detail": "권한이 없습니다."
  },
  "404": {
    "error_detail": "해당 시험 정보를 찾을 수 없습니다."
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
  "404": "Not Found"
}
```

---
