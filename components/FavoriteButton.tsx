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

  const Icon = isFavorite ? AiOutlineCheckCircle : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300 hover:bg-white group/button hover:opacity-90"
    >
      <Icon className="text-white group-hover/button:text-black" size={25} />
    </div>
  );
};

export default FavoriteButton;
