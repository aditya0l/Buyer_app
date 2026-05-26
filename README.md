# CarBounty Buyer App

> **React Native CLI** | TypeScript | Zustand | React Query | MMKV

A car-buying marketplace where buyers post purchase intents, certified dealers compete with real-time quotes in bid rooms, and buyers select winners and track delivery to their door.

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node | ≥ 22.11.0 |
| Ruby | ≥ 2.7 (for CocoaPods) |
| Xcode | ≥ 15 (iOS) |
| Android Studio | Latest |
| JDK | 17+ |

### Installation

```bash
# Clone / open project
cd buyer_app

# Install JS dependencies
npm install

# Install iOS native dependencies
cd ios && bundle install && bundle exec pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS (simulator)
npx react-native run-ios

# Run on Android (emulator or device)
npx react-native run-android
```

---

## Environment Variables

Create `.env` at the project root:

```env
API_BASE_URL=https://api.carbounty.in/v1
USE_MOCK=true
```

Update `src/constants/config.ts` to use these values (currently hardcoded):

```typescript
// src/constants/config.ts
export const config = {
  API_BASE_URL: 'https://api.carbounty.in/v1',
  USE_MOCK: true,        // Toggle: true = mock data, false = live API
  TIMEOUT: 15000,
};
```

---

## Mock → Live API Switch

1. Set `USE_MOCK: false` in `src/constants/config.ts`
2. All service files in `src/api/` (when created) will use the `apiClient` from `src/api/client.ts`
3. Each screen uses React Query — replace mock data with `useQuery` calls to service functions
4. Auth token is auto-injected via the Axios request interceptor in `src/api/client.ts`
5. 401 responses auto-logout the user and redirect to OTP screen

### Example Pattern

```typescript
// MOCK (current):
const room = mockBidRooms.find(r => r.id === roomId);

// LIVE API (swap in):
const { data: room } = useQuery({
  queryKey: ['bidRoom', roomId],
  queryFn: () => bidRoomService.getRoom(roomId),
});
```

---

## Architecture

```
src/
├── api/                  Axios client + endpoint constants + service functions
├── components/
│   ├── cards/            BidRoomCard, QuoteCard, ActiveOrderCard, PurchaseHistoryCard…
│   ├── common/           Button, Input, Badge, TimerCountdown, PriceText, SavingsChip…
│   └── layout/           ScreenWrapper, Header, SectionHeader
├── constants/            Design tokens: colors, typography, spacing, radius, shadows
├── hooks/                useTimer, (useAuth, useBidRoom, useWallet — ready to add)
├── mocks/                Mock data for all domains (USE_MOCK=true)
├── navigation/           AppNavigator, Auth/Main stack, BottomTabNavigator, types
├── screens/              Organized by domain (auth, bidroom, browse, orders…)
├── store/                Zustand stores: authStore, bidRoomStore, notificationStore
└── utils/                formatPrice, formatDate, statusLabels, storage (MMKV)
```

---

## Design Tokens

All design tokens live in `src/constants/colors.ts`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2563EB` | Buttons, links, active tab |
| `navBg` | `#1A1A6E` | Bottom nav background |
| `appBg` | `#F5F5F5` | App background |
| `live` | `#16A34A` | Live badge, savings, Done |
| `waiting` | `#F97316` | Waiting badge, timer orange |
| `error` | `#DC2626` | Errors, danger actions |

To swap Figma tokens: update only `src/constants/colors.ts` — all screens and components reference tokens, never raw hex values.

---

## Navigation Map

```
SplashScreen
  ├── [No token] → OTPScreen → OnboardingCityScreen → OnboardingBrandsScreen
  └── [Token valid] → MainTabs (Bottom Nav)

MainTabs:
  🏠 Home       → BidRoom, OrderDetail, PurchaseHistory, NotificationCenter
  🔍 Browse     → ModelDetail → CreateIntent → CommitmentPay → IntentSuccess → BidRoom
  ⚡ Bid Rooms  → BidRoomList → BidRoom → SelectWinner → PriceLock → OrderDetail
  📦 Orders     → OrderList → OrderDetail → DeliveryOTP, Dispute
  👤 Profile    → EditProfile, Wallet → BuyCredits, DocumentsVault → DocumentFolder → DocumentViewer
                  PurchaseHistory, Support → RaiseTicket, TicketDetail
                  PrivacySettings, Security, NotificationCenter
```

---

## Key Business Rules Enforced in UI

| Rule | Where |
|------|-------|
| No buyer-dealer chat | No chat UI anywhere |
| Commitment before room | `CommitmentPayScreen` blocks until payment confirmed |
| Winner selection required | `BidRoomScreen` action bar |
| Lock timer countdown | `PriceLockScreen` Reanimated countdown |
| VIN status tags shown | `OrderDetailScreen` — In-Stock / Upcoming ETA / Advance Order |
| Delivery OTP gate | `DeliveryOTPScreen` only accessible when status = "Delivery Scheduled" |
| Auto-refund highlight | `WalletScreen` ledger entry type "Refund" with reason |
| Comparison max 4 rooms | `ComparisonGroupScreen` always shows 2–4 child rooms |

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` + stacks + tabs | Navigation |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area handling |
| `zustand` | Global client state |
| `@tanstack/react-query` | Server state + caching |
| `axios` | HTTP client |
| `react-native-mmkv` | Fast persistent storage |
| `react-native-reanimated` | Animations (timer, transitions) |
| `react-native-gesture-handler` | Gesture support |
| `react-hook-form` + `@hookform/resolvers` | Form management |
| `zod` | Schema validation |
| `date-fns` | Date formatting |
| `react-native-vector-icons` | Icon support |

---

## Testing

```bash
# Run Jest tests
npm test

# Lint
npm run lint
```

---

## FAQ

**Q: How do I add a new screen?**
1. Create the screen in the appropriate folder under `src/screens/`
2. Add the route to `src/navigation/types.ts`
3. Import and register in `src/navigation/MainStackNavigator.tsx`

**Q: How do I add a new color token?**
Update `src/constants/colors.ts` only. All screens reference tokens via the `colors` import.

**Q: Why MMKV and not AsyncStorage?**
MMKV is synchronous and ~10x faster. Auth tokens need synchronous access in the Axios interceptor.
