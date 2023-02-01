import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Editor from './components/Editor.js'
import FileExplorer from './components/FileExplorer.js'
import Preview from './components/Preview.js'
import QuickMenu from './components/QuickMenu.js'
import SearchExplorer from './components/SearchExplorer.js'
import { EditorProvider } from './contexts/EditorContext.js'

const Logo = styled.div`
  font-family: 'Courgette';
`

const DEFAULT_LAYOUT = 'left-right'

export default function EditorLayout() {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT)
  const [menu, setMenu] = useState('file-explorer')
  const menuRef = useRef(null)

  const handleSetLayout = (layout) => {
    setLayout(layout)
  }

  useEffect(() => {
    if (menuRef.current) menuRef.current.expand()
  }, [menu])

  return (
    <EditorProvider>
      <div className="h-screen min-h-0 max-h-screen flex flex-col bg-primary text-accent">
        <nav className="flex-shrink-0 flex items-center justify-between px-4 h-12">
          <Logo className="text-2xl font-bold text-white">Bravo</Logo>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleSetLayout('left-right')}>
              <svg
                className={`w-6 h-6 ${layout === 'left-right' ? 'text-white' : 'text-white/50'}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={() => handleSetLayout('top-bottom')}>
              <svg
                className={`w-6 h-6 ${layout === 'top-bottom' ? 'text-white' : 'text-white/50'}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 15H21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>
        <div className="flex-1 flex h-full min-h-0">
          <QuickMenu menu={menu} setMenu={setMenu} className="flex-shrink-0 w-12 bg-primary border-r border-accent" />
          <div className="flex-1">
            <PanelGroup direction="horizontal">
              <Panel ref={menuRef} defaultSize={12} minSize={10} collapsible={true} className="bg-primary">
                {menu === 'file-explorer' && <FileExplorer className="border-r border-accent bg-primary" />}
                {menu === 'search-explorer' && <SearchExplorer className="border-r border-accent bg-primary" />}
              </Panel>
              <PanelResizeHandle className="group flex flex-col items-center justify-center px-[3px] bg-primary hover:bg-oxford-blue-50/30"></PanelResizeHandle>

              <Panel>
                <PanelGroup
                  autoSaveId="bravo-editor-layout"
                  direction={layout === 'left-right' ? 'horizontal' : 'vertical'}
                >
                  <Panel minSize={20} className="bg-white">
                    <Editor />
                  </Panel>
                  <PanelResizeHandle
                    className={`group flex flex-col items-center justify-center ${
                      layout === 'left-right' ? 'px-[3px] py-0' : 'px-0 py-[3px]'
                    }`}
                  >
                    <div
                      className={`${
                        layout === 'left-right' ? 'w-[3px] h-20' : 'h-[3px] w-20'
                      } rounded-lg bg-oxford-blue-50`}
                    ></div>
                  </PanelResizeHandle>
                  <Panel minSize={20} className="bg-white">
                    <Preview />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}
