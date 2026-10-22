
import { useEffect, useRef, useState } from 'react'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  const startTimeRef = useRef(null)
  const savedTimeRef = useRef(0)

  useEffect(() => {
    if (!isRunning) return

    startTimeRef.current = Date.now()

    const intervalId = setInterval(() => {
      const currentTime =
        savedTimeRef.current + (Date.now() - startTimeRef.current)

      setElapsedTime(currentTime)
    }, 10)

    return () => clearInterval(intervalId)
  }, [isRunning])

  function handleStartPause() {
    if (isRunning) {
      savedTimeRef.current = elapsedTime
      setIsRunning(false)
    } else {
      setIsRunning(true)
    }
  }

  function handleReset() {
    setIsRunning(false)
    setElapsedTime(0)
    savedTimeRef.current = 0
    setLaps([])
  }

  function handleLap() {
    if (!isRunning) return

    setLaps((previousLaps) => [
      {
        id: Date.now() + Math.random(),
        time: elapsedTime,
      },
      ...previousLaps,
    ])
  }

  function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds % 3600000) / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const centiseconds = Math.floor((milliseconds % 1000) / 10)

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      centiseconds: String(centiseconds).padStart(2, '0'),
    }
  }

  function formatLapTime(milliseconds) {
    const time = formatTime(milliseconds)

    return `${time.hours}:${time.minutes}:${time.seconds}.${time.centiseconds}`
  }

  const time = formatTime(elapsedTime)
  
  useEffect(() => {
    function handleKeyDown(event) {
     if (
  event.code === 'Space' ||
  ['l', 'r', 'c'].includes(event.key.toLowerCase())
) {
  event.preventDefault()
}

      if (event.repeat) return

      if (event.code === 'Space') {
        handleStartPause()
      } else if (event.key.toLowerCase() === 'l') {
        handleLap()
      } else if (event.key.toLowerCase() === 'r') {
        handleReset()
      } else if (event.key.toLowerCase() === 'c') {
  setLaps([])
}
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isRunning, elapsedTime, laps])


  return (
    
<div className="relative min-h-screen overflow-hidden bg-[#030615] px-4 py-10 text-white sm:px-8">
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
    <div className="absolute -right-32 top-64 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

    {Array.from({ length: 35 }, (_, index) => (
      <span
        key={index}
        
className="absolute h-1 w-1 rounded-full bg-cyan-300/50 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse"

        style={{
          left: `${(index * 37 + 11) % 100}%`,
          top: `${(index * 61 + 7) % 100}%`,
          opacity: 0.3 + (index % 5) * 0.14,
        }}
      />
    ))}
  </div>

      
<div className="relative z-10 mx-auto max-w-4xl">

        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Precision timing
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Stopwatch<span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Every second counts. Make every moment matter.
          </p>
        </header>

        
        <main className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-950/60 p-6 shadow-[0_0_35px_rgba(0,140,255,0.12)] backdrop-blur-2xl transition-all duration-300 sm:p-10">
          <div className="mb-8 flex items-center justify-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isRunning ? 'animate-pulse bg-emerald-400' : 'bg-cyan-400'
              }`}
            />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              {isRunning ? 'Stopwatch running' : elapsedTime > 0 ? 'Paused' : 'Ready to begin'}
            </span>
          </div>

          <div className="text-center">
            <p
  className={`font-mono text-4xl font-light tracking-tight transition-colors duration-300 sm:text-7xl md:text-8xl ${
    isRunning
      ? 'text-green-500'
      : elapsedTime > 0
        ? 'text-red-500'
        : 'text-white'
  }`}
>
  {time.hours}:{time.minutes}:{time.seconds}
  <span className="text-white">.{time.centiseconds}</span>
</p>

            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">
              Hours : Minutes : Seconds
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleStartPause}
              className={`rounded-xl px-8 py-3 font-semibold transition ${
                isRunning
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]'
: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]'
              }`}
            >
              {isRunning ? 'Pause' : elapsedTime > 0 ? 'Resume' : 'Start'}
            </button>

            <button
              type="button"
              onClick={handleLap}
              disabled={!isRunning}
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-3 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Lap
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={elapsedTime === 0 && laps.length === 0 && !isRunning}
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
  <h2 className="text-lg font-semibold">Lap times</h2>

  
{laps.length > 0 && (
  <button
    type="button"
    onClick={() => setLaps([])}
    className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-400/5 px-2.5 py-1.5 text-xs font-medium text-red-300 transition-all duration-200 hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-200 active:scale-95"
    title="Clear all lap times"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </svg>
    Clear All
  </button>
)}

</div>

              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                {laps.length} {laps.length === 1 ? 'lap' : 'laps'}
              </span>
            </div>

            {laps.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center">
                <p className="text-sm text-slate-400">
                  Start the stopwatch and press Lap to record a time.
                </p>
              </div>
            ) : (
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {laps.map((lap, index) => (
                  <div
                    key={lap.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="text-sm text-slate-400">
                      Lap {laps.length - index}
                    </span>

                    <span className="font-mono text-sm text-cyan-300">
                      {formatLapTime(lap.time)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="mt-6 text-center text-xs text-slate-600">
          Built with React and Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

export default App
