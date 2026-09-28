# 🌐 CodeSphere — Developer Social & Collaboration Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-code--sphere--delta.vercel.app-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://code-sphere-delta.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Backend-Appwrite_Cloud-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)

**CodeSphere** is a modern, full-featured developer social networking and collaboration platform. Designed specifically for software engineers, developers, and tech enthusiasts, CodeSphere empowers creators to showcase their projects, connect with peers, discover developer talent by tech stack, and engage in real-time direct messaging.

🚀 **Live Application:** [https://code-sphere-delta.vercel.app/](https://code-sphere-delta.vercel.app/)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Database & Backend Setup (Appwrite)](#-database--backend-setup-appwrite)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Session Security
- **Email & Password Authentication:** Fast registration and sign-in powered by Appwrite Account services.
- **Password Recovery:** Integrated Forgot Password and Reset Password recovery flows.
- **Protected Routing:** Strict client-side route guards (`ProtectedRoute` & `PublicRoute`) safeguarding user dashboards and private views.
- **Online Presence:** Tracks online status and last-seen timestamps with clean session cleanup on logout.

### 📰 Developer Feed & Social Engagement
- **Chronological Tech Feed:** Browse recent updates, technical insights, and project highlights posted by developers.
- **Interactive Post Cards:** View post content, attached images, tech tags, and project repository/live links.
- **Engagement Metrics:** Like and comment counts along with bookmarking and share triggers.
- **Relative Timestamps:** Human-readable posting times powered by `date-fns` (e.g., *"2 hours ago"*).

### ✍️ Post Creation & Portfolio Showcase
- **Rich Post Editor:** Share code insights, architecture notes, and technical breakthroughs.
- **Dynamic Tagging:** Add multiple tech tags (e.g., `#react`, `#tailwindcss`, `#appwrite`) for discoverability.
- **Media Uploads:** Upload and host project screenshots and assets directly through Appwrite Storage buckets.
- **Project Links:** Attach direct links to GitHub repositories or deployed demos.
- **Post Management:** Dedicated "My Posts" view to view, update, and manage your published content.

### 🔍 Developer Discovery & Explore
- **Developer Directory:** Discover developers across the community.
- **Real-Time Search:** Filter developers by name or technical skills.
- **Developer Profile Cards:** View profiles at a glance with designation, avatar, bio, and skill badges.
- **Direct Connect:** Quick shortcuts to message or view the complete profile of any developer.

### 💬 Real-Time Direct Messaging
- **1-on-1 Chat:** Instant messaging between developers to collaborate, mentor, or network.
- **Live Realtime Updates:** Powered by Appwrite WebSocket subscriptions (`client.subscribe`) for instant message delivery without manual polling.
- **Smart Conversation List:** View existing message threads with last message previews and timestamps.
- **Smooth Auto-Scroll:** Chat windows automatically track and scroll to new incoming messages.

### 👤 Comprehensive Developer Profiles
- **Customization:** Manage personal profile photos, cover images, headline/designation, bio, and location.
- **Skills Matrix:** Add and showcase languages, frameworks, and tools.
- **Social Integrations:** Link GitHub, LinkedIn, portfolio website, and social handles.
- **User Activity:** Displays community stats (posts, followers, following) and a list of published posts.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Modern React with declarative component architecture |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Next-generation frontend tooling and rapid HMR |
| **Routing** | [React Router v7](https://reactrouter.com/) | Declarative nested routing and route protection |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first styling with sleek dark aesthetic |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | Feather & FontAwesome icon sets |
| **Backend-as-a-Service** | [Appwrite Cloud](https://appwrite.io/) | Auth, Database, Storage, and Realtime WebSockets |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) | Animated toasts for user actions and feedback |
| **Date Utilities** | [date-fns](https://date-fns.org/) | Modern JavaScript date utility library |
| **Deployment** | [Vercel](https://vercel.com/) | Edge cloud hosting with custom rewrite configuration |

---

## 🏗 System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│             React 19 + Tailwind CSS + React Router           │
└──────────────────────────────┬──────────────────────────────┘
                               │
               HTTPS REST API  │  WebSocket Subscriptions
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       Appwrite Cloud                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Authentication │    Database     │      Cloud Storage      │
│  - Users        │  - Profiles     │  - Profile Avatars      │
│  - Sessions     │  - Posts        │  - Post Attachments     │
│  - Passwords    │  - Messages     │  - Cover Images         │
│                 │  - Discussions  │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
```

---

## 📁 Project Structure

```text
code-sphere/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Default avatars, cover images & local graphics
│   ├── BackendServices/        # Appwrite client configuration & service initializers
│   │   └── AppWrite.jsx        # Client, Account, Databases, and Storage instances
│   ├── components/             # Modular UI components
│   │   ├── Auth/               # Signin, Signup, Forgot/Reset Password, Route guards
│   │   ├── Chat/               # Conversation list, Chat header, Message bubbles & input
│   │   ├── EditProfile/        # Profile editing modules, basic info & skills inputs
│   │   ├── Explore/            # Developer discovery, search bar & developer cards
│   │   ├── Layout/             # User layout shell, navigation bar & sidebar
│   │   ├── Post/               # Post creator, image uploader, tags input & editor
│   │   ├── UserDashboard/      # Dashboard feed, active devs, stats & quick actions
│   │   ├── UserProfile/        # Public/private profile views, stats & social links
│   │   └── Loader.jsx          # Reusable full-screen & inline loading spinner
│   ├── pages/                  # Page routes
│   │   └── User/               # Dashboard, Profile, Chat, Explore, Create/Edit Post
│   ├── App.jsx                 # Application entry, router declarations & Toast container
│   ├── App.css                 # Global application styles
│   ├── index.css               # Tailwind CSS imports & theme directives
│   └── main.jsx                # DOM root bootstrap
├── .env.example                # Sample environment variables template
├── eslint.config.js            # ESLint rules and configuration
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and npm scripts
├── vercel.json                 # Vercel SPA rewrite rules
└── vite.config.js              # Vite configuration and Tailwind integration
```

---

## 🔑 Environment Variables

To run CodeSphere locally or in production, configure the following environment variables in a `.env` file in the project root:

```env
# Appwrite Endpoint & Project
VITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_PROJECT_ID=your_project_id_here

# Appwrite Database & Collections
VITE_DATABASE=your_database_id_here
VITE_USER=your_user_collection_id_here
VITE_POST=your_post_collection_id_here
VITE_MESSAGE=your_message_collection_id_here
VITE_CONVERSATION=your_conversation_collection_id_here

# Appwrite Storage Buckets
VITE_BUCKET_PROFILE_IMAGE=your_storage_bucket_id_here
```

| Variable | Description |
| :--- | :--- |
| `VITE_API_ENDPOINT` | The Appwrite API URL (e.g. `https://cloud.appwrite.io/v1`). |
| `VITE_PROJECT_ID` | Your Appwrite project identifier. |
| `VITE_DATABASE` | ID of the Appwrite database containing app collections. |
| `VITE_USER` | Collection ID storing developer profile details (bio, skills, links). |
| `VITE_POST` | Collection ID storing developer posts, tags, media IDs, and links. |
| `VITE_MESSAGE` | Collection ID storing individual chat messages between users. |
| `VITE_CONVERSATION` | Collection ID storing conversation thread metadata. |
| `VITE_BUCKET_PROFILE_IMAGE` | Storage bucket ID for avatars, cover photos, and post attachments. |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** (v9+) or **yarn** / **pnpm**
- An active [Appwrite Cloud](https://cloud.appwrite.io/) account (or self-hosted Appwrite instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manis30/CodeSphere.git
   cd CodeSphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your Appwrite credentials in `.env`.

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🗄 Database & Backend Setup (Appwrite)

Ensure the following collections and attributes are created in your Appwrite Database:

### 1. `users` Collection
- `name` (String, required)
- `email` (String, required)
- `username` (String)
- `designation` (String)
- `bio` (String)
- `location` (String)
- `skills` (String[], array)
- `github` (String, URL)
- `linkedin` (String, URL)
- `portfolio` (String, URL)
- `profileimage` (String, File ID)
- `coverimage` (String, File ID)
- `followers` (Integer, default 0)
- `following` (Integer, default 0)
- `isonline` (Boolean, default false)
- `lastseen` (Datetime / String)

### 2. `posts` Collection
- `userid` (String, required)
- `description` (String, required)
- `projectlink` (String, URL)
- `tags` (String[], array)
- `postimage` (String, File ID)
- `likes` (Integer, default 0)
- `comments` (Integer, default 0)
- `isedit` (Boolean, default false)

### 3. `messages` Collection
- `conversationid` (String, required)
- `senderid` (String, required)
- `receiverid` (String, required)
- `message` (String, required)

### 4. `conversations` Collection
- `participants` (String[], array)
- `lastmessage` (String)
- `lastmessagetime` (Datetime / String)

### 5. Storage Bucket
- Create a bucket named e.g. `profiles` and grant **Read/Write** permissions to `users` or `Any` as needed for public profile viewing.

---

## 🌐 Deployment

CodeSphere is configured for seamless deployment on **Vercel**.

### Vercel Deployment Steps:
1. Push your code to GitHub.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. In **Project Settings > Environment Variables**, add all environment keys defined in `.env.example`.
4. The included `vercel.json` ensures all client-side routes (SPA) redirect correctly to `index.html`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
5. Click **Deploy**.

🔗 **Production URL:** [https://code-sphere-delta.vercel.app/](https://code-sphere-delta.vercel.app/)

---

## 🤝 Contributing

Contributions make the open-source community an inspiring place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for the global developer community by <a href="https://github.com/Manis30">Mani S</a>.
</p>
