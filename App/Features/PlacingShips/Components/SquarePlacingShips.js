import React, { PureComponent } from "react";
import { Text, View } from "react-native";

// Styles
import styles from "./Styles/SquarePlacingShipsStyle";

class SquarePlacingShips extends PureComponent {
  renderTitle = () => {
    if (this.props.title) {
      return <Text style={styles.label}>{this.props.title}</Text>;
    }
  };

  render() {
    return (
      <View
        style={[
          styles.basic,
          { width: this.props.length, height: this.props.length }
        ]}
      >
        {this.renderTitle()}
      </View>
    );
  }
}

export default SquarePlacingShips;
