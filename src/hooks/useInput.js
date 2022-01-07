import { useState } from "react";

export default function useInput(validation) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validation(enteredValue);
  const hasError = !isValid && isTouched;

  const onBlurHandler = () => {
    setIsTouched(true);
  };
  const onChangeHandler = (event) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const resetValueHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    onBlurHandler,
    onChangeHandler,
    resetValueHandler,
  };
}
