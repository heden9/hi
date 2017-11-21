# 1. HelloApp-V1.0-API

<!-- TOC -->

- [1. HelloApp-V1.0-API](#1-helloapp-v10-api)
  - [1.1. tips](#11-tips)
  - [1.2. 动态页](#12)
    - [1.2.1. 获取动态](#121)
  - [1.3. 动态管理](#13)
    - [1.3.1. 获取单条动态](#131)
    - [1.3.2. 发布动态](#132)
    - [1.3.3. 编辑动态](#133)
    - [1.3.4. 删除动态](#134)
  - [1.4. 用户账号](#14)
    - [1.4.1. 登录](#141)
    - [1.4.1. 注册](#142)
  - [1.5. 评论管理](#15)
    - [1.5.1. 获取评论](#151)
    - [1.5.2. 发布评论](#152)
    - [1.5.3. 删除评论](#153)
  - [1.6. 用户管理](#16)
    - [1.6.1. 搜索用户](#161)
  - [1.7. 关注管理](#17)
    - [1.7.1. 获取关注列表](#171)
    - [1.7.2. 关注用户](#172)
    - [1.7.3. 取消关注](#173)
  - [1.8. 图片管理](#18)
    - [1.8.3. 获取图片信息](#183)
    - [1.8.1. 上传图片](#181)
    - [1.8.2. 删除图片](#182)

<!-- /TOC -->

## 1.1. tips

- base : http://app.nefuer.net
- code :
  - 0 : 一切正常
  - 1 : 直接将 message 展示给用户
  - 2 : 验证用户无效,跳转至登录页

---

## 1.2. 动态页

### 1.2.1. 获取动态

- GET /dynamics_pages/{lastId}
- return:
  - whole: brief是否显示完整

```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 3,
            "headimgurl": "头像url",
            "nickname": "用户昵称",
            "brief": "简略动态",
            "whole": true,
            "img": [
                "图片1url",
                "图片2url"
            ],
            "comment_num": 23,
            "like_num": 541,
            "last_id": 23
        }
    ]
}
```

---

## 1.3. 动态管理

### 1.3.1. 获取动态

- GET /dynamics/{id}
- return :
  - payload :

```json
{
    "code": 0,
    "message": "",
    "data": {
        "id": 3,
        "headimgurl": "头像url",
        "nickname": "用户昵称",
        "content": "动态内容",
        "img": [
            "图片1url",
            "图片2url"
        ],
        "comment_num": 23,
        "like_num": 541
    }
}
```

---

### 1.3.2. 发布动态

- POST /dynamics
- payload :
  - img : 图片上传返回的id
```json
{
    "content": "动态内容",
    "img": [3, 4]
}
```
- return :
  - data : 动态id

```json
{
    "code": 0,
    "message": "",
    "data": 25
}
```

---

### 1.3.3. 编辑动态

- PUT /dynamics/{id}
- payload :
  - img : 图片id
```json
{
    "content": "动态内容",
    "img": [3, 4]
}
```
- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

### 1.3.4. 删除动态

- DELETE /dynamics/{id}

- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

## 1.4. 用户账号

### 1.4.1. 登录

- POST /login
- payload :

```json
{
    "username": "2015111363",
    "password": "123456789"
}
```

- return :

```json
{
    "code": 0,
    "message": "",
    "data": {
        "id": 3,
        "headimgurl": "头像url",
        "nickname": "用户昵称"
    }
}
```

---

### 1.4.2. 注册

- POST /signup
```json
{
    "username": "2015111363",
    "password": "123456789"
}
```

- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

## 1.5. 评论管理

### 1.5.1. 获取评论

- GET /comments/{dynamics_id}
- return :
  - p_comment : 父级评论id

```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 2
            "content": "评论内容",
            "p_comment": 0
        }
    ]
}
```

---

### 1.5.2. 发布评论

- POST /comments/{dynamics_id}
- payload :

```json
{
    "content": "评论内容",
    "p_comment": 0
}
```

- return :
  - data : 评论id

```json
    "code": 0,
    "message": "",
    "data": 23
```

---

### 1.5.3. 删除评论

- DELETE /comments/{comment_id}
- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

## 1.6. 用户管理

### 1.6.1. 搜索用户

- GET /users?
  - search : 搜索内容
- return :

```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 3,
            "headimgurl": "头像url",
            "nickname": "用户昵称"
        }
    ]
}
```

---

## 1.7. 关注管理

### 1.7.1. 获取关注列表

- GET /follows

- return :

```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 3,
            "headimgurl": "头像url",
            "nickname": "用户昵称"
        }
    ]
}
```

---

### 1.7.2. 关注用户

- POST /follows/{user_id}
- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

### 1.7.3. 取消关注

- DELETE /follows/{user_id}
- return :

```json
{
    "code": 0,
    "message": "",
    "data": true
}
```

---

## 1.8 图片管理

### 1.8.1 获取图片信息

- GET /pics/{pic_id}
- return :

```json
    "code": 0,
    "message": "",
    "data": {
        "url" : "图片url"
    }
```

---

### 1.8.2 上传图片

- POST /pics
- payload

- return
  - data : 图片id
```json
    "code": 0,
    "message": "",
    "data": 2
```

---

### 1.8.3 删除图片

- DELETE /pics/{pic_id}
- payload

- return
```json
    "code": 0,
    "message": "",
    "data": true
```

---

