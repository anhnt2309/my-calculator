import { combineReducers } from "redux";
import * as Constants from "./constants";

const calculatorReducer = (state = Constants.INIT_STATE, action) => {
  switch (action.type) {
    case Constants.ACTIONS.INPUT_CHANGE:
      var inputArr = state.inputArray;
      if (
        (state.displayText == "0" && action.value == "0") ||
        (state.displayText.endsWith(".") && action.value == ".")
      )
        return state;
      if (
        (state.isResultShowing && Number.isInteger(action.value)) ||
        (state.isResultShowing && action.value == ".")
      ) {
        inputArr = "";
      }
      if (!Number.isInteger(action.value) && action.value != ".") {
        return Object.assign({}, state, {
          inputArray: `${inputArr}${action.value}`,
          lastValue: action.value,
          isResultShowing: false
        });
      }
      if (inputArr == "0" && Number.isInteger(action.value)) inputArr = "";
      if (
        state.lastValue != "0." &&
        !Number.isInteger(state.lastValue) &&
        action.value == "."
      ) {
        if (inputArr == "0") inputArr = "";
        action.value = "0.";
        return Object.assign({}, state, {
          displayText: `${action.value}`,
          inputArray: `${inputArr}${action.value}`,
          lastValue: action.value,
          isResultShowing: false
        });
      }
      if (
        Number.isInteger(parseInt(state.displayText)) &&
        action.value == "."
      ) {
        return Object.assign({}, state, {
          displayText: `${state.displayText}${action.value}`,
          inputArray: `${inputArr}${action.value}`,
          lastValue: action.value,
          isResultShowing: false
        });
      }
      let nextInputString = `"${inputArr}${action.value}"`;
      let lastNumberRegexExec;
      let displayString = null;
      while (
        (lastNumberRegexExec = Constants.lastNumberRegex.exec(
          nextInputString
        )) !== null
      ) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (lastNumberRegexExec.index === Constants.lastNumberRegex.lastIndex) {
          Constants.lastNumberRegex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        displayString = lastNumberRegexExec[0];
      }

      return Object.assign({}, state, {
        displayText: Number.isInteger(displayString)
          ? parseInt(displayString)
          : displayString ?? action.value,
        inputArray: `${inputArr}${action.value}`,
        lastValue: action.value,
        isResultShowing: false
      });
    case Constants.ACTIONS.SHOW_RESULT:
      let allNumberRegexExec;
      let computeString = "";
      var inputString = state.inputArray;
      while (
        (allNumberRegexExec = Constants.allNumberRegex.exec(
          `${state.inputArray}`
        )) !== null
      ) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (allNumberRegexExec.index === Constants.allNumberRegex.lastIndex) {
          Constants.allNumberRegex.lastIndex++;
        }
        let numberString = inputString.substring(
          inputString.indexOf(allNumberRegexExec[0]) - 1,
          inputString.indexOf(allNumberRegexExec[0]) +
            allNumberRegexExec[0].length
        );
        if (computeString == "") {
          if (inputString.indexOf(allNumberRegexExec[0]) != 0) {
            computeString = numberString;
          } else {
            computeString = allNumberRegexExec[0];
          }
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
      return Object.assign({}, state, {
        displayText: "0",
        inputArray: "0"
      });
    default:
      return state;
  }
};

export default combineReducers({
  calculator: calculatorReducer
});
