# 커뮤니티 (Community Posts & Comments)

> **Base URL**: `https://api.ozcodingschool.site`
> **설명**: 게시글 CRUD, 댓글 CRUD, 좋아요, 카테고리 조회
> **API 수**: 12개
> **공통 에러**: `500: {"error_detail": "서버에서 알 수 없는 오류가 발생했습니다."}`

## API 목록 (Quick Reference)

| Method | Endpoint | 설명 |
|--------|----------|------|
| `GET` | `api/v1/posts/categories` | 커뮤니티 게시글 카테고리 목록 조회 API |
| `POST` | `api/v1/posts` | 커뮤니티 게시글 작성 API |
| `GET` | `api/v1/posts` | 커뮤니티 게시글 목록 조회 API |
| `GET` | `api/v1/posts/{post_id}` | 커뮤니티 게시글 상세 조회 API |
| `PUT` | `api/v1/posts/{post_id}` | 커뮤니티 게시글 수정 API |
| `DELETE` | `api/v1/posts/{post_id}` | 커뮤니티 게시글 삭제 API |
| `GET` | `api/v1/posts/{post_id}/comments` | 커뮤니티 게시글 댓글 목록 조회 API |
| `POST` | `api/v1/posts/{post_id}/comments` | 커뮤니티 게시글 댓글 작성 API |
| `PUT` | `api/v1/posts/{post_id}/comments/{comment_id}` | 커뮤니티 게시글 댓글 수정 API |
| `DELETE` | `api/v1/posts/{post_id}/comments/{comment_id}` | 커뮤니티 게시글 댓글 삭제 API |
| `POST` | `api/v1/posts/{post_id}/like` | 커뮤니티 게시글 좋아요 API |
| `DELETE` | `api/v1/posts/{post_id}/like` | 커뮤니티 게시글 좋아요 취소 API |

## API 상세 명세

### `GET api/v1/posts/categories`
**설명**: 커뮤니티 게시글 카테고리 목록 조회 API

#### Success Response
```json
200: [
  {
    "id": int,
    "name": str
  }
]
```
**Example:**
```json
200: [
  {
    "id": 1,
    "name": "전체 게시판"
  }
]
```

#### Status Codes
```
{
    200: Ok,
}
```

---

