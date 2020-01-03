import React, { memo } from "react";
import { TouchableOpacity, Text } from "react-native";
import * as Constants from "./constants";
import { calculatorButton } from "./styles";
const areEqual = (prevProps, nextProps) => true;
export default memo(props => {
  console.log("casd", props);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
      onPress={() =>
        props.onPress != null
          ? props.onPress(props.text)
          : props.outterProps.onInputChange(props.text)
      }
    >
      <Text
        style={
          props.type ? calculatorButton.operants : calculatorButton.numbers
        }
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}, areEqual);
