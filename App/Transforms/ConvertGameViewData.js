export default data => {
  let gameGridEmpty = {};
  const rows = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  rows.forEach(row => {
    cols.forEach(col => {
      if (row === "0" && col !== "0") {
        gameGridEmpty[row + col] = {
          id: row + col,
          title: col,
          ship: false,
          salvo: false
        };
      } else if (row !== "0" && col === "0") {
        gameGridEmpty[row + col] = {
          id: row + col,
          title: row,
          ship: false,
          salvo: false
        };
      } else {
        gameGridEmpty[row + col] = {
          id: row + col,
          title: false,
          ship: false,
          salvo: false
        };
      }
    });
  });

  const playerId = data.id;
  const opponentId = data.opponentId;

  let gameGridsOfPlayerAndOpponent = {
    [playerId]: gameGridEmpty,
    [opponentId]: JSON.parse(JSON.stringify(gameGridEmpty)),
  };

  const ships = data.ships;
  ships.forEach(ship => {
    ship.locations.forEach(location => {
      gameGridsOfPlayerAndOpponent[playerId][location].ship = true;
    });
  });

  const salvoes = data.salvoes;
  let salvoId;
  salvoes.forEach(salvo => {
    salvo.locations.forEach(location => {
      salvoId = salvo.gamePlayerId === playerId ? opponentId : playerId;
      gameGridsOfPlayerAndOpponent[salvoId][location].salvo = true;
    });
  });
  gameGridsOfPlayerAndOpponent[playerId] = Object.values(
    gameGridsOfPlayerAndOpponent[playerId]
  );
  gameGridsOfPlayerAndOpponent[opponentId] = Object.values(
    gameGridsOfPlayerAndOpponent[opponentId]
  );

  return gameGridsOfPlayerAndOpponent;
};
