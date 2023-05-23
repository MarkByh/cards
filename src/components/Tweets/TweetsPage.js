
import { Tweets } from "./TweetCard/TweetsCard";
import style from "./Tweets.module.css";
const TweetsPage = ({ isLoading }) => {


  return (
    <div className={style.tweetContainer}>
      <h2 className={style.usersTitle}>Users</h2>
      <Tweets />
    </div>
  );
};

export default TweetsPage;
