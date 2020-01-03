import * as Constants from "./constants";

export const onInputChange = value => {
  return {
    type: Constants.ACTIONS.INPUT_CHANGE,
    value
  };
};

export const onShowResult = () => {
  return {
    type: Constants.ACTIONS.SHOW_RESULT
  };
};

export const onClear = () => {
  return {
    type: Constants.ACTIONS.CLEAR
  };
};
