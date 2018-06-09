import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import GamePlayPlayerGrid from "../Components/GamePlayPlayerGrid";
import GamePlayOpponentGrid from "./GamePlayOpponentGrid";
import SalvoActions from "../Redux/SalvoRedux";

// Styles
import styles from "./Styles/GamePlayScreenStyle";
import OpponentShipsContainer from "../Components/OpponentShips/OpponentShipsContainer";

class PlacingShipsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gameView.payload !== null) {
      const playerId = this.props.gameView.payload.id;
      const gameGridPlayer = this.props.gameView.payload.gameGrids[playerId];
      const opponentId = this.props.gameView.payload.opponentId;
      const gameGridOpponent = this.props.gameView.payload.gameGrids[
        opponentId
      ];
      return (
        <View style={styles.container}>
          <View style={styles.centered}>
            <View style={styles.gameGridPlayerAndOpponentShips}>
              <GamePlayPlayerGrid grid={gameGridPlayer} />
              <OpponentShipsContainer sinks={this.props.gameView.payload.sinks} />
            </View>
            <GamePlayOpponentGrid grid={gameGridOpponent} />
          </View>
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
