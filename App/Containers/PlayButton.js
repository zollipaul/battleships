import React, { Component } from "react";
import RoundedButton from "../Components/RoundedButton";
import { connect } from "react-redux";
import ManageGameActions from "../Redux/ManageGameRedux";

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const active = this.props.shipsCounter === 5;
    const text = active ? 'Play now' : 'Place your Ships'
    return (
      <RoundedButton
        text={text}
        onPress={() => this.props.startGame()}
        style={active ? "active" : "inactive"}
        disabled={!active}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    shipsCounter: state.ships.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => {
      dispatch(ManageGameActions.startGameRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
