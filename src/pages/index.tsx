import { Manrope } from "next/font/google"
import { useState } from 'react'
import { Player } from './types/types'
import { GridDisplay } from './components/GridDisplay'
import { GameOver } from './components/GameOver'

const manrope = Manrope({ subsets: ["latin"] })

const initialPlayerState = (position: "up" | "down"): Player => ({
  grid: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  points: 0,
  isActive: position === "up",
  position,
})

const Home: React.FC = () => {
  const [player1, setPlayer1] = useState<Player>(initialPlayerState("up"))
  const [player2, setPlayer2] = useState<Player>(initialPlayerState("down"))
  const [gameStatus, setGameStatus] = useState<"ongoing" | "complete">("ongoing")
  const [dice, setDice] = useState(1)

  const handleRestart = () => {
    setPlayer1(initialPlayerState("up"))
    setPlayer2(initialPlayerState("down"))
    setGameStatus("ongoing")
    setDice(1)
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center gap-12 p-4 ${manrope.className}`}>
      {gameStatus === "complete" ? (
        <GameOver player1={player1} player2={player2} handleRestart={handleRestart} />
      ) : (
        <>
          <GridDisplay
            player={player1}
            setPlayer={setPlayer1}
            otherPlayer={player2}
            setOtherPlayer={setPlayer2}
            dice={dice}
            setDice={setDice}
            setGameStatus={setGameStatus}
          />

          <div className='text-3xl font-bold'>{dice}</div>

          <GridDisplay
            player={player2}
            setPlayer={setPlayer2}
            otherPlayer={player1}
            setOtherPlayer={setPlayer1}
            dice={dice}
            setDice={setDice}
            setGameStatus={setGameStatus}
          />
        </>
      )}
    </main>
  )
}

export default Home
