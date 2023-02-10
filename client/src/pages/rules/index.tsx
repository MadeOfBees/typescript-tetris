import React from "react";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/footer";

export default function Rules() {
  return (
    <div>
      <Navbar />
      <h1 className="text-6xl font-bold text-center">Rules</h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <ul>
              <li>
                The goal of Tetris is to score as many points as possible by
                clearing horizontal lines of Blocks.
              </li>
              <li>
                The player can move each Block left or right, rotate it 90
                degrees clockwise, and move it down one unit at a time.
              </li>
              <li>
                When a horizontal line of Blocks is formed, that line disappears
                and all Blocks above it move down one unit.
              </li>
              <li>
                The game ends when the Blocks stack up to the top of the playing
                area.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
