export default function Reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload.id
      }
    case 'IMPORT':
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
        collection: [...state.collection, document]
      }
    case 'SET_TITLE':
      return state.collection.find((item) => item.id === action.payload.id)
        ? {
            ...state,
            collection: state.collection.map((item) => {
              return item.id === action.payload.id
                ? {
                    ...item,
                    title: action.payload.title.length ? action.payload.title : 'untitled.md'
                  }
                : item
            })
          }
        : state
    case 'SET_BODY':
      return state.collection.find((item) => item.id === action.payload.id)
        ? {
            ...state,
            collection: state.collection.map((item) => {
              return item.id === action.payload.id
                ? {
                    ...item,
                    body: action.payload.body
                  }
                : item
            })
          }
        : state
    default:
      return state
  }
}
