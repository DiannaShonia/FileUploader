import { useCallback, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import FilePreviewList from './FilePreviewList'
import Upload from '@/assets/Icons/Upload'
import { useStore } from '@/store/store'
import type { FileData } from '@/types'
import { toast } from 'react-toastify'

interface FileUploaderProps {
  iconSize: string
  multiple?: boolean
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
}

const FileUploader = ({
  iconSize,
  accept,
  multiple,
  maxSize,
  maxFiles,
}: FileUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<FileData[]>([])
  const setAllFiles = useStore((state) => state.setAllFiles)
  const allFiles = useStore((state) => state.allFiles)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: FileData[] = []
      const allFileNames = new Set(allFiles.map((file) => file.name))

      acceptedFiles.forEach((file: File, index: number) => {
        if (!allFileNames.has(file.name)) {
          const fileData: FileData = {
            ...file,
            source: file.type.includes('image')
              ? URL.createObjectURL(file)
              : '',
            id: `${file.name + index + 1}`,
            key: `${file.name + index + 1}`,
            altText: '',
            type: file.type,
            lastModified: file.lastModified,
            size: file.size,
            name: file.name,
            sortIndex: '',
          }
          newFiles.push(fileData)
          allFileNames.add(file.name)
        } else {
          toast.error(`File "${file.name}" already exists.`)
        }
      })

      setIsDragOver(false)
      setAllFiles([...newFiles, ...allFiles])
      setFiles(newFiles)
    },
    [allFiles, setAllFiles]
  )

  const onDropRejected = (fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        toast.error(` ${file.name} - ${error.message}`)
      })
    })
  }

  const onDragOver = () => {
    setIsDragOver(true)
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  // Max Files are per drop. Max size is per file
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
    onDropRejected,
    accept,
    maxSize,
    maxFiles,
    multiple,
  })

  return (
    <div
      className={`${files.length ? 'justify-start' : 'justify-center'}
       flex !w-full h-full overflow-hidden flex-col   p-4`}
    >
      <div
        className={`${isDragOver ? 'border-Line-05' : 'border-Line'}
        ${files.length ? 'h-1/4' : '!h-full'}
         w-full  flex justify-center items-center border-2 border-dashed  rounded-xl`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div
          className={`${files.length ? 'gap-2 flex' : 'gap-9 flex-col'} 
          flex  items-center justify-center  h-3/4 w-full`}
        >
          <Upload
            width={files.length ? '30px' : iconSize || '50px'}
            fill={isDragOver ? '#c5fcfc' : 'hsla(0, 0%, 100%, 0.6)'}
          />
          <p
            className={`${files.length ? 'text-sm' : 'text-base'} text-Primary-06`}
          >
            Drag 'n' drop or click here
          </p>
        </div>
      </div>
      {files.length ? (
        <div className="h-3/4">
          {files.length ? (
            <FilePreviewList setFiles={setFiles} files={files} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default FileUploader
