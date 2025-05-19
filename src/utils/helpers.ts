import type { FileData } from '@/types'
import { toast } from 'react-toastify'

export const formatBytes = (byteSize: number, decimalPlaces = 2) => {
  if (byteSize === 0) return '0 Bytes'

  const kilobyte = 1024
  const precision = decimalPlaces < 0 ? 0 : decimalPlaces
  const sizeUnits = ['Bytes', 'KB', 'MB', 'GB']
  const unitIndex = Math.floor(Math.log(byteSize) / Math.log(kilobyte))

  return `${parseFloat((byteSize / Math.pow(kilobyte, unitIndex)).toFixed(precision))} ${sizeUnits[unitIndex]}`
}

export const formatDate = (date: number) => {
  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return d.toLocaleDateString('en-US', options)
}

export const filterDuplicates = (
  newFiles: FileData[],
  allFiles: FileData[]
): FileData[] => {
  const allFileNames = new Set(allFiles.map((file) => file.name))

  return newFiles.filter((newFile) => {
    const isDuplicate = allFileNames.has(newFile.name)
    if (isDuplicate) {
      toast.error(`"${newFile.name}" is already uploaded`)
    }
    return !isDuplicate
  })
}
