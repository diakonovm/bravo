import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { useContext, useEffect, useState } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'

export default function Preview() {
  const { state } = useContext(EditorContext)
  const document = state.documents.find((item) => item.id === state.active)

  const [parsedText, setParsedText] = useState(() => {
    return document ? marked.parse(document.body) : ''
  })
  const [htmlFormat, setHtmlFormat] = useState(false)

  useEffect(() => {
    if (document) setParsedText(marked.parse(DOMPurify.sanitize(document.body)))
  }, [document])

  const handleSetFormat = () => {
    setHtmlFormat((format) => !format)
  }

  return (
    <>
      {document ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <svg width="68" height="93" viewBox="0 0 68 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.67969 83.3281C0.859375 81.1406 0.488281 78.5039 0.566406 75.418C0.644531 72.293 1.07422 68.543 1.85547 64.168C2.67578 59.793 3.90625 55.1055 5.54688 50.1055C9.33594 38.5039 14.4922 28.25 21.0156 19.3438C22.1484 17.8203 23.3203 17.0586 24.5312 17.0586C25.7813 17.0586 26.9922 17.332 28.1641 17.8789C29.375 18.4258 30.4297 19.0703 31.3281 19.8125C33.5938 21.6875 34.3359 23.2109 33.5547 24.3828C28.0469 33.2109 23.5352 41.1797 20.0195 48.2891C28.8867 47.6641 36.6992 44.8516 43.457 39.8516C50.8398 34.4219 54.5312 27.8203 54.5312 20.0469C54.5312 14.7734 51.9141 11.4141 46.6797 9.96875C45.0781 9.53906 43.1641 9.32422 40.9375 9.32422C38.75 9.32422 36.4648 9.55859 34.082 10.0273C31.7383 10.457 29.4727 11.0625 27.2852 11.8438C22.9492 13.4453 18.9844 15.5547 15.3906 18.1719C14.375 18.9141 13.4375 19.2852 12.5781 19.2852C11.7188 19.2852 10.7812 19.0703 9.76562 18.6406C8.75 18.1719 7.85156 17.6055 7.07031 16.9414C4.02344 14.3633 4.45312 11.6875 8.35938 8.91406C14.0234 4.92969 22.3828 2.35156 33.4375 1.17969C35.5078 0.984375 38.2617 0.886719 41.6992 0.886719C45.1758 0.886719 48.7109 1.45313 52.3047 2.58594C55.9375 3.71875 58.8477 5.24219 61.0352 7.15625C65.0586 10.75 67.0703 15.75 67.0703 22.1562C67.0703 27.9375 64.7852 33.6406 60.2148 39.2656C56.0352 44.4609 50.6445 48.6797 44.043 51.9219C47.207 53.3281 49.5703 55.3008 51.1328 57.8398C52.7344 60.3398 53.4961 63.0547 53.418 65.9844C53.3398 68.875 52.7539 71.5508 51.6602 74.0117C50.6055 76.4336 49.1602 78.6406 47.3242 80.6328C45.5273 82.5859 43.418 84.3242 40.9961 85.8477C38.6133 87.332 36.0938 88.5625 33.4375 89.5391C28.0078 91.5703 22.5 92.5859 16.9141 92.5859C9.0625 92.5859 3.98438 89.5 1.67969 83.3281ZM15.8594 57.7812C12.8906 65.1641 11.3281 71.5898 11.1719 77.0586C11.0938 79.7148 11.7383 81.7656 13.1055 83.2109C14.5117 84.6172 16.4258 85.3203 18.8477 85.3203C21.2695 85.3203 23.7695 84.793 26.3477 83.7383C28.9258 82.6836 31.2891 81.2578 33.4375 79.4609C38.3594 75.3203 40.8984 70.6328 41.0547 65.3984C41.1719 60.6328 39.0234 57.3906 34.6094 55.6719C33.2812 55.1641 31.8555 54.832 30.332 54.6758C28.4961 54.7539 25.918 55.2227 22.5977 56.082C19.3164 56.9414 17.0703 57.5078 15.8594 57.7812Z"
              fill="#97B9C9"
            />
          </svg>
        </div>
      )}
    </>
  )
}
