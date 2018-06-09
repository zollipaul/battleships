import React, { Component } from 'react'
import Square from "../Components/Square";

// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/GamePlayPlayerGridStyle'
import { Metrics } from '../Themes'

export default class GamePlayPlayerGrid extends Component {
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

  renderPlayerGrid = () => {
    return this.props.grid.map(square => {
      return (
        <Square
          square={square}
          key={square.id}
          length={Metrics.gamePlayPlayerSquareLength}
        />
      );
    });
  };


  render () {
    return (
      <View style={styles.playerGrid}>{this.renderPlayerGrid()}</View>
    )
  }
}
