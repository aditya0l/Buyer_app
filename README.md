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
API_BASE_URL=https://myapi.carbounty.com
USE_MOCK=true
```

Update `src/constants/config.ts` to use these values (currently hardcoded):

```typescript
// src/constants/config.ts
export const config = {
  API_BASE_URL: 'https://myapi.carbounty.com',
  USE_MOCK: true,        // Toggle: true = mock data, false = live API
  TIMEOUT: 10000,
};
```

---

## Mock → Live API Switch

1. Set `USE_MOCK: false` in `src/constants/config.ts`.
2. All service files in `src/api/` will utilize the Axios instance `apiClient` exported from `src/api/client.ts`.
3. Each screen utilizes React Query — swap mock state references with `useQuery` or `useMutation` hooks pulling from service modules.
4. Auth token is automatically injected into the request header via the Axios request interceptor defined in `src/api/client.ts`.
5. 401 Unauthorized responses trigger a session logout, clearing user credentials and redirecting to the OTP validation screen.

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
  Home       → BidRoom, OrderDetail, PurchaseHistory, NotificationCenter
  Browse     → ModelDetail → CreateIntent → CommitmentPay → IntentSuccess → BidRoom
  Bid Rooms  → BidRoomList → BidRoom → SelectWinner → PriceLock → OrderDetail
  Orders     → OrderList → OrderDetail → DeliveryOTP, Dispute
  Profile    → EditProfile, Wallet → BuyCredits, DocumentsVault → DocumentFolder → DocumentViewer
               PurchaseHistory, Support → RaiseTicket, TicketDetail
               PrivacySettings, Security, NotificationCenter
```

---

## Key Business Rules Enforced in UI

| Rule | Where |
|------|-------|
| No buyer-dealer chat | Chat interface is omitted project-wide |
| Commitment before room | `CommitmentPayScreen` blocks until payment is confirmed |
| Winner selection required | Handled via `BidRoomScreen` action bar |
| Lock timer countdown | Managed via `PriceLockScreen` state-driven countdown |
| VIN status tags shown | `OrderDetailScreen` displays In-Stock, Upcoming ETA, or Advance Order tags |
| Delivery OTP gate | `DeliveryOTPScreen` restricts action based on status = "Delivery Scheduled" |
| Auto-refund highlight | `WalletScreen` displays ledger entry type "Refund" with detailed reason |
| Comparison max 4 rooms | `ComparisonGroupScreen` constraints room render to 2-4 child items |

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `@react-navigation/bottom-tabs` | Navigation tab layout |
| `@react-navigation/native` | Navigation container and routing utilities |
| `@react-navigation/native-stack` | Native stack navigation |
| `@tanstack/react-query` | Server state fetching and caching |
| `axios` | HTTP client |
| `date-fns` | Date formatting and manipulation |
| `lucide-react-native` | System SVG icons |
| `react-native-gesture-handler` | Declarative gesture control system |
| `react-native-mmkv` | High-performance synchronous key-value storage |
| `react-native-safe-area-context` | Safe area insets management |
| `react-native-screens` | Native navigation screen optimization |
| `react-native-svg` | SVG element rendering support |
| `zustand` | Client-side state store |

---

## Testing

```bash
# Run Jest tests
npm test

# Run code linter
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
