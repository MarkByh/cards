import { Oval } from "react-loader-spinner";
import style from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={style.loaderDiv}>
      <Oval
        height={150}
        width={150}
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
