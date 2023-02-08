import { createContext, useEffect, useReducer, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DEFAULT_TEXT from '../default-text.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import editorReducer from '../reducers/editorReducer.js'

const TEMP_UUID = uuidv4()
const TEMP_DATE = new Date()
const DEFAULT_STATE = {
  active: TEMP_UUID,
  documents: [
    {
      id: TEMP_UUID,
      title: 'claudio_bravo.md',
      body: DEFAULT_TEXT,
      createdAt: TEMP_DATE.toISOString(),
      updatedAt: TEMP_DATE.toISOString()
    }
  ],
  tabs: [{ id: TEMP_UUID, temp: false }]
}

export const EditorContext = createContext(undefined)
export const EditorProvider = ({ children }) => {
  const [documents, setDocuments] = useLocalStorage('editor', DEFAULT_STATE)
  const [state, dispatch] = useReducer(editorReducer, documents)

  useEffect(() => {
    setDocuments(state)
  }, [state])

  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  )

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}
