# 과정/기수 (Course & Cohort)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 과정 목록 조회, 기수 목록 조회, 과목 조회
> **API 수**: 3개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `GET` | `api/v1/course/` | 과정 리스트 조회 API |
| `GET` | `api/v1/<int:course_id>/cohorts` | 기수 리스트 조회 API |
| `GET` | `api/v1/<int:course_id>/subjects` |  |

## API 상세 명세

### `GET api/v1/course/`
**설명**: 과정 리스트 조회 API

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
200: [ {
        "id": int,
        "name": str,
        "tag": str,
        "thumbnail_img_url":str,
    }
    ]
```
**Example:**
```json
200: [
    {
        "id": 1,
        "name": "14기 백엔드",
        "tag": "1",
	"thumbnail_img_url":"https://www.test.com",
    },
    {
        "id": 2,
        "name": "14기 프론트",
        "tag": "2",
	"thumbnail_img_url":"https://www.test.com",
    }
]
```

#### Error Response
```json
401:{
        "error_detail": str
}
403:{
        "error_detail": str
}
```
**Example:**
```json
401:{
        "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
403:{
        "error_detail": "이 리소스를 조회할 권한이 없습니다."
}
```

#### Status Codes
```
{
401: Unauthorized,
403: Forbidden,
}
```

---

### `GET api/v1/<int:course_id>/cohorts`
**설명**: 기수 리스트 조회 API

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
        "id": int,
        "course_id": int,
        "number": int,
        "status": str
    },]
```
**Example:**
```json
200: [
    {
        "id": 7,
        "course_id": 2,
        "number": 12,
        "status": "IN_PROGRESS"
    },
    {
        "id": 8,
        "course_id": 2,
        "number": 1,
        "status": "IN_PROGRESS"
    },
]
```

#### Error Response
```json
401:{
        "error_detail": str
}
403:{
        "error_detail": str
}
```
**Example:**
```json
401:{
        "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
403:{
        "error_detail": "이 리소스를 조회할 권한이 없습니다."
}
```

#### Status Codes
```
{
401: Unauthorized,
403: Forbidden,
}
```

---

### `GET api/v1/<int:course_id>/subjects`
**설명**: 

#### Success Response
```json
200: [
    {
        "id": int,
        "course_id": int,
        "title": str,
        "status": str,
        "thumbnail_img_url":str,
    }
]
```
**Example:**
```json
200: [
    {
        "id": 1,
        "course_id": 1,
        "title": "test",
        "status": "activated",
	"thumbnail_img_url":"https://www.test.com",
    }
]
```

#### Error Response
```json
401:{
        "error_detail": str
}
403:{
        "error_detail": str
}
```
**Example:**
```json
401:{
        "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}
403:{
        "error_detail": "이 리소스를 조회할 권한이 없습니다."
}
```

#### Status Codes
```
{
401: Unauthorized,
403: Forbidden,
}
```

---
