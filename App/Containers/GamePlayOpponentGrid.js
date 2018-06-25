import React, { Component } from "react";
import { View, PanResponder, Animated } from "react-native";
import SquareOpponentGrid from "../Components/SquareOpponentGrid";
import styles from "./Styles/GamePlayOpponentGridStyle";
import { connect } from "react-redux";
import SalvoActions from "../Redux/SalvoRedux";
import ManageGameActions from "../Redux/ManageGameRedux";
import GameViewActions from "../Redux/GameViewRedux";
import { Metrics } from "../Themes";
import Crosshair from "../Components/Crosshair";
import getChars from "../Data/getChars";
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
      swipeDownOrTorpedos: '',
      // showTorpedos: false,
      shootNow: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.newSalvo.length !== prevProps.newSalvo.length &&
      this.props.fiveShotsReached
    ) {
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
      this.setState({swipeDownOrTorpedos: 'swipeDown'})
      // this.showArrowHideTopedos();
    } else if (
      prevProps.turn !== this.props.turn ||
      (prevProps.stage === "myTurnAndOpponentHasNotShot" &&
        this.props.stage === "waitingForSalvoOfOpponent")
    ) {
      this.setState({ shootNow: true });
    }
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
        } else if (!this.props.fiveShotsReached && !this.isOutsideGrid(e)) {
          this.setState({
            showCrosshair: true,
            shootNow: false,
            crosshairInitialPosition: {
              locationX: e.nativeEvent.locationX,
              locationY: e.nativeEvent.locationY
            }
          });
        } else {
          this.props.stopBackgroundSync();
          this.setState({swipeDownOrTorpedos: 'torpedos'})
          // this.hideArrowShowTopedos();
        }
      },
      onPanResponderMove: (e, gestureState) => {
        if (!this.props.fiveShotsReached) {
          if (this.isOutsideGrid(e)) {
            this.resetCrosshair();
            return;
          }

          this.state.crosshairPan.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          });
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

  getLastSalvo = salvoes => {
    const mySalvoes = salvoes.filter(
      salvo => salvo.gamePlayerId === this.props.gamePlayerId
    );

    return mySalvoes.reduce(
      (total, current) => (current.turn > total.turn ? current : total),
      mySalvoes[0]
    );
  };

  renderOpponentGrid = () => {
    let newSalvoLocations;

    if (this.props.stage === "waitingForSalvoOfOpponent") {
      newSalvoLocations = this.getLastSalvo(this.props.oldSalvoes).locations;
    } else {
      newSalvoLocations = this.props.newSalvo;
    }
    return this.props.grid.map(square => {
      const hasNewSalvo = newSalvoLocations.some(
        location => square.id === location
      );
      const newSalvoId = newSalvoLocations.indexOf(square.id);

      return (
        <SquareOpponentGrid
          hit={square.hit}
          horizontal={square.horizontal}
          id={square.id}
          isShip={square.isShip}
          part={square.part}
          salvo={square.salvo}
          key={square.id}
          title={square.title}
          length={Metrics.gamePlayOpponentSquareLength}
          newSalvo={hasNewSalvo}
          stage={this.props.stage}
          shootNow={this.state.shootNow && hasNewSalvo}
          resetShoot={this.resetShoot}
          newSalvoId={newSalvoId}
        />
      );
    });
  };

  // showArrowHideTopedos = () => {
  //   this.setState({
  //     showArrow: true,
  //     showTorpedos: false
  //   });
  // };
  // hideArrowShowTopedos = () => {
  //   this.setState({
  //     showArrow: false,
  //     showTorpedos: true
  //   });
  // };

  swipeDownOrTorpedos = () => {
    return this.state.swipeDownOrTorpedos === 'swipeDown' ? (
      <SwipeDown />
    ) : (
      <Torpedos
        gridPan={this.state.gridPan}
      />
    );
  };

  resetShoot = () => {
    this.setState({
      shootNow: false
    });

    this.props.resetAllSalvoes();
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
        {/*<Torpedos
          gridPan={this.state.gridPan}
          showTorpedos={this.state.showTorpedos}
        />
        <SwipeDown showArrow={this.state.showArrow} />*/}

        {this.swipeDownOrTorpedos()}
        <View style={styles.rows}>
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
        </View>
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
