import React, { PureComponent } from "react";
import { Animated, Text } from "react-native";
import Salvo from "./Salvo";
import Dot from "./Dot";
import Shot from "./Shot";
import styles from "./Styles/SquareOpponentGridStyle";
import { Colors, Metrics } from "../../../Themes/index";

const length = Metrics.gamePlayOpponentSquareLength;

class SquareOpponentGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shootNow: false,
      scale: new Animated.Value(1),
      salvo: props.salvo,
      hit: props.hit,
      isShip: props.isShip,
      showDot: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id === "A3") {
      console.log(prevProps);
      console.log(this.props);
    }

    if (
      !prevProps.salvo &&
      this.props.salvo &&
      !prevState.shootNow &&
      !this.state.shootNow
    ) {
      this.setState({ shootNow: true });
    } else if (this.props.startShipAnimation && !prevProps.startShipAnimation) {
      this.shipAnimation();
    }
  }

  colorSalvo = () => {
    return this.state.isShip ? Colors.highlight : Colors.white;
  };

  renderContent = () => {
    // numbers and letters of grid
    if (this.props.title || this.props.id === "00") {
      return <Text style={styles.label}>{this.props.title}</Text>;
    }

    // oldSalvo
    else if (this.state.salvo) {
      return <Salvo length={length} color={this.colorSalvo()} />;
    }

    // newSalvo
    else if (this.props.newSalvo && this.state.showDot) {
      return <Dot length={length} />;
    }
  };

  hitAnimation = () => {
    this.setState({
      salvo: true,
      hit: true
    });
    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {});
  };

  shipAnimation = () => {
    this.setState({
      isShip: true,
      showDot: false,
      salvo: false
    });

    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 3,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      this.setState({ salvo: true, showDot: true });
    });
  };

  endShot = () => {
    this.setState({
      shootNow: false
    });

    if (this.props.hit) {
      this.hitAnimation();
    } else if (this.props.isShip) {
      this.props.shipAnimation(this.props.isShipId);
    } else if (this.props.salvo) {
      this.setState({ salvo: true });
    }
  };

  shoot() {
    if (this.state.shootNow) {
      return (
        <Shot
          shotPosition={{
            locationX: length / 2,
            locationY: length / 2
          }}
          length={length}
          endShot={this.endShot}
          id={this.props.newSalvoId}
          resetAllSalvoes={this.props.resetAllSalvoes}
        />
      );
    }
  }

  render() {
    console.log("renderSquare");

    let backgroundStyle, borderStyle;

    const scale = {
      transform: [{ scale: this.state.scale }]
    };

    if (this.state.isShip) {
      backgroundStyle = styles.shipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
    } else if (this.props.isMissed) {
      backgroundStyle = styles.missedShipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
    } else if (this.state.hit) {
      backgroundStyle = styles.hitBackground;
      borderStyle = styles.standardBorder;
    } else if (this.props.newSalvo) {
      backgroundStyle = styles.currentSalvoBackground;
      borderStyle = styles.standardBorder;
    } else {
      borderStyle = styles.standardBorder;
    }

    return (
      <Animated.View
        style={[
          styles.basic,
          backgroundStyle,
          { width: length, height: length },
          borderStyle,
          scale
        ]}
        pointerEvents="none"
      >
        {this.renderContent()}
        {this.shoot()}
      </Animated.View>
    );
  }
}

export default SquareOpponentGrid;
