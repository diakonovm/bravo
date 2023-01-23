import { createContext, useEffect, useReducer, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import documentReducer from '../reducers/documentReducer.js'
import DEFAULT_TEXT from '../default-text.js'

const DEFAULT_STATE = {
  active: 0,
  collection: [
    {
      id: 0,
      title: 'untitled_document',
      body: DEFAULT_TEXT,
      createdAt: null,
      updatedAt: null
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
