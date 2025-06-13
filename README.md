# 📘 TaskBite – Full-Stack Task Manager

TaskBite is a sleek, secure task management application built with **React** (frontend) and **ASP.NET Core (C#)** (backend), using **MongoDB**, **JWT authentication**, and **BCrypt** for password hashing.

---

## 📁 Project Structure

### 🖥 Frontend (React)
- **Language:** JavaScript (ES6+)
- **Libraries:**
  - React, React Router
  - TailwindCSS
  - Axios
  - Formik + Zod
  - React Hot Toast

### 🧠 Backend (C#)
- **Framework:** ASP.NET Core Web API
- **Database:** MongoDB
- **Authentication:** JWT
- **Password Hashing:** BCrypt

---

## 🧩 Features

- 🔐 Secure signup & login with JWT
- 📋 Add, view, update, delete todos
- ✅ Mark tasks as completed
- 🧾 Rich descriptions
- ⚙️ Smooth UI with modals & animations
- 💬 Real-time toast notifications

---

## 🏗 Setup Instructions

### 🔧 Backend (ASP.NET Core)

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/taskbite.git
cd taskbite/backend
```

#### 2. Configure MongoDB & JWT

Edit appsettings.json:

```bash
{
  "JwtSettings": {
    "Secret": "your_super_secret_key",
    "Issuer": "TaskBiteAPI",
    "Audience": "TaskBiteUsers"
  },
  "MongoDB": {
    "ConnectionString": "mongodb://localhost:27017",
    "Database": "TaskBiteDB"
}
```
         
#### 3. Run the server


```bash
dotnet restore
dotnet run
```


## 🔄 API Endpoints
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| POST   | /auth/register   | Register a user   |
| POST   | /auth/login      | Log in user       |
| GET    | /todos           | Get all todos     |
| POST   | /todos           | Create a new todo |
| PUT    | /todos/{id}      | Update a todo     |
| DELETE | /todos/{id}      | Delete a todo     |


## 🔐 Authentication Flow

- Passwords are securely hashed using **BCrypt** before storage.
- Upon successful login, a **JWT (JSON Web Token)** is generated and sent to the client.
- The token is stored on the client side using `localStorage` *(can be changed to HTTP-only cookies for better security)*.
- For every protected API request, the token is sent in the `Authorization` header as a **Bearer Token**.
- Protected backend routes validate the JWT and allow access only if the token is valid.
- Unauthorized users are redirected or blocked from accessing protected frontend routes.





## 🧪 Tech Stack Overview
| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React, Tailwind, Formik, Zod, Toast  |
| Backend   | ASP.NET Core, MongoDB, JWT, BCrypt   |
| API Calls | Axios                                |



## 📝 License
This project is licensed under the MIT License. See the LICENSE file for details.


## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.