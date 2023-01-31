import { useContext } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'

export default function Editor() {
  const editorContext = useContext(EditorContext)
  const { state, dispatch } = editorContext
  const document = state.collection.find((item) => item.id === state.active)

  const handleSetTitle = (event) => {
    dispatch({
      type: 'SET_TITLE',
      payload: { id: document.id, title: event.target.value }
    })
  }

  const handleSetBody = (event) => {
    dispatch({
      type: 'SET_BODY',
      payload: { id: document.id, body: event.target.value }
    })
  }

  const handleRemoveDocument = () => {
    dispatch({ type: 'REMOVE_DOCUMENT', payload: { id: document.id } })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between h-10 px-4 text-xs uppercase font-bold border-b border-accent">
        <input onChange={handleSetTitle} type="text" value={document.title} className="w-full p-0 focus:outline-none" />
        <button onClick={handleRemoveDocument} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <textarea
        value={document.body}
        onChange={handleSetBody}
        className="flex-1 text-black w-full h-full p-4 overflow-y-scroll resize-none focus:outline-none"
      ></textarea>
    </div>
  )
}
