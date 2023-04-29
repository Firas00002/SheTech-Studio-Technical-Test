import express from 'express';
import dotenv from 'dotenv'
import  {connectDB}  from './helper/connectDB';
import gameRouter from './routes/game'
dotenv.config();

const app = express();
app.use(express.json())
const port = process.env.PORT || "4001";

app.get('/', (req, res) => {
  res.send('server is Up');
});
// iitilize DB connection
connectDB()


app.use("/game",gameRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});