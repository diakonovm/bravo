import { createContext, useEffect, useReducer, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import documentReducer from '../reducers/documentReducer.js'
import DEFAULT_TEXT from '../default-text.js'
import { v4 as uuidv4 } from 'uuid'

const TEMP_UUID = uuidv4()
const TEMP_DATE = new Date()
const DEFAULT_STATE = {
  active: TEMP_UUID,
  collection: [
    {
      id: TEMP_UUID,
      title: 'claudio_bravo.md',
      body: DEFAULT_TEXT,
      createdAt: TEMP_DATE.toISOString(),
      updatedAt: TEMP_DATE.toISOString()
    }
  ]
}

export const EditorContext = createContext(undefined)

export const EditorProvider = ({ children }) => {
  const [documents, setDocuments] = useLocalStorage('documents', DEFAULT_STATE)

  const [state, dispatch] = useReducer(documentReducer, documents)

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
