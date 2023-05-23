import { createContext, lazy, Suspense } from "react";
import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
export const Context = createContext()
const Home = lazy(() => import("./components/Head/head"));
const TweetsPage = lazy(() => import("./components/Tweets/TweetsPage"));

export const App = () => {
  const [showTweets, setShowTweets] = useState(false);
  return (
    <Context.Provider value={{
      show: showTweets,
      setShow: setShowTweets,
    }}>
      <Suspense fallback={<Loader />}>
        <Home />
        {showTweets && (<TweetsPage />)}
      </Suspense></Context.Provider>

  );
}

