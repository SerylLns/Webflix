import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (!movieId) {
      throw Error("ID invalide");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw Error("ID invalide");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