### `POST api/v1/posts`
**설명**: 커뮤니티 게시글 작성 API

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
    "title": {
        type: str,
        required: True
    },
    "content": {
        type: str,
        required: True
    },
    "category_id": {
        type: int,
        required: True
    }
}
```
**Example:**
```json
{
    "title": "게시글 1번",
    "content": "게시글 본문입니다. 마크다운 허용",
    "category_id": 1
}
```

#### Success Response
```json
201: {
    "detail": str,
    "pk": int
}
```
**Example:**
```json
201: {
    "detail": "게시글이 성공적으로 등록되었습니다.",
    "pk": 1
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
      "title": [
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

### `GET api/v1/posts`
**설명**: 커뮤니티 게시글 목록 조회 API

#### Query Parameters
```json
{
    "page": {
        type: int,
        required: False
    },
    "page_size": {
        type: int,
        required: False
    },
    "search": {
        type: str,
        required: False
    },
    "search_filter": {
        type: enum(
            "author",
            "title",
            "content",
            "title_or_content"
        ),
        required: False
    },
    "category_id": {
        type: int,
        required: False
    },
    "sort": {
        type: enum(
            "latest",
            "oldest",
            "most_views",
            "most_likes",
            "most_comments",
        ),
        required: False
    }
}
```
**Example:**
```json
{
    "page": 1,
    "page_size": 10,    
    "search": "홍길동",
    "search_filter": "author",
    "category_id": 1,
    "sort": "latest"
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | None,
    "previous": str | None,
    "results": [
        {
            "id": int,
            "author": {
                "id": int,
                "nickname": str,
                "profile_img_url": str,
            },
            "title": str,
            "thumbnail_img_url": str | None,
            "content_preview": str,
            "comment_count": int,
            "view_count": int,
            "like_count": int,
            "created_at": datetime,
            "updated_at": datetime,
            "category_id": int,
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 100,
    "next": "http://api.ozcoding.site/api/v1/posts?page=2&page_size=10",
    "previous": "http://api.ozcoding.site/api/v1/posts?page=1&page_size=10",
    "results": [
        {
            "id": 1,
            "author": {
                "id": 1,
                "nickname": "testuser",
                "profile_img_url": "https://example.com/uploads/images/users/profiles/image.png"
            },
            "title": "테스트 게시글 1번",
            "thumbnail_img_url": "https://example.com/uploads/images/posts/first-image.png",
            "content_preview": "그냥 작성한 게시글 1번 입니다. 게시글 본문 내용이 50글자 내로 생략된 형태로 제공됩니다.",
            "comment_count": 100,
            "view_count": 100,
            "like_count": 100,
            "created_at": "2025-10-30T14:01:57.505250+09:00",
            "updated_at": "2025-10-30T14:01:57.505250+09:00"
            "category_id": 1,
        }
    ]
}
```

#### Status Codes
```
{
    200: Ok
}
```

---

### `GET api/v1/posts/{post_id}`
**설명**: 커뮤니티 게시글 상세 조회 API

#### Success Response
```json
200: {
    "id": int,
    "title": str,
    "author": {
        "id": int,
        "nickname": str,
        "profile_img_url": str,
    },
    "category": {
        "id": int,
        "name": str,
    },
    "content": str,
    "view_count": int,
    "like_count": int,
    "created_at": datetime,
    "updated_at": datetime,
}
```
**Example:**
```json
"category_id": 1,
```

#### Error Response
```json
404: {
    "error_detail": str
}
```
**Example:**
```json
404: {
    "error_detail": "게시글을 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    404: Not Found
}
```

---

### `PUT api/v1/posts/{post_id}`
**설명**: 커뮤니티 게시글 수정 API

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
    "title": {
        type: str,
        required: True,
    },
    "content": {
        type: str,
        required: True,
    },
    "category_id": {
        type: int,
        required: True,
    }
}
```
**Example:**
```json
{
    "title": "게시글 1번 수정",
    "content": "수정된 게시글 본문입니다. 마크다운 허용",
    "category_id": 2
}
```

#### Success Response
```json
200: {
    "id": int,
    "title": str,
    "content": str,
    "category_id": int
}
```
**Example:**
```json
200: {
    "id": 1,
    "title": "게시글 1번 수정",
    "content": "수정된 게시글 본문입니다. 마크다운 허용",
    "category_id": 2
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
      "title": [
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

404: {
    "error_detail": "해당 게시글을 찾을 수 없습니다."
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

### `DELETE api/v1/posts/{post_id}`
**설명**: 커뮤니티 게시글 삭제 API

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
    "detail": "게시글이 삭제되었습니다."
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
    "error_detail": "해당 게시글을 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    404: Not Found
}
```

---

### `GET api/v1/posts/{post_id}/comments`
**설명**: 커뮤니티 게시글 댓글 목록 조회 API

#### Query Parameters
```json
{
    "page": {
        type: int,
        required: False
    },
    "page_size": {
        type: int,
        required: False
    }
}
```
**Example:**
```json
{
  "page": 1,
  "page_size": 100
}
```

#### Success Response
```json
200: {
    "count": int,
    "next": str | None,
    "previous": str | None,
    "results": [
        {
            "id": int,
            "author": {
                "id": int,
                "nickname": str,
                "profile_img_url": str,
            },
            "tagged_users": [
                {
                    "id": int,
                    "nickname": str,
                }
            ],
            "content": str,
            "created_at": datetime,
            "updated_at": datetime
        }
    ]
}
```
**Example:**
```json
200: {
    "count": 100,
    "next": "http://api.ozcoding.site/api/v1/posts/1/comments?page=2&page_size=10",
    "previous": "http://api.ozcoding.site/api/v1/posts/1/comments?page=1&page_size=10",
    "results": [
        {
            "id": 1,
            "author": {
                "id": 1,
                "nickname": "testuser",
                "profile_img_url": "https://example.com/uploads/images/users/profiles/image.png"
            },
            "tagged_users": [
                {
                    "id": 2,
                    "nickname": "testuser2",
                }
            ],
            "content": "@testuser2 이 게시글에 유저 태그해서 댓글 달기",
            "created_at": "2025-10-30T14:01:57.505250+09:00",
            "updated_at": "2025-10-30T14:01:57.505250+09:00"
        }
    ]
}
```

#### Error Response
```json
404: {
    "error_detail": str
}
```
**Example:**
```json
404: {
    "error_detail": "해당 게시글을 찾을 수 없습니다."
}
```

---

### `POST api/v1/posts/{post_id}/comments`
**설명**: 커뮤니티 게시글 댓글 작성 API

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
    "content": {
        type: str,
        max_length: 500,
        required: True
    }
}
```
**Example:**
```json
{
    "content": "@testuser2 를 태그한 댓글 작성 테스트"
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
    "detail": "댓글이 등록되었습니다."
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

404: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": {
      "content": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

404: {
    "error_detail": "해당 게시글을 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    201: Created,
    400: Bad Request,
    401: Unauthorized,
    404: Not Found
}
```

---

### `PUT api/v1/posts/{post_id}/comments/{comment_id}`
**설명**: 커뮤니티 게시글 댓글 수정 API

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
    "content": {
        type: str,
        max_length: 500,
        required: True
    }
}
```
**Example:**
```json
{
    "content": "@testuser3 을 태그한 댓글 작성 테스트"
}
```

#### Success Response
```json
200: {
    "id": int,
    "content": str,
    "updated_at": datetime
}
```
**Example:**
```json
200: {
    "id": 1,
    "content": "content": "@testuser3 을 태그한 댓글 작성 테스트",
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
```
**Example:**
```json
400: {
    "error_detail": {
      "content": [
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

404: {
    "error_detail": "해당 댓글을 찾을 수 없습니다."
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

### `DELETE api/v1/posts/{post_id}/comments/{comment_id}`
**설명**: 커뮤니티 게시글 댓글 삭제 API

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
    "detail": "댓글이 삭제되었습니다."
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
    "error_detail": "해당 댓글을 찾을 수 없습니다."
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

### `POST api/v1/posts/{post_id}/like`
**설명**: 커뮤니티 게시글 좋아요 API

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
201: {
    "detail": str
}
```
**Example:**
```json
201: {
    "detail": "좋아요가 등록되었습니다."
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

404: {
    "error_detail": str
}
```
**Example:**
```json
400: {
    "error_detail": {
      "post_id": [
        "이 필드는 필수 항목입니다."
      ]
    }
}

401: {
    "error_detail": "자격 인증 데이터가 제공되지 않았습니다."
}

404: {
    "error_detail": "해당 게시글을 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    201: Created,
    400: Bad Request,
    401: Unauthorized,
    404: Not Found
}
```

---

### `DELETE api/v1/posts/{post_id}/like`
**설명**: 커뮤니티 게시글 좋아요 취소 API

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
    "detail": "좋아요가 취소되었습니다."
}
```

#### Error Response
```json
401: {
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

404: {
    "error_detail": "좋아요 기록을 찾을 수 없습니다."
}
```

#### Status Codes
```
{
    200: Ok,
    401: Unauthorized,
    404: Not Found
}
```

---
