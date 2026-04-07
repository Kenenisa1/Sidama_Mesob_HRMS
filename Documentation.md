 # 🏛️ Sidama Mesob Unity Center: HR Digitization Project

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/Status-Development-orange)
![Location](https://img.shields.io/badge/Location-Hawassa%2C%20Ethiopia-green)

> **Modernizing the hiring landscape of the Sidama Region by transitioning from manual paper-based processes to a streamlined digital ecosystem.**

---

## 📌 Project Overview

The **Sidama Mesob Unity Center (SMUC) HR Digitization Project** is a strategic initiative aimed at revolutionizing how human capital is managed within the regional government's "One-Stop-Shop" service hub. 

By replacing the traditional "paper-and-folder" system with a centralized web-based registration platform, we are reducing administrative "energy drain," saving time for both HR officers and citizens, and ensuring a more transparent recruitment process.

### 🎯 Core Objectives
* **🚀 Efficiency:** Reduce candidate screening time by up to 60%.
* **🌍 Accessibility:** Allow citizens across all Woredas in the Sidama Region to apply remotely.
* **🔐 Data Security:** Move from physical cabinets to secure, encrypted digital storage.
* **🌱 Sustainability:** Eliminate paper waste in alignment with the regional "Paperless Initiative."

---

## 📋 Problem Statement

Currently, the **manual hiring system** at SMUC faces significant bottlenecks:
1. **Travel Burden:** Candidates travel long distances to Hawassa just to submit physical documents.
2. **Resource Drain:** High costs associated with paper, filing, and manual data entry.
3. **Information Silos:** Difficulty in searching for specific skill sets within thousands of physical folders.
4. **Data Risk:** Vulnerability of physical files to damage, loss, or unauthorized access.

---

## 🛠️ Project Scope

### ✅ What's Included (Phase 1)
* **Digital Intake Portal:** A mobile-responsive web form optimized for low-bandwidth areas.
* **Regional Context Integration:** Fields for **Woreda/Kebele** residency and **Sidaamu Afoo** language proficiency.
* **Document Management:** Secure uploads for **Fayda (National ID)** and educational certificates.
* **HR Admin Dashboard:** A central panel for HR Managers to filter, search, and export applicant data.
* **Multilingual Support:** Interface available in **Sidaamu Afoo, Amharic, and English**.

### ❌ Out of Scope
* Automated AI-based resume ranking (Planned for Phase 2).
* Integration with private sector payroll systems.
* Public-facing application status trackers.

---

## 👥 Key Stakeholders

| Role | Entity |
| :--- | :--- |
| **Project Oversight** | SMUC Management Board |
| **Compliance** | Sidama Regional HR Bureau |
| **Infrastructure** | Regional IT Development Team |
| **End Users** | Sidama Region Job Seekers & Professionals |

---

## 🏗️ Tech Stack (Proposed)
* **Frontend:** React.js / Tailwind CSS (For a modern, responsive UI)
* **Backend:** Node.js / Express
* **Database:** MongoDB (For simple and ease file settlement)
* **Storage:** AWS S3 or Local Secure Servers (For document uploads)


# ⚙️ Part 2: Functional Requirements

This section defines the core features and technical logic of the **Sidama Mesob Unity Center (SMUC)** registration portal.

### 👥 User Roles & Access Control
| Role | Permissions |
| :--- | :--- |
| **Applicant** | View listings, create profile, fill registration form, upload documents. |
| **HR Administrator** | Access dashboard, filter/search applicants, view files, export CSV/Excel data. |

---

### 📝 The Registration Pipeline
The form is designed as a **Multi-Step Journey** to ensure high completion rates and data accuracy.

#### **Step 1: Personal Profile**
* **Identity:** Full Name (First, Middle, Last), Gender, and Date of Birth.
* **National ID:** Integration/Input for the **Fayda (National ID)** 16-digit number.
* **Contact:** Verified Phone Number (+251 format) and Email Address.

#### **Step 2: Regional Residency**
* **Location:** Dropdown selection for all **Woredas** within the Sidama Region.
* **Granularity:** Specific **Kebele** and current residential address details.

#### **Step 3: Academic Qualifications**
* **Level:** (TVET/Diploma, Bachelor’s, Master’s, PhD).
* **Details:** Institution name, Field of Study, CGPA, and Graduation Year.

#### **Step 4: Language & Skills**
* **Language Proficiency:** (Basic / Intermediate / Fluent)
    * 🗣️ **Sidaamu Afoo** (Primary Requirement)
    * 🇪🇹 **Amharic**
    * 🇬🇧 **English**
* **Skill Tags:** Input for professional certifications or technical abilities.

#### **Step 5: Secure Document Vault**
* **Supported Formats:** PDF, JPG, PNG (Max 2MB/file).
* **Requirements:** Digital copy of Degree/Diploma and National ID.

---

### 🛠️ System Logic & Validation
To prevent "garbage data," the portal implements strict validation rules:
* **Mandatory Fields:** Real-time checking for required inputs marked with `*`.
* **Smart Masking:** Phone numbers and IDs are restricted to specific numerical formats.
* **Duplicate Prevention:** The system prevents multiple registrations using the same **National ID** or **Email**.
* **Instant Feedback:** Users receive a unique **Tracking ID** via SMS/Email immediately upon successful submission.

---

### 📊 HR Administrative Features
The backend dashboard provides SMUC officers with powerful management tools:
* **🔍 Global Search:** Instantly find applicants by name, ID, or phone number.
* **📂 Advanced Filtering:** Sort candidates by Woreda, Education Level, or Language fluency.
* **📥 Bulk Export:** Export shortlisted candidate data to Excel for board review committees.
* **📄 Inline Document Viewer:** View certificates directly in the browser to save time and storage.

---

### ⚡ Non-Functional Requirements
* **Mobile-First Design:** Optimized for smartphones frequently used in regional Woredas.
* **High Performance:** Lightweight assets to ensure fast loading on 3G/Low-bandwidth connections.
* **99.9% Uptime:** Hosted on reliable infrastructure to ensure 24/7 availability for applicants.

---

---

## 📞 Contact & Support
For technical inquiries or contributions regarding the SMUC HR Portal, please contact the development lead or the **Sidama Mesob Unity Center IT Department** in Hawassa.

---
*Developed with the goal of fostering a "Modern Ethiopia through Organized Benefit."*

That draft is a solid foundation, but to make it truly **professional** and **ready to use** for a technical software project, we need to add specific technical standards and clear formatting. 

Here is the refined, high-level version of **Part 4** and **Part 5** formatted for a formal documentation report.
---
📐 3. System Architecture – Sidama Mesob Unity Center (SMUC) HR Digitization Project

This section describes the overall technical design of the Sidama Mesob Unity Center (SMUC) HR Digitization Project, a scalable and secure job application system built using the MERN stack.

## 3. System Architecture

This section provides a comprehensive overview of the technical architecture for the Sidama Mesob Unity Center (SMUC) HR Digitization Project—a secure, modular, and scalable job application system built using the MERN stack (MongoDB, Express, React, Node.js).

### 3.1 Architectural Overview

- **Three-Tier (Layered) Architecture:**
  - **Presentation Layer (Frontend):** User interfaces and interaction logic
  - **Application Layer (Backend):** Business logic, data processing, and API endpoints
  - **Data Layer (Database):** Persistent storage for all application data

- **Key Benefits:**
  - **Scalability:** Each layer can be independently scaled and updated
  - **Maintainability:** Modular structure enables easier upgrades and debugging
  - **Security:** Encapsulation of business logic and strict API access
  - **Extensibility:** Ready for integration with mobile platforms and third-party systems

---

### 3.2 Technology Stack

| Layer      | Technology              | Purpose                                           |
|------------|------------------------|---------------------------------------------------|
| Frontend   | React.js, Tailwind CSS | Modern, responsive user interfaces                |
| Backend    | Node.js, Express       | API, authentication, business logic               |
| Database   | MongoDB                | Flexible NoSQL storage for structured documents   |
| File Store | Local / AWS S3         | Secure document uploads (e.g., CVs, Certificates) |

---

### 3.3 Component Diagram

```
[User Device]
    │
    ▼
[React Frontend]  ⇄  [API Gateway (Express/Node.js)]  ⇄  [MongoDB Database]
                                            │
                                         [File Storage]
```
- **Frontend**: Handles user session, validations, and API communication
- **Backend**: Manages authentication, application workflow, admin tools
- **Database**: Stores user profiles, job postings, application records
- **File Storage**: Manages uploads and protects sensitive documents

---

### 3.4 Key Modules & Responsibilities

**Frontend Components**  
- **Authentication** (Login/Register, JWT handling)  
- **Job Listings** (Browse, filter, search)
- **Application Form** (Multi-step, validation, progress bar)
- **Dashboards** (Role-based for Admin, Applicant, Reviewer)
- **File Upload** (Drag-and-drop, validation)

**Backend Services**  
- **Auth Module:** Registration, login, token issuance (JWT)
- **User Management:** CRUD operations for users
- **Job Management:** Create, update, list job offers (Admin only)
- **Application Workflow:** Submit, track, and review applications
- **File Upload:** Secure document handling, path management

---

### 3.5 Data Models (Schemas)

**Users**
- `_id` (ObjectId): Unique user ID
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)
- `role` (String: Admin / Applicant / Reviewer)
- `createdAt` (Date)

