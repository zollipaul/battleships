import React, { Component } from "react";
import styles from "./Styles/ShotStyle";
import { Images, Metrics } from "../Themes";
import * as Animatable from "react-native-animatable";
import { Animated, Easing } from "react-native";

export default class Shot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shootVal: new Animated.Value(-200)
    };
  }

  componentDidMount() {
    const id = this.props.id;
    Animated.timing(this.state.shootVal, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
      delay: id * 100
    }).start(() => {


      if (id === 4) {
        this.props.resetShoot();
      }
    });
  }

  render() {
    console.log("renderShot");


    const shootTransform = {
      transform: [
        {
          translateY: this.state.shootVal
        }
      ]
    };

    const interpolateOpacity = this.state.shootVal.interpolate({
      inputRange: [-10, 0],
      outputRange: [1, 0]
    });

    const shootOpacity = {
      opacity: interpolateOpacity
    };

    const absolutePosition = {
      top:
        this.props.shotPosition.locationY -
        Metrics.gamePlayOpponentGridWidth * 0.15 / 2,
      left:
        this.props.shotPosition.locationX -
        Metrics.gamePlayOpponentGridWidth * 0.15 / 2
    };

    return (
      <Animated.Image
        style={[
          styles.torpedoDown,
          absolutePosition,
          shootTransform,
          shootOpacity
        ]}
        source={Images.torpedoDown}
      />
    );
  }
}
