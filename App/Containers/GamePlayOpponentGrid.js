import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import SquareTouchable from "../Components/SquareTouchable";
import styles from "./Styles/GamePlayOpponentGridStyle";
import { Metrics } from "../Themes/index";
import { connect } from 'react-redux'
import SalvoActions from '../Redux/SalvoRedux'

class GamePlayOpponentGrid extends Component {
  // Prop type warnings
  static propTypes = {
    grid: PropTypes.array.isRequired,
  };

  renderOpponentGrid = () => {
    return this.props.grid.map(square => {
      return (
        <SquareTouchable
          square={square}
          key={square.id}
          length={Metrics.gamePlayOpponentSquareLength}
          toggleSalvo={this.props.toggleSalvo}
          fiveSalvoesReached={this.props.salvoes.length === 5}
        />
      );
    });
  };

  render() {
    return <View style={styles.opponentGrid}>{this.renderOpponentGrid()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    salvoes: state.salvoes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayOpponentGrid);
