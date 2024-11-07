import mysql from 'mysql2/promise';
import { dbConfig } from './db-config.js';

// 创建数据库连接池
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 封装执行 SQL 的方法
export const executeQuery = async (sql, params) => {
    if (!params) {
        return pool.execute(sql);
    }
    
    const newParams = params.map(item => {
        if (typeof item === 'number') {
            return item.toString();
        }
        return item;
    });
    
    return pool.execute(sql, newParams);
};

export default pool; 