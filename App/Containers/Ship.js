import React, { PureComponent } from "react";
import { PanResponder, Animated } from "react-native";
import { connect } from "react-redux";
import ShipActions from "../Redux/ShipsRedux";
import getChars from "../Data/getChars";

// Styles & Metrics
import styles from "./Styles/ShipStyle";
import { Metrics, Images } from "../Themes/";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

class Ship extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.ship.id,
      size: props.ship.size,
      pan: new Animated.ValueXY({ x: 0, y: 0 }),
      spin: new Animated.Value(0),
      rotation: new Animated.Value(0),
      swing: new Animated.Value(0),
      nextRotationIsSpin: false,
      locationX: 0,
      locationY: 0
    };
  }

  componentWillMount() {
    this._lastPos = { x: 0, y: 0 };
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    const squareLength = Metrics.placingShipsSquareLength;
    // Initialize PanResponder with move handling

    // let onceAlpha1 = true
    // let alphaStart, alphaEnd;
    let previousTimeStamp = 0;
    this._startingPosition = true;
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (e, gesture) => true,
      // invoked, when access to element is granted aka is touched
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.extractOffset();
        // console.log("pageX: " + e.nativeEvent.pageX + " pageY: " + e.nativeEvent.pageY);
        // console.log(
        //   "touch rel. element: " + e.nativeEvent.locationX,
        //   e.nativeEvent.locationY
        // );

        this.state.rotation.extractOffset();

        this.setState({
          locationX: e.nativeEvent.locationX,
          locationY: e.nativeEvent.locationY
        });
      },
      // ignore first argument, only interested in second argument, which updates Animated View location
      onPanResponderMove: (e, gesture) => {
        this.state.pan.setValue({ x: gesture.dx, y: gesture.dy });
        // console.log(this._val)

        // const horizontal = this.props.ships.data[this.state.id].horizontal;
        // const middleOfShip = horizontal ? { x: squareLength * this.state.size / 2, y: 0.5 * squareLength } : { x: 0.5 * squareLength, y: squareLength * this.state.size / 2 };
        //
        // if (e.nativeEvent.touches.length === 1) {
        //   onceAlpha1 = true;
        // }
        //
        // console.log(gesture.numberActiveTouches);
        // console.log(e.nativeEvent.touches);
        //
        // console.log("locX, locY" + e.nativeEvent.touches[0].locationX, e.nativeEvent.touches[0].locationY);
        //
        // // if (e.nativeEvent.touches.length === 2) {
        //   this.state.rotation.setValue(alphaEnd - alphaStart);
        //
        //   if (onceAlpha1) {
        //     // alphaStart =
        //     //   Math.atan2(
        //     //     e.nativeEvent.touches[0].locationY - middleOfShip.y,
        //     //     e.nativeEvent.touches[0].locationX - middleOfShip.x
        //     //   ) *
        //     //   (180 / Math.PI);
        //     // onceAlpha1 = false
        //
        //     alphaStart = Math.atan2(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY, e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX) * (180 / Math.PI);
        //     onceAlpha1 = false;
        //   }
        //
        //   // alphaEnd =
        //   //   Math.atan2(
        //   //     e.nativeEvent.touches[0].locationY - middleOfShip.y,
        //   //     e.nativeEvent.touches[0].locationX - middleOfShip.x
        //   //   ) *
        //   //   (180 / Math.PI);
        //
        //   alphaEnd = Math.atan2(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY, e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX) * (180 / Math.PI);
        //
        //   console.log("alphastart, alphaend " + alphaStart, alphaEnd);
        //
        //   console.log(alphaEnd - alphaStart);

        // console.log(
        //   "middleOfShipX, Y: " +
        //   (e.nativeEvent.changedTouches[0].locationX - middleOfShip.x),
        //   (e.nativeEvent.changedTouches[0].locationY - middleOfShip.y)
        // );

        // const alpha2 =
        //   Math.atan2(
        //     e.nativeEvent.changedTouches[1].locationY - middleOfShip.y,
        //     e.nativeEvent.changedTouches[1].locationX - middleOfShip.x
        //   ) *
        //   (180 / Math.PI);
        // console.log(alpha1, alpha2);
        // }

        // console.log(e.nativeEvent.changedTouches[0].locationY)
        // console.log(e.nativeEvent.changedTouches[0].locationX)
        // console.log(gesture.numberActiveTouches);
        // };,
      },
      // Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        const horizontal = this.props.ships.data[this.state.id].horizontal;

        const prevShipXLocation = this.props.ships.data[this.state.id]
          .coordinates.shipXLocation;
        const prevShipYLocation = this.props.ships.data[this.state.id]
          .coordinates.shipYLocation;
        // console.log("moveX: " + gesture.moveX + " moveY: " + gesture.moveY);
        // console.log("pageX: " + e.nativeEvent.pageX + " pageY: " + e.nativeEvent.pageY);
        // console.log("x0: "+ gesture.x0 + " y0: " + gesture.y0)
        // console.log(
        //   "touch rel. element: " + e.nativeEvent.locationX,
        //   e.nativeEvent.locationY
        // );
        // console.log('horizontal: ' + horizontal)
        // console.log("dx, dy: " + gesture.dx, gesture.dy);

        // get px and py of gridPosition
        const { px, py } = this.props.gridPosition;
        // console.log("px + py:" + px, py)

        // get left upper corner of ship before move
        const luX0 =
          gesture.x0 -
          (horizontal
            ? this.state.locationX
            : squareLength - this.state.locationY);
        const luY0 =
          gesture.y0 -
          (horizontal ? this.state.locationY : this.state.locationX);
        // console.log("luX0, luY0:" + luX0, luY0);

        // get left upper corner of ship on move
        const luX =
          gesture.moveX -
          (horizontal
            ? this.state.locationX
            : squareLength - this.state.locationY);
        const luY =
          gesture.moveY -
          (horizontal ? this.state.locationY : this.state.locationX);
        // console.log("luX, luY: " + luX, luY);
        // console.log("squareLenght: " + squareLength)

        // get n: "index" (1, 2, 3 ...) of x-axis and m: "char" (A, B, C, ...) of y-axis
        const shipXLocation = Math.round((luX - px) / squareLength);
        const shipYLocation = Math.round((luY - py) / squareLength);

        // get sluX und sluY: left upper corner of square (n,m)
        const sluX = shipXLocation * squareLength + px;
        const sluY = shipYLocation * squareLength + py;
        // console.log("left upper of next square: " + sluX, sluY)

        // detect if double tap
        const currentTimeStamp = e.nativeEvent.timestamp;
        const dt = currentTimeStamp - previousTimeStamp;
        if (dt < 500) {
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
            ) &&
            !this._startingPosition
          ) {
            console.log("swing error: ship out of grid");
            ReactNativeHapticFeedback.trigger("notificationError", false);
            this.setState({ nextRotationIsSpin: false });
            Animated.spring(this.state.swing, {
              toValue: 1,
              duration: 200
            }).start(() => {
              this.state.swing.setValue(0);
            });
          } else {
            console.log("ship 90 deg rotation");
            ReactNativeHapticFeedback.trigger("impactLight", false);

            this.props.disableRotationTip()

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

              if (this._startingPosition) {
                this.pushOnlyNewAlignment(alignmentAfterRotation);
              } else {
                this.pushShip(
                  shipXLocationAfterRotation,
                  shipYLocationAfterRotation,
                  alignmentAfterRotation
                );
              }
            });
          }
          // set previousTimeStamp for double tap
        } else if (this.shipTouched(gesture)) {
          previousTimeStamp = currentTimeStamp;
        }

        // if n on left or right side outside, if m upper or lower side outside --> back to start
        else if (
          this.outSideGridOrCollisionWithShip(
            shipXLocation,
            shipYLocation,
            horizontal
          )
        ) {
          this._startingPosition = true;
          console.log("ship back to starting position");
          ReactNativeHapticFeedback.trigger("notificationError", false);

          Animated.parallel([
            Animated.timing(this.state.pan, {
              toValue: { x: this._lastPos.x * -1, y: this._lastPos.y * -1 },
              duration: 200,
              delay: 0
            }),
            Animated.timing(this.state.spin, {
              toValue: 0,
              duration: 200
            })
          ]).start(() => (this._lastPos = this._val));

          // reset ship in store
          this.resetShip();

          // adjust to left upper corner of the closest square
        } else {
          console.log("ship adjusted to grid");
          this._startingPosition = false;
          ReactNativeHapticFeedback.trigger("impactLight", false);

          Animated.timing(this.state.pan, {
            toValue: { x: sluX - luX0, y: sluY - luY0 },
            duration: 200,
            delay: 0
            // useNativeDriver: true
          }).start(() => {
            this._lastPos = this._val;
          });
          this.pushShip(shipXLocation, shipYLocation, horizontal);
        }
      }
    });
  }

  shipTouched = gesture => {
    return gesture.dx === 0 && gesture.dy === 0;
  };

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

  pushOnlyNewAlignment = horizontal => {
    this.props.pushShipToStore({
      id: this.props.ship.id,
      ship: {
        type: this.props.ship.type,
        size: this.props.ship.size,
        horizontal: horizontal,
        coordinates: {
          shipXLocation: 0,
          shipYLocation: 0
        },
        location: []
      }
    });
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
          // rotate: this.state.rotation.interpolate({
          //   inputRange: [-180, -90, 0, 90, 180],
          //   outputRange: ["0deg", "90deg", "180deg", "270deg", "360deg"]
          // })
        }
      ]
    };

    const shipType = this.props.ship.type;

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        // source={Images[shipType]}
        style={[panStyle, styles[shipType]]}
        // resizeMode="cover"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    gridPosition: state.gridPosition.payload,
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
