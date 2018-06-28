import React, { PureComponent } from "react";
import { Metrics } from "../../../Themes/index";
import SquareOpponentGrid from "./SquareOpponentGrid";
import SalvoActions from "../../../Redux/SalvoRedux";
import { connect } from "react-redux";

class OpponentGrid extends PureComponent {
  getLastSalvo = salvoes => {
    const mySalvoes = salvoes.filter(
      salvo => salvo.gamePlayerId === this.props.gamePlayerId
    );

    return mySalvoes.reduce(
      (total, current) => (current.turn > total.turn ? current : total),
      mySalvoes[0]
    );
  };

  render() {
    let newSalvoLocations;
    if (this.props.stage === "waitingForSalvoOfOpponent") {
      newSalvoLocations = this.getLastSalvo(this.props.oldSalvoes).locations;
    } else {
      newSalvoLocations = this.props.newSalvo;
    }
    return this.props.grid.map(square => {
      const hasNewSalvo = newSalvoLocations.some(
        location => square.id === location
      );
      const newSalvoId = newSalvoLocations.indexOf(square.id);

      return (
        <SquareOpponentGrid
          hit={square.hit}
          horizontal={square.horizontal}
          id={square.id}
          isShip={square.isShip}
          isMissed={square.isMissed}
          part={square.part}
          salvo={square.salvo}
          key={square.id}
          title={square.title}
          length={Metrics.gamePlayOpponentSquareLength}
          newSalvo={hasNewSalvo}
          stage={this.props.stage}
          newSalvoId={newSalvoId}
          resetAllSalvoes={this.props.resetAllSalvoes}
        />
      );
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetAllSalvoes: () => {
      dispatch(SalvoActions.resetAllSalvoes());
    }
  };
};

export default connect(null, mapDispatchToProps)(OpponentGrid);
