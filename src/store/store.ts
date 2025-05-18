import { create } from 'zustand'
import type { FileData } from '../types'
import { mockData } from '../utils/mockFiles'

interface State {
  allFiles: FileData[]
  mockFiles: FileData[]
  uploadedFiles: File[]
  filteredData: FileData[]
  setAllFiles: (files: FileData[]) => void
  setUploadedFiles: (files: File[]) => void
  setFilteredData: (files: FileData[]) => void
  setMockFiles: (files: FileData[]) => void
}

export const useStore = create<State>()((set) => ({
  allFiles: [],
  uploadedFiles: [],
  filteredData: [],
  mockFiles: [...mockData],
  setAllFiles: (files: FileData[]) => set({ allFiles: files }),
  setMockFiles: (data: FileData[]) => set({ mockFiles: data }),
  setUploadedFiles: (data) => set({ uploadedFiles: data }),
  setFilteredData: (data) =>
    set((state) => ({
      ...state,
      filteredData: data,
    })),
}))
