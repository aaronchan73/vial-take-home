import express from 'express';
import cors from 'cors';
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});