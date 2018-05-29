import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

// Styles
import styles from "./Styles/PlacingShipsStyles";
import Square from "./Square";
import Ship from "./Ship";
import RoundedButton from "../Components/RoundedButton";
import { Metrics } from "../Themes/";

class PlacingShipsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(previousProps) {
    setTimeout(() => {
      if (this.grid !== null && this.grid !== undefined) {
        this.grid.measure((fx, fy, width, height, px, py) => {
          console.log("grid: " + fx, fy, width, height, px, py);
          this.props.postGameGridSize({
            px: px,
            py: py,
            width: width,
            height: height
          });
          // }
        });
      }
    }, 0);
  }

  renderGrid = () => {
    const playerId = this.props.gameView.payload.id;
    return this.props.gameView.payload.gameGrids[playerId].map(square => {
      return (
        <Square
          square={square}
          key={square.id}
          length={Metrics.placingShipsSquareLength}
        />
      );
    });
  };

  renderShips = () => {
    console.log('ships.')
    const ships = [
      { type: "aircraftCarrier", id: "1", size: 5, horizontal: true },
      { type: "battleship", id: "2", size: 4, horizontal: true },
      { type: "submarine  ", id: "3", size: 3, horizontal: true },
      { type: "destroyer", id: "4", size: 3, horizontal: true },
      { type: "patrolBoat", id: "5", size: 2, horizontal: true }
    ];
    return ships.map(ship => {
      return (
        <Ship
          ship={ship}
          key={ship.id}
        />
      );
    });
  };

  render() {
    console.log('tet')
    return this.props.gameView.payload !== null ? (
      <View style={styles.container}>
        <RoundedButton
          text={"Play now!"}
          onPress={() =>
            this.props.navigation.navigate("GamePlayScreen", {
              // game: this.props.gameView.payload.game
            })
          }
        />
        <View style={styles.centered}>
          <View
            style={styles.grid}
            ref={view => {
              this.grid = view;
            }}
          >
            {this.renderGrid()}
          </View>
        </View>
        <View>{this.renderShips()}</View>
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
    postGameGridSize: size => {
      dispatch({ type: "POST_GAME_GRID_SIZE", payload: size });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
