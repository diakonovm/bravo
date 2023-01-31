import { useContext, useEffect, useState } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default function Preview() {
  const editorContext = useContext(EditorContext)
  const { state } = editorContext
  const document = state.collection.find((item) => item.id === state.active)

  const [parsedText, setParsedText] = useState(marked.parse(document.body))
  const [htmlFormat, setHtmlFormat] = useState(false)

  useEffect(() => {
    setParsedText(marked.parse(DOMPurify.sanitize(document.body)))
  }, [document.title, document.body])

  const handleSetFormat = () => {
    setHtmlFormat((format) => !format)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between h-10 px-4 text-xs font-bold border-b border-accent">
        <div>{document.title}</div>
        <svg
          onClick={handleSetFormat}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {htmlFormat ? (
        <div className="flex-1 w-full h-full p-4 text-black overflow-y-scroll break-words">
          <pre>{parsedText}</pre>
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: parsedText }}
          className="preview-text flex-1 w-full h-full p-4 text-black overflow-y-scroll"
        ></div>
      )}
    </div>
  )
}
