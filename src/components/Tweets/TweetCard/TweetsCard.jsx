import { useEffect } from "react";
import style from "./tweetsCard.module.css";
import logo from "../../../images/logo.png";
import background from "../../../images/background.png";
import { updateUser, fetchUsers, fetchAllUsers } from "../../../services/api";
import { useTweetContext } from "../Context/twetsContects";

export const TweetsCard = () => {
  const { users, setUsers, currentPage, setTotalPages, setIsLoading } =
    useTweetContext();

  useEffect(() => {
    fetchAllUsers()
      .then((response) => {
        setTotalPages(response / 4);
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
        {users.map(({ id, tweets, followers, following, avatar }) => (
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
            <p className={style.cardText}>
              {tweets.toLocaleString("en-Us")} Tweets
            </p>
            <p className={style.cardtextmargin}>
              {followers.toLocaleString("en-Us")} followers
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
    </>
  );
};
