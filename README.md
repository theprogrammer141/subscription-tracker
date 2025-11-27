# 📊 Subscription Tracker  
A smart and automated subscription management system that helps users track recurring payments, receive renewal reminders, and stay on top of their expenses. Built with **Node.js**, **Express**, **MongoDB**, and **Upstash Workflows** for automated reminder scheduling.

---

## 🚀 Features

- 🔐 **User Authentication & Authorization** (JWT-based)  
- ➕ **Create & manage subscriptions** (name, price, frequency, category, payment method, etc.)  
- 🔁 **Automated renewal date calculations**  
- ⏰ **Automated email reminders** using **Upstash Workflows (QStash)**  
- 📅 **Reminder workflow** (7, 5, 2, 1 days before renewal)  
- 🗂️ **Filter subscriptions by user**  
- 📡 **RESTful API design**  
- ⚙️ **Centralized error handling**  
- 🧪 Ready for Postman testing  
- 🛡️ Secure, clean, production-ready code patterns  

---

## 🏗️ Tech Stack

**Backend**
- Node.js  
- Express.js  
- MongoDB & Mongoose  

**Automation**
- Upstash QStash  
- Upstash Workflows  
- Cron-like delayed execution  

**Utilities**
- Day.js  
- Nodemailer / Resend / SMTP  

---

## 📂 Project Structure

subscription-tracker/
│
├── controllers/
│ └── subscription.controller.js
│
├── models/
│ └── subscription.model.js
│
├── workflows/
│ └── reminders.workflow.js
│
├── middlewares/
│ └── error.middleware.js
│
├── utils/
│ └── send-email.js
│
├── config/
│ ├── env.js
│ └── upstash.js
│
├── routes/
│ └── subscription.routes.js
│
├── server.js
└── README.md


---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/subscription-tracker.git
cd subscription-tracker

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file:

PORT=5500

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

QSTASH_TOKEN=your_upstash_qstash_token
QSTASH_URL=https://qstash.upstash.io
WORKFLOW_URL=https://your-deployed-workflow-url

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

🔄 Upstash Workflow Integration

This application uses Upstash Workflows + QStash to automatically schedule renewal reminders.

How it works:

When a subscription is created:
→ The backend triggers a workflow with the subscription ID.

Upstash Workflow:
→ Loads the subscription
→ Determines renewal date
→ Sleeps until reminder times (7, 5, 2, 1 days before)
→ Sends reminder email
→ Logs workflow steps for monitoring

This allows serverless, fully automatic background jobs without needing cron jobs or maintaining a worker process.

📡 API Endpoints
Create Subscription
POST /api/subscriptions

Get Subscriptions for a User
GET /api/subscriptions/user/:id

Get All Subscriptions
GET /api/subscriptions

Get Single Subscription
GET /api/subscriptions/:id

📬 Automated Emails

The file send-email.js handles sending email reminders using the selected provider.

Reminder emails include:

Subscription name

Renewal date

Reminder timing (7/5/2/1 days before)

🛡️ Error Handling

All errors are processed through a centralized middleware:

Mongoose validation errors

Duplicate key errors

Invalid ObjectId

Custom business logic errors

Fallback 500 handler
