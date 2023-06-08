import { useState } from "react";

type Props = {};

const Home = (props: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <img className="logo" src="vite.svg" alt="Vite icon" />
      <img className="logo" src="react.svg" alt="React icon" />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Home;
