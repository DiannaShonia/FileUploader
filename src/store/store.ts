import { create } from 'zustand'
import type { FileData } from '../types'

interface State {
  allFiles: FileData[]
  uploadedFiles: File[]
  filteredData: FileData[]
  setAllFiles: (files: FileData[]) => void
  setUploadedFiles: (files: File[]) => void
  setFilteredData: (files: FileData[]) => void
}

export const useStore = create<State>()((set) => ({
  allFiles: [],
  uploadedFiles: [],
  filteredData: [],
  setAllFiles: (data) => set({ allFiles: data }),
  setUploadedFiles: (data) => set({ uploadedFiles: data }),
  setFilteredData: (data) =>
    set((state) => ({
      ...state,
      filteredData: data,
    })),
}))
