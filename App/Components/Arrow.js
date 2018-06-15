import React, { Component } from "react";
import { Animated } from "react-native";
import styles from "./Styles/ArrowStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../Themes";

export default class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowSwing: new Animated.Value(0)
    };
  }

  cycleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.arrowSwing, {
          toValue: 15,
          duration: 800,
          delay: 200,
          useNativeDriver: true
        }),
        Animated.timing(this.state.arrowSwing, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  render() {
    const arrowSwingStyle = {
      transform: [
        {
          translateY: this.state.arrowSwing
        }
      ]
    };

    const interpolateOpacity = this.props.gridPan.interpolate({
      inputRange: [0, 120],
      outputRange: [1, 0]
    });

    const arrowOpacity = {
      opacity: interpolateOpacity
    };

    this.cycleAnimation();

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    return this.props.fiveShotsReached ? (
      <AnimatedIcon
        name="angle-double-down"
        size={30}
        color={Colors.frost}
        style={[styles.arrow, arrowOpacity, arrowSwingStyle]}
      />
    ) : null;
  }
}
