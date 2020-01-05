import React from "react";
import { View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as actions from "./actions";
import { styles } from "./styles";
import CalculatorButton from "./Button";
import * as Constants from "./constants";

class Home extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.displayContainer}>
          {Constants.createDisplayText(this.props.displayText)}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flex}>
            {Constants.firstRowInputs.map(value => {
              return <CalculatorButton text={value} outterProps={this.props} />;
            })}
            <CalculatorButton
              text={"C"}
              onPress={value => {
                this.props.onClear();
              }}
            />
          </View>
          {Constants.createButton(Constants.secondRowInputs, this)}
          {Constants.createButton(Constants.thirdRowInputs, this)}
          <View style={styles.flex}>
            {Constants.fourthRowInputs.map(value => {
              return (
                <CalculatorButton
                  type={Constants.OPERANTS_TYPE}
                  text={value}
                  isSelected={this.props.lastValue === value}
                  outterProps={this.props}
                />
              );
            })}
            <CalculatorButton
              type={Constants.OPERANTS_TYPE}
              text={"="}
              onPress={value => {
                this.props.onShowResult();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { displayText, inputArray, lastValue } = state.calculator;
  return { displayText, inputArray, lastValue };
};
export default connect(mapStateToProps, actions)(Home);
