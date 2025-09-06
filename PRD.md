
### **Product Requirements Document (PRD)**

**Project:** Adolescent Stories Website

**Goal:** Transform a compendium of student stories into a public-facing website where families and others can read stories (randomized on load) and leave comments, with teacher moderation.

---

### **1. Objectives**
* Make student stories easily accessible online in a simple, readable format.
* Provide a space for readers to leave kind, constructive comments.
* Ensure full moderation and control over all visible content.
* Keep the UI minimalist and text-first, prioritizing a friction-free experience for readers.

---

### **2. Users**
* **Readers (Families & Public):**
    * Land on the site to see a random story.
    * Have the option to refresh for another story.
    * Can leave a comment (name + text field).
    * View approved comments for a given story.
* **Admin (Teacher):**
    * Access a password-protected admin panel.
    * Approve or reject submitted comments.
    * Add new stories to the website.
    * Toggle the visibility of stories or comments at any time.
* **Students:**
    * The authors and primary stakeholders of the content. The project is designed to honor their work.

---

### **3. Core Features**
* **Story Display**
    * A random story is shown on the landing page.
    * There is an option to browse all stories (list view).
    * Typography is clean, with a white background and no clutter.
* **Comment System**
    * Input fields for Name (optional) and Comment (required).
    * On submit, comments are stored in the database but remain hidden until approved by the admin.
    * Approved comments are displayed under the story.
* **Admin Panel**
    * Password-protected interface.
    * A dashboard to view a list of all pending comments for approval or rejection.
    * A view to toggle story visibility on/off.
    * The ability to delete or hide comments after they’ve been approved.
    * A form to **add new stories manually** (title, body, etc.).
* **Manual Story Ingestion**
    * A form within the Admin Panel will allow the teacher to manually add stories.
    * A **rich text editor** will be used for the story body to preserve formatting like different fonts or bolding.
* **Story Navigation**
    * A button to “Show Another Random Story.”
    * A link to an “All Stories” page with a list of titles.

---

### **4. Non-Features**
* No user accounts or logins for readers.
* No likes, upvotes, or other social features.
* No complex styling beyond the clean, minimalist design.
* No automated PDF or document parsing. All stories will be added manually.

---

### **5. Technical Approach**
* **Frontend:** Next.js for easy deployment on Vercel and SEO-friendliness.
* **Backend/Database:** Supabase or Firebase to manage stories, comments, and moderation state.
* **Admin Panel:** Simple password gate (JWT or Supabase auth).
* **Content Ingestion:** The teacher will manually copy and paste stories into a form on the admin panel.
* **Formatting:** A rich text editor library (e.g., TinyMCE, Quill) will be integrated into the admin form. The story content will be stored in the database as **HTML**.
* **Deployment:** Vercel (for its ease and free tier).

---

### **6. UI Sketch / Flow**
* **Homepage:**
    * Random story (title + body).
    * Comment box (name + comment).
    * List of approved comments below.
    * Button: “Show Another Random Story.”
    * Footer link: “All Stories.”
* **All Stories Page:**
    * List of story titles (clicking a title goes to that story’s page).
* **Admin Panel:**
    * Login screen (password).
    * Dashboard with options to:
        * View pending comments (approve/reject).
        * Add a new story (form with rich text editor).
        * Manage existing stories (toggle visibility).
        * Manage comments (delete/hide).

---

### **7. Success Criteria**
* Families can read stories online without friction.
* The comments workflow is smooth and safe due to pre-moderation.
* The setup is minimal, requiring only manual story ingestion and password management for the administrator.
* The site launches within the agreed-upon timeline and budget.