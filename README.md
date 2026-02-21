# 🚀 FreelanceOS – Admin Dashboard

A high-performance, responsive admin dashboard built with **Angular 21** for managing freelance projects, tracking earnings, and visualizing financial data in real time.

---

## 📌 Project Overview

FreelanceOS solves the common problem freelancers face when managing multiple projects, tracking income, and monitoring overdue tasks.

Instead of using spreadsheets or scattered tools, this dashboard centralizes:

* Project tracking
* Financial overview
* Status monitoring
* Real-time data visualization

The application updates instantly as project data changes, providing a smooth and reactive user experience.

---

## 🛠 Tech Stack

* **Framework:** Angular 21 (Standalone Components)
* **Language:** TypeScript (Strict Mode Enabled)
* **State Management:** Angular Signals (Reactive State)
* **Styling:** Bootstrap 5 & Bootstrap Icons
* **Charts & Visualization:** Chart.js

---

## ✨ Features

### 📊 Dynamic Overview

* Real-time summary cards for total earnings, active projects, and overdue tasks

### 📈 Reactive Charts

* Monthly earnings visualization
* Automatically updates when project status changes

### 📁 Project Management (Full CRUD)

* Add new projects
* Delete projects
* Update project status
* Immediate UI feedback with reactive state

### 🔄 Live Activity Feed

* Tracks every modification made during the session
* Displays real-time activity logs

---

## 🖼 Screenshots

* Dashboard Overview
  
  ![aa](https://github.com/user-attachments/assets/7cadb668-8d03-4477-b230-e8cb576d84ff)

* Earnings Chart
  
  ![bb](https://github.com/user-attachments/assets/ace131ce-cac3-4216-8698-cc880b2ad58c)

* Project Management Table
  
  ![cc](https://github.com/user-attachments/assets/987e57f7-9900-46e6-b9fa-5a2b1ee02402)

* Activity Feed
  
  ![dd](https://github.com/user-attachments/assets/8c46f3f5-22fc-4e60-b4e2-d2bc24827485)


---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/freelance-os-dashboard.git
cd freelance-os-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install Bootstrap Icons (if not included)

```bash
npm install bootstrap-icons
```

### 4️⃣ Run the development server

```bash
ng serve
```

Navigate to:

```
http://localhost:4200/
```

The application will automatically reload if you change any source files.

---

## 🏗 Architecture Details

This project follows **Clean Architecture principles** to ensure scalability and maintainability.

### 🧠 Services as State Store

`ProjectService` acts as the single source of truth using **Angular Signals** for reactive state management.

### ⚡ Computed State

Derived metrics such as `totalEarnings` and `tasksOverdueCount` are implemented using `computed()` to prevent redundant calculations and ensure optimal performance.

### 🧩 Decoupled Components

Components observe state rather than managing it directly, resulting in:

* Better separation of concerns
* Higher testability
* Improved scalability
