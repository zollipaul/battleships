import React, { PureComponent, } from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/CreateGameButtonStyle'
import { Colors } from '../../../Themes'
import Icon from "react-native-vector-icons/FontAwesome";

export default class CreateGameButton extends PureComponent {


  render () {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.createGame();
        }}
        style={styles.createButton}
      >
        <Icon name="plus" size={30} color={Colors.white} style={styles.iconPositionCorrected} />
      </TouchableOpacity>
    )
  }
}
