import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Colors, Metrics } from "../Themes/index";
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/WaitingForOpponentStyleScreen";

class WaitingForOpponentScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Waiting For Opponent</Text>
          <ActivityIndicator size="large" color={Colors.frost} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForOpponentScreen);
