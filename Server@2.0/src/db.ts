/* 数据库连接 */
import mysql from 'mysql'
import config from '../config'

const pool = mysql.createPool(config.dbConfig);
function db(sql: string, params?: Array<any>) {
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (error, results, fields) => {
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
}
// 导出对象
export default db
