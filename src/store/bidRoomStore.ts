import { create } from 'zustand';
import { BidRoom, Quote, mockBidRooms } from '../mocks/mockBidRooms';

interface BidRoomState {
  rooms: BidRoom[];
  initializeRooms: () => void;
  tickTimers: () => void;
  addQuoteToRoom: (roomId: string, quote: Quote) => void;
  updateRoomStatus: (roomId: string, status: 'LIVE' | 'WAITING' | 'CLOSED') => void;
}

export const useBidRoomStore = create<BidRoomState>((set) => ({
  rooms: [],
  initializeRooms: () => {
    set({ rooms: mockBidRooms });
  },
  tickTimers: () => {
    set((state) => ({
      rooms: state.rooms.map((room) => {
        if (room.status === 'CLOSED' || room.timeRemainingSeconds <= 0) {
          return {
            ...room,
            timeRemainingSeconds: 0,
            status: room.status === 'WAITING' ? 'LIVE' : 'CLOSED', // WAITING transitions to LIVE, LIVE transitions to CLOSED
          };
        }
        return {
          ...room,
          timeRemainingSeconds: room.timeRemainingSeconds - 1,
        };
      }),
    }));
  },
  addQuoteToRoom: (roomId, quote) => {
    set((state) => ({
      rooms: state.rooms.map((room) => {
        if (room.id !== roomId) return room;
        const updatedQuotes = [...room.quotes, quote].sort((a, b) => a.onRoadTotal - b.onRoadTotal);
        // Highlight the best bid
        const bestBid = updatedQuotes[0]?.onRoadTotal || 0;
        const originalPrice = 1360000; // base benchmark
        const savings = Math.max(0, originalPrice - bestBid);
        return {
          ...room,
          quotes: updatedQuotes,
          bestBid,
          savings,
          dealersCount: room.dealersCount + 1,
        };
      }),
    }));
  },
  updateRoomStatus: (roomId, status) => {
    set((state) => ({
      rooms: state.rooms.map((room) => (room.id === roomId ? { ...room, status } : room)),
    }));
  },
}));
