import './App.css'
import Panda from './components/Panda'
import Timer from './components/Timer'
import TaskInput from './components/TaskInput'

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bbjungle.jpg')" }}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-7xl font-bold text-[#FFFA60] font-jersey text-stroke-black text-center" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' }}>
          POMODORO PANDA
        </h1>
        <Panda />
        <div className="relative w-full max-w-[500px]">
          <Timer />
          <div className="absolute -bottom-8.5 left-1/2 transform -translate-x-1/2 w-full">
            <TaskInput />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
