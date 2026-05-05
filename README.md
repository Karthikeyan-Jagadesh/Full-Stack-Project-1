# Full-Stack-Project-1
=======
# To-Do Calendar & Admin Management System

A full-stack web application that combines an interactive task calendar for users with a centralized admin dashboard for system-wide task management. Built with a Node.js/Express backend and an Oracle Database, the system supports secure authentication, role-based access, and real-time task monitoring.

---

## Features

### User Portal

* **Interactive Calendar**
  View and select dates to manage daily tasks seamlessly.

* **Task Management**
  Add tasks with specific deadlines and view real-time **"Time Left"** countdowns.

* **Local Persistence**
  Tasks are stored in `localStorage` for fast, client-side access and persistence.

* **Theme Customization**
  Toggle between **Light** and **Dark** modes for a personalized experience.

---

###  Admin Dashboard

* **Centralized Statistics**
  Displays real-time counts for:

  * Total Tasks
  * Pending Tasks
  * Completed Tasks

* **Global Task Oversight**
  View all user tasks in a structured, system-wide table.

* **Management Controls**

  * Mark tasks as **Complete**
  * Delete tasks globally

---

### Backend & Authentication

* **Role-Based Redirection**
  Users are automatically redirected to either the **User Portal** or **Admin Dashboard** based on their role stored in the Oracle database.

* **Secure Registration**
  User registration captures:

  * Name
  * Roll Number
  * Role (User/Admin)

* **Authentication & Security**

  * Password hashing using `bcryptjs`
  * Token-based authentication with `jsonwebtoken`

---

## Tech Stack

### Frontend

* HTML5
* CSS3 (Poppins font)
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* Oracle XE
* `oracledb` driver

### Key Dependencies

* `cors`
* `body-parser`
* `bcryptjs`
* `jsonwebtoken`

---

## Project Structure

```
📦 To-Do-Calendar-System
├── server.js              # Express server & Oracle DB integration
├── package.json           # Project metadata & dependencies
│
├── login.html             # Authentication UI
├── login.js               # Login & registration logic
├── login.css              # Auth page styling
│
├── user.html              # User task calendar interface
├── user.js                # User-side task logic
├── user.css               # User UI styling
│
├── admin.html             # Admin dashboard interface
├── admin.js               # Admin task management logic
├── admin.css              # Admin UI styling
```

---
## Future Enhancements

* Server-side task persistence (DB-based instead of localStorage)
* Task reminders & notifications
* User activity logs for admins
* Responsive mobile-first UI

## Note
* Download npm modules before running the server
* using npm install

---

Built with care using Node.js, Oracle DB, and Vanilla JavaScript.



