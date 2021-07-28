import firebase from "./firebase";
import { useState, useEffect } from "react";
// import { FontawesomeObject } from "@fortawesome/fontawesome-svg-core";
import { FaHeart } from "react-icons/fa";
// import ArtworkCard from "./ArtworkCard";
import "./App.css";

// on page load, state is set to all art currently on the page
// art on page gets sent to firebase as an object
// when heart is clicked, boolean value on art object is shifted to true, which assigns a class to the icon, turning it red
function App() {
  const [artList, setArtList] = useState([]);
  const [faveList, setFaveList] = useState([]);

  const setInitialState = () => {
    const dbRef = firebase.database().ref();

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
  }

  useEffect(() => {
      setInitialState();
  }, []);
  const toggleFavourite = function (obj) {
    // const changer = (obj.isItLiked = !obj.isItLiked);
    // console.log(obj.isItLiked);
    const dbRef = firebase.database().ref(obj.key);
    dbRef.child('isItLiked').get().then((property) => {
      if(!property.val()) {
        dbRef.update({isItLiked: true})
      } else {
        dbRef.update({isItLiked: false})
      }
    }) 
    // if (dbRef.child('isItLiked')) {
    //   dbRef.update({isItLiked:false});
    // } else {
    //         dbRef.update({isItLiked:true});

    // }
    
    // else {
    //   dbRef.child("isItLiked").remove();
    // }
    // dbRef.child(obj.key).update({
    //   obj.value.isItLiked: !obj.value.isItLiked});
    // console.log(dbRef);

    // console.log(obj.isItLiked);
  };

  const showOnlyFavourites = (e) => {
    if (e.target.innerText === 'Show My Favorites') { 
      const copyOfArtList = [...artList];
    const listWithOnlyLikedArt = copyOfArtList.filter((artObj) => {
      return artObj.value.isItLiked
    })
    console.log(e.target.innerText)
    setArtList(listWithOnlyLikedArt);
  e.target.innerText = 'Hide My Favorites'}
    else {
      setInitialState();
        e.target.innerText = 'Show My Favorites'

    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="">
        <h1>Eat Your He<span className='redText'>Art</span> Out</h1>
        <button onClick={(e) => {
          showOnlyFavourites(e)
        }}>Show My Favorites</button>
        </div>
      {/* <div>
        <ArtworkCard />
        <FaHeart
          onClick={(e) => {
            console.log(e.target);
          }}
        />
      </div> */}
      <ul>
      {artList.map((artCard) => {
        return (
          <li key={artCard.key}>
            <img src={artCard.value.url} alt="" />
            <div className="artInfo">
            <h2>{artCard.value.artName}</h2>
            <h3>{artCard.value.artistName}</h3>
            

            <FaHeart className={artCard.value.isItLiked ? "heart favourite" : "heart"}
              onClick={() => {
                toggleFavourite(artCard);
              }}
            />
            </div>
          </li>
        );
      })}
      </ul>
      </div>
    </div>
    // {}
  );
}

export default App;
