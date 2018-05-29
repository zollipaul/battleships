import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native'
import styles from './Styles/MyStatusBarStyle'
import { Colors } from '../Themes'

export default class MyStatusBar extends Component {
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
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.background}
        />
      </View>
    )
  }
}
