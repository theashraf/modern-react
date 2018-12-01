// Stopwatch: Custom hook
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

function useStopWatch() {
  const [{running, lapse}, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    setState({running: !running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    setState({running: false, lapse: 0})
  }

  return {
    lapse,
    running,
    handleClearClick,
    handleRunClick,
  }
}

function Stopwatch() {
  const stopWatchOne = useStopWatch()
  const stopWatchTwo = useStopWatch()

  return (
    <div style={{textAlign: 'center'}}>
      <StopwatchView
        lapse={stopWatchOne.lapse}
        running={stopWatchOne.running}
        onRunClick={stopWatchOne.handleRunClick}
        onClearClick={stopWatchOne.handleClearClick}
      />
      <hr />
      <strong>
        <span data-testid="diff">{stopWatchOne.lapse - stopWatchTwo.lapse}</span>
      </strong>
      <hr />
      <StopwatchView
        lapse={stopWatchTwo.lapse}
        running={stopWatchTwo.running}
        onRunClick={stopWatchTwo.handleRunClick}
        onClearClick={stopWatchTwo.handleClearClick}
      />
    </div>
  )
}

function StopwatchView({lapse, running, onRunClick, onClearClick}) {
  return (
    <>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={onRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick} style={buttonStyles}>
        Clear
      </button>
    </>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: Custom hook'

export default Usage
