import * as React from "react";

import Leaderboard from "../../components/Leaderboard";
import LeaderboardItem from "../../components/leaderboard/LeaderboardItem";

export default function Scoreboard() {
  const leaderboard = [
    {
      rank: 1,
      username: "golfer1",
      course: "Pebble Beach",
      total: 70,
      scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
    {
      rank: 2,
      username: "golfer2",
      course: "Augusta National",
      total: 68,
      scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
  ];
  return (
    <React.Fragment>
      <section>
        {/* Todo: Make this a component */}
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Scoreboard
        </h1>
        {/* Todo: Make this a component */}
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          You will see your golf game here soon, including your scores, stats,
          and course information.
        </p>
        <Leaderboard />
        {leaderboard.map((item, index) => (
          <LeaderboardItem
            key={index}
            rank={item.rank}
            username={item.username}
            course={item.course}
            total={item.total}
            scores={item.scores}
          />
        ))}
      </section>
    </React.Fragment>
  );
}
