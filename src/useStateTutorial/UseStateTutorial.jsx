import React, { useMemo, useState } from "react";

const UseStateTutorial = () => {
  const [count, setCount] = useState(0);
  const [isToggle, setIsToggle] = useState(false);

  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");

    return count * 2;
  }, [count]);

  const handleCount = () => {
    console.log("Handling count");
    setCount((prev) => prev + 1);
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div>
      <p>{count}</p>
      <p>Expensive calculation {expensiveCalculation}</p>
      <button onClick={handleCount}>Increment</button>

      <button onClick={handleToggle}>Toggle</button>
      {isToggle && <span>Toggle</span>}
    </div>
  );
};

export default UseStateTutorial;
