# Sidama_Mesob_HRMS
A web application built for ease of Human Resource Management System works.
4. Security & Compliance
This section outlines the protocols and standards implemented to safeguard sensitive Human Resources data and ensure legal adherence to privacy regulations.
4.1 Data Encryption
To maintain the integrity and confidentiality of candidate data, the system employs industry-standard encryption methods:
Encryption in Transit: All communication between the client-side interface and the server is secured using TLS 1.3 (SSL). This prevents man-in-the-middle attacks during the resume upload process.
Encryption at Rest: Sensitive data, including personal contact information and uploaded documents (PDF/DOCX), are stored using AES-256 bit encryption.
Password Hashing: User credentials are never stored in plaintext; the system utilizes the Bcrypt hashing algorithm to ensure password security.
4.2 Access Control (RBAC)
The application follows the Principle of Least Privilege (PoLP) through a Role-Based Access Control system:
Candidates: Restricted to their own profile. They can create, read, and update their personal configurations and submissions but cannot view other applicants.
Recruiters/HR Personnel: Granted "Read" and "Filter" permissions for all candidate submissions. They can access the automated screening scores but cannot modify system-wide settings.
System Administrators: Full "CRUD" (Create, Read, Update, Delete) permissions for user management and system logs.
4.3 Privacy & Regulatory Compliance
To align with global standards such as GDPR and CCPA, the system includes:
Active Consent: A mandatory "Click-to-Accept" modal before any data is uploaded, ensuring candidates are aware of how their data is used.
Data Minimization: The system only collects fields strictly necessary for the "Automated Screening" process.
The Right to Erasure: A dedicated function allows candidates to request the permanent deletion of their profile and uploaded documents from the server.
5. User Interface (UI) & User Experience (UX)
This section describes the visual strategy and navigational logic designed to minimize user friction and maximize screening efficiency.
5.1 Interface Components & Mockups
The UI is designed with a "Clean-First" philosophy to prevent form fatigue. Key components include:
Unified Dashboard: A central hub for Recruiters to view a ranked list of candidates.
Dynamic Progress Bar: A visual indicator for candidates showing their progress through the multi-step application form.

Drag-and-Drop Zone: A specialized UI component for resume uploads that provides instant file-type validation.
5.2 User Flow (Operational Logic)
The journey is split into two primary paths to ensure a seamless experience:
Candidate Journey: Landing Page → Account Creation → Resume Upload → Submission Confirmation.
Recruiter Journey: Login → Global Search/Filter → Candidate Profile Review → Export/Action.
5.3 Accessibility & Usability Standards
To ensure the platform is inclusive, it adheres to WCAG 2.1 (Level AA) standards:
Semantic HTML: Ensures screen readers can accurately interpret form fields and buttons.
Color Contrast: All text elements maintain a contrast ratio of at least 4.5:1 against the background.
Keyboard Operability: All features, including the file uploader and navigation menus, are fully functional without the use of a mouse.
Error Handling: Real-time validation provides clear, text-based feedback (e.g., "Please enter a valid email address") rather than relying on color-coding alone.


