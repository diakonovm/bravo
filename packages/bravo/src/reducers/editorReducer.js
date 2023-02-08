const TEMP_DATE = new Date()
const DEFAULT_DOCUMENT = {
  title: 'untitled.md',
  body: '',
  createdAt: TEMP_DATE.toISOString(),
  updatedAt: TEMP_DATE.toISOString()
}

export default function Reducer(state, action) {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [
          ...state.documents,
          {
            id: action.payload.id,
            ...DEFAULT_DOCUMENT
          }
        ]
      }
    case 'DELETE_DOCUMENT':
      const documentIdx = state.documents.findIndex((i) => i.id === action.payload.id)
      const tabIdx = state.tabs.findIndex((i) => i.id === action.payload.id)

      const documents = [
        ...state.documents.slice(0, documentIdx),
        ...state.documents.slice(documentIdx + 1, state.documents.length)
      ]

      return documentIdx !== -1
        ? {
            ...state,
            active: documents[0] ? documents[0].id : null,
            documents,
            tabs: [...state.tabs.slice(0, tabIdx), ...state.tabs.slice(tabIdx + 1, state.tabs.length)]
          }
        : state

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        active: action.payload.id
      }
    case 'STICK_TAB':
      const idx = state.tabs.findIndex((tab) => tab.id === action.payload.id)

      if (idx === -1) return state

      const tab = Object.assign(state.tabs[idx], { temp: false })

      return {
        ...state,
        tabs: [...state.tabs.slice(0, idx), tab, ...state.tabs.slice(idx + 1, state.tabs.length)]
      }
    case 'ADD_TAB':
      if (state.tabs.find((tab) => tab.id === action.payload.id)) return state

      const tempIdx = state.tabs.findIndex((tab) => tab.temp)

      if (tempIdx !== -1) {
        return {
          ...state,
          tabs: [
            ...state.tabs.slice(0, tempIdx),
            { id: action.payload.id, temp: true },
            ...state.tabs.slice(tempIdx + 1, state.tabs.length - 1)
          ]
        }
      } else {
        return {
          ...state,
          tabs: [...state.tabs, { id: action.payload.id, temp: true }]
        }
      }
    case 'REMOVE_TAB':
      const tabs = state.tabs.filter((tab) => tab.id !== action.payload.id)
      const active = tabs.length === 0 ? null : tabs[tabs.length - 1].id

      return {
        ...state,
        active,
        tabs
      }
    case 'IMPORT_DOCUMENT':
      const now = new Date()

      const document = {
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      }

      return {
        ...state,
        documents: [...state.documents, document]
      }
    case 'SET_DOCUMENT_TITLE':
      return state.documents.find((item) => item.id === action.payload.id)
        ? {
            ...state,
            documents: state.documents.map((item) => {
              return item.id === action.payload.id
                ? {
                    ...item,
                    title: action.payload.title,
                    updatedAt: new Date().toISOString()
                  }
                : item
            })
          }
        : state
    case 'SET_DOCUMENT_BODY':
      return state.documents.find((item) => item.id === action.payload.id)
        ? {
            ...state,
            documents: state.documents.map((item) => {
              return item.id === action.payload.id
                ? {
                    ...item,
                    body: action.payload.body,
                    updatedAt: new Date().toISOString()
                  }
                : item
            })
          }
        : state
    default:
      return state
  }
}
