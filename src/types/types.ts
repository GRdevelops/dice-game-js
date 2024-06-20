export type Player = {
  grid: (number | null)[][]
  points: number
  isActive: boolean
  position: "up" | "down"
}

export type GridDisplayProps = {
  player: Player
  setPlayer: (player: Player) => void
  otherPlayer: Player
  setOtherPlayer: (player: Player) => void
  setGameStatus: React.Dispatch<React.SetStateAction<"ongoing" | "complete">>
  dice: number
  setDice: (dice: number) => void
}