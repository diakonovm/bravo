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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between h-10 px-4 text-xs uppercase font-bold border-b border-primary">
        <input onChange={handleSetTitle} type="text" value={document.title} className="w-full p-0 focus:outline-none" />
      </div>
      <textarea
        value={document.body}
        onChange={handleSetBody}
        className="flex-1 text-black w-full h-full p-4 overflow-y-scroll resize-none focus:outline-none"
      ></textarea>
    </div>
  )
}
