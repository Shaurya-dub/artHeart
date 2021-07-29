import firebase from "./firebase";
import { useState, useEffect } from "react";

import ArtworkCard from "./ArtworkCard";
import "./App.css";

// on page load, state is set to all art currently on the page
// art on page gets sent to firebase as an object
// when heart is clicked, boolean value on art object is shifted to true, which assigns a class to the icon, turning it red
// any changed made to the data in firebase cause a re-render and the page updates to show changes
function App() {
  const [artList, setArtList] = useState([]);
  // function to set initial state that displays all artwork on page
  const setInitialState = () => {
    const dbRef = firebase.database().ref();
    // fires an event anytime data on firebase is changed
    dbRef.on("value", (snapshot) => {
      const artData = snapshot.val();
      console.log(artData);
      const newArray = [];
      for (let artObject in artData) {
        newArray.push({
          key: artObject,
          value: artData[artObject],
        });
      }
      console.log(newArray);
      setArtList(newArray);
    });
  };
  // set state on page to display data from firebase on the page
  useEffect(() => {
    setInitialState();
  }, []);
  // function that toggles the "isItLiked" boolean value in firebase
  const toggleFavourite = function (obj) {
    const dbRef = firebase.database().ref(obj.key);
    dbRef
      .child("isItLiked")
      .get()
      .then((property) => {
        if (!property.val()) {
          dbRef.update({ isItLiked: true });
        } else {
          dbRef.update({ isItLiked: false });
        }
      });
  };

  // Function that changes state of the page to display only artwork that has been "favourited" by the user
  const showOnlyFavourites = (e) => {
    if (e.target.innerText === "Show My Favorites") {
      const copyOfArtList = [...artList];
      const listWithOnlyLikedArt = copyOfArtList.filter((artObj) => {
        return artObj.value.isItLiked;
      });
      console.log(e.target.innerText);
      setArtList(listWithOnlyLikedArt);
      e.target.innerText = "Hide My Favorites";
    } else {
      setInitialState();
      e.target.innerText = "Show My Favorites";
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="">
          <h1>
            Eat Your He<span className="redText">Art</span> Out
          </h1>
          <p className="headingTag">
            Click the heart icon to 'favourite' what you like
          </p>
          <button
            onClick={(e) => {
              showOnlyFavourites(e);
            }}
          >
            Show My Favorites
          </button>
        </div>
        <ul>
          {/* function maps through the current state to display results on page */}
          {artList.map((artCard, key) => {
            return (
              <ArtworkCard
                artCard={artCard}
                toggleFavourite={toggleFavourite}
                key={key}
              />
            );
          })}
        </ul>
      </div>
      <footer>
        <p>
          Made at <a href="https://junocollege.com/">Juno College</a>
        </p>
      </footer>
    </div>
    // {}
  );
}

export default App;
