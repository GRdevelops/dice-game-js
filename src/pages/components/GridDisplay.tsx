import React from 'react'
import { calculatePoints, findFirstAvailableIndex, rollTheDice } from '../utils/functions'
import { GridDisplayProps } from '../types/types'

export const GridDisplay: React.FC<GridDisplayProps> = ({ player, setPlayer, otherPlayer, setOtherPlayer, setGameStatus, dice, setDice }) => {
  const handleColumnClick = (columnIndex: number) => {
    const column = player.grid[columnIndex]
    const firstAvailableIndex = findFirstAvailableIndex(column)
    if (firstAvailableIndex >= 0) {
      player.grid[columnIndex][firstAvailableIndex] = dice
      setPlayer({ ...player, grid: [...player.grid] })
    } else {
      return
    }

    // remove number from the opponent grid
    const isNumberPresentInBothColumns = otherPlayer.grid[columnIndex].find((value) => value === dice)
    if (isNumberPresentInBothColumns) {
      otherPlayer.grid[columnIndex].forEach((square, rowIndex) => {
        if (square === dice) {
          otherPlayer.grid[columnIndex][rowIndex] = null
        }
      })
      setOtherPlayer({ ...otherPlayer, grid: [...otherPlayer.grid] })
    }

    // check if the grid is complete
    let isGridComplete = true
    for (const column of player.grid) {
      for (const square of column) {
        if (square === null) {
          isGridComplete = false
          break
        }
      }
      if (!isGridComplete) break
    }

    setPlayer({ ...player, points: calculatePoints(player.grid), isActive: !player.isActive })
    setOtherPlayer({ ...otherPlayer, points: calculatePoints(otherPlayer.grid), isActive: !otherPlayer.isActive })

    if (isGridComplete) {
      setGameStatus("complete")
    } else {
      // roll the dice
      let count = 0
      const interval = setInterval(() => {
        if (count < 5) {
          setDice(rollTheDice())
          count++
        } else {
          clearInterval(interval)
          setDice(rollTheDice())
        }
      }, 50)
    }
  }

  return (
    <div className={`flex flex-col ${player.isActive ? '' : 'opacity-50 pointer-events-none'}`}>
      <div className='text-2xl font-medium flex gap-1'>
        {player.grid.map((column, columnIndex) => (
          <div key={columnIndex} className='flex flex-col items-center gap-2'>
            <div
              key={columnIndex}
              className='flex flex-col border cursor-pointer hover:outline outline-white/30'
              onClick={() => handleColumnClick(columnIndex)}
            >
              {column.map((record, recordIndex) => (
                <div key={recordIndex} className='w-20 h-20 border flex justify-center items-center'>
                  {record !== null ? record : ''}
                </div>
              ))}
            </div>
            <div className={`text-xs opacity-80 ${player.position === "up" ? 'order-first' : ''}`}>
              {calculatePoints([player.grid[columnIndex]])}
            </div>
          </div>
        ))}
      </div>
      <div className={`my-4 flex justify-center gap-1 order ${player.position === "up" ? 'order-first' : ''}`}>
        <span className='opacity-80'>Total points:</span><span>{player.points}</span>
      </div>
    </div>
  )
}
