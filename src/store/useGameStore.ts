import { create } from 'zustand';

interface GameState {
  isInventoryOpen: boolean;
  toggleInventory: () => void;
  activeDialog: string | null;
  openDialog: (dialogId: string) => void;
  closeDialog: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isInventoryOpen: false,
  toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),
  activeDialog: null,
  openDialog: (dialogId) => set({ activeDialog: dialogId }),
  closeDialog: () => set({ activeDialog: null }),
}));
