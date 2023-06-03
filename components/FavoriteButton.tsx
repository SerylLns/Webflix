import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import {
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);
  const toggleFavorites = useCallback(async () => {
    let res;
    if (isFavorite) {
      res = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      res = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavoriteIds = res?.data?.favoriteIds;

    mutate({ ...currentUser, favoritesIds: updatedFavoriteIds });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className={`${
        isFavorite ? "bg-white" : "hover:bg-white"
      } cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 p-0.5 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300 group/button hover:opacity-90`}
    >
      <Icon
        className={`${
          isFavorite
            ? " group-hover/button:text-black"
            : "text-white group-hover/button:text-black"
        }`}
        size={22}
      />
    </div>
  );
};

export default FavoriteButton;
