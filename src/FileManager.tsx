import FileUploader from './components/FileUploader'

const FileManager = () => {
  return (
    <div className=" w-full h-full flex flex-col  ">
      <div className=" w-ful mb-6 bg-CardBg h-3/12 rounded-2xl" />
      <div className="scroll-container w-full bg-CardBg   h-9/12 rounded-2xl overflow-auto flex justify-center items-center ">
        <FileUploader
          allowMultiple
          disabled={false}
          required={false}
          allowReorder
        />
      </div>
    </div>
  )
}

export default FileManager
