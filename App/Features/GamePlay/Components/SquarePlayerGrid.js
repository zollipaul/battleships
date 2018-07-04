import React, { PureComponent } from "react";
import { Text, View } from "react-native";

// Styles
import styles from "./Styles/SquarePlayerGridStyle";
import Salvo from "./Salvo";
import { Colors } from "../../../Themes/index";

class SquarePlayerGrid extends PureComponent {
  colorSalvo = () => {
    return this.props.isShip ? Colors.highlight : Colors.white;
  };

  renderContent = () => {
    if (this.props.title) {
      return <Text style={styles.label}>{this.props.title}</Text>;
    } else if (this.props.salvo) {
      return <Salvo length={this.props.length} color={this.colorSalvo()} />;
    }
  };

  render() {
    let backgroundStyle, borderStyle;
    if (this.props.isShip) {
      backgroundStyle = styles.shipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
    } else {
      borderStyle = styles.standardBorder;
    }

    return (
      <View
        style={[
          styles.basic,
          backgroundStyle,
          { width: this.props.length, height: this.props.length },
          borderStyle
        ]}
      >
        {this.renderContent()}
      </View>
    );
  }
}

export default SquarePlayerGrid;
