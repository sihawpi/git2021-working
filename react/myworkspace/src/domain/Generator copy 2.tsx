import { useState } from "react";

const TextStyle = ({ num }: { num: Number }) => {
  const textColor = num < 0 ? "red" : "green";
  return <li style={{ color: textColor }}>{num}</li>;
};

const Generator = () => {
  const [numbers, setNumbers] = useState<Number[]>([]);

  const generate = () => {
    const randomNum = Math.floor(Math.random() * 100 - 50);

    setNumbers([randomNum, ...numbers]);
  };

  return (
    <div>
      <h2>Generator</h2>
      <button onClick={generate}>generate</button>
      <ul>
        {numbers.map((potato, index) => (
          <TextStyle num={potato} key={index} />
          // <li>{potato}</li>
        ))}
      </ul>
    </div>
  );
};
export default Generator;
