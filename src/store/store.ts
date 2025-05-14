import { create } from 'zustand'

interface State {
  files: File[]
  setFiles: (files: File[]) => void
}

export const useStore = create<State>()((set) => ({
  files: [],
  setFiles: (data) => set({ files: data }),
}))