**Jobs**
- `_id` (ObjectId)
- `title` (String)
- `description` (String)
- `requirements` (String)
- `createdBy` (ObjectId, Admin)
- `createdAt` (Date)

**Applications**
- `_id` (ObjectId)
- `userId` (ObjectId, reference)
- `jobId` (ObjectId, reference)
- `status` (String: Pending/Approved)
- `resume` (String, file path)
- `createdAt` (Date)

_Additional collections_: `reviews` (optional), activity logs, etc.

---

### 3.6 API Endpoints (Summary)

- **Auth APIs**
  - `POST /api/auth/register` – Register a new user
  - `POST /api/auth/login` – Authenticate user, issue JWT

- **User APIs**
  - `GET /api/users/profile` – View profile
  - `PUT /api/users/:id` – Update profile

- **Job APIs**
  - `GET /api/jobs` – List/filter jobs
  - `POST /api/jobs` – Create job (Admin only)
  - `PUT /api/jobs/:id` – Update job
  - `DELETE /api/jobs/:id` – Remove job

- **Application APIs**
  - `POST /api/applications` – Submit application
  - `GET /api/applications/my` – List user applications
  - `GET /api/admin/applications` – All applications (Admin only)

- **File Upload API**
  - `POST /api/upload` – Upload document (CV, certificates)

