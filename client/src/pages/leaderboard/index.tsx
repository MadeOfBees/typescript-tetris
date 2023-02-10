import React, { useState, useEffect } from "react";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/footer";

export default function leaderboard() {
  type Score = {
    id: number;
    score: number;
  };
  const [topAllTime, setTopAllTime] = useState<Score[]>([]);
  const [topToday, setTopToday] = useState<Score[]>([]);
  const numOfScores = 10;

  const fetchScores = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.scores;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTopScores = async () => {
      const topAllTime = await fetchScores(
        `http://localhost:3001/api/scores/top/`
      );
      const topToday = await fetchScores(
        `http://localhost:3001/api/scores/todaysTop/`
      );
      setTopAllTime(topAllTime);
      setTopToday(topToday);
    };
    fetchTopScores();
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
                            {num + 1}. {typeOfTop === "Top All Time" ? topAllTime[num]?.score : topToday[num]?.score}
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
