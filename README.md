# Web-Chat

<img width="376" alt="스크린샷 2023-11-30 184705" src="https://github.com/jrsky723/web-chat/assets/67538999/7d281226-06b2-402f-89c1-d70904f02735">

## Description

- Express.js + Socket.io + MySQL(Sequelize) + Pug + Pure.css 를 이용한 웹 실시간 채팅 어플리케이션

- Real-time chat application using Express.js + Socket.io + MySQL(Sequelize) + Pug + Pure.css

## Features

> Chat Room List

- Create & Enter Chat Room
- Enter Chat Room
- View User List

> Inside Chat Room

- Read Messages (Login Required)
- Send Messages (Login Required)
- User Join/Leave Notifications

> User Authentication

- Registration (Username & Nickname) -> Login
- Login (Username & Password) -> Access Chat Room List
- Logout

> Profile Management

- Change Profile Picture
- Change Nickname
- Change Password
- Delete Account (Removes User's Chat Rooms & Messages)

## Installation

- npm install
- npm build
- npm start
- You must create .env file in root directory
  - .env file example is below

## .env file

```bash
PORT="<your port number>"

DB_NAME="<your db name>"
DB_USER="<your db user>"
DB_PASS="<your db password>"
DB_HOST="<your db host>"

COOKIE_SECRET="<your cookie secret>"
IMGBB_API_KEY="<your imgbb api key>"
```

- You must create imgbb account and get api key
  - https://api.imgbb.com/

## Screenshots

> Chat Room List
>
> <img width="376" alt="스크린샷 2023-11-30 184705" src="https://github.com/jrsky723/web-chat/assets/67538999/7d281226-06b2-402f-89c1-d70904f02735">

> Inside Chat Room

<img width="376" alt="스크린샷 2023-11-30 184723" src="https://github.com/jrsky723/web-chat/assets/67538999/bb78ac92-ce42-44f1-a756-6509796946ff">

> User Profile

<img width="377" alt="image" src="https://github.com/jrsky723/web-chat/assets/67538999/c1915e99-7a06-4e98-9bd1-c901c637deea">
