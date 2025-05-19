import FileUploader from '@/components/FileUploader/FileUploader'
import AllFilesPreview from '@/pages/Dashboard/AllFilesPreview'
import { useStore } from '@/store/store'
import { formatBytes } from '@/utils/helpers'

const Dashboard = () => {
  const files = useStore((state) => state.allFiles)
  const mockFiles = useStore((state) => state.mockFiles)

  const totalFilesSize = formatBytes(
    [...mockFiles, ...files].reduce((sum, file) => sum + file.size, 0),
    2
  )

  return (
    <div className=" w-full h-full flex flex-col  ">
      <div className="flex gap-x-3 w-full h-3/12">
        <div className="w-2/4 gap-x-3  flex justify-center  ">
          <div className="w-1/2 bg-CardBg p-8 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-4xl  flex  items-end text-Brand font-Secondary font-medium">
              ~{totalFilesSize}
            </p>
            <p className="text-l text-Primary-06 ">Total Size</p>
          </div>
          <div className="w-1/2 bg-CardBg p-8 rounded-2xl  flex flex-col items-center justify-center">
            <p className="text-4xl  text-Brand font-Secondary font-medium">
              ~{files.length + mockFiles.length}
            </p>
            <p className=" text-Primary-06 ml-2 ">Total Files</p>
          </div>
        </div>
        <div className="w-2/4 rounded-2xl">
          <div className="h-full w-full bg-CardBg  rounded-2xl">
            <div
              className="scroll-container h-full w-full 
          overflow-auto flex justify-center items-center rounded-2xl"
            >
              <FileUploader iconSize="60px" />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto scroll-container w-full mt-3 bg-CardBg h-9/12 rounded-2xl">
        <AllFilesPreview />
      </div>
    </div>
  )
}

export default Dashboard
