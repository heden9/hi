# 1. HelloApp-V1.0-API

<!-- TOC -->

- [0. tips](#0-tips)
- [1. 用户相关API](#1-用户相关api)
  - [1.1. 用户账号](#11-用户账号)
    - [1.1.1. 登录](#111-登录)
    - [1.1.1. 注册](#112-注册)
    - [1.1.3. token核验](#113-token核验)
  - [1.2. 用户信息](#12-用户信息)
    - [1.2.1. 搜索用户](#121-搜索用户)
    - [1.2.2. 获取用户信息](#122-获取用户信息)
  - [1.3. 关注管理](#13-关注管理)
    - [1.3.1. 获取关注列表](#131-获取关注列表)
    - [1.3.2. 关注用户](#132-关注用户)
    - [1.3.3. 取消关注](#133-取消关注)
- [2. 动态相关API](#2-动态相关api)
  - [2.1. 动态管理](#21-动态管理)
    - [2.1.1. 获取动态列表](#211-获取动态列表)
    - [2.1.2. 获取单条动态](#212-获取单条动态)
    - [2.1.3. 发布动态](#213-发布动态)
    - [2.1.4. 删除动态](#214-删除动态)
  - [2.2. 动态点赞](#22-动态点赞)
    - [2.2.1. 点赞](#221-点赞)
    - [2.2.2. 取消点赞](#222-取消点赞)
    - [2.2.3. 点赞列表](#223-点赞列表)
  - [2.3. 评论管理](#23-评论管理)
    - [2.3.1. 获取评论](#231-获取评论)
    - [2.3.2. 发布评论](#232-发布评论)
    - [2.3.3. 删除评论](#233-删除评论)
  - [2.4. 评论点赞](#24-评论点赞)
    - [2.4.1. 点赞](#241-点赞)
    - [2.4.2. 取消点赞](#242-取消点赞)
  - [2.5. 图片管理](#25-图片管理)
    - [2.5.1. 上传图片](#251-上传图片)
    - [2.5.2. 删除图片](#252-删除图片)
- [3. 聊天相关API](#3-聊天相关api)
  - [3.1. 聊天记录](#31)
    - [3.1.1. 读取聊天记录](#311-读取聊天记录)
    - [3.1.2. 存入聊天记录](#312-存入聊天记录)
- [4. 地图相关API](#4-地图相关api)

<!-- /TOC -->

## 0. tips

- base : http://app.nefuer.net
- headImgUrl : 完整url
- code :
  - 0 : 一切正常
  - 1 : 直接将 message 展示给用户
  - 2 : 验证用户无效,跳转至登录页

---

## 1. 用户相关API

### 1.1. 用户账号

#### 1.1.1. 登陆

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
    "message": "登陆成功",
    "data": {
        "id": 3,
        "headImgUrl": "头像url",
        "nickname": "用户昵称"
    }
}
```

---

#### 1.1.2. 注册

- POST /signup
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
    "message": "注册成功",
    "data": {
        "id": 3,
        "headImgUrl": "头像url",
        "nickname": "用户昵称"
    }
}
```

---

#### 1.1.3. token核验

- POST /transToken
- payload :
```json
{
    "token": "token"
}
```

- return :
  - id : 用户id
```json
{
    "code": 0,
    "message": "token有效",
    "data": {
        "id": 3
    }
}
```

---

### 1.2. 用户信息

#### 1.2.1. 搜索用户

- GET /users?
  - query : 搜索内容
- return :
```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 3,
            "headImgUrl": "头像url",
            "nickname": "用户昵称"
        }
    ]
}
```

---

#### 1.2.2. 获取用户信息

- GET /users/id
- return :
```json
{
    "code": 0,
    "message": "",
    "data": {
        "id": 3,
        "headImgUrl": "头像url",
        "nickname": "用户昵称"
    }
}
```

---

### 1.3. 关注管理

#### 1.3.1. 获取关注列表

- GET /follows
- return :
```json
{
    "code": 0,
    "message": "n个相关用户",
    "data": [
        {
            "id": 3,
            "headImgUrl": "头像url",
            "nickname": "用户昵称"
        }
    ]
}
```

---

#### 1.3.2. 关注用户

- POST /follows/{userId}
- return :
```json
{
    "code": 0,
    "message": "关注成功",
    "data": {
        "id": 3,
        "headImgUrl": "头像url",
        "nickname": "用户昵称"
    }
}
```

---

#### 1.3.3. 取消关注

- DELETE /follows/{userId}
- return :
```json
{
    "code": 0,
    "message": "已取消关注",
    "data": true
}
```

---

## 2. 动态相关API

### 2.1. 动态管理

#### 2.1.1. 获取动态列表

- GET /dynamics?
  - type : 类型(hot:热门/like:关注)
  - offset : 下一页的标志，直接传即可
  - limit : 获取条数

- return :
  - isWhole: brief是否显示完整
  - isLike: 是否点赞
```json
{
    "code": 0,
    "message": "",
    "data": [
        "dynamics": {
            "id": 3,
            "headImgUrl": "头像url",
            "nickname": "用户昵称",
            "brief": "简略动态",
            "isWhole": true,
            "img": [
                {
                    "id": 23,
                    "url": "图片1url",
                },
                {
                    "id": 24,
                    "url": "图片1url",
                }
            ],
            "pubTime": "2小时前",
            "commentNum": 23,
            "isLike": false,
            "likeNum": 541
        },
        "offset": 3,
        "hasMore": true
    ]
}
```

---

#### 2.1.2. 获取单条动态

- GET /dynamics/{id}
- return :
  - payload :
```json
{
    "code": 0,
    "message": "",
    "data": {
        "id": 3,
        "headImgUrl": "头像url",
        "nickname": "用户昵称",
        "content": "动态内容",
        "img": [
            {
                "id": 23,
                "url": "图片1url",
            },
            {
                "id": 24,
                "url": "图片1url",
            }
        ],
        "pubTime": "2小时前",
        "commentNum": 23,
        "isLike": false,
        "likeNum": 541
    }
}
```

---

#### 2.1.3. 发布动态

- POST /dynamics
- payload :
  - img : 图片上传返回的id
```json
{
    "content": "动态内容",
    "img": [
        3,
        4
    ]
}
```

- return :
```json
{
    "code": 0,
    "message": "发布成功",
    "data": {
        "id" :25
    }
}
```

---

#### 2.1.4. 删除动态

- DELETE /dynamics/{id}

- return :
```json
{
    "code": 0,
    "message": "删除成功",
    "data": true
}
```

---

### 2.2. 动态点赞

#### 2.2.1. 点赞

- POST /dynamicLikes/{dId}
- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

#### 2.2.2. 取消点赞

- DELETE /dynamicLikes/{dId}
- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

#### 2.4.3. 点赞列表

- GET /commentLikes/{dId}
- return :
```json
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 23,
            "headImgUrl": "头像",
        }
    ]
```

---

### 2.3. 评论管理

#### 2.3.1. 获取评论

- GET /comments/{dynamicId}
- return :
```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "id": 2,
            "headImgUrl": "头像url",
            "nickname": "用户昵称",
            "content": "评论内容",
            "pubTime": "评论时间"
            "pCNickname": "父级评论昵称" ,
            "likeNum": 2,
            "isLike": true
        }
    ]
}
```

---

#### 2.3.2. 发布评论

- POST /comments/{dynamicId}
- payload :
```json
{
    "content": "评论内容",
    "pComment": 0
}
```

- return :
```json
    "code": 0,
    "message": "评论成功",
    "data": {
        "id": 23
    }
```

---

#### 2.3.3. 删除评论

- DELETE /comments/{commentId}
- return :
```json
{
    "code": 0,
    "message": "删除成功",
    "data": true
}
```

---

### 2.4. 评论点赞

#### 2.4.1. 点赞

- POST /commentLikes/{cId}
- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

#### 2.4.2. 取消点赞

- DELETE /commentLikes/{cId}
- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

### 2.5. 图片管理

#### 2.5.1. 上传图片

- POST /pics

- return :
```json
    "code": 0,
    "message": "",
    "data": {
        "id": 2,
        "url": "http:/a.com/ss.png"
    }
```

---

#### 2.5.2. 删除图片

- DELETE /pics/{picId}

- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

## 3. 聊天相关API

### 3.1. 聊天记录

#### 3.1.1. 获取聊天记录

- GET /chatHistory/{gid}?
  - offset : 下一页的标志，直接传即可
  - limit : 获取条数

- return :
  - send : 1(发送)/0(接收消息)
  - type : text(文本)/img(图片)
  - message : 消息(text)/图片url(img)
```json
    "code": 0,
    "message": "",
    "data": {
        "gUser": {
            "id": 3,
            "headImgUrl": "头像url",
            "nickname": "用户昵称"
        },
        "messages": [
            {
                "send": 1,
                "type": "数据类型",
                "message": "聊天记录"
            }
        ]
    }
```

---

#### 3.1.2. 存入聊天记录

- POST /chatHistory/{gid}
- payload :
```json
[ 
    {
        "send": 1,
        "type": "数据类型",
        "message": "聊天记录"
    }
]
```

- return :
```json
    "code": 0,
    "message": "",
    "data": true
```

---

## 4. 地图相关API

### TODO...

