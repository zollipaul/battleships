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
          // ship: false,
          ship: {
            isShip: false,
            horizontal: null,
            part: null
          },
          salvo: false,
          hit: false
        };
      } else if (row !== "0" && col === "0") {
        gameGridEmpty[row + col] = {
          id: row + col,
          title: row,
          // ship: false,
          ship: {
            isShip: false,
            horizontal: null,
            part: null
          },
          salvo: false,
          hit: false
        };
      } else {
        gameGridEmpty[row + col] = {
          id: row + col,
          title: false,
          // ship: false,
          ship: {
            isShip: false,
            horizontal: null,
            part: null
          },
          salvo: false,
          hit: false
        };
      }
    });
  });

  const playerId = data.id;
  const opponentId = data.opponentId;

  let gameGridsOfPlayerAndOpponent = {
    [playerId]: gameGridEmpty,
    [opponentId]: JSON.parse(JSON.stringify(gameGridEmpty))
  };

  const ships = data.ships;

  ships.forEach(ship => {
    const horizontal =
      ship.locations[0].charAt(0) === ship.locations[1].charAt(0);

    ship.locations.forEach((location, i) => {
      gameGridsOfPlayerAndOpponent[playerId][location].ship = {
        isShip: true,
        horizontal: horizontal,
        part:
          i === 0 ? "Start" : i === ship.locations.length - 1 ? "End" : "Mid"
      };
    });
  });

  const hits = data.hits;
  const sinks = data.sinks;

  hits.forEach(location => {
    gameGridsOfPlayerAndOpponent[opponentId][location].hit = true;
  });

  sinks.forEach(ship => {
    const horizontal =
      ship.locations[0].charAt(0) === ship.locations[1].charAt(0);

    ship.locations.forEach((location, i) => {
      gameGridsOfPlayerAndOpponent[opponentId][location].ship = {
        isShip: true,
        horizontal: horizontal,
        part:
          i === 0 ? "Start" : i === ship.locations.length - 1 ? "End" : "Mid"
      };
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
