import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Rules(): JSX.Element {
  return (
    <div>
      <Navbar />
      <h1 className="text-6xl font-bold text-center">Rules</h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <ul>
              <li>
                Tetris is one of my favorite games of all time and while the
                rules are simple i'm sure you'll have a lot of fun playing it.
              </li>
              <li>
                The game starts with a random assortment of Tetrominoes (shape
                pieces) falling from the top of the playing area.
              </li>
              <li>
                Use the left and right arrow keys to move the piece side to
                side, the down arrow key to make the piece drop faster, and the
                up arrow key to rotate the piece clockwise.
              </li>
              <li>
                When a horizontal line is completely filled with blocks, it
                disappears and any blocks above it will drop down to fill the
                gap.
              </li>
              <li>
                The game ends when the Tetrominoes stack up and reach the top of
                the playing area.
              </li>
              <li>
                The objective is to score as many points as possible by clearing
                as many lines as possible, when the game is over your score will
                be saved to the leaderboard.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
