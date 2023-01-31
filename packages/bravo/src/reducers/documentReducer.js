import { v4 as uuidv4 } from 'uuid'

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
        collection: [
          ...state.collection,
          {
            id: action.payload.id,
            ...DEFAULT_DOCUMENT
          }
        ]
      }
    case 'REMOVE_DOCUMENT':
      if (state.collection.length === 1) {
        const id = uuidv4()
        return {
          ...state,
          active: id,
          collection: [
            {
              id,
              ...DEFAULT_DOCUMENT
            }
          ]
        }
      } else {
        const index = state.collection.findIndex((i) => i.id === action.payload.id)

        const collection = [
          ...state.collection.slice(0, index),
          ...state.collection.slice(index + 1, state.collection.length)
        ]

        return index !== -1
          ? {
              ...state,
              active: collection[0].id,
              collection
            }
          : state
      }

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
