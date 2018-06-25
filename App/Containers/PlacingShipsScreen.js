import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PlayButton from "./PlayButton";
import GameGridActions from "../Redux/PlacingShipsGridPositionRedux";
import PlacingShipsGrid from "../Components/PlacingShipsGrid";
import ShipsContainer from "../Components/ShipsContainer";

// Styles
import styles from "./Styles/PlacingShipsStyles";

class PlacingShipsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  measureLayout = event => {
    this.props.postGameGridX(event.nativeEvent.layout.x);
  };

  render() {
    return this.props.gameView.payload !== null ? (
      <View style={styles.container}>
        <PlacingShipsGrid
          gameView={this.props.gameView}
          measureLayout={this.measureLayout}
        />
        <ShipsContainer />
        <PlayButton />
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postGameGridX: px => {
      dispatch(GameGridActions.postGameGridX(px));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
