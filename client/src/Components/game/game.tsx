import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Game() {
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
  const [board, setBoard] = useState<
    Array<Array<{ value: string; isPlayed: boolean }>>
  >(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => ({ value: "", isPlayed: false }))
    )
  );
  const [displayedMino, setDisplayedMino] = useState<
    Array<Array<{ value: string; isPlayed: boolean }>>
  >(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: "", isPlayed: false }))
    )
  );
  let fallCount = 0;
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(15);
  const defaultLSVal = {
    leftHeld: false,
    rightHeld: false,
    downHeld: false,
    upHeld: false,
  };

  const pulseKey = (key: string) => {
    if (!sessionStorage.getItem("move")) {
      const move = {
        upHeld: false,
        downHeld: false,
        leftHeld: false,
        rightHeld: false,
      };
      sessionStorage.setItem("move", JSON.stringify(move));
      pulseKey(key);
    } else {
      const move = JSON.parse(sessionStorage.getItem("move") || "null");
      switch (key) {
        case "ArrowUp":
          move.upHeld = true;
          break;
        case "ArrowDown":
          move.downHeld = true;
          break;
        case "ArrowLeft":
          move.leftHeld = true;
          break;
        case "ArrowRight":
          move.rightHeld = true;
          break;
      }
      sessionStorage.setItem("move", JSON.stringify(move));
    }
  };

  const Dpad = () => {
    return (
      <div className="justify-center flex flex-col mt-5">
        <div className="flex justify-center w-full">
          <button
            className="kbd"
            onMouseDown={() => {
              pulseKey("ArrowUp");
            }}
          >
            ▲
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button
            className="kbd"
            onMouseDown={() => {
              pulseKey("ArrowLeft");
            }}
          >
            ◀︎
          </button>
          <button
            className="kbd"
            style={{ width: "2.25rem", height: "2.25rem" }}
          >
            ⚪
          </button>
          <button
            className="kbd"
            onMouseDown={() => {
              pulseKey("ArrowRight");
            }}
          >
            ▶︎
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button
            className="kbd"
            onMouseDown={() => {
              pulseKey("ArrowDown");
            }}
          >
            ▼
          </button>
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

  const startNewGame = () => {
    setBoard(
      Array.from({ length: 20 }, () =>
        Array.from({ length: 10 }, () => ({ value: "", isPlayed: false }))
      )
    );
    setDisplayedMino(
      Array.from({ length: 4 }, () =>
        Array.from({ length: 4 }, () => ({ value: "", isPlayed: false }))
      )
    );
    setScore(0);
    setGameOver(false);
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
      if (!gameOver) {
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
    }, 50);
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
      gameBoard = await spawnMino(gameNextMino, gameBoard);
      gameNextMino = await newMino();
    } else {
      if (fallCount === 0) {
        const newGameObj = await minoFall(gameBoard, gameNextMino);
        gameBoard = newGameObj.gameBoard;
        gameNextMino = newGameObj.gameNextMino;
        fallCount++;
      } else {
        fallCount++;
        const newGameObj = await handlePlayerMove(gameBoard, gameNextMino);
        gameBoard = newGameObj.gameBoard;
        gameNextMino = newGameObj.gameNextMino;
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
    gameNextMino: string[][]
  ) => {
    const parsedLSVal = JSON.parse(
      sessionStorage.getItem("move") || JSON.stringify(defaultLSVal)
    );
    if (parsedLSVal.leftHeld) {
      gameBoard = await moveHorizontal("left", gameBoard);
    } else if (parsedLSVal.rightHeld) {
      gameBoard = await moveHorizontal("right", gameBoard);
    } else if (parsedLSVal.downHeld) {
      const gameObj = await moveDown(gameBoard, gameNextMino);
      gameBoard = gameObj.gameBoard;
      gameNextMino = gameObj.gameNextMino;
    } else if (parsedLSVal.upHeld) {
      gameBoard = await rotate(gameBoard);
    }
    sessionStorage.setItem("move", JSON.stringify(defaultLSVal));
    const gameObj = {
      gameBoard: gameBoard,
      gameNextMino: gameNextMino,
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
    if (await canRotate(gameBoard)) {
    }
    return gameBoard;
  };

  const canRotate = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    return true;
  };

  const moveDown = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameNextMino: string[][]
  ) => {
    const newGameObj = await minoFall(gameBoard, gameNextMino);
    return newGameObj;
  };

  const spawnMino = async (
    gameNextMino: string[][],
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>
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
      if (!canSpawn) break;
    }
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
    return newGameBoard;
  };

  const minoFall = async (
    gameBoard: Array<Array<{ value: string; isPlayed: boolean }>>,
    gameNextMino: string[][]
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
      gameBoard = await spawnMino(gameNextMino, gameBoard);
      gameNextMino = await newMino();
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
    };
    return gameObj;
  };

  useEffect(() => {
    setColors().then(startGame);
  }, [gameOver]);

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
      <Dpad />
    </div>
  );
}
