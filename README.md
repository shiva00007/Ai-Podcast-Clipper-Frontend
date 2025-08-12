# 🎙️ AIPodcast Clipper SaaS 



## 🤖 Introduction  
AIPodcast Clipper SaaS is a full-stack AI-powered platform that automatically detects the most engaging moments in podcasts & videos, and turns them into share-ready clips with subtitles.
Built with Next.js, FastAPI, Prisma, and shadcn/ui, it uses WhisperX, Gemini AI, and asd for advanced speech-to-text, speaker separation, and audio segment detection. The entire pipeline is automated with Inngest for event processing and Modal for AI model deployment.  

## ⚙️ Tech Stack  
- **Frontend:** Next.js, Tailwind CSS, ShadCN UI  
- **Backend:** Node.js, Prisma, PostgreSQL  
- **AI Integration:** Gemini AI  
- **Authentication:** NextAuth / JWT  


## 🔋 Features  
- 👉 **AI Moment Detection** – Detects the most interesting podcast/video segments.
- 👉 **Auto Subtitles** – Generates accurate, time-synced captions.
- 👉 **Audio Segment Detection** – Filters noise and keeps clean speech clips.
- 👉 **Video Processing Pipeline** – End-to-end automation from upload to download.
- 👉 **Secure Authentication** – NextAuth.js integration for protected dashboards.
- 👉 **Clip Management Dashboard** – Browse, preview, and download clips.
- 👉 **Cloud Storage** – Store original videos & generated clips in S3.

## 🌟 Highlights  
- **Multi-step AI Processing:** WhisperX + asd + Gemini AI for precision.  
- **Event-Driven Architecture:** Inngest for background job orchestration.
- **Serverless AI Models:** Deployed on Modal for scalability.
- **Responsive Dashboard:** Built with shadcn/ui & Tailwind CSS.
- **Type-Safe Database:** Prisma ORM with PostgreSQL.  

---

## 🚀 Quick Start  

### Prerequisites  
Ensure you have the following installed:  
- Git  
- Python 3.10
- PostgreSQL
- npm or yarn  

### Cloning the Repository  
```bash
git clone https://github.com/shiva00007/Ai-Podcast-Clipper-Frontend.git
cd Ai-Podcast-Clipper-Frontend
```
