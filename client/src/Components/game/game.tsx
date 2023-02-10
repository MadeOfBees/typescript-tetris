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
  const [iColor] = useState<string>("bg-red-500");
  const [jColor] = useState<string>("bg-blue-500");
  const [lColor] = useState<string>("bg-yellow-500");
  const [oColor] = useState<string>("bg-green-500");
  const [sColor] = useState<string>("bg-purple-500");
  const [tColor] = useState<string>("bg-pink-500");
  const [zColor] = useState<string>("bg-gray-500");
  const [boardBGColor] = useState<string>("");
  const [randomMino, setRandomMino] = useState<Array<Array<string>>>([]);
  const [board, setBoard] = useState<Array<Array<string>>>([]);
  const makeBoard = (): Array<Array<string>> => {
    const board = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push("");
      }
      board.push(row);
    }
    const randomTetromino =
      tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    for (let i = 0; i < randomTetromino.length; i++) {
      for (let j = 0; j < randomTetromino[i].length; j++) {
        board[i][j] = randomTetromino[i][j];
      }
    }
    return board;
  };

  const handleRandomTetromino = (tetromino: Array<Array<string>>) => {
    const board = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push("");
      }
      board.push(row);
    }
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        board[i][j] = tetromino[i][j];
      }
    }
    return board;
  };

  useEffect(() => {
    setBoard(makeBoard());
    setRandomMino(
      handleRandomTetromino(
        tetrominoes[Math.floor(Math.random() * tetrominoes.length)]
      )
    );
  }, []);

  return (
    <div className="flex flex-row mt-5">
      <div className="w-4"></div>
      <div className="flex flex-col">
        {board.map((row, i) => (
          <div className="flex flex-row" key={i}>
            {row.map((cell, j) => (
              <div
                className={`w-4 h-4 border-2 border-black ${
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
                }`}
                key={j}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-4"></div>
      <div className="flex flex-col">
        {randomMino.map((row, i) => (
          <div className="flex flex-row" key={i}>
            {row.map((cell, j) => (
              <div
                className={`w-4 h-4 border-2 border-black ${
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
                }`}
                key={j}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
