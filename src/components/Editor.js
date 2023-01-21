import { useContext } from 'react'
import EditorContext from '../contexts/EditorContext.js'

export default function Editor() {
  const editorContext = useContext(EditorContext)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between h-10 px-4 text-xs uppercase font-bold border-b border-primary">
        Markdown
      </div>
      <textarea
        value={editorContext.unparsedText}
        onChange={(e) => editorContext.setUnparsedText(e.target.value)}
        className="flex-1 text-black w-full h-full p-4 overflow-y-scroll resize-none focus:outline-none"
      ></textarea>
    </div>
  )
}