- **External Integration (Optional/Planned)**
  - `POST /api/external/ats-sync` – Send applicant data to a third-party ATS
  - `GET /api/external/status` – Check sync status

---

## 4. Security & Compliance
*This section outlines the protocols and standards implemented to safeguard sensitive Human Resources data and ensure legal adherence to privacy regulations.*

### 4.1 Data Encryption
To maintain the integrity and confidentiality of candidate data, the system employs industry-standard encryption methods:
* **Encryption in Transit:** All communication between the client-side interface and the server is secured using **TLS 1.3 (SSL)**. This prevents man-in-the-middle attacks during the resume upload process.
* **Encryption at Rest:** Sensitive data, including personal contact information and uploaded documents (PDF/DOCX), are stored using **AES-256 bit encryption**. 
* **Password Hashing:** User credentials are never stored in plaintext; the system utilizes the **Bcrypt** hashing algorithm to ensure password security.

### 4.2 Access Control (RBAC)
The application follows the **Principle of Least Privilege (PoLP)** through a Role-Based Access Control system:
* **Candidates:** Restricted to their own profile. They can create, read, and update their personal configurations and submissions but cannot view other applicants.
* **Recruiters/HR Personnel:** Granted "Read" and "Filter" permissions for all candidate submissions. They can access the automated screening scores but cannot modify system-wide settings.
* **System Administrators:** Full "CRUD" (Create, Read, Update, Delete) permissions for user management and system logs.

### 4.3 Privacy & Regulatory Compliance
To align with global standards such as **GDPR** and **CCPA**, the system includes:
* **Active Consent:** A mandatory "Click-to-Accept" modal before any data is uploaded, ensuring candidates are aware of how their data is used.
* **Data Minimization:** The system only collects fields strictly necessary for the "Automated Screening" process.
* **The Right to Erasure:** A dedicated function allows candidates to request the permanent deletion of their profile and uploaded documents from the server.

---

## 5. User Interface (UI) & User Experience (UX)
*This section describes the visual strategy and navigational logic designed to minimize user friction and maximize screening efficiency.*

### 5.1 Interface Components & Mockups
The UI is designed with a "Clean-First" philosophy to prevent form fatigue. Key components include:
* **Unified Dashboard:** A central hub for Recruiters to view a ranked list of candidates.
* **Dynamic Progress Bar:** A visual indicator for candidates showing their progress through the multi-step application form.
* **Drag-and-Drop Zone:** A specialized UI component for resume uploads that provides instant file-type validation.



### 5.2 User Flow (Operational Logic)
The journey is split into two primary paths to ensure a seamless experience:
1.  **Candidate Journey:** `Landing Page` → `Account Creation` → `Resume Upload`  → `Submission Confirmation`.
2.  **Recruiter Journey:** `Login` → `Global Search/Filter` → `Candidate Profile Review` → `Export/Action`.



### 5.3 Accessibility & Usability Standards
To ensure the platform is inclusive, it adheres to **WCAG 2.1 (Level AA)** standards:
* **Semantic HTML:** Ensures screen readers can accurately interpret form fields and buttons.
* **Color Contrast:** All text elements maintain a contrast ratio of at least **4.5:1** against the background.
* **Keyboard Operability:** All features, including the file uploader and navigation menus, are fully functional without the use of a mouse.
* **Error Handling:** Real-time validation provides clear, text-based feedback (e.g., "Please enter a valid email address") rather than relying on color-coding alone.

---


