import FileUploader from './components/FileUploader'
import AllFilesPreview from './components/AllFiles/AllFilesPreview'
import { useStore } from './store/store'
import { formatBytes } from './utils/helpers'

const Dashboard = () => {
  const files = useStore((state) => state.allFiles)
  const mockFiles = useStore((state) => state.mockFiles)

  const totalFilesSize = formatBytes(
    [...mockFiles, ...files].reduce((sum, file) => sum + file.size, 0),
    1
  ).split(' ')

  return (
    <div className=" w-full h-full flex flex-col  ">
      <div className="flex w-full h-3/12">
        <div className="w-1/3   mr-3 flex justify-center  ">
          <div className="w-1/2 bg-CardBg p-8 rounded-2xl mr-3 flex flex-col items-center justify-center">
            <p className="text-5xl leading-[0.7] text-Brand font-Secondary font-medium">
              ~{files.length + mockFiles.length}
            </p>
            <p className=" text-Primary-006 ml-2 ">Total Files</p>
          </div>
          <div className="w-1/2 bg-CardBg p-8 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-5xl tracking-tight flex leading-[0.7] items-end text-Brand font-Secondary font-medium">
              ~{totalFilesSize[0]}{' '}
              <span className="text-xl">{totalFilesSize[1]}</span>
            </p>
            <p className="text-l text-Primary-006 ">Total Size</p>
          </div>
        </div>
        <div className="w-1/3 bg-CardBg rounded-2xl mr-3" />
        <div className="w-1/3 border-dashed border-Brand  rounded-2xl">
          <div className="h-full w-full bg-CardBg  rounded-2xl">
            <div
              className="scroll-container h-full w-full 
          overflow-auto flex justify-center items-center rounded-2xl p-4"
            >
              <FileUploader
                allowMultiple
                disabled={false}
                required={false}
                allowReorder
              />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-container overflow-auto w-ful mt-3 bg-CardBg h-9/12 rounded-2xl">
        <AllFilesPreview />
      </div>
    </div>
  )
}

export default Dashboard
