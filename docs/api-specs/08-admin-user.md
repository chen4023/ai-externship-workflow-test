# 어드민 - 회원/수강생 관리 (Admin User Management)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 회원 CRUD, 권한 변경, 수강생 목록, 등록 요청 승인/거절, 탈퇴 관리, 통계 분석
> **API 수**: 16개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `GET` | `api/v1/admin/accounts` | 어드민 페이지 회원 목록 조회 API |
| `GET` | `api/v1/admin/accounts/{account_id}` | 어드민 페이지 회원 정보 상세 조회 API |
| `PATCH` | `api/v1/admin/accounts/{account_id}` | 어드민 페이지 회원 정보 수정 API |
| `DELETE` | `api/v1/admin/accounts/{account_id}` | 어드민 페이지 회원 정보 삭제 API |
| `PATCH` | `api/v1/admin/accounts/{account_id}/role` | 어드민 페이지 권한 변경 API |
| `GET` | `api/v1/admin/students` | 어드민 페이지 수강생 목록 조회 API |
| `GET` | `api/v1/admin/student-enrollments` | 어드민 페이지
수강생 등록 요청 목록 조회 API |
| `POST` | `api/v1/admin/student-enrollments/accept` | 어드민 페이지
수강생 등록 요청 승인 API |
| `POST` | `api/v1/admin/student-enrollments/reject` | 어드민 페이지
수강생 등록 요청 거절 API |
| `GET` | `api/v1/admin/withdrawals` | 어드민 페이지 회원 탈퇴 내역 목록 조회 API |
| `GET` | `api/v1/admin/withdrawals/{withdrawal_id}` | 어드민 페이지 회원 탈퇴 내역 상세 조회 API |
| `DELETE` | `api/v1/admin/withdrawals/{withdrawal_id}` | 어드민 페이지 탈퇴 취소 API |
| `GET` | `api/v1/admin/analytics/withdrawals/trends` | 어드민 페이지 회원탈퇴 추세 분석 API |
| `GET` | `api/v1/admin/analytics/withdrawal-reasons/counts` | 어드민 페이지 전체 기간 회원 탈퇴 사유별 갯수 API |
| `GET` | `api/v1/admin/analytics/withdrawal-reasons/stats/monthly` | 어드민 페이지 월별 회원 탈퇴 사유 분석 API |
| `GET` | `api/v1/admin/analytics/student-enrollments/trends` | 어드민 페이지 수강 등록 추세 분석 API |

## API 상세 명세

