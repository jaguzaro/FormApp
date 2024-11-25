# Form App

The primary functionality of this web application is to manage forms and publish them for external users to fill out anonymously. The responses to these forms can be viewed by authorized users with dedicated accounts. 

## Technical Details

- **Backend:** Built using Nest.js framework, with tools like JWT, TypeORM, and Swagger.
- **Frontend:** Built using Angular 18, leveraging standalone components and libraries like Bootstrap, Animate.css, and SweetAlert2.

---

## Requirements

A list of tools, dependencies, and configurations required to use this project.

- **Node.js version:** `>= 22.9.0`
- **Angular version:** `>= 18.2.8`

---

## Installation

Detailed steps to set up the environment and run the project on your local machine.

### Clone the Repository

```bash
git clone https://github.com/jaguzaro/FormApp.git

# Navigate to the backend directory:
cd /form-service

# Install dependencies:
npm install

```

``` js 
// Create an .env file in the root directory with your credentials. Example:
// Not real data
DB_HOST=localhost
DB_USER=sa
DB_PASSWORD=admin123
DB_NAME=FormApp
DB_PORT=51848
SALT_ROUNDS=10
JWTSECRET=123abc
```


```bash
# Navigate to the frontend directory:
cd /form-ui

# Install dependencies:
npm install
```
