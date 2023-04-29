import { Request, Response, NextFunction } from "express";
import { GameModel } from "../model/game";
import { IGame } from "../interface/IGame";
import {
  gameQueryType,
  selectTopByPlayesGueryType,
  selectTopByPlaytimeGueryType,
} from "../types/GameQueryTypes";

// get all games

export const retrieveAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await GameModel.find();
    return res.status(200).send(game)
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// get one game by its id

export const retrieveOneGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const game = await GameModel.findById(id);
    return res.status(200).send(game) 
    
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// create new game

export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IGame = req.body;
    const genreUppercase = body.genre.toUpperCase();
    const platformsUppercase= body.platforms.map(el=>el.toUpperCase())
    const game = await new GameModel({ ...body, genre: genreUppercase,platforms:platformsUppercase }).save();
    return res.status(201).send(game);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// Delete game

export const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params;
    const game = await GameModel.findByIdAndDelete(id);
    return res.status(200).send(game)
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// Update game

export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IGame = req.body;
    const id = req.params;
    const game = await GameModel.findByIdAndUpdate(id, body);
    return res.status(200).send(game)
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

export const selectTopByPlaytime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { genre, platform }: selectTopByPlaytimeGueryType = req.query;
    const gameQuery: gameQueryType = {};
    if (genre) {
      gameQuery.genre = genre;
    }
    if (platform) {
      gameQuery.platforms = { $in: [platform] };
    }
    const topPlayedGamesByTime = await GameModel.aggregate([
      {
        $match: gameQuery,
      },
      {
        $group: {
          _id: "$game",
          userIds: { $push: "$userId" },
          genre: { $last: "$genre" },
          platforms: { $first: "$platforms" },
          playTime: { $sum: "$playTime" },
        },
      },
      {
        $sort: { playTime: -1 },
      },
    ]);
    return res.status(200).send(topPlayedGamesByTime);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

export const selectTopByPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { genre, platform }: selectTopByPlayesGueryType = req.query;
    const gameQuery: gameQueryType = {};
    if (genre) {
      gameQuery.genre = genre;
    }
    if (platform) {
      gameQuery.platforms = { $in: [platform] };
    }
    const topPlayedGamesByPlayers = await GameModel.aggregate([
      {
        $match: gameQuery,
      },

      {
        $group: {
          _id: "$game",
          userIds: { $sum: 1 },
          genre: { $last: "$genre" },
          platforms: { $first: "$platforms" },
          playTime: { $sum: "$playTime" },
        },
      },
      {
        $sort: { userIds: -1 },
      },
    ]);
    return res.status(200).send(topPlayedGamesByPlayers);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};
