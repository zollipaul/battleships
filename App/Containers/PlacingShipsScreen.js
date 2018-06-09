import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PlayButton from "./PlayButton";
import GameGridActions from "../Redux/GameGridRedux";
import PlacingShipsGrid from "../Components/PlacingShipsGrid";
import ShipsContainer from "../Components/ShipsContainer";

// Styles
import styles from "./Styles/PlacingShipsStyles";

class PlacingShipsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidUpdate(previousProps) {
  //   setTimeout(() => {
  //     if (this.grid !== null && this.grid !== undefined) {
  //       this.grid.measure((fx, fy, width, height, px, py) => {
  //         console.log("grid: " + fx, fy, width, height, px, py);
  //         this.props.postGameGridSize({
  //           px: 19,
  //           py: 85,
  //           width: width,
  //           height: height
  //         });
  //       });
  //     }
  //   }, 0);
  // }

  // setGridRef = view => {
  //   this.grid = view;
  // };

  render() {
    return this.props.gameView.payload !== null ? (
      <View style={styles.container}>
        <PlacingShipsGrid
          gameView={this.props.gameView}
          // setGridRef={this.setGridRef}
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
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postGameGridSize: size => {
      dispatch(GameGridActions.postGameGridSize(size));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
