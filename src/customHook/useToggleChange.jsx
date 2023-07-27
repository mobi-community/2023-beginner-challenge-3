import { useState } from "react"

const useToggleChange = () => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleChange = () => setIsToggle((prev) => !prev);

  return { isToggle, toggleChange };
}

export default useToggleChange;