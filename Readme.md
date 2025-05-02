
# Onlycode - DSA Problem Solving Platform
---

##  About the Project

This is a **Onlycode - A Leetcode, CodeChief Inspired Platform** designed to help developers practice coding challenges in multiple programming languages (JavaScript, Python, Java). The platform includes features such as:

- **Problem Descriptions**: Detailed problem descriptions, examples, constraints, and hints.
- **Test Cases**: Predefined test cases for each problem to validate solutions.
- **Multi-Language Support**: Write solutions in JavaScript, Python, or Java.
- **Submission Tracking**: View submission history, memory usage, runtime, and status (Accepted, Wrong Answer, etc.).

---

##  Features


### 1. **Problem Details**

- Each problem includes:
  - Description
  - Examples with inputs, outputs, and explanations
  - Constraints
  - Editorial (hints and optimal solutions)

### 2. **User Authentication**

- Secure login and registration for tracking user progress and submissions.

### 3. **Admin Panel**

- Admins can add new problems, manage submissions.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (or Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Code Execution**: Judge0 API (for running and validating code submissions)
- **Version Control**: Git, GitHub

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Judge0 API 

### Steps to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Aestheticsuraj234/chai-or-leetcode.git
   ```
   ```cd backend```
   ```cd frontend```

2. **Install Dependencies**

   ```bash
   npm install
   ```


3. **Setup Prisma**
    ```bash
    npx prisma init
    ```

- This will create a new `prisma/` folder with a `schema.prisma` file inside, and also add a `.env` file at the root of your project.

- If you haven't installed Prisma yet, first install it with:

    ```bash
    npm install prisma --save-dev
    ```

- And if you also want the Prisma Client to query your database:

    ```bash
    npm install @prisma/client
    ```

- **To start a local PostgreSQL container for development, run the following Docker command:**

    ```bash 
    docker run --name <databasename> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres
    ```
    

4. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT =
   DATABASE_URL=
   JWT_SECRET=
   JUDGE0_API_URL=http://localhost:2358/ || http://localhost:<Your Judge0 Server Port>/ || Your Api link 
   ```

5. **Run the Development Server**
    ```bash
    npm run dev
    ````
