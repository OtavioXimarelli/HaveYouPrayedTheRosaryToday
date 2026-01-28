# 📿 Have You Prayed the Rosary Today?

A beautiful, minimalist web application to track daily Rosary prayers and connect with a supportive prayer community.

## Features

- **Daily Check-in**: Record your daily Rosary prayer with mystery selection, reflections, and intentions
- **Smart Mystery Selection**: Auto-suggests the appropriate mystery based on the day of the week
- **Streak Tracking**: Gamification through consecutive day streaks
- **Community Feed**: See and interact with other believers' prayer check-ins
- **Amen Button**: Like system for prayer support (similar to a "like" button)
- **Comments**: Leave encouraging words for fellow pray-ers
- **Mobile-First Design**: Responsive design optimized for all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Shadcn/UI-style components
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React

## Architecture

This project uses a **Service/Repository Pattern** to ensure seamless transition from mock data to a real backend.

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                 # Base UI components (Button, Dialog, etc.)
│   ├── hero-section.tsx    # Main hero with CTA
│   ├── check-in-modal.tsx  # Prayer check-in form
│   ├── community-feed.tsx  # Social feed of prayers
│   └── streak-counter.tsx  # Gamification display
├── hooks/                  # Custom React hooks
│   ├── use-rosary.ts       # API hooks (React Query)
│   └── use-toast.ts        # Toast notifications
├── lib/                    # Utility functions
├── providers/              # React context providers
├── services/               # API service layer
│   ├── api.ts              # Service functions (mock implementation)
│   └── mockData.ts         # Mock data store
└── types/                  # TypeScript type definitions
```

### Mock Services

The `services/api.ts` file contains mock implementations that simulate network latency:

```typescript
// Example: Submit a check-in
export async function submitCheckIn(request: CreateCheckInRequest): Promise<CreateCheckInResponse> {
  await delay(500); // Simulate network latency
  // ... mock implementation
}
```

When the Java Spring Boot backend is ready, simply replace the mock implementations with actual API calls.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Design System

### Colors

- **Navy** (Primary): `#1E3A5F` - Deep, serene background
- **Gold** (Accent): `#D4AF37` - Subtle highlights and CTAs
- **White**: Clean text and cards

### Typography

- Clean, readable fonts with proper hierarchy
- Mobile-optimized sizes

## Future Backend Integration

The mock services are designed to be replaced with real API calls:

1. Update `services/api.ts` to call your Java Spring Boot endpoints
2. Keep the same function signatures
3. UI components remain unchanged

Example endpoint mappings:
- `POST /api/checkins` → `submitCheckIn()`
- `GET /api/feed` → `getFeed()`
- `GET /api/users/me/stats` → `getUserStats()`
- `POST /api/checkins/:id/amen` → `addAmen()`
- `POST /api/checkins/:id/comments` → `addComment()`

## License

MIT

---

*Built with faith and love* 🙏
