# SocietySync: Hyperlocal Community Utility App

## 📖 Case Study

### Context
Managing maintenance and utility requests in residential communities (like builder floors, RWA, apartment complexes) is often a disjointed process. Residents rely on WhatsApp groups or phone calls, service providers (plumbers, electricians, security) lack a centralized task list, and Resident Welfare Associations (RWAs) or administrators struggle to track resolution times and hold providers accountable. This is unlike housing societies where there are facility management service companies to do this.

### The Problem
1. **Friction in Reporting:** Residents often don't know how to properly categorize their issues or assign the correct priority, leading to misrouted requests.
2. **Lack of Accountability:** Without a centralized system, it is difficult to track Service Level Agreements (SLAs) and identify when a complaint has been ignored for too long.
3. **Disjointed Workflows:** Service providers need a simple, focused view of their pending tasks without being overwhelmed by unrelated community chatter.

### The Solution
**SocietySync** is a unified, role-based web application designed to streamline community maintenance. 
* **For Residents:** The app features an **AI-powered "Smart Request"** system (powered by Google's Gemini 3.1 Flash model). Residents can simply type their issue in natural language (e.g., *"Water is leaking under the kitchen sink!"*), and the AI automatically categorizes the request (Plumbing) and assigns priority (High).
* **For Service Providers:** A streamlined dashboard filters active tasks by their specific trade, allowing them to accept jobs and mark them as resolved with a single click.
* **For Administrators:** A comprehensive SLA Monitor flags any ticket that has been open for more than 4 hours, ensuring no resident complaint falls through the cracks. It also includes a user approval workflow to maintain community security.

---

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Distinct experiences for Residents, Service Providers, and Admins.
* **AI Smart Requests:** Natural language processing using `@google/genai` to automatically categorize and prioritize maintenance tickets.
* **SLA Monitoring:** Real-time tracking of ticket age, with visual alerts for SLA breaches (tickets open > 4 hours).
* **Task Management:** One-click status updates (Open -> In Progress -> Resolved) for service providers.
* **Responsive Design:** A mobile-first, clean, and accessible UI built with Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide React (Icons)
* **AI Integration:** `@google/genai` (Gemini 3.1 Flash)
* **Routing:** React Router DOM
* **State Management:** React Context API (Mocked backend for MVP)

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/societysync.git
   cd societysync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.
