import React, { Component } from "react";
import { PanResponder, Animated } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/ShipStyle";
import { Metrics } from "../Themes/";
import ShipActions from "../Redux/ShipsRedux";

class Ship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.ship.id,
      size: props.ship.size,
      pan: new Animated.ValueXY({ x: 0, y: 0 }),
      spin: new Animated.Value(0),
      swing: new Animated.Value(0),
      nextRotationIsSpin: false
    };
  }

  componentWillMount() {
    this._lastPos = { x: 0, y: 0 };
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    const squareLength = Metrics.placingShipsSquareLength;

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (e, gesture) => true,

      // invoked, when access to element is granted aka is touched
      onPanResponderGrant: (e, gesture) => {
        // console.log(this.state.pan)
        this.state.pan.extractOffset();
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      // ignore first argument, only interested in second argument, which updates Animated View location
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, gesture) => {
        const horizontal = this.props.ships.data[this.state.id].horizontal;
        const prevShipXLocation = this.props.ships.data[this.state.id]
          .coordinates.shipXLocation;
        const prevShipYLocation = this.props.ships.data[this.state.id]
          .coordinates.shipYLocation;
        // console.log("moveX: " + gesture.moveX + " moveY: " + gesture.moveY);
        // console.log("x0: "+ gesture.x0 + " y0: " + gesture.y0)
        // console.log("touch rel. element: "+ e.nativeEvent.locationX, e.nativeEvent.locationY)
        // console.log('horizontal: ' + horizontal)

        // get px and py of gameGrid
        const { px, py, height } = this.props.gameGrid;
        // console.log(px, py)

        // get left upper corner of ship before move
        const luX0 =
          gesture.x0 -
          (horizontal
            ? e.nativeEvent.locationX
            : squareLength - e.nativeEvent.locationY);
        const luY0 =
          gesture.y0 -
          (horizontal ? e.nativeEvent.locationY : e.nativeEvent.locationX);
        // console.log("luX0, luY0:" + luX0, luY0);

        // get left upper corner of ship on move
        const luX =
          gesture.moveX -
          (horizontal
            ? e.nativeEvent.locationX
            : squareLength - e.nativeEvent.locationY);
        const luY =
          gesture.moveY -
          (horizontal ? e.nativeEvent.locationY : e.nativeEvent.locationX);
        // console.log("luX, luY:" + luX, luY);

        // get n: "index" (1, 2, 3 ...) of x-axis and m: "char" (A, B, C, ...) of y-axis
        const shipXLocation = Math.round((luX - px) / squareLength);
        const shipYLocation = Math.round((luY - py) / squareLength);

        // get sluX und sluY: left upper corner of square (n,m)
        const sluX = shipXLocation * squareLength + px;
        const sluY = shipYLocation * squareLength + py;
        // console.log(sluX, sluY)

        // calculate dropZone below gameGrid
        const dropZoneY = py + height;
        // console.log("dropZoneY:" + dropZoneY);

        if (luY > dropZoneY && luY < Metrics.screenHeight) {
          console.log("ship in DropZone");
          Animated.timing(this.state.pan, {
            toValue: { x: luX - luX0, y: luY - luY0 },
            duration: 200,
            delay: 0
          }).start(() => (this._lastPos = this._val));

          // reset ship in store
          this.resetShip();
        }

        // detect if touch without movement, then rotate ship
        else if (gesture.moveX === 0 && gesture.moveY === 0) {
          console.log("ship touched");
          const {
            shipXLocationAfterRotation,
            shipYLocationAfterRotation
          } = this.correctShipLocations(
            prevShipXLocation,
            prevShipYLocation,
            horizontal
          );
          const alignmentAfterRotation = !horizontal;

          if (
            this.outSideGridOrCollisionWithShip(
              shipXLocationAfterRotation,
              shipYLocationAfterRotation,
              alignmentAfterRotation
            )
          ) {
            // swing rotation to show error
            console.log("swing error: ship out of grid");
            this.setState({ nextRotationIsSpin: false });
            Animated.spring(this.state.swing, {
              toValue: 1,
              duration: 200
            }).start(this.state.swing.setValue(0));
          } else {
            console.log("ship 90 deg rotation");
            // spin rotation for 90 degrees
            this.setState({ nextRotationIsSpin: true });

            Animated.parallel([
              Animated.timing(this.state.spin, {
                toValue: horizontal ? 1 : 0,
                duration: 200
              }),
              this.correctPositionDuringRotation(horizontal)
            ]).start(() => {
              // console.log("after spin: "+ this.state.spin._value)
              this._lastPos = this._val;

              this.pushShip(
                shipXLocationAfterRotation,
                shipYLocationAfterRotation,
                alignmentAfterRotation
              );
            });
          }
        }

        // if n on left or right side outside, if m upper or lower side outside --> back to start
        else if (
          this.outSideGridOrCollisionWithShip(
            shipXLocation,
            shipYLocation,
            horizontal
          )
        ) {
          console.log("ship back to starting position");
          Animated.timing(this.state.pan, {
            toValue: { x: this._lastPos.x * -1, y: this._lastPos.y * -1 },
            duration: 200,
            delay: 0
          }).start(() => (this._lastPos = this._val));

          // reset ship in store
          this.resetShip();

          // adjust to left upper corner of the closest square
        } else {
          console.log("ship adjusted to grid");
          Animated.timing(this.state.pan, {
            toValue: { x: sluX - luX0, y: sluY - luY0 },
            duration: 200,
            delay: 0
          }).start(() => {
            this._lastPos = this._val;
          });

          this.pushShip(shipXLocation, shipYLocation, horizontal);
        }
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.removeAllListeners();
  }

  shipOutsideGrid = (shipXLocation, shipYLocation, horizontal) => {
    return (
      shipXLocation < 1 ||
      shipXLocation + this.getSize(horizontal).width - 1 > 10 ||
      shipYLocation < 1 ||
      shipYLocation + this.getSize(horizontal).height - 1 > 10
    );
  };

  collisionWithShip = locations => {
    let ships = this.props.ships.data;
    let allLocations = [];
    for (let key in ships) {
      if (ships.hasOwnProperty(key) && key !== this.state.id) {
        const ship = ships[key];
        allLocations.push(...ship.location);
      }
    }

    return locations.some(location => {
      return allLocations.includes(location);
    });
  };

  outSideGridOrCollisionWithShip = (
    shipXLocation,
    shipYLocation,
    horizontal
  ) => {
    if (this.shipOutsideGrid(shipXLocation, shipYLocation, horizontal)) {
      return true;
    }

    const locations = this.calculateLocationsArray(
      shipXLocation,
      shipYLocation,
      horizontal
    );
    return this.collisionWithShip(locations);
  };

  calculateLocationsArray = (shipXLocation, shipYLocation, horizontal) => {
    const size = this.props.ship.size;
    let shipLocations = [];
    let getChars = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
      9: "I",
      10: "J"
    };

    for (let i = 0; i < size; i++) {
      shipLocations.push(
        horizontal
          ? getChars[shipYLocation] + (shipXLocation + i)
          : getChars[shipYLocation + i] + shipXLocation
      );
    }
    return shipLocations;
  };

  getSize = horizontal => {
    return horizontal
      ? {
          width: this.props.ship.size,
          height: 1
        }
      : {
          width: 1,
          height: this.props.ship.size
        };
  };

  // when shipSize is 2 or 4, the rotation needs to be corrected
  correctPositionDuringRotation = horizontal => {
    if (this.props.ship.size % 2 === 0) {
      const squareLength = Metrics.placingShipsSquareLength;
      const correction = horizontal
        ? { x: -1 * squareLength / 2, y: squareLength / 2 }
        : { x: squareLength / 2, y: -1 * squareLength / 2 };
      return Animated.timing(this.state.pan, {
        toValue: correction,
        duration: 200,
        delay: 0
      });
    }
  };

  correctShipLocations = (prevShipXLocation, prevShipYLocation, horizontal) => {
    if (this.props.ship.size === 2) {
      return {
        shipXLocationAfterRotation: prevShipXLocation,
        shipYLocationAfterRotation: prevShipYLocation
      };
    } else if (this.props.ship.size === 4) {
      return {
        shipXLocationAfterRotation: prevShipXLocation + (horizontal ? 1 : -1),
        shipYLocationAfterRotation: prevShipYLocation + (horizontal ? -1 : 1)
      };
    } else {
      const deltaValue = (this.props.ship.size - 1) / 2;
      return {
        shipXLocationAfterRotation:
          prevShipXLocation + (horizontal ? deltaValue : -1 * deltaValue),
        shipYLocationAfterRotation:
          prevShipYLocation + (horizontal ? -1 * deltaValue : deltaValue)
      };
    }
  };

  pushShip = (shipXLocation, shipYLocation, horizontal) => {
    this.props.pushShipToStore({
      id: this.props.ship.id,
      ship: {
        type: this.props.ship.type,
        size: this.props.ship.size,
        horizontal: horizontal,
        coordinates: {
          shipXLocation: shipXLocation,
          shipYLocation: shipYLocation
        },
        location: this.calculateLocationsArray(
          shipXLocation,
          shipYLocation,
          horizontal
        )
      }
    });
  };

  resetShip = () => {
    this.props.resetShip(this.state.id);
  };

  spinOrSwing = () => {
    const horizontal = this.props.ships.data[this.state.id].horizontal;

    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"]
      // extrapolate: 'clamp'
    });

    const swing = this.state.swing.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: horizontal
        ? ["0deg", "15deg", "-10deg", "5deg", "-5deg", "0deg"]
        : ["90deg", "105deg", "80deg", "95deg", "85deg", "90deg"]
    });

    return this.state.nextRotationIsSpin ? spin : swing;
  };

  render() {
    const panStyle = {
      transform: [
        {
          translateX: this.state.pan.x
        },
        {
          translateY: this.state.pan.y
        },
        {
          rotate: this.spinOrSwing()
        }
      ]
    };

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles[this.props.ship.type]]}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    gameGrid: state.gameGrid.payload,
    ships: state.ships
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushShipToStore: data => dispatch(ShipActions.pushShip(data)),
    resetShip: id => dispatch(ShipActions.resetShip(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
