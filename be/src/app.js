import cors from 'cors';
import express from 'express';
import router from './routes/index.js';
import LogMiddleware from './middlewares/log.middleware.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
// import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL, // React 앱의 URL
  credentials: true, // 쿠키를 포함한 요청을 허용
}));

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
// app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});