import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Animated, Image } from 'react-native'
import styles from './Styles/TorpedosStyle'
import { Images } from '../Themes'

export default class Torpedos extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
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

    return (
      <Animated.View
        style={[styles.shootContainer, shootOpacity, interpolateYStyle]}
      >
        <Image
          source={Images.torpedo}
          style={styles.torpedo}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedo}
          style={styles.torpedo}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedo}
          style={styles.torpedo}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedo}
          style={styles.torpedo}
          resizeMode="cover"
        />
        <Image
          source={Images.torpedo}
          style={styles.torpedo}
          resizeMode="cover"
        />
      </Animated.View>
    );
  };
}
