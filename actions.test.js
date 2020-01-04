import * as actions from "./actions";
import * as Constants from "./constants";

describe("actions", () => {
  it("It should create an action for input change", () => {
    const value = "1";
    const expectedAction = {
      type: Constants.ACTIONS.INPUT_CHANGE,
      value
    };
    expect(actions.onInputChange(value)).toEqual(expectedAction);
  });

  it("It should create an action for clear input", () => {
    const expectedAction = {
      type: Constants.ACTIONS.CLEAR
    };
    expect(actions.onClear()).toEqual(expectedAction);
  });

  it("It should create an action for show result", () => {
    const expectedAction = {
      type: Constants.ACTIONS.SHOW_RESULT
    };
    expect(actions.onShowResult()).toEqual(expectedAction);
  });
});
