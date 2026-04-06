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
* **Database:** PostgreSQL (Relational data for structured HR records)
* **Storage:** AWS S3 or Local Secure Servers (For document uploads)

*
## ⚙️ Part 2: Functional Requirements

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
