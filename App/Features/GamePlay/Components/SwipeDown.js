import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import styles from "./Styles/SwipeDownStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../Themes/index";

export default class SwipeDown extends PureComponent {
  render() {
    return (
      <View style={styles.arrow}>
        <View style={styles.container}>
          <Text style={styles.swipeDown}>Swipe down</Text>
          <Icon name="angle-double-down" size={80} color={Colors.frost} />
        </View>
      </View>
    );
  }
}
