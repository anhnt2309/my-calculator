import { View, Text } from "react-native";
import React from "react";
import CalculatorButton from "./Button";
import { styles } from "./styles";
import { SimpleAnimation } from "react-native-simple-animations";

export const ACTIONS = {
  INPUT_CHANGE: "INPUT_CHANGE",
  SHOW_RESULT: "SHOW_RESULT",
  CLEAR: "CLEAR"
};
export const NUMBER_TYPE = "NUMBER_TYPE";
export const OPERANTS_TYPE = "OPERANTS_TYPE";
export const firstRowInputs = [7, 4, 1];
export const secondRowInputs = [8, 5, 2, 0];
export const thirdRowInputs = [9, 6, 3, "."];
export const fourthRowInputs = ["/", "*", "+", "-"];

export function createButton(inputArray, context) {
  return (
    <View style={styles.flex}>
      {inputArray.map(value => {
        return (
          <CalculatorButton
            key={value}
            text={value}
            outterProps={context.props}
          />
        );
      })}
    </View>
  );
}

export function createDisplayText(text) {
  return (
    <SimpleAnimation
      animateOnUpdate={true}
      duration={2000}
      fade
      animate={true}
      useNativeDriver
      style={styles.displayTextContainer}
    >
      <Text
        style={styles.displayText}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </SimpleAnimation>
  );
}

export const INIT_STATE = {
  displayText: "0",
  inputArray: "0",
  lastValue: "0",
  isResultShowing: false
};

export const lastNumberRegex = /(\d+(\.\d+)?)(?=[^\d]+$)/gm;
export const allNumberRegex = /\d+(\.\d+)?/gm;
