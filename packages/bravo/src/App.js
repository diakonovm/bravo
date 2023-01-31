import { Routes, Route } from 'react-router-dom'
import EditorLayout from './EditorLayout.js'
import PreviewLayout from './PreviewLayout.js'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EditorLayout />} />
        <Route path="/preview" element={<PreviewLayout />} />
      </Routes>
    </>
  )
}
