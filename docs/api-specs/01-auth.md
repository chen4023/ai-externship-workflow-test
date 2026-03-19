# 인증/계정 (Auth & Account)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 회원가입, 로그인/로그아웃, 토큰 관리, 이메일/SMS 인증, 소셜 로그인, 비밀번호 관리
> **API 수**: 18개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `api/v1/accounts/signup` | 회원가입 API |
| `POST` | `api/v1/accounts/verification/send-email` | 통합 이메일 인증 발송 API |
| `POST` | `api/v1/accounts/verification/verify-email` | 통합 이메일 인증 API |
| `POST` | `api/v1/accounts/verification/send-sms` | 통합 SMS 인증 발송 API |
| `POST` | `api/v1/accounts/verification/verify-sms` | 통합 SMS 인증 API |
| `POST` | `api/v1/accounts/me/refresh` | JWT 토큰 재발급 API |
| `POST` | `api/v1/accounts/login` | 이메일 로그인 API |
| `POST` | `api/v1/accounts/logout` | 로그아웃 API |
| `GET` | `api/v1/accounts/social-login/kakao` | 카카오 소셜 로그인 API |
| `GET` | `api/v1/accounts/social-login/naver` | 네이버 소셜 로그인 API |
| `GET` | `api/v1/accounts/social-login/kakao/callback` | 카카오 소셜 로그인 CallBack API |
| `GET` | `api/v1/accounts/social-login/naver/callback` | 네이버 소셜 로그인 CallBack API |
| `POST` | `api/v1/accounts/change-password` | 비밀번호 재설정 API |
| `POST` | `api/v1/accounts/find-password` | 비밀번호 분실 시 재설정 API |
| `POST` | `api/v1/accounts/find-email` | 이메일 찾기 API |
| `POST` | `api/v1/accounts/restore` | 계정 복구 API |
| `POST` | `api/v1/accounts/check-nickname` | 닉네임 중복 확인 API |
| `GET` | `api/v1/admin/analytics/signup/trends` | 어드민 페이지 회원가입 추세 분석 API |

## API 상세 명세

### `POST api/v1/accounts/signup`
**설명**: 회원가입 API

#### Request Body
```json
{
  "password": {
      type: str,
      required: true,
  },
  "nickname": {
      type: str,
      required: true,
  },
  "name": {
      type: str,
      required: true,
  },
  "birthday": {
      type: date,
      format: "YYYY-MM-DD",
      required: true,
  },
  "gender": {
      type: enum("M", "F"),
      required: true,
  },
  "email_token": {
      type: str,
      required: true,
  },
  "sms_token": {
      type: str,
      required: true,
  },
}
```
**Example:**
```json
{
  "password": "Password1234@",
  "nickname": "김유저",
  "name": "홍길동",
  "birthday": "2025-11-20",
  "gender": "M",
  "email_token": "saddfj2h4u81478ssxzcv",
  "sms_token": "24yuicdfhduf128924hv",
}
```

#### Success Response
```json
201: {
    "detail": str
}
```
**Example:**
```json
201: {
    "detail": "회원가입이 완료되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}

409: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": {
      "nickname": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

409: {
    "error_detail": "이미 중복된 회원가입 내역이 존재합니다."
}
```

#### Status Codes
```
{
    201: Created,
    409: Conflict,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/verification/send-email`
**설명**: 통합 이메일 인증 발송 API

#### Request Body
```json
{
  "email": {
      type: str,
      required: true,
  }
}
```
**Example:**
```json
{
  "email": "user@example.com",
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
    "detail": "이메일 인증 코드가 전송되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "email": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/verification/verify-email`
**설명**: 통합 이메일 인증 API

#### Request Body
```json
{
    "email": {
        type: str,
        required: true,
    },
    "code": {
        type: str,
        required: true,
        format: r"^\d{6}$",
    }
}
```
**Example:**
```json
{
    "email": "user@example.com",
    "code": "a1ds21"
}
```

#### Success Response
```json
200: {
    "detail": str
    "email_token":str
}
```
**Example:**
```json
200: {
    "detail": "이메일 인증에 성공하였습니다.",
    "email_token": (대충base64urlsafe32자토큰)
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "email": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/verification/send-sms`
**설명**: 통합 SMS 인증 발송 API

#### Request Body
```json
{
  "phone_number": {
      type: str,
      format: r"\+\d{11}",
      required: true,
  }
}
```
**Example:**
```json
{
    "phone_number": "01012345678"
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
    "detail": "회원가입을 위한 휴대폰 인증 코드가 전송되었습니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "phone_number": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/verification/verify-sms`
**설명**: 통합 SMS 인증 API

#### Request Body
```json
{
    "phone_number": {
        type: str,
        format: r"\+\d{11}",
        required: true,
    },
    "code": {
        type: str,
        format: r"^\d{6}$",
        required: true,
    }
}
```
**Example:**
```json
{
    "phone_number": "01012345678",
    "code": "123456"
}
```

#### Success Response
```json
200: {
    "detail": str
     "sms_token":str
}
```
**Example:**
```json
200: {
    "detail": "회원가입을 위한 휴대폰 인증에 성공하였습니다.",
    "sms_token": (대충 base64urlsafe32바이트토큰)
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "phone_number": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/me/refresh`
**설명**: JWT 토큰 재발급 API

#### Request Body
```json
{
  "refresh_token": {
      type: str,
      required: true,
  }
}
```
**Example:**
```json
{
  "refresh_token": "JWT Token Value"
}
```

#### Success Response
```json
200: {
  "access_token": str
}
```
**Example:**
```json
200: {
  "access_token": "JWT Token Value"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "refresh_token": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

403: {
    "error_detail": {
      "detail": "로그인 세션이 만료되었습니다."
    }
}
```

