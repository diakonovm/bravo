import { useMemo, useState } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Editor from './components/Editor.js'
import Preview from './components/Preview.js'
import EditorContext from './contexts/EditorContext.js'
import styled from '@emotion/styled'

const Logo = styled.div`
  font-family: 'Courgette';
`

function App() {
  const [unparsedText, setUnparsedText] = useState('')

  const editorContext = useMemo(
    () => ({
      unparsedText,
      setUnparsedText
    }),
    [unparsedText]
  )

  return (
    <EditorContext.Provider value={editorContext}>
      <div className="h-screen min-h-0 max-h-screen flex flex-col">
        <nav className="flex-shrink-0 flex items-center justify-between py-5 px-4 h-12">
          <Logo className="text-2xl font-bold text-white">Bravo</Logo>
          <div className="">
            <ul className="flex items-center space-x-4">
              <li>
                <button></button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex-1 w-full h-full">
          <PanelGroup direction="horizontal">
            <Panel minSize={20} className="bg-white">
              <Editor />
            </Panel>
            <PanelResizeHandle className="w-2.5"></PanelResizeHandle>
            <Panel minSize={20} className="bg-white">
              <Preview />
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default App
