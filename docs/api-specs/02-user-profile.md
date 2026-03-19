# 사용자 프로필 (User Profile)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 내 정보 조회/수정, 프로필 이미지, 수강 등록, 수강 목록, 휴대폰 변경, 회원탈퇴
> **API 수**: 8개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `PATCH` | `api/v1/accounts/me/profile-image` | 프로필 이미지 API |
| `PATCH` | `api/v1/accounts/change-phone` | 휴대폰 번호 변경 API |
| `POST` | `api/v1/accounts/enroll-student` | 수강생 등록 신청 API |
| `GET` | `api/v1/accounts/me` | 내 정보 조회 API |
| `GET` | `api/v1/accounts/available-courses` | 수강신청 가능한 기수 조회 API |
| `GET` | `api/v1/accounts/me/enrolled-courses` | 내 수강목록 조회 API |
| `PATCH` | `api/v1/accounts/me` | 회원 정보 수정 API |
| `DELETE` | `api/v1/accounts/me` | 회원탈퇴 API |

## API 상세 명세

### `PATCH api/v1/accounts/me/profile-image`
**설명**: 프로필 이미지 API

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
image: binary file (image/jpeg, image/png, image/jpg)
```

#### Success Response
```json
200: {
    "detail": str
}
```
**Example:**
```json
200 : {
  "detail" : "프로필 사진이 등록되었습니다."
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
      "error_detail": "잘못된 파일 형식입니다"
    }
}
```

---

### `PATCH api/v1/accounts/change-phone`
**설명**: 휴대폰 번호 변경 API

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

    "phone_verify_token": {
        type: str,
        required: true,
    }
}
```
**Example:**
```json
{
    "token": "123dsd123uhnxzf456"
}
```

#### Success Response
```json
200: {
    "detail": str,
    "phone_number": str
}
```
**Example:**
```json
200: {
    "detail": "휴대폰 번호 변경에 성공하였습니다.",
    "phone_number": "01011112222"
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

409: {
    "error_detail": str
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

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

409: {
    "error_detail": "이미 등록된 휴대폰 번호입니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized,
    409: Conflict,
}
```

---

### `POST api/v1/accounts/enroll-student`
**설명**: 수강생 등록 신청 API

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
  "cohort_id": {
      type: int,
      required: true,
  }
}
```
**Example:**
```json
{
    "cohort_id": 1
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
    "detail": "수강생 등록 신청완료."
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
      "cohort_id": [
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
    201: Created,
    400: Bad Request,
    401: Unauthorized
}
```

---

### `GET api/v1/accounts/me`
**설명**: 내 정보 조회 API

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
    "profile_img_url": str,
    "created_at": datetime,
}
```
**Example:**
```json
200: {
    "id": 1,
    "email": "admin@ozcoding.com",
    "nickname": "admin",
    "name": "admin",
    "phone_number": "01000000001",
    "birthday": "1998-08-29",
    "gender": "M"
    "profile_img_url": "https://example.com/images/profiles/image.png",
    "created_at": "2025-10-30T14:01:57.505250+09:00"
}
```

#### Error Response
```json
401: {
    "error_detail": str
}
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
}
```

---

### `GET api/v1/accounts/available-courses`
**설명**: 수강신청 가능한 기수 조회 API

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
200: [
    {
        "cohort": {
            "id": int,
            "number": int,
            "start_date": datetime,
            "end_date": datetime,
        },
        "course": {
            "id": int,
            "name": str,
        }
    }
]
```
**Example:**
```json
200: [
    {
        "cohort": {
            "id": 1,
            "number": 1,
            "start_date": "2025-11-20T00:00:05.875842+09:00",
            "end_date": "2025-12-20T00:00:05.875842+09:00",
            "status": "PENDING"
        },
        "course": {
            "id": 1,
            "name": "초격차 백엔드 부트캠프",
        }
    }
]
```

#### Error Response
```json
"401: {
    ""error_detail"": str
}"
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
}
```

---

### `GET api/v1/accounts/me/enrolled-courses`
**설명**: 내 수강목록 조회 API

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
200: [
    {
        "cohort": {
            "id": int,
            "number": int,
            "start_date": datetime,
            "end_date": datetime,
            "status": enum(
                "PENDING", 
                "IN_PROGRESS", 
                "COMPLETED"
            )
        },
        "course": {
            "id": int,
            "name": str,
            "tag": str,
            "thumbnail_img_url": str
        }
    }
]
```
**Example:**
```json
200: [
    {
        "cohort": {
            "id": 1,
            "number": 1,
            "start_date": "2025-11-20T00:00:05.875842+09:00",
            "end_date": "2025-12-20T00:00:05.875842+09:00",
            "status": "PENDING"
        },
        "course": {
            "id": 1,
            "name": "초격차 백엔드 부트캠프",
            "tag": "BE",
            "thumbnail_img_url": "https://example.com/images/courses/thumbnails/backend.png"
        }
    }
]
```

#### Error Response
```json
401: {
    "error_detail": str
}
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
}
```

---

### `PATCH api/v1/accounts/me`
**설명**: 회원 정보 수정 API

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
  "nickname": {
      type: str,
      required: false,
  },
  "name": {
      type: str,
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
  }
}
```
**Example:**
```json
{
  "nickname": "string",
  "name": "string",
  "birthday": "2025-11-20",
  "gender": "M"
}
```

#### Success Response
```json
200: {
    "id": int,
    "email": str,
    "nickname": str,
    "name": str,
    "birthday": str,
    "gender": enum("M","F")
    "phone_number": str,
    "updated_at": datetime
}
```
**Example:**
```json
200: {
    "id": 1,
    "email": "admin@ozcoding.com",
    "nickname": "admin",
    "name": "admin",
    "birthday": "1998-08-29",
    "gender": "M"
    "phone_number": "01044444444",
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

409: {
    "error_detail": "중복된 닉네임이 존재합니다."
}
```

#### Status Codes
```
{
    200: Ok,
    400: Bad Request,
    401: Unauthorized,
    409: Conflict,
}
```

---

### `DELETE api/v1/accounts/me`
**설명**: 회원탈퇴 API

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
  "reason": {
      type: enum("GRADUATION",
                          "TRANSFER",
                          "NO_LONGER_NEEDED",
                          "SERVICE_DISSATISFACTION",
                          "PRIVACY_CONCERN"
                          "OTHER"),
  },
  "reason_detail": {
      type: str,
  }
}
```
**Example:**
```json
{
  "reason": "GRADUATION",
  "reason_detail": "string"
}
```

#### Error Response
```json
401: {
    "error_detail": str
}
```
**Example:**
```json
401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
```

#### Status Codes
```
{
    204: No Content,
    400: Bad Request,
    401: Unauthorized,
}
```

---
