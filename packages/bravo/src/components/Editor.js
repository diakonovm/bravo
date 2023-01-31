import styled from '@emotion/styled'
import { useContext } from 'react'
import { EditorContext } from '../contexts/EditorContext.js'

const Wrapper = styled.div`
  scrollbar-height: 0px;

  ::-webkit-scrollbar {
    overflow: auto;
    height: 0px;
  }
`

export default function Editor() {
  const { state, dispatch } = useContext(EditorContext)

  const active = state.documents.find((item) => item.id === state.active)
  const { tabs } = state

  // Document management
  const handleSetTitle = (event) => {
    dispatch({
      type: 'SET_DOCUMENT_TITLE',
      payload: { id: active.id, title: event.target.value }
    })
  }

  const handleSetBody = (event) => {
    dispatch({
      type: 'SET_DOCUMENT_BODY',
      payload: { id: active.id, body: event.target.value }
    })
  }

  const handleRemoveDocument = () => {
    dispatch({ type: 'DELETE_DOCUMENT', payload: { id: active.id } })
  }

  // Tab management
  const handleSetActiveDocument = (document) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { id: document.id } })
  }

  const handleRemoveDocumentFromTabs = (document) => {
    dispatch({ type: 'REMOVE_TAB', payload: { id: document.id } })
  }

  const handleStickTab = (document) => {
    dispatch({ type: 'STICK_TAB', payload: { id: document.id } })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Wrapper className="flex-shrink-0 flex items-center h-10 border-b border-accent overflow-x-auto">
        {tabs.map((tab, idx) => {
          const document = state.documents.find((item) => item.id === tab.id)

          return (
            <button
              key={`${document.id}+${idx}`}
              className={`
                ${active.id === document.id ? 'bg-oxford-blue-50 border-b border-oxford-blue-400' : 'bg-white'}
                group flex items-center h-full px-2.5 border-r border-accent transition-colors duration-150 hover:bg-oxford-blue-100
              `}
              onClick={() => handleSetActiveDocument(document)}
              onDoubleClick={() => handleStickTab(document)}
            >
              <p
                className={`
              ${tab.temp ? 'italic' : null}
              flex-1 text-xs font-bold mr-2.5
              `}
              >
                {document.title}
              </p>
              <div
                onClick={(e) => {
                  e.stopPropagation()

                  handleRemoveDocumentFromTabs(document)
                }}
                className="flex-shrink-0 cursor-pointer p-[3px] transition-all duration-150 hover:bg-oxford-blue-500/10 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`
                    ${active.id === document.id ? '' : 'invisible group-hover:visible'}
                     w-4 h-4
                  `}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          )
        })}
        {/* <input onChange={handleSetTitle} type="text" value={document.title} className="w-full p-0 focus:outline-none" /> */}
      </Wrapper>
      <textarea
        value={active.body}
        onChange={handleSetBody}
        className="flex-1 text-black w-full h-full p-4 overflow-y-scroll resize-none focus:outline-none"
      ></textarea>
    </div>
  )
}
