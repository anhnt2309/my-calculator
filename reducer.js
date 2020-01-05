import { combineReducers } from "redux";
import * as Cons from "./constants";

const calculatorReducer = (state = Cons.INIT_STATE, action) => {
  let { inputArray: inputArr, displayText, isResultShowing, lastValue } = state;
  let { type: actionType, value: actionValue } = action;
  let isInt = value => Number.isInteger(value);
  switch (actionType) {
    case Cons.ACTIONS.INPUT_CHANGE:
      if (
        (displayText === "0" && actionValue === 0) ||
        (actionValue === "." &&
          (displayText.endsWith(".") ||
            (!isResultShowing &&
              isInt(lastValue) &&
              displayText.includes("."))))
      )
        return state; // Handle duplicate 0 and '.' cases
      let lastNumberExec, displayString;
      if (isResultShowing && (isInt(actionValue) || actionValue === "."))
        inputArr = ""; //Handle enter new input after show result
      if (isResultShowing && !isInt(actionValue)) displayString = displayText; //Handle operator input after show result
      if (inputArr === "0" && isInt(actionValue)) inputArr = ""; //Handle first number input when 0 is displayed
      if (displayText === "0." && !isInt(actionValue) && actionValue !== ".")
        displayString = displayText; //Handle operation input when displaying '0.'
      if (lastValue !== "0." && !isInt(lastValue) && actionValue == ".") {
        if (inputArr === "0") inputArr = "";
        actionValue = "0.";
        displayString = `${actionValue}`; //Handle '.' input without a number before that
      }
      if (isInt(parseInt(displayText)) && actionValue === ".")
        displayString = `${displayText}${actionValue}`; // Handle '.' input with a number before that
      let nextInput = `"${inputArr}${actionValue}"`;
      if (displayString === undefined)
        while ((lastNumberExec = Cons.lastNumRegex.exec(nextInput)) !== null) {
          if (lastNumberExec.index === Cons.lastNumRegex.lastIndex)
            Cons.lastNumRegex.lastIndex++;
          displayString = lastNumberExec[0]; // Handle regex for the last number for display
        }
      return Object.assign({}, state, {
        displayText: displayString ?? actionValue,
        inputArray: `${inputArr}${actionValue}`,
        lastValue: actionValue,
        isResultShowing: false
      });
    case Cons.ACTIONS.SHOW_RESULT:
      let allNumberExec, computeString;
      let inputString = inputArr;
      while ((allNumberExec = Cons.allNumRegex.exec(`${inputArr}`)) !== null) {
        if (allNumberExec.index === Cons.allNumRegex.lastIndex)
          Cons.allNumRegex.lastIndex++;
        let numberIndex = inputString.indexOf(allNumberExec[0]); // Find each match regex in inputString
        let numberString = inputString.substring(
          numberIndex - 1,
          numberIndex + allNumberExec[0].length
        );
        if (computeString === undefined)
          computeString = numberIndex != 0 ? numberString : allNumberExec[0];
        else computeString = computeString + numberString; // Handle regex to get each number and 1 operation right before that
        inputString = inputString.replace(allNumberExec[0], "");
      }
      let result = parseFloat(eval(computeString).toFixed(15)); // Calculate the final expression and return result
      return Object.assign({}, state, {
        displayText: `${result}`,
        inputArray: `${result}`.toLowerCase() == "infinity" ? "0" : `${result}`, // Handle x/0 cases
        lastValue: "",
        isResultShowing: true
      });
    case Cons.ACTIONS.CLEAR:
      return Object.assign({}, state, Cons.INIT_STATE);
    default:
      return state;
  }
};

export default reducer = combineReducers({
  calculator: calculatorReducer
});
