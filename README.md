cyberpoint-backend/
├── src/
│   ├── auth/
│   │   └── authController.js
│   │   └── authMiddleware.js
│   │   └── passportConfig.js
│   ├── models/
│   │   └── User.js
│   │   └── Career.js
│   ├── resolvers/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   ├── careers/
│   │   │   ├── createCareer.js
│   │   ├── users/
│   │   │   ├── allUsers.js
│   │   │   ├── createUser.js
│   │   │   ├── deleteUser.js
│   │   │   ├── getUserById.js
│   │   │   ├── updateUser.js
│   │   ├── index.js
│   ├── schema/
│   │   ├── index.js
│   ├── mutations/
│   │   ├── careers/
│   │   │   ├── createCareer.js
│   │   ├── users/
│   │   │   ├── createUser.js
│   │   │   ├── updateUser.js
│   │   │   ├── deleteUser.js
│   │   ├── login/
│   │   │   └── login.js
│   │   ├── logout/
│   │   │   └── logout.js
│   ├── queries/
│   │   ├── hello/
│   │   │   ├── hello.js
│   │   ├── users/
│   │   │   ├── getUserById.js
│   │   │   └── allUsers.js
│   ├── types/
│   │   ├── AuthPayloadType.js
│   │   ├── MessageType.js
│   │   ├── UserType.js
│   ├── app.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
