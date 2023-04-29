import { Schema,model } from 'mongoose';
import { IGame } from '../interface/IGame';



export const gameSchema = new Schema<IGame>({
    userId: { type: Number, required: true },
    game: { type: String, required: true },
    playTime: { type: Number, required: true },
    genre: { type: String, required: true },
    platforms: [{ type: String, required: true }],
});


export const GameModel = model<IGame>('Game', gameSchema);