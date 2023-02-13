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
  const [nextMino, setNextMino] = useState<Array<Array<string>>>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

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

  const handleRandomTetromino = (tetromino: string[][]) => {
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
    else if (tetromino === tetrominoes[3]) x = y = 1;
    else if (tetromino === tetrominoes[4] || tetromino === tetrominoes[5])
      x = 1;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        newTetromino[i + x][j + y].value = tetromino[i][j];
      }
    }
    setDisplayedMino(newTetromino);
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

  const setDisplay = (
    tetromino: string[][],
    board: Array<Array<{ value: string; isPlayed: boolean }>>
  ) => {
    setBoard(board);
    handleRandomTetromino(tetromino);
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
