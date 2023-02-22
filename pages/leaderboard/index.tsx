import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";

export default function leaderboard(): JSX.Element {
  type Score = {
    id: number;
    score: number;
  };
  const [topAllTime, setTopAllTime] = useState<Score[]>([]);
  const [topToday, setTopToday] = useState<Score[]>([]);
  const numOfScores = 10;

  useEffect(() => {
    fetch(`/api/scores/top/allTime`)
      .then((res) => res.json())
      .then((data) => {
        setTopAllTime(data.scores);
      });
    fetch(`/api/scores/top/today`)
      .then((res) => res.json())
      .then((data) => {
        setTopToday(data.scores);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-5">
        {["Top All Time", "Top Today"].map((typeOfTop) => {
          return (
            <div className="flex flex-col" key={typeOfTop}>
              <div className="flex justify-center">
                <h1 className="text-6xl font-bold mr-20">{typeOfTop}</h1>
              </div>
              {Array.from(Array(numOfScores).keys()).map((num) => {
                return (
                  <div className="flex justify-center" key={num}>
                    <h1 className="font-bold">
                      {num + 1}.{" "}
                      {typeOfTop === "Top All Time"
                        ? topAllTime[num]?.score
                        : topToday[num]?.score}
                    </h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
