import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/GamePlayScreenStyle";
import Square from "./Square";
import { Metrics } from "../Themes/";

class PlacingShipsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getGameView(this.props.screenProps.gamePlayer.id);
    this.props.getGameView("7");
  }

  renderPlayerGrid = () => {
    return this.props.gameView.payload.gameGrids["7"].map(square => {
      return <Square square={square} key={square.id} length={Metrics.gamePlayPlayerSquareLength} />;
    });
  };

  renderOpponentGrid = () => {
    return this.props.gameView.payload.gameGrids["8"].map(square => {
      return <Square square={square} key={square.id} length={Metrics.gamePlayOpponentSquareLength}/>;
    });
  };

  render() {
    console.log(this.props.gameView)
    return this.props.gameView.fetching === false ? (
      <View style={styles.container}>
        <View style={styles.centered}>
          <View
            style={styles.playerGrid}
          >
            {this.renderPlayerGrid()}
          </View>
          <View
            style={styles.opponentGrid}
          >
            {this.renderOpponentGrid()}
          </View>
        </View>
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView,
    gameGrid: state.gameGrid.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGameView: gamePlayerId => {
      dispatch({ type: "GAME_VIEW_REQUEST", data: gamePlayerId });
    },
    postGameGridSize: size => {
      dispatch({ type: "POST_GAME_GRID_SIZE", payload: size });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
