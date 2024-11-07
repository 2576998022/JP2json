import mysql from 'mysql2/promise';
import { dbConfig } from '../modules/data-list/db-config.js';

async function testDBConnection() {
    let connection;
    try {
        // 创建数据库连接
        connection = await mysql.createConnection(dbConfig);
        console.log('数据库连接成功！');

        // 测试查询
        const [rows] = await connection.execute('SELECT 1 + 1 AS result');
        console.log('测试查询结果:', rows[0].result);

        // 测试查询日语句子表
        const [sentences] = await connection.execute('SELECT * FROM japanese_sentences LIMIT 1');
        console.log('日语句子表第一条数据:', sentences[0]);

    } catch (error) {
        console.error('数据库连接测试失败：', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('数据库连接已关闭');
        }
    }
}

// 运行测试
testDBConnection(); 