# 파일 업로드 (File Upload)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: S3 Presigned URL 발급 (질문/답변 이미지 업로드)
> **API 수**: 2개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `PUT` | `api/v1/questions/presigned-url` | S3 이미지 업로드용 Presigned URL 발급 |
| `PUT` | `api/v1/answers/presigned-url` |  |

## API 상세 명세

### `PUT api/v1/questions/presigned-url`
**설명**: S3 이미지 업로드용 Presigned URL 발급

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
  "file_name": str,
}
```
**Example:**
```json
{
  "file_name": "error_screenshot.png",
```

#### Success Response
```json
{
  "presigned_url": str,
  "img_url": str,
  "key": str
}
```
**Example:**
```json
{
  "presigned_url": "https://my-bucket.s3.ap-northeast-2.amazonaws.com/uploads/images/questions/uuid.png?AWSAccessKeyId=...&Signature=...",
  "img_url": "https://my-bucket.s3.ap-northeast-2.amazonaws.com/uploads/images/questions/uuid.png",
  "key": "uploads/images/questions/uuid.png"
}
```

#### Error Response
```json
"400: {
    ""error_detail"": str
}
```
**Example:**
```json
"400: {
    ""error_detail"": "지원하지 않는 파일 형식입니다."
}
```

#### Status Codes
```
{
  "200": "OK",
  "400": "Bad Request"
}
```

---

### `PUT api/v1/answers/presigned-url`
**설명**: 

---