### `GET api/v1/admin/accounts`
**설명**: 어드민 페이지 회원 목록 조회 API

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
        type: int,
        required: False,
    },
    "page_size": {
        type: int,
        required: False,
    }
    "search": {
        type: str,
        required: False,
    },
    "status": {
        type: enum(
            "activated",
            "deactivated",
            "withdrew"
        ),
        required: False,
    },
    "role": {
        type: enum(
             "admin", 
             "staff", 
             "user", 
             "student"
        ),
        required: False,
    }
}
```
**Example:**
```json
{
    "page": 1,
    "page_size": 10,
    "search": "test",
    "status": "active",
    "role": "user"
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | null,
    "previous": str | null,
    "results": [
        {
            "id": int,
            "email": str,
            "nickname": str,
            "name": str,
            "birthday": str,
            "status": enum("active", "inactive", "withdrew"),
            "role": enum("user", "staff", "admin", "student"),
            "created_at": datetime
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 4018,
    "next": "http://api.ozcoding.site/api/v1/admin/accounts?page=1&page_size=10",
    "previous": null,
    "results": [
        {
            "id": 1,
            "email": "user@example.com",
            "nickname": "string",
            "name": "string",
            "birthday": "2025-11-20",
            "status": "active",
            "role": "user",
            "created_at": "2025-10-30T14:01:57.505250+09:00"
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/accounts/{account_id}`
**설명**: 어드민 페이지 회원 정보 상세 조회 API

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
200: {
    "id": int,
    "email": str,
    "nickname": str,
    "name": str,
    "phone_number": str,
    "birthday": str,
    "gender": enum("M","F")
    "status": enum("active", "inactive", "withdrew"),
    "role": enum("user", "staff", "admin", "student"),
    "profile_img_url": str,
    "assigned_courses": [
        {
            "course": {
                "id": int,
                "name": str,
                "tag": str
            },
            "cohort": {
                "id": int,
                "number": int,
                "status": enum(
                    "PENDING",
                    "IN_PROGRESS",
                    "COMPLETED"
                ),
                "start_date": date,
                "end_date": date,
            }
        }
    ],
    "created_at": datetime
}
```
**Example:**
```json
200: {
    "id": 1,
    "email": "user@example.com",
    "nickname": "testuser",
    "name": "홍길동",
    "phone_number": "01000000001",
    "birthday": "1998-08-29",
    "gender": "M",
    "status": "active",
    "role": "user",
    "profile_img_url": "https://example.com/images/profiles/image.png",
    "assigned_courses": [
        {
            "course": {
                "id": 1,
                "name": "초격차 백엔드 부트캠프",
                "tag": "BE"
            },
            "cohort": {
                "id": 1,
                "number": 1,
                "status": "PENDING",
                "start_date": "2025-10-30",
                "end_date": "2026-04-28",
            }
        }
    ],
    "created_at": "2025-10-30T14:01:57.505250+09:00"
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

### `PATCH api/v1/admin/accounts/{account_id}`
**설명**: 어드민 페이지 회원 정보 수정 API

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
    "nickname": {
        type: str,
        required: false,
    },
    "name": {
        type: str,
        required: false,
    },
    "phone_number": {
        type: str,
        format: r"\+\d{11}",
        required: false,
    },
    "birthday": {
        type: date,
        format: "YYYY-MM-DD",
        required: false,
    },
    "gender": {
        type: enum("M", "F"),
        required: false,
    },
    "profile_img_url": {
        type: url,
        required: false
    }
}
```
**Example:**
```json
{
    "nickname": "testuser",
    "name": "홍길동",
    "phone_number": "01000000001",
    "birthday": "1998-08-29",
    "gender": "M",
    "profile_img_url": "https://example.com/images/profiles/image.png"
}
```

#### Success Response
```json
200: {
    "id": int,
    "email": str,
    "nickname": str,
    "name": str,
    "phone_number": str,
    "birthday": str,
    "gender": enum("M", "F")
    "profile_img_url": str,
    "updated_at": datetime,
}
```
**Example:**
```json
{
    "id": 1,
    "email": "user@example.com",
    "nickname": "testuser",
    "name": "홍길동",
    "phone_number": "01000000001",
    "birthday": "1998-08-29",
    "gender" : "MALE"
    "profile_img_url": "https://example.com/images/profiles/image.png",
    "updated_at": "2025-10-30T14:01:57.505250+09:00"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
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
    "error_detail": {
      "phone_number": [
        "11자리 숫자로 구성된 포맷이어야 합니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}

404: {
    "error_detail": "사용자 정보를 찾을 수 없습니다."
}

409: {
    "error_detail": "휴대폰 번호 중복으로 인하여 요청 처리에 실패하였습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized,
    403: Forbidden,
    404: Not Found,
    409: Conflict
}
```

---

### `DELETE api/v1/admin/accounts/{account_id}`
**설명**: 어드민 페이지 회원 정보 삭제 API

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
200: {
    "detail": str
}
```
**Example:**
```json
200: {
    "detail": "유저 데이터가 삭제되었습니다. - pk: 1"
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

### `PATCH api/v1/admin/accounts/{account_id}/role`
**설명**: 어드민 페이지 권한 변경 API

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
    "role": {
        type: enum(
            "USER",
            "TA",
            "OM",
            "LC",
            "ADMIN",
            "STUDENT"
        ),
        required: True
    },
    "cohort_id": {
        type: int,
        required: False
    },
    "assgined_courses": {
        type: list[int],
        required: False
    }
}
```
**Example:**
```json
- 일반유저, 어드민 권한 변경 시 
{
    "role": "ADMIN" or "USER"
}

- 조교, 수강생 권한 변경 시
{
    "role": "TA" or "STUDENT",
    "cohort": 1
}

- 러닝코치, 운영매니저 권한 변경 시
{
    "role": "OM" or "LC",
    "assigned_courses": [1, 2, 3]
}
```

#### Success Response
```json
200: {
    "detail": str
}
```
**Example:**
```json
200: {
    "detail": "권한이 변경되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
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
    "error_detail": {
      "cohort": [
        "조교 권한으로 변경 시 필수 필드입니다."
      ]
    }
}

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
    400: Bad Request,
    401: Unauthorized,
    403: Forbidden,
    404: Not Found
}
```

---

### `GET api/v1/admin/students`
**설명**: 어드민 페이지 수강생 목록 조회 API

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
        type: int,
        required: False,
    },
    "page_size": {
        type: int,
        required: False,
    }
    "search": {
        type: str,
        required: False,
    },
    "status": {
        type: enum(
            "activated",
            "deactivated",
            "withdrew"
        ),
        required: False,
    }
}
```
**Example:**
```json
{
    "page": 1,
    "page_size": 10,
    "search": "test",
    "status": "activated",
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | null,
    "previous": str | null,
    "results": [
        {
            "id": int,
            "email": str,
            "nickname": str,
            "name": str,
            "phone_number": str,
            "birthday": str,
            "status": enum(
                "ACTIVATED",
                "DEACTIVATED",
                "WITHDREW"
            ),
            "role": enum(
                "U",
                "TA",
                "OM",
                "ADMIN",
                "ST"
            ),
            "in_progress_course": {
                "cohort": {
                    "id": int,
                    "number": int
                },
                "course": {
                    "id": int,
                    "name": str,
                    "tag": str
                }
            },
            "created_at": datetime
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "email": "user@exmaple.com",
            "nickname": "testuser",
            "name": "홍길동",
            "phone_number": "01000000001",
            "birthday": "1998-08-29",
            "status": "active",
            "role": "student",
            "in_progress_course": {
                "cohort": {
                    "id": 1,
                    "number": 1
                },
                "course": {
                    "id": 1,
                    "name": "초격차 백엔드 부트캠프",
                    "tag": "BE"
                }
            },
            "created_at": "2025-10-30T14:01:57.505250+09:00"
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/student-enrollments`
**설명**: 어드민 페이지
수강생 등록 요청 목록 조회 API

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
        type: int,
        required: False,
    },
    "page_size": {
        type: int,
        required: False,
    }
    "search": {
        type: str,
        required: False,
    },
    "status": {
        type: enum(
            "accpeted",
            "rejected",
            "pending",
            "canceled",
        ),
        required: False
    },
}
```
**Example:**
```json
{
    "page": 1,
    "page_size": 10,
    "search": "test",
    "status": "accepted"
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | null,
    "previous": str | null,
    "results": [
        {
            "id": int,
            "user": {
                "id": int,
                "email": str,
                "name": str,
                "birthday": str,
                "gender": enum("M", "F")
            },
            "cohort": {
                "id": int,
                "number": int
            },
            "course": {
                "id": int,
                "name": str,
                "tag": str
            },
            "status": enum(
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "CANCELED"
            ),
            "created_at": datetime
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 123,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "email": "user@example.com",
                "name": "홍길동",
                "birthday": "1998-08-29",
                "gender": "M"
            },
            "cohort": {
                "id": 1,
                "number": 1
            },
            "course": {
                "id": 1,
                "name": "초격차 백엔드 부트캠프",
                "tag": "BE"
            },
            "status": "ACCEPTED",
            "created_at": "2025-10-30T14:01:57.505250+09:00"
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `POST api/v1/admin/student-enrollments/accept`
**설명**: 어드민 페이지
수강생 등록 요청 승인 API

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
    "enrollments": {
        type: list[int],
        required: True
    }
}
```
**Example:**
```json
{
    "enrollments": [1, 2, 3, 4]
}
```

#### Success Response
```json
200: {
    "detail": str
}
```
**Example:**
```json
200: {
    "detail": "수강생 등록 신청들에 대한 승인 요청이 처리되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
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
400: {
    "error_detail": {
      "enrollments": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized,
    403: Forbidden,
}
```

---

### `POST api/v1/admin/student-enrollments/reject`
**설명**: 어드민 페이지
수강생 등록 요청 거절 API

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
    "enrollments": {
        type: list[int],
        required: True
    }
}
```
**Example:**
```json
{
    "enrollments": [1, 2, 3, 4]
}
```

#### Success Response
```json
200: {
    "detail": str
}
```
**Example:**
```json
200: {
    "detail": "수강생 등록 신청들에 대한 거절 요청이 처리되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
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
400: {
    "error_detail": {
      "enrollments": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized,
    403: Forbidden,
}
```

---

### `GET api/v1/admin/withdrawals`
**설명**: 어드민 페이지 회원 탈퇴 내역 목록 조회 API

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
        type: int,
        required: False,
    },
    "page_size": {
        type: int,
        required: False,
    }
    "search": {
        type: str,
        required: False,
    },
    "role": {
        type: enum(
            "user",
            "training_assistant",
            "operation_manager",
            "learning_coach",
            "admin",
            "student"
        ),
        required: False,
    }
    "sort": {
        type: enum("latest", "oldest"),
        required: False,
    }
}
```
**Example:**
```json
{
    "page": 1,
    "page_size": 10,
    "search": "test",
    "role": "student",
    "sort": "latest"
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | null,
    "previous": str | null,
    "results": [
        {
            "id": int,
            "user": {
                "id": int,
                "email": str,
                "name": str,
                "role": enum(
                    "USER",
                    "TA",
                    "OM",
                    "LC",
                    "ADMIN",
                    "STUDENT"
                ),
                "birthday": str,
            },
            "reason": str,
            "reason_display": str,
            "withdrawn_at": datetime
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "email": "user@example.com",
                "name": "홍길동",
                "role": "STUDENT",
                "birthday": "1998-08-29"
            },
            "reason": "NO_LONGER_NEEDED",
            "reason_display": "더 이상 필요하지 않음",
            "withdrawn_at": "2025-11-01T01:01:30+09:00"
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/withdrawals/{withdrawal_id}`
**설명**: 어드민 페이지 회원 탈퇴 내역 상세 조회 API

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
200: {
    "id": int,
    "user": {
        "id": int,
        "email": str,
        "nickname": str,
        "name": str,
        "gender": enum("M", "F"),
        "role": enum(
            "USER",
            "TA",
            "OM",
            "LC",
            "ADMIN",
            "STUDENT"
        ),
        "status": enum(
            "ACTIVATED",
            "DEACTIVATED",
            "WITHDREW"
        ),
        "profile_img_url": str,
        "created_at": datetime,
    },
    "assigned_courses": [
        {
            "course": {
                "id": int,
                "name": str,
                "tag": str
            },
            "cohort": {
                "id": int,
                "number": int,
                "status": enum(
                    "PENDING",
                    "IN_PROGRESS",
                    "COMPLETED"
                ),
                "start_date": date,
                "end_date": date,
            }
        }
    ],
    "reason": str,
    "reason_display": str
    "reason_detail": str,
    "due_date": date,
    "withdrawn_at": datetime,
}
```
**Example:**
```json
200: {
    "id": 1,
    "user": {
        "id": 1,
        "email": "user@example.com",
        "nickname": "test",
        "name": "홍길동",
        "gender": "M",
        "role": "user",
        "status": "active",
        "profile_img_url": "https://example.com/images/profiles/image.png",
        "created_at": "2025-10-30T14:01:57.505250+09:00"
    },
    "assigned_courses": [
        {
            "course": {
                "id": 1,
                "name": "초격차 백엔드 부트캠프",
                "tag": "BE"
            },
            "cohort": {
                "id": 1,
                "number": 1,
                "status": "PENDING",
                "start_date": "2025-10-30",
                "end_date": "2026-04-28",
            }
        }
    ],
    "reason": "NO_LONGER_NEEDED",
    "reason_display": "더 이상 필요하지 않음",
    "reason_detail": "이제 안써요.",
    "due_date": "2025-11-01",
    "withdrawn_at": "2025-11-01T01:01:30+09:00"
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
    "error_detail": "회원탈퇴 정보를 찾을 수 없습니다."
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

### `DELETE api/v1/admin/withdrawals/{withdrawal_id}`
**설명**: 어드민 페이지 탈퇴 취소 API

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
200: {
    "detail": str,
}
```
**Example:**
```json
200: {
    "detail": "회원 탈퇴 취소처리 완료.",
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
    "error_detail": "회원탈퇴 정보를 찾을 수 없습니다."
}
```

---

### `GET api/v1/admin/analytics/withdrawals/trends`
**설명**: 어드민 페이지 회원탈퇴 추세 분석 API

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
    "interval": {
        type: enum("monthly", "yearly"),
        required: True,
    }
}
```
**Example:**
```json
{
    "interval": "monthly"
}
```

#### Success Response
```json
200: {
    "interval": enum("monthly", "yearly")
    "from_date": date,
    "to_date": date,
    "total": int,
    "items": [
        {
            "period": str,
            "count": int
        }
    ]
}
```
**Example:**
```json
200: {
    "interval": "monthly",
    "from_date": "2025-11-01",
    "to_date": "2025-11-30",
    "total": 100,
    "items": [
        {
            "period": "2025-11",
            "count": 100
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/analytics/withdrawal-reasons/counts`
**설명**: 어드민 페이지 전체 기간 회원 탈퇴 사유별 갯수 API

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
200: {
    "from_date": date,
    "to_date": date,
    "total": int,
    "items": [
        {
            "reason": enum(
                "NO_LONGER_NEEDED",
                "LACK_OF_INTEREST",
                "TOO_DIFFICULT",
                "FOUND_BETTER_SERVICE",
                "PRIVACY_CONCERNS",
                "POOR_SERVICE_QUALITY",
                "TECHNICAL_ISSUES",
                "LACK_OF_CONTENT",
                "OTHER"
            ),
            "reason_label": str,
            "count": int,
            "percentage": float(.2f)
        }
    ]
}
```
**Example:**
```json
200: {
    "from_date": "2020-12-31",
    "to_date": "2025-11-30",
    "total": 1945,
    "items": [
        {
            "reason": "OTHER",
            "reason_label": "기타",
            "count": 234,
        },
       {
            "reason": "LACK_OF_CONTENT",
            "reason_label": "원하는 콘텐츠나 기능의 부족",
            "count": 344,
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/analytics/withdrawal-reasons/stats/monthly`
**설명**: 어드민 페이지 월별 회원 탈퇴 사유 분석 API

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
    "reason": {
        type: enum(
            "NO_LONGER_NEEDED",
            "LACK_OF_INTEREST",
            "TOO_DIFFICULT",
            "FOUND_BETTER_SERVICE",
            "PRIVACY_CONCERNS",
            "POOR_SERVICE_QUALITY",
            "TECHNICAL_ISSUES",
            "LACK_OF_CONTENT",
            "OTHER"
        ),
        required: True,
    }
}
```
**Example:**
```json
{
    "reason": "NO_LONGER_NEEDED"
}
```

#### Success Response
```json
200: {
    "reason": enum(
        "NO_LONGER_NEEDED",
        "LACK_OF_INTEREST",
        "TOO_DIFFICULT",
        "FOUND_BETTER_SERVICE",
        "PRIVACY_CONCERNS",
        "POOR_SERVICE_QUALITY",
        "TECHNICAL_ISSUES",
        "LACK_OF_CONTENT",
        "OTHER"
    ),
    "reason_label": str,
    "from_date": str,
    "to_date": str,
    "total": int,
    "items": [
        {      
            "period": str,
            "count": int
        }
    ]
}
```
**Example:**
```json
200: {
    "reason": "OTHER",
    "reason_label": "기타",
    "from_date": "2025-01-01",
    "to_date": "2025-11-30",
    "total": 1945,
    "items": [
        {      
            "period": "2025-10",
            "count": 100
        },
        {      
            "period": "2025-11",
            "count": 200
        },
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---

### `GET api/v1/admin/analytics/student-enrollments/trends`
**설명**: 어드민 페이지 수강 등록 추세 분석 API

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
    "interval": {
        type: enum("monthly", "yearly"),
        required: True,
    }
}
```
**Example:**
```json
{
    "interval": "monthly"
}
```

#### Success Response
```json
200: {
    "interval": enum("monthly", "yearly")
    "from_date": date,
    "to_date": date,
    "total": int,
    "items": [
        {
            "period": str,
            "count": int
        }
    ]
}
```
**Example:**
```json
200: {
    "interval": "monthly",
    "from_date": "2025-11-01",
    "to_date": "2025-11-30",
    "total": 100,
    "items": [
        {
            "period": "2025-11",
            "count": 0
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
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

403: {
    "error_detail": "권한이 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    403: Forbidden
}
```

---
