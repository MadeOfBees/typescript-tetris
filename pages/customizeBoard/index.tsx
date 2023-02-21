import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function customizeBoard(): JSX.Element {
  const [board, setBoard] = useState<{ [key: string]: string }>({});

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
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-5">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-6xl font-bold">Customize Board</h1>
          </div>
          <div className="flex justify-center">
            {Object.keys(board).map((key) => {
              return (
                <div className="flex flex-col" key={key}>
                  <div className="flex justify-center">
                    <h1 className="font-bold">{key}</h1>
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="color"
                      value={board[key]}
                      onChange={(e) => {
                        const newBoard = { ...board } as {
                          [key: string]: string;
                        };
                        newBoard[key] = e.target.value;
                        setBoard(newBoard);
                        localStorage.setItem("board", JSON.stringify(newBoard));
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
