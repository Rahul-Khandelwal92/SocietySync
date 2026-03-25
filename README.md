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

---

## 📸 Screenshots

*Coming soon*

---

## ⚖️ Tradeoffs & Design Decisions

| Decision | What I chose | What I gave up | Why |
|----------|-------------|----------------|-----|
| **AI auto-categorization over manual forms** | Natural language input → AI routes the ticket | User control over categorization | Residents shouldn't need to know if their issue is "Plumbing" or "Civil"; the AI removes that cognitive burden |
| **Role-based views over a unified dashboard** | Separate UX for Resident / Provider / Admin | Single shared interface | Each role has fundamentally different jobs to do; forcing one view would create noise and hide critical actions |
| **4-hour SLA threshold over configurable SLAs** | Fixed 4-hour breach alert | Per-category or per-community custom SLAs | For an MVP, a sensible default creates immediate value without the complexity of configuration |
| **Mocked backend over real DB** | React Context API for state | Persistent data, multi-user sessions | Allowed rapid prototyping of the full role-based flow without backend infrastructure overhead |
| **Mobile-first UI over desktop-first** | Clean, accessible single-column layout | Data-dense admin tables | Residents and service providers are almost always on mobile when they raise or action a request |

---

## 💡 What I Learned

- **Role-based products are really 3 products in one.** The resident experience, provider experience, and admin experience each had their own jobs-to-be-done; conflating them early would have killed usability for all three.
- **AI works best when it removes a decision the user didn't want to make.** Nobody wants to think about ticket categories; the AI handling that is genuinely invisible and valuable.
- **SLA visibility is an accountability mechanism, not just a metric.** Showing the admin which tickets are breaching changes behaviour; it creates urgency without enforcement.
