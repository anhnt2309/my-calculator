import React, { memo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { calculatorButton } from "./styles";
const areEqual = (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected;
};
export default memo(props => {
  return (
    <TouchableOpacity
      style={[
        calculatorButton.container,
        { backgroundColor: props.isSelected ? "#0CCE8E" : "#DDDDDD" }
      ]}
      onPress={() =>
        props.onPress != null
          ? props.onPress(props.text)
          : props.outterProps.onInputChange(props.text)
      }
    >
      <Text
        style={
          props.type
            ? props.isSelected
              ? calculatorButton.operantsSelected
              : calculatorButton.operants
            : calculatorButton.numbers
        }
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}, areEqual);
