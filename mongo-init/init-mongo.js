db = db.getSiblingDB('innolabs_test');

db.createCollection('account')
db.account.insertMany([{
    "_id": ObjectId("673c73dbd31bb3413bfd9de0"),
    "user_id": ObjectId("673c73dbd31bb3413bfd9ddd"),
    "role_id": ObjectId("673c68b262bc00c2c141d292"),
    "password": "$2b$10$Tbm34ZCMY3if3tpwjWCrtuH0u7qeFTnrk3lUFzbSaY/EBSzt3OSwG",
    "code_forgot_password": "",
    "deleted": false,
    "createdAt": new Date("2024-11-19T11:17:47.134Z"),
    "updatedAt": new Date("2024-11-19T11:17:47.134Z"),
    "__v": 0
},
    {
        "_id":ObjectId("673c755dcfc4fafc4395b19f"),
        "user_id": ObjectId("673c755ccfc4fafc4395b19c"),
        "role_id": ObjectId("673c689962bc00c2c141d291"),
        "password": "$2b$10$bxn2mZU9F9OEj8axU3RTRewt44fVvEqEclAyi/xWf109rc7PXlAGC",
        "code_forgot_password": "",
        "deleted": false,
        "createdAt": new Date("2024-11-19T11:24:13.012Z"),
        "updatedAt": new Date("2024-11-19T11:24:13.013Z"),
        "__v": 0
    },
    {
        "_id": ObjectId("673ecb7538b2cc9f90664b5d"),
        "user_id": ObjectId("673ecb7538b2cc9f90664b5a"),
        "role_id": ObjectId("673c68bf62bc00c2c141d293"),
        "password": "$2b$10$Vun3KqYxQbxzzze3Ki2e2.Mrc1Whbr1pT3V9YVrFsvFfTfEjnRbIq",
        "deleted": false,
        "createdAt": new Date("2024-11-21T05:56:05.456Z"),
        "updatedAt":new Date("2024-11-21T05:56:05.456Z"),
        "__v": 0
    }
])


db.createCollection('user')
db.user.insertMany([{
    "_id": ObjectId("673c73dbd31bb3413bfd9ddd"),
    "fullName": "Jake John",
    "email": "tadat290903@gmail.com",
    "phone": "0356779197",
    "deleted": false,
    "createdAt": new Date("2024-11-19T11:17:47.054Z"),
    "updatedAt": new Date("2024-11-19T11:17:47.054Z"),
    "__v": 0
},
    {
        "_id": ObjectId("673c755ccfc4fafc4395b19c"),
        "fullName": "Jake Johnson",
        "email": "tiendat79197@gmail.com",
        "phone": "0123456789",
        "deleted": false,
        "createdAt": new Date("2024-11-19T11:24:12.928Z"),
        "updatedAt": new Date("2024-11-19T11:24:12.928Z"),
        "__v": 0
    },
    {
        "_id": ObjectId("673ecb7538b2cc9f90664b5a"),
        "fullName": "Bob Johnson",
        "email": "ryannguyen1905@gmail.com",
        "phone": "0356779197",
        "deleted": false,
        "createdAt":new Date("2024-11-21T05:56:05.310Z"),
        "updatedAt": new Date("2024-11-21T05:56:05.311Z"),
        "__v": 0
    }
])


db.createCollection('role')
db.role.insertMany([{
    "_id":ObjectId("673c689962bc00c2c141d291"),
    "role_name": "administrator"
},
    {
        "_id": ObjectId("673c68b262bc00c2c141d292"),
        "role_name": "editor"
    },
    {
        "_id": ObjectId("673c68bf62bc00c2c141d293"),
        "role_name": "reader"
    }])


db.createCollection('article')
db.article.insertMany([{
    "_id": ObjectId("673c74429822a9c1b53ad8c2"),
    "content": "Maria is a poor children in Western...",
    "title": "No Family",
    "author_name": "Hector Mason",
    "deleted": false,
    "createdAt": new Date("2024-11-19T11:19:30.607Z"),
    "updatedAt": new Date("2024-11-19T11:53:30.832Z"),
    "__v": 0
},
    {
        "_id": ObjectId("673c759ccfc4fafc4395b1a4"),
        "content": "Jupiter and Remilet, the couple of the WestSide...",
        "title": "Jupiter and Romilet",
        "author_name": "Kim Thompson",
        "deleted": true,
        "createdAt": new Date("2024-11-19T11:25:16.518Z"),
        "updatedAt": new Date("2024-11-19T11:25:16.518Z"),
        "__v": 0
    }])

db.createCollection('user_log')
db.createCollection('user_article')

