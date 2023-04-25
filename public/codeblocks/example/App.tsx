import { useState } from 'react'

import './main.css'

export default function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount((count) => count + 1)
  }

  return (
    <>
      <h1>Hello from Public</h1>
      <button onClick={handleClick}>Count is: {count}</button>
    </>
  )
}
