import { useState } from 'react'

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import type { FilePondFile } from 'filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FileUploaderProps {
  allowMultiple: boolean
  maxFiles?: number
  disabled: boolean
  required: boolean
  allowReorder: boolean
}

const FileUploader = ({
  allowMultiple,
  disabled,
  required,
  allowReorder,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="p-4 w-full h-full ">
      <FilePond
        files={files}
        allowMultiple={allowMultiple}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems.map((fileItem) => fileItem.file as File))
        }}
        disabled={disabled}
        required={required}
        allowReorder={allowReorder}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        credits={false}
        acceptedFileTypes={['image/*']}
        imagePreviewHeight={170}
      />
    </div>
  )
}

export default FileUploader
