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
  const [nextMino, setNextMino] = useState<Array<Array<string>>>([]);
  const [board, setBoard] = useState<Array<Array<string>>>([]);
  const [score, setScore] = useState<number>(0);

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

  const handleRandomTetromino = (tetromino: Array<Array<string>>) => {
    const board = Array.from({ length: 4 }, () => Array(4).fill(""));
    const offset = {
      1: [0, 1],
      3: [1, 1],
      4: [1, 0],
      6: [1, 0],
    }[tetrominoes.indexOf(tetromino)] || [0, 0];
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        board[i + offset[0]][j + offset[1]] = tetromino[i][j];
      }
    }
    return board;
  };

  const setColors = () => {
    const boardData = localStorage.getItem("board");
    if (boardData) {
      const board = JSON.parse(boardData);
      console.log(board.iColor);
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

  useEffect(() => {
    setColors();
    setBoard(makeBoard());
    setNextMino(
      handleRandomTetromino(
        tetrominoes[Math.floor(Math.random() * tetrominoes.length)]
      )
    );
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
          {nextMino.map((row, i) => (
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
