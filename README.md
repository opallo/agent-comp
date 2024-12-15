# AI SaaS Template

A minimal, full-stack AI-powered SaaS project with subscription-based services.

## **Tech Stack**

### **Frontend**

- **Next.js**: Core app framework handling SSR, routing, UI, and API routes.
- **Gradio**: Frontend interface for interacting with AI (OpenAI) models.

### **Backend**

- **Supabase**: Database for user data, AI interaction logs, and real-time functionality.
- **Prisma**: ORM to define and interact with the Supabase database.

### **Authentication & Payments**

- **Clerk**: Authentication for user sign-ups, logins, and social login support.
- **Stripe**: Payment gateway for subscription management and payments.

### **Deployment**

- **Vercel**: Automatic scaling and serverless functions for hosting and APIs.

---

## **User Flow Overview**

1. User signs up or logs in via **Clerk**.
2. Subscription is processed through **Stripe**.
3. After login, user accesses dashboard via **Next.js**.
4. User interacts with **Gradio** to use the AI service (OpenAI API).
5. Data is stored and managed in **Supabase** using **Prisma**.
6. App is deployed and updated on **Vercel**.
