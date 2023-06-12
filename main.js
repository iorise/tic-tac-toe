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
    messageElement.textContent = `${currentPlayer.name}'s Turn`
  }

  const handleFieldClick = (event) => {
    if (isOver) return

    const field = event.target
    const index = field.dataset.index

    if(field.textContent === "") {
      field.textContent = currentPlayer.mark
      field.classList.add(currentPlayer.className)

      if(checkWin(currentPlayer.mark)) {
        messageElement.textContent = `${currentPlayer.name} wins!`
        isOver = true
      } else if (checkDraw()) {
        messageElement.textContent = "Its a draw!"
        isOver = true
      } else {
        switchPlayer()
      }
    }
  };

  const checkWin = (mark) => {
    const winCondition = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    return winCondition.some((combo) => {
      return combo.every((index) => fieldElements[index].textContent === mark)
    })
  };

  const checkDraw = () => {
    return [...fieldElements].every((field) => field.textContent !== "")
  };

  const restart = () => {
    [...fieldElements].forEach((field) => {
      field.textContent = ""
    })

    currentPlayer = player1
    isOver = false
    messageElement.textContent = `${currentPlayer.name} turn`
    
    fieldElements.forEach((field) => {
      field.classList.remove(player1.className, player2.className)
    });
  };
    
  fieldElements.forEach((field) => {
    field.addEventListener("click", handleFieldClick)
  });
  

  restartBtn.addEventListener("click", restart)

  return {
    reset: restart
  }
}

const ticTacToe = mainGame()