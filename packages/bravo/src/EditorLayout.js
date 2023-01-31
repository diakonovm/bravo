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

export default function EditorLayout() {
  const [menu, setMenu] = useState('file-explorer')
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuRef.current) menuRef.current.expand()
  }, [menu])

  return (
    <EditorProvider>
      <div className="h-screen min-h-0 max-h-screen flex flex-col bg-primary text-accent">
        <nav className="flex-shrink-0 flex items-center justify-between px-4 h-12">
          <Logo className="text-2xl font-bold text-white">Bravo</Logo>
        </nav>
        <div className="flex-1 h-full flex">
          <QuickMenu menu={menu} setMenu={setMenu} className="flex-shrink-0 w-12 bg-primary border-r border-accent" />
          <div className="flex-1 w-full h-full">
            <PanelGroup direction="horizontal">
              <Panel ref={menuRef} defaultSize={12} minSize={10} collapsible={true} className="bg-primary">
                {menu === 'file-explorer' && <FileExplorer className="border-r border-accent bg-primary" />}
                {menu === 'search-explorer' && <SearchExplorer className="border-r border-accent bg-primary" />}
              </Panel>
              <PanelResizeHandle className="group flex flex-col items-center justify-center px-[3px] bg-primary hover:bg-oxford-blue-50/30"></PanelResizeHandle>
              <Panel minSize={20} className="bg-white">
                <Editor />
              </Panel>
              <PanelResizeHandle className="group flex flex-col items-center justify-center px-[3px]">
                <div className="w-[3px] h-20 hover:h-24 rounded-lg bg-oxford-blue-50 transition-all duration-200"></div>
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
