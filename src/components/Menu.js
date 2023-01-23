import { useContext, useEffect, useRef, useState } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'

export default function Menu({ className }) {
  const editorContext = useContext(EditorContext)

  const [fileReader] = useState(() => {
    if (FileReader) return new FileReader()

    return null
  })
  const importRef = useRef(null)

  useEffect(() => {
    const readFileOnLoad = () => {
      const text = fileReader.result
      editorContext.setUnparsedText(text)
    }

    fileReader.addEventListener('load', readFileOnLoad)

    return () => {
      fileReader.removeEventListener('load', readFileOnLoad)
    }
  }, [])

  const handleFileImport = () => {
    importRef.current.click()
  }

  const importSelectedFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]

    if (file) {
      fileReader.readAsText(file)
    }
  }

  return (
    <div className={`flex flex-col pb-4 ${className}`}>
      <div className="flex-1"></div>
      <div className="flex-shink-0 px-4">
        <button
          onClick={handleFileImport}
          className="w-full py-2 text-sm font-semibold text-white uppercase border border-white rounded-lg"
        >
          import
        </button>
        <input onChange={importSelectedFile} ref={importRef} type="file" className="hidden" />
      </div>
    </div>
  )
}
