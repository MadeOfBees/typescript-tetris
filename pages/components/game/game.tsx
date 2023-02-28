import React, { useState, useEffect, useRef } from "react";

export default function Game(): JSX.Element {
  const tetrominoes = [
    [
      ["", "I", "", ""],
      ["", "I", "", ""],
      ["", "I", "", ""],
      ["", "I", "", ""],
    ],
    [
      ["", "J", ""],
      ["", "J", ""],
      ["J", "J", ""],
    ],
    [
      ["", "L", ""],
      ["", "L", ""],
      ["", "L", "L"],
    ],
    [
      ["O", "O"],
      ["O", "O"],
    ],
    [
      ["", "S", "S"],
      ["S", "S", ""],
    ],
    [
      ["T", "T", "T"],
      ["", "T", ""],
    ],
    [
      ["Z", "Z", ""],
      ["", "Z", "Z"],
    ],
  ];
  const [iColor, setIColor] = useState<string>("#ff0000");
  const [jColor, setJColor] = useState<string>("#0000ff");
  const [lColor, setLColor] = useState<string>("#ffff00");
  const [oColor, setOColor] = useState<string>("#00ff00");
  const [sColor, setSColor] = useState<string>("#800080");
  const [tColor, setTColor] = useState<string>("#ff00ff");
  const [zColor, setZColor] = useState<string>("#808080");
  const [boardBGColor, setBoardBGColor] = useState<string>("#ffffff");
  let clearedLines: number = 0;
  let paused: boolean = false;
  const [displayPaused, setDisplayPaused] = useState<boolean>(false);
  let gameOver: boolean = false;
  const [displayGameOver, setDisplayGameOver] = useState<boolean>(false);
  const [board, setBoard] = useState<
    Array<Array<{ value: string; isPlayed: boolean }>>
  >(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => ({ value: "", isPlayed: false }))
    )
  );
  let rotationNum: number = 1;
  const [displayedMino, setDisplayedMino] = useState<
    Array<Array<{ value: string; isPlayed: boolean }>>
  >(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: "", isPlayed: false }))
    )
  );
  let fallCount = 0;
  const [score, setScore] = useState<number>(0);
  const gameSpeed: number = 50;
  const defaultLSVal = {
    leftHeld: false,
    rightHeld: false,
    downHeld: false,
    upHeld: false,
  };

  const pulseKey = (key: string, isHeld: boolean = false) => {
    if (!sessionStorage.getItem("move")) {
      const move = {
        upHeld: false,
        downHeld: false,
        leftHeld: false,
        rightHeld: false,
      };
      sessionStorage.setItem("move", JSON.stringify(move));
      pulseKey(key, isHeld);
    } else {
      const move = JSON.parse(sessionStorage.getItem("move") || "null");
      switch (key) {
        case "ArrowUp":
          move.upHeld = isHeld;
          break;
        case "ArrowDown":
          move.downHeld = isHeld;
          break;
        case "ArrowLeft":
          move.leftHeld = isHeld;
          break;
        case "ArrowRight":
          move.rightHeld = isHeld;
          break;
        default:
          move.upHeld = false;
          move.downHeld = false;
          move.leftHeld = false;
          move.rightHeld = false;
          break;
      }
      sessionStorage.setItem("move", JSON.stringify(move));
    }
  };

  const Dpad = () => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);;

    const handlePress = (key: string) => {
      pulseKey(key, true);
      const delay = 150;
      timerRef.current = setTimeout(() => {
        const interval = setInterval(() => {
          pulseKey(key, true);
        }, 40);
        timerRef.current = interval;
      }, delay);
  
      const handleRelease = () => {
        clearTimeout(timerRef.current as NodeJS.Timeout);
        clearInterval(timerRef.current as NodeJS.Timeout);
        timerRef.current = null;
        pulseKey(key, false);
        document.removeEventListener("mouseup", handleRelease);
        document.removeEventListener("touchend", handleRelease);
      };
      document.addEventListener("mouseup", handleRelease);
      document.addEventListener("touchend", handleRelease);
    };

    const createButton = (label: string, key: string) => {
      return (
        <button
          key={key}
          className="kbd"
          onTouchStart={(e) => {
            e.preventDefault();
            handlePress(key);
          }}
          onMouseDown={() => {
            handlePress(key);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {label}
        </button>
      );
    };

    return (
      <div className="justify-center flex flex-col mt-5">
        <div className="flex justify-center w-full">
          {createButton("▲", "ArrowUp")}
        </div>
        <div className="flex justify-center w-full">
          {createButton("◀︎", "ArrowLeft")}
          <button
            className="kbd"
            style={{ width: "2.25rem", height: "2.25rem" }}
          >
            ⚪
          </button>
          {createButton("▶︎", "ArrowRight")}
        </div>
        <div className="flex justify-center w-full">
          {createButton("▼", "ArrowDown")}
        </div>
      </div>
    );
  };

  const displayNextTetramino = (tetromino: string[][]) => {
    let newTetromino: Array<Array<{ value: string; isPlayed: boolean }>> = [];
    for (let i = 0; i < 4; i++) {
      let row: Array<{ value: string; isPlayed: boolean }> = [];
      for (let j = 0; j < 4; j++) {
        row.push({ value: "", isPlayed: false });
      }
      newTetromino.push(row);
    }
    let x = 0,
      y = 0;
    if (tetromino === tetrominoes[1]) y = 1;
    else if (tetromino === tetrominoes[3] || tetromino === tetrominoes[6])
      x = y = 1;
    else if (tetromino === tetrominoes[4] || tetromino === tetrominoes[5])
      x = 1;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        newTetromino[i + x][j + y].value = tetromino[i][j];
      }
    }
    setDisplayedMino(newTetromino);
  };

  const idTheUser = async () => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      const response = await fetch(`/api/users/isValid/${userID}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.valid) {
        return userID;
      }
    }
    const response2 = await fetch(`/api/users/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data2 = await response2.json();
    const newUserID = data2.newUser._id;
    localStorage.setItem("userID", newUserID);
    return newUserID;
  };

  const setColors = async () => {
    const boardData = localStorage.getItem("board");
    if (boardData) {
      const board = JSON.parse(boardData);
      setBoardBGColor(board.boardBGColor);
      setIColor(board.iColor);
      setJColor(board.jColor);
      setLColor(board.lColor);
      setOColor(board.oColor);
      setSColor(board.sColor);
      setTColor(board.tColor);
      setZColor(board.zColor);
    }
  };

  const setDisplay = (
    gameNextMinos: Array<Array<string>>,
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameScore: number
  ) => {
    displayNextTetramino(gameNextMinos);
    setBoard(gameBoard);
    setScore(gameScore);
  };

  const newMino = async () => {
    const mino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    return mino;
  };

  interface CellProps {
    cell: { value: string; isPlayed: boolean };
    j: number;
    key: number;
  }

  const Cell = ({ cell, j }: CellProps) => {
    return (
      <div
        className={`w-4 h-4 border-2 border-black`}
        style={{
          backgroundColor: `${
            cell.value === "I"
              ? iColor
              : cell.value === "J"
              ? jColor
              : cell.value === "L"
              ? lColor
              : cell.value === "O"
              ? oColor
              : cell.value === "S"
              ? sColor
              : cell.value === "T"
              ? tColor
              : cell.value === "Z"
              ? zColor
              : boardBGColor
          }`,
        }}
        key={j}
      ></div>
    );
  };

  const startGame = async () => {
    sessionStorage.setItem("move", JSON.stringify(defaultLSVal));
    let gameObj = {
      gameNextMino: await newMino(),
      gameBoard: Array.from({ length: 20 }, () =>
        Array.from({ length: 10 }, () => ({ value: "", isPlayed: false }))
      ),
      currentScore: 0,
    };
    const updateB = setInterval(async () => {
      if (!gameOver && !paused) {
        gameObj = await gameTick(
          gameObj.gameNextMino,
          gameObj.gameBoard,
          gameObj.currentScore
        );
        setDisplay(
          gameObj.gameNextMino,
          gameObj.gameBoard,
          gameObj.currentScore
        );
      }
    }, 5);
    updateB;
  };

  const gameTick = async (
    gameNextMino: string[][],
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    currentScore: number
  ) => {
    let emptyRows = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      let emptyRow = true;
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j].value !== "") {
          emptyRow = false;
          break;
        }
      }
      if (emptyRow) emptyRows++;
    }
    if (emptyRows === 20) {
      const gameObj = await spawnMino(gameNextMino, gameBoard, currentScore);
      gameNextMino = await newMino();
      gameBoard = gameObj.gameBoard;
      currentScore = gameObj.gameScore;
    } else {
      if (fallCount === 0) {
        const newGameObj = await minoFall(
          gameBoard,
          gameNextMino,
          currentScore
        );
        gameBoard = newGameObj.gameBoard;
        gameNextMino = newGameObj.gameNextMino;
        currentScore = newGameObj.currentScore;
        fallCount++;
      } else {
        fallCount++;
        const newGameObj = await handlePlayerMove(
          gameBoard,
          gameNextMino,
          currentScore
        );
        gameBoard = newGameObj.gameBoard;
        gameNextMino = newGameObj.gameNextMino;
        currentScore = newGameObj.currentScore;
        if (fallCount === gameSpeed) fallCount = 0;
      }
    }
    return {
      gameNextMino: gameNextMino,
      gameBoard: gameBoard,
      currentScore: currentScore,
    };
  };

  const handlePlayerMove = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameNextMino: string[][],
    currentScore: number
  ) => {
    const parsedLSVal = JSON.parse(
      sessionStorage.getItem("move") || JSON.stringify(defaultLSVal)
    );
    if (parsedLSVal.leftHeld) {
      gameBoard = await moveHorizontal("left", gameBoard);
    } else if (parsedLSVal.rightHeld) {
      gameBoard = await moveHorizontal("right", gameBoard);
    } else if (parsedLSVal.downHeld) {
      const gameObj = await minoFall(gameBoard, gameNextMino, currentScore);
      gameBoard = gameObj.gameBoard;
      gameNextMino = gameObj.gameNextMino;
      currentScore = gameObj.currentScore;
    } else if (parsedLSVal.upHeld) {
      gameBoard = await rotate(gameBoard);
    }
    sessionStorage.setItem("move", JSON.stringify(defaultLSVal));
    const gameObj = {
      gameBoard: gameBoard,
      gameNextMino: gameNextMino,
      currentScore: currentScore,
    };
    return gameObj;
  };

  const moveHorizontal = async (
    direction: string,
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    if (await canGoDirection(direction, gameBoard)) {
      const newGameBoard = gameBoard.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      for (let i = 0; i < newGameBoard.length; i++) {
        if (direction === "left") {
          for (let j = 1; j < newGameBoard[i].length; j++) {
            if (
              newGameBoard[i][j].isPlayed &&
              newGameBoard[i][j].value !== ""
            ) {
              if (newGameBoard[i][j - 1].value === "") {
                newGameBoard[i][j - 1].value = newGameBoard[i][j].value;
                newGameBoard[i][j - 1].isPlayed = newGameBoard[i][j].isPlayed;
                newGameBoard[i][j].value = "";
                newGameBoard[i][j].isPlayed = false;
              }
            }
          }
        } else if (direction === "right") {
          for (let j = newGameBoard[i].length - 2; j >= 0; j--) {
            if (
              newGameBoard[i][j].isPlayed &&
              newGameBoard[i][j].value !== ""
            ) {
              if (
                newGameBoard[i][j + 1] &&
                newGameBoard[i][j + 1].value === ""
              ) {
                newGameBoard[i][j + 1].value = newGameBoard[i][j].value;
                newGameBoard[i][j + 1].isPlayed = newGameBoard[i][j].isPlayed;
                newGameBoard[i][j].value = "";
                newGameBoard[i][j].isPlayed = false;
              }
            }
          }
        }
      }
      return newGameBoard;
    }
    return gameBoard;
  };

  const canGoDirection = async (
    direction: string,
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j].isPlayed) {
          if (direction === "left") {
            if (j === 0) return false;
            if (
              gameBoard[i][j - 1].value !== "" &&
              !gameBoard[i][j - 1].isPlayed
            )
              return false;
          } else if (direction === "right") {
            if (j === gameBoard[i].length - 1) return false;
            if (
              gameBoard[i][j + 1].value !== "" &&
              !gameBoard[i][j + 1].isPlayed
            )
              return false;
          }
        }
      }
    }
    return true;
  };

  const rotate = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    const currentTetromino = gameBoard
      .filter((row) => row.some((cell) => cell.isPlayed))[0]
      .filter((cell) => cell.isPlayed)[0].value;
    if (currentTetromino === "O") {
      return gameBoard;
    }
    const newGameBoard = gameBoard.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    const tetrominoPosition = findTetrominoPosition(newGameBoard);
    const cellCenter = checkCenter(tetrominoPosition);
    const rotatedTetrominoPosition = getRotatedTetrominoPosition(
      tetrominoPosition,
      cellCenter
    );
    if (await canRotate(rotatedTetrominoPosition, newGameBoard)) {
      tetrominoPosition.forEach((cell) => {
        newGameBoard[cell.row][cell.col].value = "";
        newGameBoard[cell.row][cell.col].isPlayed = false;
      });
      rotatedTetrominoPosition.forEach((cell) => {
        newGameBoard[cell.row][cell.col].value = currentTetromino;
        newGameBoard[cell.row][cell.col].isPlayed = true;
      });
    }
    return newGameBoard;
  };

  const getRotatedTetrominoPosition = (
    tetrominoPosition: Array<{
      row: number;
      col: number;
      value: string;
      isPlayed: boolean;
    }>,
    cellCenter: { row: number; col: number }
  ) => {
    const rotatedTetrominoPosition = tetrominoPosition.map((cell) => {
      const row = cell.row;
      const col = cell.col;
      const newRow = cellCenter.row - (col - cellCenter.col);
      const newCol = cellCenter.col + (row - cellCenter.row);
      return {
        row: newRow,
        col: newCol,
      };
    });
    return rotatedTetrominoPosition;
  };

  const canRotate = async (
    rotatedTetrominoPosition: Array<{ row: number; col: number }>,
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    for (let i = 0; i < rotatedTetrominoPosition.length; i++) {
      const cell = rotatedTetrominoPosition[i];
      if (
        cell.row < 0 ||
        cell.row >= gameBoard.length ||
        cell.col < 0 ||
        cell.col >= gameBoard[0].length
      ) {
        return false;
      }
      if (
        gameBoard[cell.row][cell.col].value !== "" &&
        !gameBoard[cell.row][cell.col].isPlayed
      ) {
        return false;
      }
    }
    return true;
  };

  const checkCenter = (
    tetrominoPosition: Array<{
      row: number;
      col: number;
      value: string;
      isPlayed: boolean;
    }>
  ) => {
    const cells = tetrominoPosition.filter(
      (cell) => cell.value === tetrominoPosition[0].value
    );
    const centerX =
      cells.reduce((acc, cell) => acc + cell.col, 0) / cells.length;
    const centerY =
      cells.reduce((acc, cell) => acc + cell.row, 0) / cells.length;
    const tetrominoCenter = {
      row: Math.round(centerY),
      col: Math.round(centerX),
    };
    return tetrominoCenter;
  };

  const findTetrominoPosition = (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    const tetrominoPosition: Array<{
      row: number;
      col: number;
      value: string;
      isPlayed: boolean;
    }> = [];
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.isPlayed) {
          tetrominoPosition.push({
            row: rowIndex,
            col: colIndex,
            value: cell.value,
            isPlayed: cell.isPlayed,
          });
        }
      });
    });
    return tetrominoPosition;
  };

  const spawnMino = async (
    gameNextMino: string[][],
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameScore: number
  ) => {
    const newGameBoard = gameBoard.map((row) =>
      row.map((cell) => ({ ...cell, isPlayed: false }))
    );
    let canSpawn = true;
    for (let i = 0; i < gameNextMino.length; i++) {
      for (let j = 0; j < gameNextMino[i].length; j++) {
        if (gameNextMino[i][j] !== "") {
          if (newGameBoard[i][j + 4].value !== "") {
            canSpawn = false;
            break;
          }
        }
      }
      if (!canSpawn) {
        gameOver = true;
        setDisplayGameOver(true);
        const response = await fetch(`/api/scores/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: await idTheUser(),
            score: gameScore,
          }),
        });
        try {
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        break;
      }
    }
    pulseKey("remove", false);
    let offset = 3;
    if (gameNextMino[0][1] === "O" || gameNextMino[1][1] === "J") {
      offset = 4;
    }
    if (canSpawn) {
      for (let i = 0; i < gameNextMino.length; i++) {
        for (let j = 0; j < gameNextMino[i].length; j++) {
          if (gameNextMino[i][j] !== "") {
            newGameBoard[i][j + offset].value = gameNextMino[i][j];
            newGameBoard[i][j + offset].isPlayed = true;
          }
        }
      }
    }
    const gameObj = {
      gameBoard: newGameBoard,
      gameScore: gameScore,
    };
    return gameObj;
  };

  const minoFall = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameNextMino: string[][],
    gameScore: number
  ) => {
    fallCount = 1;
    let canFall = true;
    for (let i = gameBoard.length - 1; i >= 0; i--) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j].isPlayed) {
          if (i === gameBoard.length - 1) {
            canFall = false;
            break;
          } else if (
            gameBoard[i + 1][j].value !== "" &&
            gameBoard[i + 1][j].isPlayed === false
          ) {
            canFall = false;
            break;
          }
        }
      }
    }
    if (!canFall) {
      for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
          if (gameBoard[i][j].isPlayed) {
            gameBoard[i][j].isPlayed = false;
          }
        }
      }
      const clearedBoard = await checkForLines(gameBoard, gameScore);
      const gameObj = await spawnMino(
        gameNextMino,
        clearedBoard.gameBoard,
        clearedBoard.gameScore
      );
      rotationNum = 1;
      gameNextMino = await newMino();
      gameScore = clearedBoard.gameScore;
      gameBoard = gameObj.gameBoard;
    } else {
      for (let i = gameBoard.length - 1; i >= 0; i--) {
        for (let j = 0; j < gameBoard[i].length; j++) {
          if (gameBoard[i][j].isPlayed) {
            if (i === gameBoard.length - 1) {
              gameBoard[i][j].isPlayed = false;
            } else if (gameBoard[i + 1][j].value === "") {
              gameBoard[i + 1][j].value = gameBoard[i][j].value;
              gameBoard[i + 1][j].isPlayed = true;
              gameBoard[i][j].value = "";
              gameBoard[i][j].isPlayed = false;
            } else {
              gameBoard[i][j].isPlayed = false;
            }
          }
        }
      }
    }
    const gameObj = {
      gameBoard: gameBoard,
      gameNextMino: gameNextMino,
      currentScore: gameScore,
    };
    return gameObj;
  };

  const checkForLines = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameScore: number
  ) => {
    let newScore = gameScore;
    let linesCleared = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      let lineClear = true;
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j].value === "") {
          lineClear = false;
          break;
        }
      }
      if (lineClear) {
        linesCleared++;
        for (let j = 0; j < gameBoard[i].length; j++) {
          gameBoard[i][j].value = "";
        }
        for (let k = i - 1; k >= 0; k--) {
          for (let j = 0; j < gameBoard[k].length; j++) {
            gameBoard[k + 1][j].value = gameBoard[k][j].value;
            gameBoard[k][j].value = "";
          }
        }
      }
    }
    if (linesCleared > 0) {
      switch (linesCleared) {
        case 1:
          newScore += 100;
          clearedLines++;
          break;
        case 2:
          newScore += 300;
          clearedLines += 2;
          break;
        case 3:
          newScore += 500;
          clearedLines += 3;
          break;
        case 4:
          newScore += 800;
          clearedLines += 4;
          break;
        default:
          break;
      }
      for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
          if (gameBoard[i][j].value !== "") {
            gameBoard[i][j].isPlayed = true;
          }
        }
      }
    }
    const gameObj = {
      gameBoard: gameBoard,
      gameScore: newScore,
    };
    return gameObj;
  };

  useEffect(() => {
    setColors().then(startGame);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "j") {
        pulseKey("ArrowLeft", true);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "l") {
        pulseKey("ArrowRight", true);
      }
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "k") {
        pulseKey("ArrowDown", true);
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "i") {
        pulseKey("ArrowUp", true);
      }
      if (e.key === "Escape") {
        pauseGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const pauseGame = () => {
    paused = !paused;
    setDisplayPaused(paused);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row">
        <div className="w-4"></div>
        <div className="flex flex-col">
          {board.map((row, i) => (
            <div className="flex flex-row" key={i}>
              {row.map((cell, j) => (
                <Cell cell={cell} j={j} key={j} />
              ))}
            </div>
          ))}
        </div>
        <div className="w-4"></div>
        <div className="flex flex-col">
          {displayedMino.map((row, i) => (
            <div className="flex flex-row" key={i}>
              {row.map((cell, j) => (
                <Cell cell={cell} j={j} key={j} />
              ))}
            </div>
          ))}
          <div>
            <h1>Score:</h1>
            <p>{score}</p>
          </div>
        </div>
      </div>
      {displayPaused || displayGameOver ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-50 w-full h-full flex justify-center items-center">
            {displayPaused ? (
              <div className="bg-gray-900 bg-opacity-50 w-1/2 h-1/2 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-white">Paused</h1>
              </div>
            ) : null}
            {displayGameOver ? (
              <div className="bg-gray-900 bg-opacity-50 w-1/2 h-1/2 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-white">Game Over</h1>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setDisplayGameOver(false);
                    gameOver = false;
                    setColors().then(startGame);
                  }}
                >
                  Play Again
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <Dpad />
    </div>
  );
}
