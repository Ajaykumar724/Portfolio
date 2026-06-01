const achievements = [
  "500+ LeetCode Problems Solved",
  "Peak Rating 1449",
  "Global Rank 8180",
  "Built Production Ready AI Systems",
  "Delivered ONDC Seller Backend",
];

function Achievements() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">
        Achievements.tsx
      </h1>

      {achievements.map((item) => (
        <div
          key={item}
          className="mb-4 border-l-2 border-green-500 pl-4"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Achievements;