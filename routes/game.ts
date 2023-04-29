import { Router } from 'express';
import {
    retrieveAllGames,
    retrieveOneGame,
    createGame,
    deleteGame,
    updateGame,
    selectTopByPlayers,
    selectTopByPlaytime
} from '../controller/gameController'
const router = Router();
router.get('/select_top_by_players', selectTopByPlayers)
router.get('/select_top_by_playtime', selectTopByPlaytime)
router.get('/:id', retrieveOneGame)
router.get('/', retrieveAllGames)
router.post('/', createGame)
router.delete('/:id', deleteGame)
router.put('/:id', updateGame)


export default router;