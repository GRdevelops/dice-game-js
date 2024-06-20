import { Player } from '@/types/types'
import React from 'react'

type GameOverProps = {
  player1: Player
  player2: Player
  handleRestart: () => void
}

export const GameOver: React.FC<GameOverProps> = ({ player1, player2, handleRestart }) => {
  return (
    <div className='text-xl flex flex-col items-center justify-center gap-4'>
      <div className='opacity-80'>Game Over!</div>
      <div>
        {player1.points > player2.points
          ? <div className=''>Player1 <span className='opacity-80'>won with</span> {player1.points} points</div>
          : <div className=''>Player2 <span className='opacity-80'>won with</span> {player2.points} points</div>}
      </div>
      <button onClick={handleRestart} className='text-base mt-4 px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition-all'>
        Restart Game
      </button>
    </div>
  )
}
