import { useContext, useMemo } from 'react'
import { EditorContext } from '../contexts/EditorContext'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { DateTime } from 'luxon'

export default function EditorMetaData({ className }) {
  const { state } = useContext(EditorContext)

  const document = state.documents.find((item) => item.id === state.active)

  const meta = useMemo(() => {
    let meta = {
      wc: 0,
      updatedAt: ''
    }

    if (document) {
      meta.updatedAt = DateTime.fromISO(document.updatedAt).toFormat('DDDD t')

      let html = marked.parse(DOMPurify.sanitize(document.body))
      html = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      meta.wc = html.split(' ').length
    }

    return meta
  }, [document])

  return (
    <div className={`${className} text-[10px] divide-x divide-white/50`}>
      {document && (
        <>
          <p className="pr-3">
            <span className="font-light">words </span>
            <span className="font-regular">{meta.wc}</span>
          </p>

          <p className="pl-3">
            <span className="font-light">updated on </span>
            <span className="font-regular">{meta.updatedAt}</span>
          </p>
        </>
      )}
    </div>
  )
}
