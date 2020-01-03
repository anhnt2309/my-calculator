import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import calculatorReducer from "./reducer";
import Home from "./Screen";

const store = createStore(calculatorReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Home style={{ flex: 1 }} />
    </Provider>
  );
}
