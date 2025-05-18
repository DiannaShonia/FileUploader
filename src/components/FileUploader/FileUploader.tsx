import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import FilePreview from './FilePreview'
import Upload from '../../assets/Icons/Upload'
import { useStore } from '../../store/store'

interface FileUploaderProps {
  listView?: boolean
  iconSize: string
}

const FileUploader = ({ iconSize, imagesOnly }: FileUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const setAllFiles = useStore((state) => state.setAllFiles)
  const allFiles = useStore((state) => state.allFiles)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fileData = acceptedFiles.map((file, index) => ({
        ...file,
        source: file.type.includes('image') ? URL.createObjectURL(file) : '',
        id: `${file.name + index + 1}`,
        key: `${file.name + index + 1}`,
        altText: '',
        type: file.type,
        lastModified: file.lastModified,
        size: file.size,
        name: file.name,
      }))

      setIsDragOver(false)
      setAllFiles([...fileData, ...allFiles])
      setFiles(fileData)
    },
    [allFiles, setAllFiles]
  )

  const onDragOver = () => {
    setIsDragOver(true)
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
    accept: imagesOnly && {
      'image/*': [],
    },
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
            <FilePreview setFiles={setFiles} files={files} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default FileUploader
