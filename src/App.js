import { createContext, lazy, Suspense } from "react";
import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
export const Context = createContext()
// npm run build npm run deploy
export const AllUsers = createContext()
const Head = lazy(() => import("./components/Head/head"));
const TweetsPage = lazy(() => import("./components/Tweets/TweetsPage"));

export const App = () => {
  const [showTweets, setShowTweets] = useState(false);
  return (
    <Context.Provider value={{
      show: showTweets,
      setShow: setShowTweets,

    }}>
      <Suspense fallback={<Loader />}>
        <Head />
        {showTweets && (<TweetsPage />)}
      </Suspense></Context.Provider>

  );
}

