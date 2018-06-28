import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/LeaderboardScreenStyle";
import LeaderboardActions from "../../Redux/LeaderboardRedux";

class LeaderboardScreen extends Component {
  componentDidMount() {
    this.props.getLeaderboard();
  }

  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/
  state = {
    dataObjects: [
      { title: "First Title", description: "First Description" },
      { title: "Second Title", description: "Second Description" },
      { title: "Third Title", description: "Third Description" },
      { title: "Fourth Title", description: "Fourth Description" },
      { title: "Fifth Title", description: "Fifth Description" },
      { title: "Sixth Title", description: "Sixth Description" },
      { title: "Seventh Title", description: "Seventh Description" }
    ]
  };

  /************************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({ item }) {
    return (
      <View style={styles.row}>
        <View style={styles.name}>
          <Text style={styles.textName}>{item.userName}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textStats}>{item.statistics.total}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textStats}>{item.statistics.win}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textStats}>{item.statistics.lost}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textStats}>{item.statistics.tied}</Text>
        </View>
      </View>
    );
  }

  /************************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/
  // Render a header?
  renderHeader = () => (
    <View style={styles.row}>
      <View style={styles.name}>
        <Text style={[styles.textName, styles.header]}>Name</Text>
      </View>
      <View style={styles.stats}>
        <Text style={[styles.textStats, styles.header]}>Total</Text>
      </View>
      <View style={styles.stats}>
        <Text style={[styles.textStats, styles.header]}>Win</Text>
      </View>
      <View style={styles.stats}>
        <Text style={[styles.textStats, styles.header]}>Lost</Text>
      </View>
      <View style={styles.stats}>
        <Text style={[styles.textStats, styles.header]}>Tied</Text>
      </View>
    </View>
  );

  // Render a footer?
  // renderFooter = () => (
  //   <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>
  // );

  // Show this when data is empty
  renderEmpty = () => (
    <Text style={styles.label}> - Nothing to See Here - </Text>
  );

  // renderSeparator = () => <Text style={styles.label}> - ~~~~~ - </Text>;

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = item => String(item.id);

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.leaderboard.payload}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: () => dispatch(LeaderboardActions.leaderboardRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen);
