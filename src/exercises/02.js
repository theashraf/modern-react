// Counter: custom hooks
import React, {useState} from 'react'

export function useCounter (initialCount=0){
  const [count, setCount] = useState(initialCount)
  const incrementCount = () => setCount(count + 1)
  return {count,incrementCount}
}

function Counter() {
  const {count,incrementCount}=useCounter()
  return <button onClick={incrementCount}>{count}</button>
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: custom hooks'

export default Usage
