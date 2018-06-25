import React, { PureComponent } from "react";
import { Animated, Image } from "react-native";
import styles from "./Styles/TorpedosStyle";
import { Images } from "../Themes";

export default class Torpedos extends PureComponent {
  render() {
    const interpolateOpacity = this.props.gridPan.interpolate({
      inputRange: [20, 120],
      outputRange: [0, 1]
    });

    const shootOpacity = {
      opacity: interpolateOpacity
    };

    const interpolateY = this.props.gridPan.interpolate({
      inputRange: [60, 130],
      outputRange: [0, 70]
    });

    const interpolateYStyle = {
      transform: [
        {
          translateY: interpolateY
        }
      ]
    };

    console.log('renderTorpedos')

    return (
      <Animated.View
        style={[styles.shootContainer, shootOpacity, interpolateYStyle]}
      >
        <Image
          source={Images.torpedoUp}
          style={styles.torpedoUp}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedoUp}
          style={styles.torpedoUp}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedoUp}
          style={styles.torpedoUp}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedoUp}
          style={styles.torpedoUp}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedoUp}
          style={styles.torpedoUp}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }
}
