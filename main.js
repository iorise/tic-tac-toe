const Player = (name, mark, className) => {
  return {name, mark, className}
}

const mainGame = () => {
  const player1 = Player("Player X", "X", "field-x")
  const player2 = Player("Player O", "O", "field-o")

  const fieldElements = document.querySelectorAll(".field")
  const messageElement = document.getElementById("message")
  const restartBtn = document.getElementById("restartBtn")

  let currentPlayer = player1
  let isOver = false

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
    messageElement = `${currentPlayer}'s Turn`
  }
}