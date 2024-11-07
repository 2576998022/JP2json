import express from 'express';
import apiRouter from './modules/data-list/api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// 添加 JSON 解析中间件
app.use(express.json());

// 启用 CORS
app.use(cors());

// 配置静态文件服务
app.use(express.static(__dirname));

// 使用 API 路由
app.use('/api', apiRouter);

// 处理所有页面请求，返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
}); 