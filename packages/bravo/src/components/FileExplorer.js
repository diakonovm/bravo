import sortBy from 'lodash/sortBy'
import { useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../contexts/EditorContext.js'

export default function Menu({ className }) {
  const { state, dispatch } = useContext(EditorContext)
  const [tempFile, setTempFile] = useState(null)
  const [fileReader] = useState(() => (FileReader ? new FileReader() : null))
  const importRef = useRef(null)
  const documents = sortBy(state.documents, [
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

      dispatch({ type: 'IMPORT_DOCUMENT', payload: { id, title, body } })
      dispatch({ type: 'SET_ACTIVE_TAB', payload: { id } })

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
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { id: document.id } })
  }

  const handleAddDocument = () => {
    const id = uuidv4()

    dispatch({ type: 'ADD_DOCUMENT', payload: { id } })
    dispatch({ type: 'ADD_TAB', payload: { id } })
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { id } })
  }

  const handleAddDocumentToTabs = (document) => {
    dispatch({ type: 'ADD_TAB', payload: { id: document.id } })
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { id: document.id } })
  }

  const handleStickTab = (document) => {
    dispatch({ type: 'STICK_TAB', payload: { id: document.id } })
  }

  return (
    <div className={`h-full flex flex-col min-h-0 ${className}`}>
      <div className="flex-1 py-4 overflow-y-scroll">
        <div className="flex items-center justify-between px-[18px] mb-2.5">
          <p className="text-xs tracking-wide uppercase font-bold text-accent">Explorer</p>
          <button onClick={handleAddDocument}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </button>
        </div>
        {documents.map((item) => {
          return (
            <button
              onClick={() => handleAddDocumentToTabs(item)}
              onDoubleClick={() => handleStickTab(item)}
              key={item.id}
              className={`w-full text-left py-[3px] px-[18px] text-sm truncate cursor-pointer transition-all duration-150 ${
                item.id === state.active
                  ? 'text-oxford-blue-400 bg-oxford-blue-100/10'
                  : 'text-oxford-blue-400 hover:bg-oxford-blue-100/10'
              }`}
            >
              {item.title}
            </button>
          )
        })}
      </div>
      <div className="flex-shink-0 py-2 px-4">
        <button
          onClick={handleImport}
          className="w-full py-2 text-sm font-semibold text-oxford-blue-100 bg-oxford-blue-700 rounded-lg"
        >
          Import
        </button>
        <input onChange={importSelectedFile} ref={importRef} type="file" className="hidden" />
      </div>
    </div>
  )
}
