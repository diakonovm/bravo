export default function Reducer(state, action) {
  switch (action.type) {
    case 'IMPORT':
      return state
    case 'SET_TITLE':
      return state.collection.find((item) => item.id === action.payload.id)
        ? {
            ...state,
            collection: state.collection.map((item) => {
              return item.id === action.payload.id
                ? {
                    ...item,
                    title: action.payload.title
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
