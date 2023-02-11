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
      ["", "", ""],
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
  const [displayedMino, setDisplayedMino] = useState<Array<Array<string>>>([]);
  const [board, setBoard] = useState<Array<Array<string>>>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [nextMino, setNextMino] = useState<Array<Array<string>>>([]);
  const [currentMinoSpacesTaken, setCurrentMinoSpacesTaken] = useState<
    Array<string>
  >([]);

  const Dpad = () => {
    return (
      <div className="justify-center flex flex-col mt-5">
        <div className="flex justify-center w-full">
          <kbd className="kbd">▲</kbd>
        </div>
        <div className="flex justify-center w-full">
          <kbd className="kbd">◀︎</kbd>
          <kbd className="kbd"></kbd>
          <kbd className="kbd">▶︎</kbd>
        </div>
        <div className="flex justify-center w-full">
          <kbd className="kbd">▼</kbd>
        </div>
      </div>
    );
  };

  const makeBoard = (): Array<Array<string>> => {
    const board = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push("");
      }
      board.push(row);
    }
    return board;
  };

  const handleRandomTetromino = (tetromino: string[][]) => {
    const board = Array(4)
      .fill(null)
      .map(() => Array(4).fill(""));
    let x = 0,
      y = 0;
    if (tetromino === tetrominoes[1]) y = 1;
    else if (tetromino === tetrominoes[3]) x = y = 1;
    else if (tetromino === tetrominoes[4] || tetromino === tetrominoes[6])
      x = 1;
    tetromino.forEach((r, i) => r.forEach((c, j) => (board[i + x][j + y] = c)));
    setDisplayedMino(board);
    return;
  };

  const setColors = () => {
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

  const startGame = () => {
    const interval = setInterval(() => {
      if (!gameOver) {
        gameLoop();
      }
    }, 500);
    return () => clearInterval(interval);
  };

  const gameLoop = () => {};

  const dropMino = async () => {};

  const newMino = async () => {
    const mino = tetrominoes[Math.floor(Math.random() * 7)];
    return mino;
  };

  const spawnMino = async (mino: string[][]) => {
    let newBoard: string[][];
    if (board.length < 1) {
      newBoard = await makeBoard();
    } else {
      newBoard = board;
    }
    const newCurrentMinoSpacesTaken: string[] = [];
    mino.forEach((r, i) =>
      r.forEach((c, j) => {
        if (c) {
          newBoard[i][j] = c;
          newCurrentMinoSpacesTaken.push(`${i},${j}`);
        }
      })
    );
    setBoard(newBoard);
    setCurrentMinoSpacesTaken(newCurrentMinoSpacesTaken);
  };

  const preStart = async () => {
    setColors();
    handleRandomTetromino(await newMino());
    spawnMino(await newMino());
  };

  useEffect(() => {
    (async () => {
      await preStart().then(() => {
        startGame();
      });
    })();
  }, []);

  const Cell = ({ cell, j }: { cell: string; j: number }) => {
    return (
      <div
        className={`w-4 h-4 border-2 border-black`}
        style={{
          backgroundColor: `${
            cell === "I"
              ? iColor
              : cell === "J"
              ? jColor
              : cell === "L"
              ? lColor
              : cell === "O"
              ? oColor
              : cell === "S"
              ? sColor
              : cell === "T"
              ? tColor
              : cell === "Z"
              ? zColor
              : boardBGColor
          }`,
        }}
        key={j}
      ></div>
    );
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
      <Dpad />
    </div>
  );
}
