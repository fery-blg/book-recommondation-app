import { create } from 'zustand'
import { persist,createJSONStorage  } from 'zustand/middleware'


export const useUser = create(  persist(
  (set, get) => ({
    user: 0,
    setUser: (data) => set({ user: data })
  }),
  {
    name: 'userStore', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  }
))