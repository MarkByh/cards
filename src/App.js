import { createContext, lazy, Suspense } from "react";
import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
export const Context = createContext()
export const AllUsers = createContext()
const Head = lazy(() => import("./components/Head/head"));
const TweetsPage = lazy(() => import("./components/Tweets/TweetsPage"));

export const App = () => {
  const [showTweets, setShowTweets] = useState(false);
  const [totalUsers, setTotalUsers] = useState('')
  return (
    <Context.Provider value={{
      show: showTweets,
      setShow: setShowTweets,
      totalUsers, setTotalUsers
    }}>
      <Suspense fallback={<Loader />}>
        <Head />
        {showTweets && (<TweetsPage />)}
      </Suspense></Context.Provider>

  );
}

