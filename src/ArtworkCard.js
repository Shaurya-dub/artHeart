import { FaHeart } from "react-icons/fa";
const ArtworkCard = (props) => {
  const { toggleFavourite, artCard } = props;
  return (
    <li
      tabIndex={1}
      key={artCard.key}
      onClick={() => {
        toggleFavourite(artCard);
      }}
      // function to toggle "favourite" functionality on artwork
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          toggleFavourite(artCard);
        }
      }}
    >
      <img src={artCard.value.url} alt="" />
      <div className="artInfo">
        <h2>{artCard.value.artName}</h2>
        <h3>{artCard.value.artistName}</h3>

        <FaHeart
          className={artCard.value.isItLiked ? "heart favourite" : "heart"}
        />
      </div>
    </li>
  );
};

export default ArtworkCard;
