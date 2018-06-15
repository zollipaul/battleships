import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Salvo extends Component {
  // Prop type warnings
  static propTypes = {
    color: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <Icon name={"times"} size={this.props.length * 0.85} color={this.props.color}/>
    )
  }
}
