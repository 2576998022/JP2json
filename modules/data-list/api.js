import express from 'express';
import { executeQuery } from './db.js';

const router = express.Router();

router.get('/sentences', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    try {
        const [rows] = await executeQuery(
            'SELECT * FROM api_test_db.japanese_sentences LIMIT ?, ?',
            [offset, pageSize]
        );

        const [countResult] = await executeQuery(
            'SELECT COUNT(*) as total FROM api_test_db.japanese_sentences'
        );
        
        const total = countResult[0].total;

        res.json({
            status: 'success',
            data: rows,
            total: total,
            page: page,
            pageSize: pageSize
        });
    } catch (error) {
        console.error('数据库查询失败：', error);
        res.status(500).json({ 
            status: 'error', 
            message: '数据库查询失败',
            error: error.message 
        });
    }
});

// 修改上传数据的路由
router.post('/sentences/upload', async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data)) {
            throw new Error('上传数据必须是数组格式');
        }

        // 构建批量插入的 SQL 语句
        const placeholders = data.map(() => '(?, ?, ?, ?)').join(', ');
        const sql = `INSERT INTO api_test_db.japanese_sentences (japanese, chinese, romaji, audio_url) VALUES ${placeholders}`;

        // 展平数组值
        const values = data.reduce((acc, item) => [
            ...acc,
            item.japanese,
            item.chinese,
            item.romaji,
            item.audio_url || null
        ], []);

        const [result] = await executeQuery(sql, values);

        res.json({
            status: 'success',
            message: `成功插入 ${result.affectedRows} 条数据`
        });
    } catch (error) {
        console.error('数据上传失败：', error);
        res.status(500).json({
            status: 'error',
            message: '数据上传失败',
            error: error.message
        });
    }
});

export default router; 