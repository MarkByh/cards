import { TweetsCard } from "./TweetCard/TweetsCard";
import { LoadBtn } from "./LoadMoreBtn/loadMoreBtn";
import style from "./Tweets.module.css";
import TweetsContext from "./Context/twetsContects";
const TweetsPage = () => {
  return (
    <TweetsContext>
      <div className={style.tweetContainer}>
        <h2 className={style.usersTitle}>Users</h2>
        <TweetsCard />
        <LoadBtn />
      </div>
    </TweetsContext>
  );
};

export default TweetsPage;
