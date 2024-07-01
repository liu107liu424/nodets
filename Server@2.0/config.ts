/*
 * @Description: 全局配置信息
 */
import path from 'path'
import Jwt from 'jsonwebtoken';
export default {
  //加解密token密钥
  jwtSecretKey: "itheima No1. ^_^",
  //token有效期
  expiresIn: "20h",
  Port: 3000, // 启动端口
  staticDir: path.resolve('./public'), // 静态资源路径
  uploadDir: path.join(__dirname, path.resolve('public/')), // 上传文件路径
  // 数据库连接设置
  dbConfig: {
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123liu456',
    database: 'store'
  },
  token:(data:{userName:string})=>{
    const tokenStr = Jwt.sign(
      data,
     "itheima No1. ^_^",
      {
        expiresIn: '20h',
      }
    );
    return tokenStr
  }
}
