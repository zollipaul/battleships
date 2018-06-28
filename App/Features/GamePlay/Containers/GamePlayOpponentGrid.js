import React, { Component } from "react";
import { View, PanResponder, Animated } from "react-native";
import OpponentGrid from "../Components/OpponentGrid";
import styles from "./Styles/GamePlayOpponentGridStyle";
import { connect } from "react-redux";
import SalvoActions from "../../../Redux/SalvoRedux";
import ManageGameActions from "../../../Redux/ManageGameRedux";
import GameViewActions from "../../../Redux/GameViewRedux";
import { Metrics } from "../../../Themes/index";
import Crosshair from "../Components/Crosshair";
import getChars from "../../../Data/getChars";
import Torpedos from "../Components/Torpedos";
import SwipeDown from "../Components/SwipeDown";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

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
      showCrosshair: false,
      hideSwipeDownShowTorpedos: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.newSalvo.length !== prevProps.newSalvo.length &&
      this.props.fiveShotsReached
    ) {
      this.setState({ hideSwipeDownShowTorpedos: false });
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.gridPan, {
            toValue: 70,
            duration: 500,
            useNativeDriver: true,
            delay: 800
          }),
          Animated.spring(this.state.gridPan, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ]),
        {
          iterations: 3
        }
      ).start();
    }

    // else if (
    //   prevProps.turn !== this.props.turn ||
    //   (prevProps.stage === "myTurnAndOpponentHasNotShot" &&
    //     this.props.stage === "waitingForSalvoOfOpponent")
    // ) {
    //   this.setState({ shootNow: true });
    // }
  }

  componentWillMount() {
    let onceHaptic = true;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: e =>
        this.props.stage === "myTurnAndOpponentHasNotShot" ||
        this.props.stage === "myTurnAndOpponentHasShot",
      onPanResponderGrant: (e, gesture) => {
        this.state.gridPan.setValue(0);
        const id = this.getId(e);
        if (this.props.newSalvo.some(location => location === id)) {
          this.props.toggleSalvo(id);
        } else if (this.props.fiveShotsReached) {
          this.props.stopBackgroundSync();
          this.setState({ hideSwipeDownShowTorpedos: true });
        } else if (!this.isOutsideGrid(e)) {
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
        // console.log('dx, dy' + gestureState.dx, gestureState.dy)

        console.log(
          "touch rel. element: " + e.nativeEvent.locationX,
          e.nativeEvent.locationY
        );
        if (!this.props.fiveShotsReached) {
          if (this.isOutsideGrid(e)) {
            this.resetCrosshair();
            return;
          }

          return Animated.event([
            null,
            {
              dx: this.state.crosshairPan.x,
              dy: this.state.crosshairPan.y
            }
          ])(e, gestureState);

          // this.state.crosshairPan.setValue({
          //   x: gestureState.dx,
          //   y: gestureState.dy
          // });
        } else {
          if (gestureState.dy > 0) {
            this.state.gridPan.setValue(gestureState.dy);
          }

          if (gestureState.dy < 100) {
            if (!onceHaptic) {
              onceHaptic = true;
            }
          } else {
            if (onceHaptic) {
              ReactNativeHapticFeedback.trigger("impactHeavy", false);
              onceHaptic = false;
            }
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.state.showCrosshair) {
          console.log(this.getId(e));

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
      ReactNativeHapticFeedback.trigger("impactLight", false);
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

  isOutsideGrid = e => {
    const locationX = e.nativeEvent.locationX;
    const locationY = e.nativeEvent.locationY;
    return (
      locationX < Metrics.gamePlayOpponentSquareLength ||
      locationX > Metrics.gamePlayOpponentGridWidth ||
      locationY < Metrics.gamePlayOpponentSquareLength ||
      locationY > Metrics.gamePlayOpponentGridWidth
    );
  };

  resetCrosshair = () => {
    this.setState({ showCrosshair: false });
    this.state.crosshairPan.setValue({
      x: 0,
      y: 0
    });
  };

  swipeDownOrTorpedos = () => {
    return this.state.hideSwipeDownShowTorpedos ? (
      <Torpedos gridPan={this.state.gridPan} />
    ) : (
      <SwipeDown />
    );
  };

  renderCrosshair = () => {
    if (this.state.showCrosshair) {
      return (
        <Crosshair
          panHandlers={this.panResponder.panHandlers}
          crosshairPan={this.state.crosshairPan}
          crosshairInitialPosition={this.state.crosshairInitialPosition}
        />
      );
    }
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
        {this.swipeDownOrTorpedos()}
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[gridPanStyle, styles.opponentGrid]}
        >
          <OpponentGrid
            stage={this.props.stage}
            grid={this.props.grid}
            oldSalvoes={this.props.oldSalvoes}
            newSalvo={this.props.newSalvo}
            resetShoot={this.resetShoot}
            gamePlayerId={this.props.gamePlayerId}
          />
          {this.renderCrosshair()}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: state.gameView.payload.gameGrids[state.gameView.payload.opponentId],
    newSalvo: state.salvoes,
    oldSalvoes: state.gameView.payload.salvoes,
    stage: state.gameView.payload.stage,
    gamePlayerId: state.gameView.payload.id,
    turn: state.gameView.payload.turn,
    fiveShotsReached: state.salvoes.length === 5
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    },
    resetAllSalvoes: () => {
      dispatch(SalvoActions.resetAllSalvoes());
    },
    postSalvoes: () => {
      dispatch(ManageGameActions.postSalvoesRequest());
    },
    stopBackgroundSync: () => {
      dispatch(GameViewActions.stopBackgroundSync());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GamePlayOpponentGrid
);
