import FileUploader from '../components/FileUploader/FileUploader'

const UploadFiles = () => {
  return (
    <div className="w-full h-full flex flex-col bg-CardBg rounded-2xl">
      <FileUploader iconSize="80px" />
    </div>
  )
}

export default UploadFiles
