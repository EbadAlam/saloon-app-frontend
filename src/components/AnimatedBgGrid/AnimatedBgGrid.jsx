import { useEffect, useState } from "react";

const AnimatedBgGrid = () => {
  const BOX_COUNT = 400;
  const [activeBoxes, setActiveBoxes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 10) + 5;
      const randoms = [];

      for (let i = 0; i < count; i++) {
        randoms.push(Math.floor(Math.random() * BOX_COUNT));
      }

      setActiveBoxes(randoms);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-bg-grid">
      {Array.from({ length: BOX_COUNT }).map((_, i) => (
        <span
          key={i}
          className={`bg-box ${activeBoxes.includes(i) ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default AnimatedBgGrid;