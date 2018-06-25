import React, { Component } from 'react'
import Square from "../Components/Square";
import { View } from 'react-native'
import styles from './Styles/GamePlayPlayerGridStyle'
import { Metrics } from '../Themes'

export default class GamePlayPlayerGrid extends Component {

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
