cyberpoint-backend/
├── src/
│   ├── auth/
│   │   └── authController.js
│   │   └── authMiddleware.js
│   │   └── passportConfig.js
│   ├── models/
│   │   └── User.js
│   │   └── Career.js
│   │   └── JobApplication.js
│   ├── resolvers/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   ├── careers/
│   │   │   ├── createCareer.js
│   │   │   ├── getCareersByCategory.js
│   │   ├── jobApplications/
│   │   │   ├── applyJob.js
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
│   │   │   ├── deleteCareer.js
│   │   │   ├── updateCareer.js
│   │   ├── JobApplications/
│   │   │   ├── JobApplications.js
│   │   ├── users/
│   │   │   ├── createUser.js
│   │   │   ├── updateUser.js
│   │   │   ├── deleteUser.js
│   │   ├── login/
│   │   │   └── login.js
│   │   ├── logout/
│   │   │   └── logout.js
│   │   ├── users/
│   │   │   ├── createUser.js
│   │   │   ├── deleteUser.js
│   │   │   ├── updateUser.js
│   ├── queries/
│   │   ├── hello/
│   │   │   ├── hello.js
│   │   ├── users/
│   │   │   ├── getUserById.js
│   │   │   └── allUsers.js
│   │   ├── careers/
│   │   │   ├── getAllCareers.js
│   │   │   └── getCareerById.js
│   │   │   └── getCareerByCategory.js
│   │   ├── jobApplications/
│   │   │   ├── getAllJobApplications.js
│   ├── types/
│   │   ├── AuthPayloadType.js
│   │   ├── CareerType.js
│   │   ├── JobApplicationType.js
│   │   ├── MessageType.js
│   │   ├── UserType.js
│   ├── app.js
├── uploads
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
