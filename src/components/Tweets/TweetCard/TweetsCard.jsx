import { useState, useEffect } from "react";
import style from "./tweetsCard.module.css";
import logo from "../../../images/logo.png";
import background from "../../../images/background.png";
import { updateUser, fetchUsers, fetchAllUsers } from "../../../services/api";
import { Loader } from "../../Loader/Loader";

export const TweetsCard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers()
      .then((response) => {
        setTotalPages(response / 3);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    setIsLoading(true);
    fetchUsers(currentPage)
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setIsLoading(false));
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);
    fetchUsers(nextPage)
      .then((response) => {
        const uniqueUsers = response.filter(
          (user) => !users.some((existing) => existing.id === user.id)
        );
        setUsers((prevUsers) => [...prevUsers, ...uniqueUsers]);
        setCurrentPage(nextPage);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setIsLoading(false));
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleFollow = async (id, following, followers) => {
    try {
      if (following) {
        await updateUser(id, false, followers - 1);
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                following: false,
                followers: user.followers - 1,
              };
            }
            return user;
          })
        );
      } else {
        await updateUser(id, true, followers + 1);
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                following: true,
                followers: user.followers + 1,
              };
            }
            return user;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul className={style.usersList}>
        {users.map(({ id, tweets, followers, avatar, following }) => (
          <li className={style.userCard} key={id}>
            <img className={style.logo} src={logo} alt="Logo" />
            <img
              className={style.background}
              src={background}
              alt="background_photo"
            />
            <div className={style.Cardline} />
            <div className={style.avatarCircle}>
              <img className={style.avatar} src={avatar} alt="user_photo" />
            </div>
            <p className={style.cardText}>{tweets.toLocaleString()} tweets</p>
            <p className={style.cardtextmargin}>
              {followers.toLocaleString()} followers
            </p>
            <button
              className={style.cardBtn}
              style={{ backgroundColor: following ? "#5CD3A8" : "" }}
              onClick={() => handleFollow(id, following, followers)}
            >
              {following ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>

      {currentPage < totalPages && (
        <button className={style.loadBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </>
  );
};
