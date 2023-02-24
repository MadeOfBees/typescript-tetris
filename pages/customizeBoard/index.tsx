import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ColorWheel from "../components/colorWheel";

export default function customizeBoard(): JSX.Element {
  const [board, setBoard] = useState<{ [key: string]: string }>({});
  const [piece, setPiece] = useState<string>("boardBGColor");
  const [renderNum, setRenderNum] = useState<number>(0);

  useEffect(() => {
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      setBoard(JSON.parse(storedBoard));
    } else {
      const defaultBoard = {
        iColor: "#ff0000",
        jColor: "#0000ff",
        lColor: "#ffff00",
        oColor: "#00ff00",
        sColor: "#800080",
        tColor: "#ff00ff",
        zColor: "#808080",
        boardBGColor: "#ffffff",
      };
      setBoard(defaultBoard);
      localStorage.setItem("board", JSON.stringify(defaultBoard));
    }
  }, [renderNum]);

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

  const returnMinoSquare = (tetromino: string[][]) => {
    const newTetromino = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: "" }))
    );
    const yOffset =
      tetromino === tetrominoes[0]
        ? 0
        : tetromino === tetrominoes[3] ||
          tetromino === tetrominoes[4] ||
          tetromino === tetrominoes[5] ||
          tetromino === tetrominoes[6]
        ? 2
        : 1;
    tetromino.forEach((row, i) =>
      row.forEach((col, j) => {
        if (col !== "") {
          newTetromino[i + yOffset][j].value = col;
        }
      })
    );
    return newTetromino;
  };

  const returnMinoColor = (tetromino: string[][]) => {
    const boardColorArray = [
      board.iColor,
      board.jColor,
      board.lColor,
      board.oColor,
      board.sColor,
      board.tColor,
      board.zColor,
    ];
    return tetrominoes.indexOf(tetromino) === 0
      ? board.iColor
      : boardColorArray[tetrominoes.indexOf(tetromino)];
  };

  const handleChangeModal = (mino: string) => {
    switch (mino) {
      case "I":
        setPiece("iColor");
        break;
      case "J":
        setPiece("jColor");
        break;
      case "L":
        setPiece("lColor");
        break;
      case "O":
        setPiece("oColor");
        break;
      case "S":
        setPiece("sColor");
        break;
      case "T":
        setPiece("tColor");
        break;
      case "Z":
        setPiece("zColor");
        break;
      default:
        setPiece("boardBGColor");
        break;
    }
  };

  const displayMinoBlock = (tetromino: string[][]) => {
    const minoSquare = returnMinoSquare(tetromino);
    const minoColor = returnMinoColor(tetromino);
    const bgColor = board.boardBGColor;
    return (
      <div className="flex flex-col">
        {minoSquare.map((row, i) => (
          <div className="flex flex-row" key={i}>
            {row.map((square, j) => (
              <div
                className="w-10 h-10 border-2 border-black"
                style={{
                  backgroundColor: square.value ? minoColor : bgColor,
                }}
                onClick={() => {
                  handleChangeModal(square.value);
                }}
                key={j}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-5">
        <div className="flex flex-row">
          {tetrominoes.map((tetromino, i) => (
            <div className="flex flex-col" key={i}>
              {displayMinoBlock(tetromino)}
            </div>
          ))}
        </div>
        <div className="w-20 h-20 flex flex-row justify-center mt-5">
          <div onClick={() => setRenderNum(renderNum + 1)}>
            <ColorWheel piece={piece} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
