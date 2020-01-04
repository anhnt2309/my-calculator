import { combineReducers } from "redux";
import * as Constants from "./constants";

const calculatorReducer = (state = Constants.INIT_STATE, action) => {
  let { inputArray: inputArr, displayText, isResultShowing, lastValue } = state;
  let { type: actionType, value: actionValue } = action;
  switch (actionType) {
    case Constants.ACTIONS.INPUT_CHANGE:
      //Input : 0
      if (
        (displayText === "0" && actionValue === "0") ||
        (displayText.endsWith(".") && actionValue === ".") ||
        (!isResultShowing &&
          Number.isInteger(lastValue) &&
          displayText.includes(".") &&
          actionValue == ".")
      )
        return state;
      //Input after result
      if (
        (isResultShowing && Number.isInteger(actionValue)) ||
        (isResultShowing && actionValue === ".")
      ) {
        inputArr = "";
      }
      //input operant
      if (!Number.isInteger(actionValue) && actionValue !== ".") {
        return Object.assign({}, state, {
          inputArray: `${inputArr}${actionValue}`,
          lastValue: actionValue,
          isResultShowing: false
        });
      }
      //Input : Not 0
      if (inputArr === "0" && Number.isInteger(actionValue)) inputArr = "";
      //Input: .
      if (
        lastValue !== "0." &&
        !Number.isInteger(lastValue) &&
        actionValue === "."
      ) {
        if (inputArr === "0") inputArr = "";
        actionValue = "0.";
        return Object.assign({}, state, {
          displayText: `${actionValue}`,
          inputArray: `${inputArr}${actionValue}`,
          lastValue: actionValue,
          isResultShowing: false
        });
      }
      if (Number.isInteger(parseInt(displayText)) && actionValue === ".") {
        return Object.assign({}, state, {
          displayText: `${displayText}${actionValue}`,
          inputArray: `${inputArr}${actionValue}`,
          lastValue: actionValue,
          isResultShowing: false
        });
      }
      let nextInputString = `"${inputArr}${actionValue}"`;
      let lastNumberRegexExec,
        displayString = null;
      while (
        (lastNumberRegexExec = Constants.lastNumberRegex.exec(
          nextInputString
        )) !== null
      ) {
        if (lastNumberRegexExec.index === Constants.lastNumberRegex.lastIndex) {
          Constants.lastNumberRegex.lastIndex++;
        }
        displayString = lastNumberRegexExec[0];
      }
      return Object.assign({}, state, {
        displayText: displayString ?? actionValue,
        inputArray: `${inputArr}${actionValue}`,
        lastValue: actionValue,
        isResultShowing: false
      });
    case Constants.ACTIONS.SHOW_RESULT:
      let allNumberRegexExec,
        computeString = "",
        inputString = inputArr;
      while (
        (allNumberRegexExec = Constants.allNumberRegex.exec(`${inputArr}`)) !==
        null
      ) {
        if (allNumberRegexExec.index === Constants.allNumberRegex.lastIndex) {
          Constants.allNumberRegex.lastIndex++;
        }
        let numberIndex = inputString.indexOf(allNumberRegexExec[0]);
        let numberString = inputString.substring(
          numberIndex - 1,
          numberIndex + allNumberRegexExec[0].length
        );
        if (computeString === "") {
          computeString =
            numberIndex != 0 ? numberString : allNumberRegexExec[0];
        } else {
          computeString = computeString + numberString;
        }
        inputString = inputString.replace(allNumberRegexExec[0], "");
      }
      let result = parseFloat(eval(computeString).toFixed(15));
      return Object.assign({}, state, {
        displayText: `${result}`,
        inputArray: `${result}`,
        lastValue: "",
        isResultShowing: true
      });
    case Constants.ACTIONS.CLEAR:
      return Object.assign({}, state, Constants.INIT_STATE);
    default:
      return state;
  }
};

export default combineReducers({
  calculator: calculatorReducer
});
