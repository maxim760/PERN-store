import { useState } from "react";
type IReturn = [string, (e: React.ChangeEvent<HTMLInputElement>) => void,() => void];

export const useChange = (initial = ""): IReturn => {
  const [value, setValue] = useState(initial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const resetValue = () => setValue(initial)
  return [value, handleChange, resetValue];
};
