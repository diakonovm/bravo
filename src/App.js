import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Editor from './components/Editor.js'
import Menu from './components/Menu.js'
import Preview from './components/Preview.js'
import styled from '@emotion/styled'
import { EditorProvider } from './contexts/EditorContext.js'

const Logo = styled.div`
  font-family: 'Courgette';
`

export default function App() {
  return (
    <EditorProvider>
      <div className="h-screen min-h-0 max-h-screen flex">
        <Menu className="flex-shrink-0 w-56 border-r border-accent" />
        <div className="h-full flex-1 flex flex-col">
          <nav className="flex-shrink-0 flex items-center justify-between py-5 px-4 h-12">
            <Logo className="text-2xl font-bold text-white">Bravo</Logo>
          </nav>
          <div className="flex-1 w-full h-full">
            <PanelGroup direction="horizontal">
              <Panel minSize={20} className="bg-white">
                <Editor />
              </Panel>
              <PanelResizeHandle className="group flex flex-col items-center justify-center px-[3px]">
                <div className="w-[3px] h-20 hover:h-24 rounded-lg bg-white hover:bg-gray-100 transition-all duration-200"></div>
              </PanelResizeHandle>
              <Panel minSize={20} className="bg-white">
                <Preview />
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}
