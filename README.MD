# Bitspeed: Identity Reconciliation API

This project is a REST API built with **Node.js, Express, TypeScript, and Prisma** for Identity Reconciliation.  
It provides CRUD operations for managing contacts and is deployed on **Render** with PostgreSQL.

---

## 🚀 Features
- PostgreSQL with Prisma ORM
- Express.js REST API
- Contact CRUD (Create, Read, Update, Delete)
- Postman test collection (results included)
- Nodemon for development
- Render deployment ready

---

## 📂 Project Structure
```
bitspeed/
│── prisma/
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Auto-generated DB migrations
│
│── src/
│   ├── controllers/       # Request handlers
│   │   └── contactController.ts
│   ├── routes/            # API routes
│   │   └── contactRoute.ts
│   ├── services/          # Business logic
│   │   └── contactService.ts
│   ├── utils/             # Helpers (e.g., prisma client)
│   │   └── prisma.ts
│   └── index.ts           # Entry point
│
│── .gitignore
│── nodemon.json
│── package.json
│── README.md
```

---

## ⚡ Installation

```bash
# Clone repo
git clone https://github.com/Amey1619/Bitspeed-assignment
cd bitspeed

# Install dependencies
npm install

# Setup environment
cp  .env   # add DATABASE_URL

# Run migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

---

## 🔑 Environment Variables (`.env`)
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=3000
```

---

## 📌 API Endpoints

### 👉 Create Contact
```http
POST /contacts
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "9876543210"
}
```

✅ Response:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "9876543210"
}
```

---

### 👉 Get All Contacts
```http
GET /contacts
```

✅ Response:
```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "phone": "9876543210"
  }
]
```

---

### 👉 Get Contact by ID
```http
GET /contacts/1
```

✅ Response:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "9876543210"
}
```

---

### 👉 Update Contact
```http
PUT /contacts/1
Content-Type: application/json

{
  "name": "Alice Updated",
  "email": "alice@newmail.com",
  "phone": "9998887777"
}
```

✅ Response:
```json
{
  "id": 1,
  "name": "Alice Updated",
  "email": "alice@newmail.com",
  "phone": "9998887777"
}
```

---

### 👉 Delete Contact
```http
DELETE /contacts/1
```

✅ Response:
```json
{ "message": "Contact deleted successfully" }
```

---

## 📬 Postman Tests (JavaScript Example)

Example Postman **test script** for checking contact creation:

```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response should contain name and email", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("name");
    pm.expect(jsonData).to.have.property("email");
});
```

---

## 🛠 Scripts
```bash
npm run dev   # Start dev server with nodemon
npm run build # Compile TypeScript
npm start     # Run compiled JS
```

---

## 👨‍💻 Author
**Amey gupta**

---
