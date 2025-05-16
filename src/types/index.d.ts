export interface FileData {
  lastModified: number
  name: string
  size: number
  type: string
  altText?: string
  source?: string
  sortIndex: number | string
  key: string | number
  file?: File
  id: string
}
