import { combineReducers } from "redux";
import * as Constants from "./constants";

const INIT_STATE = {
  displayText: "0",
  inputArray: "",
  lastValue: "0"
};

const calculatorReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Constants.ACTIONS.INPUT_CHANGE:
      let nextInputString = `"${state.inputArray}${action.value}"`;

      const lastNumberRegex = /(\d+(\.\d+)?)(?=[^\d]+$)/gm;
      let lastNumberRegexExec;
      let displayString = null;
      while (
        (lastNumberRegexExec = lastNumberRegex.exec(nextInputString)) !== null
      ) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (lastNumberRegexExec.index === lastNumberRegex.lastIndex) {
          lastNumberRegex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        displayString = lastNumberRegexExec[0];
      }
      return Object.assign({}, state, {
        displayText: displayString ?? action.value + "",
        inputArray: "" + state.inputArray + action.value,
        lastValue: action.value
      });
    case Constants.ACTIONS.SHOW_RESULT:
      const allNumberRegex = /\d+(\.\d+)?/gm;
      let allNumberRegexExec;
      let computeString = "";
      var inputString = state.inputArray;
      console.log(state.inputArray);
      while (
        (allNumberRegexExec = allNumberRegex.exec(`${state.inputArray}`)) !==
        null
      ) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (allNumberRegexExec.index === allNumberRegex.lastIndex) {
          allNumberRegexExec.lastIndex++;
        }

        if (computeString == "") {
          if (inputString.indexOf(allNumberRegexExec[0]) != 0) {
            computeString = inputString.substring(
              inputString.indexOf(allNumberRegexExec[0]) - 1,
              inputString.indexOf(allNumberRegexExec[0]) +
                allNumberRegexExec[0].length
            );
          } else {
            computeString = allNumberRegexExec[0];
          }
          inputString = inputString.replace(allNumberRegexExec[0], "");
          console.log(
            `allNumberRegexExec[0] ${allNumberRegexExec[0]} ${inputString}`
          );
        } else {
          computeString =
            computeString +
            inputString.substring(
              inputString.indexOf(allNumberRegexExec[0]) - 1,
              inputString.indexOf(allNumberRegexExec[0]) +
                allNumberRegexExec[0].length
            );
          inputString = inputString.replace(allNumberRegexExec[0], "");
          console.log(
            `else ${inputString.substring(
              inputString.indexOf(allNumberRegexExec[0]) - 1,
              inputString.indexOf(allNumberRegexExec[0]) + 1
            )}`
          );
        }
        console.log(`${computeString}`);
        // The result can be accessed through the `m`-variable.
        allNumberRegexExec.forEach((match, groupIndex) => {
          console.log(`Found match, group ${groupIndex}: ${match}`);
        });
      }
      console.log(`${computeString}`);
      let result = eval(computeString);
      return Object.assign({}, state, {
        displayText: `${result}`,
        inputArray: `${result}`
      });
    case Constants.ACTIONS.CLEAR:
      return Object.assign({}, state, {
        displayText: "0",
        inputArray: ""
      });
    default:
      return state;
  }
};

export default combineReducers({
  calculator: calculatorReducer
});
