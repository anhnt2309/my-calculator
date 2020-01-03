import { View, Text } from "react-native";
import React from "react";
import CalculatorButton from "./Button";
import { styles } from "./styles";

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
        return <CalculatorButton text={value} outterProps={context.props} />;
      })}
    </View>
  );
}

export function createDisplayText(text) {
  return (
    <Text
      adjustsFontSizeToFit={true}
      numberOfLines={3}
      ellipsizeMode="tail"
      style={styles.displayText}
    >
      {text}
    </Text>
  );
}
