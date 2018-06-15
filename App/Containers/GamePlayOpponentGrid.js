import React, { Component } from "react";
import { View, Vibration, Image, PanResponder, Animated } from "react-native";
import SquareOpponentGrid from "../Components/SquareOpponentGrid";
import styles from "./Styles/GamePlayOpponentGridStyle";
import { connect } from "react-redux";
import SalvoActions from "../Redux/SalvoRedux";
import ManageGameActions from "../Redux/ManageGameRedux";
import { Metrics } from "../Themes";
import Crosshair from "../Components/Crosshair";
import getChars from "../Data/getChars";
import Torpedos from "../Components/Torpedos";
import Arrow from "../Components/Arrow";

class GamePlayOpponentGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridPan: new Animated.Value(0),
      crosshairPan: new Animated.ValueXY({ x: 0, y: 0 }),
      crosshairInitialPosition: {
        locationX: 0,
        locationY: 0
      },
      showCrosshair: false
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () =>
        this.props.stage === "waitingForSalvoesOfPlayer",
      onPanResponderGrant: (e, gesture) => {
        this.state.gridPan.setValue(0);
        const id = this.getId(e);
        if (this.props.newSalvoes.some(salvo => salvo === id)) {
          this.props.toggleSalvo(id);
        } else if (!this.fiveShotsReached()) {
          this.setState({
            showCrosshair: true,
            crosshairInitialPosition: {
              locationX: e.nativeEvent.locationX,
              locationY: e.nativeEvent.locationY
            }
          });
        }
      },
      onPanResponderMove: (e, gestureState) => {
        if (this.props.newSalvoes.length < 5) {
          if (
            this.isOutsideGrid(e.nativeEvent.locationX, e.nativeEvent.locationY)
          ) {
            console.log("outside");
            this.resetCrosshair();

            return;
          }

          this.state.crosshairPan.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          });
        }

        if (this.props.newSalvoes.length === 5) {
          if (gestureState.dy > 0) {
            this.state.gridPan.setValue(gestureState.dy);
          }

          if (gestureState.dy > 100) {
            Vibration.vibrate(200);
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.state.showCrosshair) {
          this.resetCrosshair();
          this.toggleSalvo(this.getId(e));
        } else {
          const releasePosition = gestureState.dy;
          Animated.spring(this.state.gridPan, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start(() => {
            if (releasePosition > 100) {
              this.props.postSalvoes();
            }
          });
        }
      }
    });
  }

  toggleSalvo = id => {
    const salvoHasNoOldSalvo = !this.props.oldSalvoes
      .filter(salvo => salvo.gamePlayerId === this.props.gamePlayerId)
      .some(salvo => salvo.locations.some(location => location === id));
    if (salvoHasNoOldSalvo) {
      this.props.toggleSalvo(id);
    }
  };

  getId = e => {
    const salvoXLocation = Math.floor(
      e.nativeEvent.locationX / Metrics.gamePlayOpponentSquareLength
    );
    const salvoYLocation = Math.floor(
      e.nativeEvent.locationY / Metrics.gamePlayOpponentSquareLength
    );
    return getChars[salvoYLocation] + salvoXLocation;
  };

  isOutsideGrid = (locationX, locationY) => {
    return (
      locationX < Metrics.gamePlayOpponentSquareLength ||
      locationX > Metrics.gamePlayOpponentGridWidth ||
      locationY < Metrics.gamePlayOpponentSquareLength ||
      locationY > Metrics.gamePlayOpponentGridWidth
    );
  };

  fiveShotsReached = () => {
    return this.props.newSalvoes.length === 5;
  };

  resetCrosshair = () => {
    this.setState({ showCrosshair: false });
    this.state.crosshairPan.setValue({
      x: 0,
      y: 0
    });
  };

  renderOpponentGrid = () => {
    return this.props.grid.map(square => {
      return (
        <SquareOpponentGrid
          square={square}
          key={square.id}
          length={Metrics.gamePlayOpponentSquareLength}
          newSalvo={this.props.newSalvoes.some(salvo => square.id === salvo)}
        />
      );
    });
  };

  render() {
    const gridPanStyle = {
      transform: [
        {
          translateY: this.state.gridPan
        }
      ]
    };

    return (
      <View style={styles.opponentGridContainer}>
        <Torpedos gridPan={this.state.gridPan} />
        <View style={styles.rows}>
          <Arrow
            gridPan={this.state.gridPan}
            fiveSalvoesReached={this.fiveShotsReached()}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[gridPanStyle, styles.opponentGrid]}
          >
            {this.renderOpponentGrid()}
            }
            <Crosshair
              showCrosshair={this.state.showCrosshair}
              panHandlers={this.panResponder.panHandlers}
              crosshairPan={this.state.crosshairPan}
              crosshairInitialPosition={this.state.crosshairInitialPosition}
            />
          </Animated.View>
          <Arrow
            gridPan={this.state.gridPan}
            fiveShotsReached={this.fiveShotsReached()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: state.gameView.payload.gameGrids[state.gameView.payload.opponentId],
    newSalvoes: state.salvoes,
    oldSalvoes: state.gameView.payload.salvoes,
    stage: state.gameView.payload.stage,
    gamePlayerId: state.gameView.payload.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    },
    postSalvoes: () => {
      dispatch(ManageGameActions.postSalvoesRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GamePlayOpponentGrid
);
