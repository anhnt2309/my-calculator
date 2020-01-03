import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as actions from "./actions";
import { styles } from "./styles";
import CalculatorButton from "./Button";
import * as Constants from "./constants";

class Home extends React.Component {
  render() {
    let firstRowInputs = [7, 4, 1];
    let secondRowInputs = [8, 5, 2, 0];
    let thirdRowInputs = [9, 6, 3, "."];
    let fourthRowInputs = ["/", "*", "+", "-"];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.displayContainer}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.displayText}
          >
            {this.props.displayText}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flex}>
            <CalculatorButton text={7} outterProps={this.props} />
            <CalculatorButton text={4} outterProps={this.props} />
            <CalculatorButton text={1} outterProps={this.props} />
            <CalculatorButton
              text={"C"}
              onPress={value => {
                this.props.onClear();
              }}
            />
          </View>
          <View style={styles.flex}>
            <CalculatorButton text={8} outterProps={this.props} />
            <CalculatorButton text={5} outterProps={this.props} />
            <CalculatorButton text={2} outterProps={this.props} />
            <CalculatorButton text={0} outterProps={this.props} />
          </View>
          <View style={styles.flex}>
            <CalculatorButton text={9} outterProps={this.props} />
            <CalculatorButton text={6} outterProps={this.props} />
            <CalculatorButton text={3} outterProps={this.props} />
            <CalculatorButton text={"."} outterProps={this.props} />
          </View>
          <View style={styles.flex}>
            <CalculatorButton
              type={Constants.OPERANTS_TYPE}
              text={"/"}
              outterProps={this.props}
            />
            <CalculatorButton
              type={Constants.OPERANTS_TYPE}
              text={"*"}
              outterProps={this.props}
            />
            <CalculatorButton
              type={Constants.OPERANTS_TYPE}
              text={"+"}
              outterProps={this.props}
            />
            <CalculatorButton
              type={Constants.OPERANTS_TYPE}
              text={"-"}
              outterProps={this.props}
            />
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
  const { displayText, inputArray } = state.calculator;
  return { displayText, inputArray };
};

export default connect(mapStateToProps, actions)(Home);
