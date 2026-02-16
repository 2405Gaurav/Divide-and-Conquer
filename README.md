# DIVIDE AND CONQUER

## Smart Expense Splitting • Real-time Sync • AI-Powered Insights

### 🌐 [Live Demo](https://dac-gt.thegauravthakur.in/) • 📦 [GitHub Repository](https://github.com/2405Gaurav/Divide-and-Conquer) • ⚡ [Built with Next.js](https://nextjs.org/)

---

## 📝 Overview

⚡ **The Problem**: Splitting expenses is a nightmare. Spreadsheets fail. Manual calculations error. Friendships suffer.

✨ **The Solution**: Divide and Conquer—a beautifully crafted, real-time expense-sharing app with intelligent settlement algorithms, automated reports, and smart reminders. Built on cutting-edge backend architecture with system design principles that scale.

Stop keeping track of who owes what. Let Divide and Conquer handle the math, the reminders, and the peace of mind.

---

## ✨ Key Features

✅ **Smart Expense Management** - Track, categorize, and settle expenses in seconds  
✅ **Group Expenses** - Create groups for trips, roommates, or any shared venture  
✅ **Automated Reports** - Weekly and monthly spending insights generated automatically  
✅ **Intelligent Reminders** - Never miss a payment with smart notification system  
✅ **Settlement Tracking** - See exactly who owes whom at a glance  
✅ **Contact Management** - Build your network of frequent expense sharers  
✅ **Real-time Balance Updates** - Instant synchronization across all devices  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js + JavaScript
- **Database**: [Convex](https://www.convex.dev/) - Real-time database built for modern apps
- **Background Jobs**: [Inngest](https://www.inngest.com/) - Reliable event-driven functions
- **Architecture**: System Design Principles with scalable patterns

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.js                          # Landing page
│   ├── dashboard/                       # Main dashboard
│   ├── contacts/                        # Contact management
│   ├── expenses/                        # Expense tracking
│   │   └── new                          # Create new expense
│   ├── groups/                          # Group management
│   │   └── [id]                         # Group details
│   ├── person/                          # Individual person page
│   │   └── [id]                         # Person details
│   ├── settlements/                     # Settlement history
│   ├── api/                             # Backend routes
│   │   └── inngest/                     # Inngest event handlers
│   └── layout.js                        # Root layout
│
├── lib/
│   ├── inngest/                         # Inngest client configuration
│   ├── payment-reminder.js              # Payment reminder functions
│   ├── spending-insights.js             # Analytics & insights
│   ├── expense-categories.js            # Category management
│   ├── utils.js                         # Utility functions
│   └── useStoreUserEffect.js            # Custom hooks
│
├── components/
│   ├── ui/
│   │   ├── ConvexClientProvider.jsx    # Convex provider wrapper
│   │   ├── expense-list.jsx             # Expense listing component
│   │   ├── group-balances.jsx           # Group balance display
│   │   ├── group-members.jsx            # Group members component
│   │   └── header.jsx                   # App header
│   │
│   └── hooks/
│       ├── howitworks.jsx               # Feature explanation
│       └── settlement-list.jsx          # Settlement display
│
├── convex/
│   ├── schema.ts                        # Convex database schema
│   ├── users.ts                         # User operations
│   ├── expenses.ts                      # Expense operations
│   ├── groups.ts                        # Group operations
│   └── settlements.ts                   # Settlement logic
│
└── public/
    └── assets/                          # Static assets
```

---

## 🚀 Core Functionality

### 💰 Expense Management
- Create expenses and assign them to groups or individuals
- Automatic splitting logic (equal split, custom amounts, percentage-based)
- Real-time expense synchronization across all users

### 📊 Spending Insights
- **Weekly Reports**: Automated analysis of weekly spending patterns
- **Monthly Reports**: Comprehensive monthly expense breakdown
- **Smart Categories**: Track spending by category
- Generated via Inngest cron jobs (runs at 8 AM daily)

### 🔔 Notifications & Reminders
- **Payment Reminders**: Scheduled notifications for upcoming payments
- **Settlement Alerts**: Know immediately when someone settles up
- **Group Updates**: Stay informed about group activities

### 👥 Group Management
- Create groups for trips, roommates, or events
- Invite friends with ease
- Track group-specific expenses and balances
- View settlement history within groups

### 🔗 Smart Settlements
- Intelligent settlement algorithm minimizes number of transactions
- Visual settlement flow showing exactly who pays whom
- Mark settlements as complete with single click
- Full audit trail of all settlements

---

## 🎯 Inngest Automation

The app leverages **Inngest** for reliable, serverless background jobs:

```javascript
// Example: Monthly Spending Insights
export const spendingInsights = inngest.createFunction(
  { name: "Generate Spending Insights" },
  { cron: "0 8 1 * *" }, // 1st of every month at 08:00
  async ({ step }) => {
    // Pull users with expenses this month
    // Generate detailed insights
    // Send notifications
  }
);
```

**Automated Jobs:**
- 📈 Weekly spending analysis
- 📊 Monthly report generation
- 🔔 Payment reminders
- 📧 Notification delivery

---

## 🗄️ Database (Convex)

Convex provides a real-time database with built-in authentication and instant reactivity:

**Key Collections:**
- `users` - User profiles and authentication
- `expenses` - All expense records with metadata
- `groups` - Shared expense groups
- `settlements` - Payment settlement history
- `reminders` - Scheduled reminders
- `notifications` - User notifications

**Benefits:**
- ⚡ Real-time synchronization
- 🔐 Built-in permission system
- 📱 Optimized for mobile apps
- 🚀 Serverless functions included

---

## 🎨 System Design Highlights

This project implements several key system design principles:

**Scalability**
- Stateless backend architecture
- Horizontal scaling with Convex's managed database
- Efficient querying and indexing strategies

**Reliability**
- Inngest ensures jobs run reliably with retries
- Eventual consistency for distributed transactions
- Comprehensive error handling

**Performance**
- Real-time updates via WebSocket
- Optimized database queries
- Client-side caching and state management

**User Experience**
- Instant feedback for all actions
- Smooth animations and transitions
- Mobile-responsive design

*More system design deep-dives coming soon in the Notion documentation!*

---

## 🔄 Data Flow

```
User Action (Create Expense)
    ↓
Next.js API Route
    ↓
Convex Database Mutation
    ↓
Real-time Update via WebSocket
    ↓
All Users See Updated Balances
    ↓
Inngest triggers settlement logic
    ↓
Notifications sent to affected users
```

---

## 📈 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/divide-and-conquer.git

# Navigate to project
cd divide-and-conquer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_deployment
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_signing_key
GEMINI_API_KEY=your_gemini_key (for AI features)
NEXT_PUBLIC_CONVEX_URL=your_public_convex_url
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📚 Learning & Documentation

### Coming Soon: Notion Deep Dive 📖
I'm building comprehensive Notion documentation covering:
- **System Design Breakdown** - Architecture decisions and trade-offs
- **Database Schema Design** - Convex data modeling patterns
- **Backend Optimization** - Query strategies and performance tips
- **Real-time Sync Implementation** - WebSocket integration details
- **Inngest Integration** - Background job design patterns
- **Scalability Patterns** - How to scale from 100 to 1M users

*Stay tuned! Notion notes will be released soon.*

---

## 🎓 Skills & Learning Journey

This project is part of my backend development journey, focusing on:

✅ Real-time database design and optimization  
✅ Background job orchestration with Inngest  
✅ System design principles in production  
✅ Building scalable applications  
✅ User-centric feature implementation  
✅ Continuous improvement and daily iteration  

**Daily Improvements**: This project is actively maintained and improved daily as I sharpen my backend engineering skills.





## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Payment integration (Stripe)
- [ ] AI-powered expense categorization
- [ ] Advanced analytics dashboard
- [ ] Social features (expense polls, voting)
- [ ] Export reports (PDF, CSV)
- [ ] Multi-currency support
- [ ] Blockchain settlement verification (experimental)

---

## 🐛 Known Issues & Improvements

Currently working on:
- Optimizing settlement algorithm for large groups
- Improving notification delivery reliability
- Enhancing mobile responsiveness
- Adding more spending categories

---

## 📄 License

This project is open source and available under the MIT License.

---



## 📞 Get in Touch

Have questions or suggestions? Connect with me:

- **Twitter**: [@thegauravthakur](https://twitter.com/thegauravthakur)
- **GitHub**: [@thegauravthakur](https://github.com/thegauravthakur)
- **Email**: your.email@example.com

---

## 🙏 Acknowledgments

- [Convex](https://www.convex.dev/) - For the amazing real-time database
- [Inngest](https://www.inngest.com/) - For reliable background jobs
- [Next.js](https://nextjs.org/) - For the fantastic framework
- All contributors and users of Divide and Conquer

---

## 🚀 Try It Now

**Live Demo**: [https://dac-gt.thegauravthakur.in/](https://dac-gt.thegauravthakur.in/)

Start tracking expenses and stop stressing about who owes what. **Divide and Conquer makes it simple.**

---

*Last Updated: February 2026*  
*Building better every day. 💪*
