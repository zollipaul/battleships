import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

// Styles
import styles from "./Styles/SquareStyle";
import { GameGrid } from "../Themes";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderText = title => {
    if (title !== undefined) {
      return <Text style={styles.label}>{title}</Text>;
    }
  };

  render() {
    const square = this.props.square;
    let style;

    if (square.ship && !square.salvo) {
      style = styles.ship;
    }
    else if (!square.ship && square.salvo) {
      style = styles.salvo;
    }
    else if (square.ship && square.salvo){
      style = styles.hit;
    }
    else {
      style = styles.empty;
    }


    return (
      <TouchableOpacity style={[styles.basic, style, {width: this.props.length, height: this.props.length}]}>
        {this.renderText(square.title)}
      </TouchableOpacity>
    );
  }
}

export default Square;
