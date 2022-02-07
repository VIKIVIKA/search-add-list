import friends from "./mock.json";
import { useEffect, useRef, useState } from "react";
import "./friendsList.scss";
import Pagination from "./Pagination";

const FriendsList = () => {
  const [friendsArray, setFriendsArray] = useState(friends);
  const search = useRef(null);
  const pageSize = 2;
  const [startingPage, setStartingPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (search && search.current) {
      search.current.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          if (event.target.value === "") {
            alert("Please enter friend's name");
            return;
          }
          event.preventDefault();
          const updatedFriendsArray = [...friendsArray];
          updatedFriendsArray.push({
            id: updatedFriendsArray.length + 1,
            name: event.target.value,
            isFavourite: false,
          });
          setStartingPage(1);
          setFriendsArray(updatedFriendsArray);
        }
      });
    }
  }, [friendsArray]);

  const addToFavourites = (index) => {
    const favouriteFriendIndex = friendsArray.findIndex(
      ({ id }) => index === id
    );
    const updatedFriendsArray = [...friendsArray];
    updatedFriendsArray[favouriteFriendIndex].isFavourite =
      !friendsArray[favouriteFriendIndex].isFavourite;
    setFriendsArray(updatedFriendsArray);
  };
  const deleteFromList = (i) => {
    let updatedFriendsArray = friendsArray.filter(({ id }) => id !== i);
    updatedFriendsArray = updatedFriendsArray.map(({ id, name, isFavourite }, i) => ({
      id: i,
      name,
      isFavourite,
    }));
    setFriendsArray(updatedFriendsArray);
    setStartingPage(1);
  };

  return (
    <Pagination
      data={friendsArray}
      pageSize={pageSize}
      startingPage={startingPage}
      setStartingPage={setStartingPage}
    >
      <div>
        <ul className="friend-list">
          <li className="header">Friends List</li>
          <li className="row">
            <input
              ref={search}
              type={"text"}
              placeholder={"Enter your friend's name"}
              className="search"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            ></input>
          </li>
          {friendsArray
            .filter((value) => value.name.includes(searchValue))
            .sort(function (x, y) {
              return x.isFavourite === y.isFavourite
                ? 0
                : x.isFavourite
                ? -1
                : 1;
            })
            .slice(
              startingPage === 1 ? 0 * pageSize : (startingPage - 1) * pageSize,
              startingPage === 1
                ? pageSize
                : (startingPage - 1) * pageSize + pageSize
            )
            .map(({ name, id, isFavourite }) => (
              <li className="row" key={`array_${id}`}>
                <div className="info">
                  <div className="name">{name}</div>
                  is your friend
                </div>
                <div className="actions">
                  <button
                    className="custom-icon"
                    onClick={() => addToFavourites(id)}
                  >
                    <span
                      data-text-swap="favorite"
                      id="favorite-btn"
                      className="material-icons hvr-push"
                    >
                      {isFavourite ? "favorite" : "favorite_border"}
                    </span>
                  </button>
                  <button
                    className="custom-icon"
                    onClick={() => deleteFromList(id)}
                  >
                    <span
                      data-text-swap="favorite"
                      id="favorite-btn"
                      className="material-icons hvr-push"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Pagination>
  );
};

export default FriendsList;
