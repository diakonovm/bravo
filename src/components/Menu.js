import { useContext, useEffect, useRef, useState } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'
import { v4 as uuidv4 } from 'uuid'
import sortBy from 'lodash/sortBy'

export default function Menu({ className }) {
  const editorContext = useContext(EditorContext)
  const { state, dispatch } = editorContext
  const [tempFile, setTempFile] = useState(null)
  const [fileReader] = useState(() => (FileReader ? new FileReader() : null))
  const importRef = useRef(null)
  const documents = sortBy(state.collection, [
    (i) => {
      return i.title.toLowerCase()
    },
    'createdAt'
  ])

  useEffect(() => {
    const processTempFile = () => {
      const title = tempFile.name
      const body = fileReader.result
      const id = uuidv4()

      dispatch({ type: 'IMPORT', payload: { id, title, body } })
      dispatch({ type: 'SET_ACTIVE', payload: { id } })

      setTempFile(null)
    }

    fileReader.addEventListener('load', processTempFile)

    return () => {
      fileReader.removeEventListener('load', processTempFile)
    }
  }, [dispatch, fileReader, tempFile])

  const importSelectedFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]

    // TODO: Validate file type + size

    setTempFile(file)

    if (file) {
      fileReader.readAsText(file)
    }
  }

  const handleImport = () => {
    importRef.current.click()
  }

  const handleSetActiveDocument = (document) => {
    dispatch({ type: 'SET_ACTIVE', payload: { id: document.id } })
  }

  return (
    <div className={`flex flex-col pb-4 ${className}`}>
      <div className="flex flex-col h-12 px-4 border-b border-accent/50"></div>
      <div className="flex-1 py-4">
        <p className="px-[18px] mb-2 text-xs tracking-wide uppercase font-bold text-accent">Explorer</p>
        {documents.map((item) => {
          return (
            <div
              onClick={() => handleSetActiveDocument(item)}
              key={item.id}
              className={`py-[3px] px-[18px] text-sm truncate cursor-pointer hover:bg-red-100/10 ${
                item.id === state.active ? 'bg-red-100/10' : null
              }`}
            >
              {item.title}
            </div>
          )
        })}
      </div>
      <div className="flex-shink-0 px-4">
        <button
          onClick={handleImport}
          className="w-full py-2 text-sm font-semibold text-white uppercase border border-white rounded-lg"
        >
          import
        </button>
        <input onChange={importSelectedFile} ref={importRef} type="file" className="hidden" />
      </div>
    </div>
  )
}
