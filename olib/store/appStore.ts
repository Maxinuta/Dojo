// /lib/store/appStore.ts
//TODO: NEZAPOMEŇ TO ZMĚNIT REÁLNÉ TYPY/INTERFACE PROJEKTU VOLE!! Trocha abstrakce by taky neuškodila už je toho hodně..  
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type Status = 'new' | 'assigned' | 'in_progress' | 'delivered'

interface Order {
  id: number
  customerName: string
  address: string
  status: Status
  created_at: string
  notes?: string
}


interface UIState {
  sidebarOpen: boolean
  activeOrderId: number | null
  selectedDate: string | null
  theme: 'light' | 'dark'
}

interface AppState {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  
  orders: Order[]
  activeOrder: Order | null
  setOrders: (orders: Order[]) => void
  updateOrder: (orderId: number, data: Partial<Order>) => void
  setActiveOrder: (order: Order | null) => void
  

  user: {
    username: string | null;
    email: string | null;
    role: string | null;
    com: string | null;
  };
  setUser: (user: { username: string; email: string; role: string; com: string }) => void;

  ui: UIState
  toggleSidebar: () => void
  toggleTheme: () => void
  setSelectedDate: (date: string | null) => void
  
  clearStore: () => void
}

const defaultUIState: UIState = {
  sidebarOpen: true,
  activeOrderId: null,
  selectedDate: null,
  theme: 'dark'
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      user: {
        username: null,
        email: null,
        role: null,
        com: null
      },
      setUser: (user) => set({ user }),

      orders: [],
      activeOrder: null,
      setOrders: (orders) => set({ orders }),
      updateOrder: (orderId, data) => 
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, ...data } : order
          ),
        })),
      setActiveOrder: (order) => set({ activeOrder: order }),
      
      ui: defaultUIState,
      toggleTheme: () => 
        set((state) => ({
          ui: { 
            ...state.ui, 
            theme: state.ui.theme === 'light' ? 'dark' : 'light' 
          }
        })),
      toggleSidebar: () => 
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
        })),
      setSelectedDate: (date) =>
        set((state) => ({
          ui: { ...state.ui, selectedDate: date }
        })),
      
      clearStore: () => set({
        isAuthenticated: false,
        orders: [],
        activeOrder: null,
        ui: defaultUIState
      })
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        ui: state.ui,
        user: state.user
      })
    }
  )
)