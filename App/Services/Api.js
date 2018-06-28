// a library to wrap and simplify api calls
import apisauce from "apisauce";
import qs from "qs";

// our "constructor"
const create = (baseURL = "http://192.168.178.108:8080/api/") => {
  // const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      Accept: "application/json, application/xml, text/plain, text/html"
      // "Content-type": "application/json",
      // 'X-Requested-With': 'XMLHttpRequest',
    },
    //   xhrFields: {
    //   // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    //   // This can be used to set the 'withCredentials' property.
    //   // Set the value to 'true' if you'd like to pass cookies to the server.
    //   // If this is enabled, your server must respond with the header
    //   // 'Access-Control-Allow-Credentials: true'.
    //   withCredentials:
    // },
    //   mode: 'cors',
    withCredentials: true,
    // dataType: 'json',
    // 10 second timeout...
    timeout: 10000
  });
  // const naviMonitor = (response) => console.log('hey!  listen! ', response)
  // api.addMonitor(naviMonitor)

  // let data =  { userName: "peter@paul.de", password: "123456" }

  // console.log(jsonToURI(data))
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  const getPlayers = () => api.get("players");
  const loginPlayer = data =>
    api.post("login", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
  const logoutPlayer = () => api.post("logout");
  const signUpPlayer = data =>
    api.post("signUp", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
  const getGames = () => api.get("games");
  const getGameView = gamePlayerId => api.get("game_view/" + gamePlayerId);
  const getLeaderboard = () => api.get("leaderboard");
  const createGame = () => api.post("games/");
  const joinGame = gameId => api.post("game/" + gameId + "/joinGame");
  const postShips = (gamePlayerId, ships) =>
    api.post("/games/players/" + gamePlayerId + "/ships", ships, {
      headers: { "content-type": "application/json" }
    });
  const postSalvoes = (gamePlayerId, salvoes) =>
    api.post("/games/players/" + gamePlayerId + "/salvoes", salvoes, {
      headers: { "content-type": "application/json" }
    });

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //

  return {
    // a list of the API functions from step 2
    // getRoot,
    // getRate,
    // getUser,
    getPlayers,
    loginPlayer,
    logoutPlayer,
    signUpPlayer,
    getGames,
    getGameView,
    getLeaderboard,
    createGame,
    joinGame,
    postShips,
    postSalvoes
  };
};

// let's return back our create method as the default.
export default {
  create
};
