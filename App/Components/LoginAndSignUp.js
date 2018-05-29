import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "../Containers/Styles/LoginAndSignUpStyle";
import { Colors } from "../Themes/index";

class LoginAndSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type username here ..."
          placeholderTextColor={Colors.snow}
          autoCapitalize="none"
          onChangeText={userName => this.setState({ userName })}
        />
        <TextInput
          style={styles.input}
          placeholder="Type password here ..."
          placeholderTextColor={Colors.snow}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="Login"
          onPress={() =>
            this.props.login(this.state.userName, this.state.password)
          }
        />
        <Button
          title="Sign up"
          onPress={() =>
            this.props.signUp(this.state.userName, this.state.password)
          }
        />
      </View>
    );
  }
}

export default LoginAndSignUp
