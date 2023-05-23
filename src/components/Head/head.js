
import { useContext } from "react";
import style from "./head.module.css"
import { Context } from "../../App";
const Head = () => {
  const { setShow } = useContext(Context);
  const { show } = useContext(Context);
  return (
    <div className={style.hContainer}>
      <h1 className={style.hTitle}> {show ? "" : "Hi!!!"}</h1>
      <p className={style.hText}>
        {show ? "Remember to be polite online!" : "Do you want to start? Click to see all users"}
      </p>
      {!show && <button type="button" className={style.hButton} onClick={() => setShow((prev) => !prev)} > Let's start!</button>}

    </div >
  );
};

export default Head;
