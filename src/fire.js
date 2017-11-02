import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCO87anW2M7uqBrcRDf4nzCG0H_UnAmLBY",
    authDomain: "nosy-neighbors-game.firebaseapp.com",
    databaseURL: "https://nosy-neighbors-game.firebaseio.com",
    projectId: "nosy-neighbors-game",
    storageBucket: "nosy-neighbors-game.appspot.com",
    messagingSenderId: "652906241177"
  };
var fire = firebase.initializeApp(config);
export default fire;