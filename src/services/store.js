import { create } from 'zustand'
import localStorageService from './localStorageService'

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => {
    return ({ user })
  }),
}))
