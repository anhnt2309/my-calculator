import calculatorReducer from "./reducer";
import * as Constants from "./constants";

describe("Calculator Reducer", () => {
  it("should return the initial state", () => {
    expect(calculatorReducer(undefined, {}).calculator).toEqual(
      Constants.INIT_STATE
    );
  });

  it("CASE 1 (1+2-3*4) => Test case 1 + 2 - 3 * 4 with final input: '=' -> Display '-9'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "4",
            inputArray: "1+2-3*4",
            lastValue: 4,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "-9",
      inputArray: "-9",
      lastValue: "",
      isResultShowing: true
    });
  });
  it("CASE 2 (12*/+1) => Initial input : 1 -> Display 1", () => {
    expect(
      calculatorReducer(
        {},
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "1",
      inputArray: "1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Next input: 2 -> Display 12", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1",
            inputArray: "1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "12",
      inputArray: "12",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Next input: '*' -> Display 12", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "12",
            inputArray: "12",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "*"
        }
      ).calculator
    ).toEqual({
      displayText: "12",
      inputArray: "12*",
      lastValue: "*",
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Next input: '/' -> Display 12", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "12",
            inputArray: "12*",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "/"
        }
      ).calculator
    ).toEqual({
      displayText: "12",
      inputArray: "12*/",
      lastValue: "/",
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Next input: '+' -> Display 12", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "12",
            inputArray: "12*/",
            lastValue: "/",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "12",
      inputArray: "12*/+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Next input: 1 -> Display 1", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "12",
            inputArray: "12*/+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "1",
      inputArray: "12*/+1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 2 (12*/+1) => Final input: '=' -> Display result 13", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1",
            inputArray: "12*/+1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "13",
      inputArray: "13",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 3 (0. + 2) => Initial input : 0 -> Display 0", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 0
        }
      ).calculator
    ).toEqual({
      displayText: "0",
      inputArray: "0",
      lastValue: 0,
      isResultShowing: false
    });
  });
  it("CASE 3 (0. + 2) => Next input: '.' -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0",
            inputArray: "0",
            lastValue: 0,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.",
      lastValue: ".",
      isResultShowing: false
    });
  });
  it("CASE 3 (0. + 2) => Next input: '+' -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 3 (0. + 2) => Next input: '2' -> Display '2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "2",
      inputArray: "0.+2",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 3 (0. + 2) => Final input: '=' -> Display result '2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2",
            inputArray: "0.+2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "2",
      inputArray: "2",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 4 (.1 + .1) => Initial input : . -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });
  it("CASE 4 (.1 + .1) => Next input: '1' -> Display '0.1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "0.1",
      inputArray: "0.1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 4 (.1 + .1) => Next input: '+' -> Display '0.1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.1",
            inputArray: "0.1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "0.1",
      inputArray: "0.1+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 4 (.1 + .1) => Next input: '.' -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.1",
            inputArray: "0.1+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.1+0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });
  it("CASE 4 (.1 + .1) => Next input: '1' -> Display '0.1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.1+0.",
            lastValue: "0.",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "0.1",
      inputArray: "0.1+0.1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 4 (.1 + .1) => Final input: '=' -> Display result '0.2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.1",
            inputArray: "0.1+0.1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "0.2",
      inputArray: "0.2",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 5 (.2 + 0.2) => Initial input : . -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Next input: '2' -> Display '0.2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.",
            lastValue: "0.",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "0.2",
      inputArray: "0.2",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Next input: '+' -> Display '0.2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.2",
            inputArray: "0.2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "0.2",
      inputArray: "0.2+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Next input: '0' -> Display '0", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.2",
            inputArray: "0.2+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 0
        }
      ).calculator
    ).toEqual({
      displayText: "0",
      inputArray: "0.2+0",
      lastValue: 0,
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Next input: '.' -> Display '0.", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0",
            inputArray: "0.2+0",
            lastValue: 0,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.2+0.",
      lastValue: ".",
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Next input: '2' -> Display '0.2", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.2+0.",
            lastValue: ".",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "0.2",
      inputArray: "0.2+0.2",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 5 (.2 + 0.2) => Final input: '=' -> Display result '0.4", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.2",
            inputArray: "0.2+0.2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "0.4",
      inputArray: "0.4",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 6 (0..) => Initial input : . -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });
  it("CASE 6 (0..) => Next input : . -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "0.",
            lastValue: "0.",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });

  it("CASE 7 (00) => Initial input : 0 -> Display '0'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 0
        }
      ).calculator
    ).toEqual({
      displayText: "0",
      inputArray: "0",
      lastValue: 0,
      isResultShowing: false
    });
  });
  it("CASE 7 (00) => Next input : 0 -> Display '0'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0",
            inputArray: "0",
            lastValue: 0,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 0
        }
      ).calculator
    ).toEqual({
      displayText: "0",
      inputArray: "0",
      lastValue: 0,
      isResultShowing: false
    });
  });

  it("CASE 8 (1.2.3) => Initial input : '1' -> Display '1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "1",
      inputArray: "1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 8 (1.2.3) => Next input : '.' -> Display '1.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1",
            inputArray: "1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "1.",
      inputArray: "1.",
      lastValue: ".",
      isResultShowing: false
    });
  });
  it("CASE 8 (1.2.3) => Next input : '2' -> Display '1.2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1.",
            inputArray: "1.",
            lastValue: ".",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "1.2",
      inputArray: "1.2",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 8 (1.2.3) => Next input : '.' -> Display '1.2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1.2",
            inputArray: "1.2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "1.2",
      inputArray: "1.2",
      lastValue: 2,
      isResultShowing: false
    });
  });

  it("CASE 9 (1-2=-1+4) => Current input: 1-2, next input : '=' -> Display '-1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2",
            inputArray: "1-2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "-1",
      inputArray: "-1",
      lastValue: "",
      isResultShowing: true
    });
  });
  it("CASE 9 (1-2=-1+4) => Next input : '+' -> Display '-1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "-1",
            inputArray: "-1",
            lastValue: "",
            isResultShowing: true
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "-1",
      inputArray: "-1+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 9 (1-2=-1+4) => Next input : '4' -> Display '4'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "-1",
            inputArray: "-1+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 4
        }
      ).calculator
    ).toEqual({
      displayText: "4",
      inputArray: "-1+4",
      lastValue: 4,
      isResultShowing: false
    });
  });
  it("CASE 9 (1-2=-1+4) => Final input : '=' -> Display result '='", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "4",
            inputArray: "-1+4",
            lastValue: 4,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "3",
      inputArray: "3",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 10 (1-2=-1 4+1) => Current input: 1+2, next input : '=' -> Display '-1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2",
            inputArray: "1-2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "-1",
      inputArray: "-1",
      lastValue: "",
      isResultShowing: true
    });
  });
  it("CASE 10 (1-2=-1 4+1) => Next input : '4' -> Display '4'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "-1",
            inputArray: "-1",
            lastValue: "",
            isResultShowing: true
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 4
        }
      ).calculator
    ).toEqual({
      displayText: "4",
      inputArray: "4",
      lastValue: 4,
      isResultShowing: false
    });
  });
  it("CASE 10 (1-2=-1 4+1) => Next input : '+' -> Display '4'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "4",
            inputArray: "4",
            lastValue: 4,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "4",
      inputArray: "4+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 10 (1-2=-1 4+1) => Next input : '1' -> Display '1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "4",
            inputArray: "4+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "1",
      inputArray: "4+1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 10 (1-2=-1 4+1) => Final input : '=' -> Display result '5'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "1",
            inputArray: "4+1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "5",
      inputArray: "5",
      lastValue: "",
      isResultShowing: true
    });
  });

  it("CASE 11 (2.3+.1) => Initial input : '2' -> Display '2'", () => {
    expect(
      calculatorReducer(
        {
          calculator: Constants.INIT_STATE
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 2
        }
      ).calculator
    ).toEqual({
      displayText: "2",
      inputArray: "2",
      lastValue: 2,
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Next input : '.' -> Display '2.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2",
            inputArray: "2",
            lastValue: 2,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "2.",
      inputArray: "2.",
      lastValue: ".",
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Next input : '3' -> Display '2.3'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2.",
            inputArray: "2.",
            lastValue: ".",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 3
        }
      ).calculator
    ).toEqual({
      displayText: "2.3",
      inputArray: "2.3",
      lastValue: 3,
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Next input : '+' -> Display '2.3'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2.3",
            inputArray: "2.3",
            lastValue: 3,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "+"
        }
      ).calculator
    ).toEqual({
      displayText: "2.3",
      inputArray: "2.3+",
      lastValue: "+",
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Next input : '.' -> Display '0.'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "2.3",
            inputArray: "2.3+",
            lastValue: "+",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: "."
        }
      ).calculator
    ).toEqual({
      displayText: "0.",
      inputArray: "2.3+0.",
      lastValue: "0.",
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Next input : '1' -> Display '0.1'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.",
            inputArray: "2.3+0.",
            lastValue: ".",
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.INPUT_CHANGE,
          value: 1
        }
      ).calculator
    ).toEqual({
      displayText: "0.1",
      inputArray: "2.3+0.1",
      lastValue: 1,
      isResultShowing: false
    });
  });
  it("CASE 11 (2.3+.1) => Final input : '=' -> Display result '2.4'", () => {
    expect(
      calculatorReducer(
        {
          calculator: {
            displayText: "0.1",
            inputArray: "2.3+0.1",
            lastValue: 1,
            isResultShowing: false
          }
        },
        {
          type: Constants.ACTIONS.SHOW_RESULT
        }
      ).calculator
    ).toEqual({
      displayText: "2.4",
      inputArray: "2.4",
      lastValue: "",
      isResultShowing: true
    });
  });
});