#### Status Codes
```
{
    200: OK,
    400: Bad Rqeust,
    403: Forbidden
}
```

---

### `POST api/v1/accounts/login`
**설명**: 이메일 로그인 API

#### Request Body
```json
{
  "email": {
    type: str,
    required: True 
  },
  "password": {
    type: str,
    required: True 
  }
}
```
**Example:**
```json
{
  "email": "user@example.com",
  "password": "Password1234@@"
}
```

#### Success Response
```json
200: {
  "access_token": str
}
```
**Example:**
```json
200: {
  "access_token": "JWT Token Value"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}

403: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "password": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

403: {
    "error_detail": {
      "detail": "탈퇴 신청한 계정입니다."
      "expire_at" : YYYY-MM-DD
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    403: Forbidden
}
```

---

### `POST api/v1/accounts/logout`
**설명**: 로그아웃 API

#### Success Response
```json
200: {
  "detail": str
}
```
**Example:**
```json
200: {
  "detail": "로그아웃 되었습니다."
}
```

#### Status Codes
```
{
    200: Ok,
}
```

---

### `GET api/v1/accounts/social-login/kakao`
**설명**: 카카오 소셜 로그인 API

#### Status Codes
```
{
    302: Found
}
```

---

### `GET api/v1/accounts/social-login/naver`
**설명**: 네이버 소셜 로그인 API

#### Status Codes
```
{
    302: Found
}
```

---

### `GET api/v1/accounts/social-login/kakao/callback`
**설명**: 카카오 소셜 로그인 CallBack API

#### Query Parameters
```json
{
  "code": {
    type: str,
    required: True 
  }
}
```
**Example:**
```json
{
  "code": "Authorize code"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}

403: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "password": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

403: {
    "error_detail": {
      "detail": "탈퇴 신청한 계정입니다."
      "expire_at" : YYYY-MM-DD
    }
}
```

#### Status Codes
```
{
    200: OK,
    400: Bad Rqeust,
    403: Forbidden
}
```

---

### `GET api/v1/accounts/social-login/naver/callback`
**설명**: 네이버 소셜 로그인 CallBack API

#### Query Parameters
```json
{
  "code": {
    type: str,
    required: True 
  },
  "state": {
    type: str,
    required: True 
  }
}
```
**Example:**
```json
{
  "code": "Authorize code",
  "state": "고유값"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}

403: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "password": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

403: {
    "error_detail": {
      "detail": "탈퇴 신청한 계정입니다."
      "expire_at" : YYYY-MM-DD
    }
}
```

#### Status Codes
```
{
    200: OK,
    400: Bad Rqeust,
    403: Forbidden
}
```

---

### `POST api/v1/accounts/change-password`
**설명**: 비밀번호 재설정 API

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
    "old_password": {
        type: str,
        required: true,
    },
    "new_password": {
        type: str,
        required: true,
    },
}
```
**Example:**
```json
{
    "old_password": "Pass4321@!",
    "new_password": "Pass1234!@",
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
    "detail": "비밀번호 변경 성공."
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
```
**Example:**
```json
400: {
    "error_detail": {
      "new_password": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized
}
```

---

### `POST api/v1/accounts/find-password`
**설명**: 비밀번호 분실 시 재설정 API

#### Request Body
```json
{
    "email_token": {
        type: str,
        required: true,
    },
    "new_password": {
        type: str,
        required: true,
    },
}
```
**Example:**
```json
{
    "email_token": "sadfhdsajfhui234781",
    "new_password": "Pass1234!@",
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
    "detail": "비밀번호 변경 성공."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "new_password": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/find-email`
**설명**: 이메일 찾기 API

#### Request Body
```json
{
    "name": {
        type: str,
        required: true
    },
    "phone_number": {
        type: str,
        format: r"\+\d{11}",
        required: true,
    },
    "code": {
        type: str,
        format: r"^\d{6}$",
        required: true,
    }
}
```
**Example:**
```json
{
    "name": "홍길동",
    "phone_number": "01012345678",
    "code": "123456"
}
```

#### Success Response
```json
200: {
    "email": str
}
```
**Example:**
```json
200: {
    "email": "u**r@e****le.com"
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
```
**Example:**
```json
400: {
    "error_detail": {
      "phone_number": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

400: {
    "error_detail": {
      "code": [
        "휴대폰 인증 실패 - 인증코드가 유효하지 않습니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
}
```

---

### `POST api/v1/accounts/restore`
**설명**: 계정 복구 API

#### Request Body
```json
{
    "email_token": {
        type: str,
        required: true,
    }
}
```
**Example:**
```json
{
    "email_token": "asdfjkasdfhj131713712"
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
    "detail": "계정복구가 완료되었습니다.",
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}
404: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": {
      "email_token": [
        "이 필드는 필수 항목입니다."
      ]
    }
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    404: Not Found
}
```

---

### `POST api/v1/accounts/check-nickname`
**설명**: 닉네임 중복 확인 API

#### Request Body
```json
{
    "nickname": str
}
```
**Example:**
```json
{
    "nickname": "test"
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
    "detail": "사용가능한 닉네임 입니다."
}
```

#### Error Response
```json
400: {
    "error_detail": {
      "field_name": list[str]
    }
}

409: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": {
      "nickname": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

409: {
    "error_detail": "중복된 닉네임이 존재합니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    409: Conflict,
}
```

---

### `GET api/v1/admin/analytics/signup/trends`
**설명**: 어드민 페이지 회원가입 추세 분석 API

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
