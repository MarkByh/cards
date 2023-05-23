import { useTweetContext } from "../Context/twetsContects";
import { fetchUsers } from "../../../services/api";
import style from "./loadMoreBtn.module.css";
export const LoadBtn = () => {
  const {
    users,
    setUsers,
    currentPage,
    setCurrentPage,
    totalPages,

    isLoading,
    setIsLoading,
  } = useTweetContext();

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
  return (
    <>
      {currentPage < totalPages && (
        <button className={style.loadBtn} onClick={handleLoadMore}>
          {isLoading ? "Loading" : "Load More"}
        </button>
      )}
    </>
  );
};
