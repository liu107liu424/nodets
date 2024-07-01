
import db from '../db'
export default {
  /**登录sql */
  login: async (name: string, password: string) => {
    const selSql = `SELECT userName,userId,userUrl FROM users WHERE userName='${name}' AND password=${password}`
    return await db(selSql)
  },
  /**查询用户信息sql */
  userInfo: async (name: string, password?: string) => {
    const selSql = `SELECT * FROM users WHERE userName=?`
    return await db(selSql, [name])
  },
  /**注册sql */
  enroll: async (name: string, password?: string) => {
    const inSql = `INSERT INTO users (userName,password) VALUE (?,?)`
    return await db(inSql, [name, password])
  },
  /**添加商品 */
  addGoods: async (Array: Array<String>) => {
    const inSql = `INSERT INTO goods (goodsId,goodsName,price,class,sku,sales,coverImg,skuImgList,goodsRemark) VALUE (?,?,?,?,?,?,?,?,?)`
    return await db(inSql, Array)
  },
  /**修改商品 */
  setGoods: async (data: any) => {
    let upSql = `UPDATE goods SET `
    const WHERE = ` WHERE goodsId =${data.goodsId}`
    delete data.goodsId
    let arr = []
    for (let i in data) {
      upSql += `${i} =?,`
      arr.push(data[i])
    }
    upSql += WHERE
    upSql = upSql.replace(", WHERE", " WHERE")
    return await db(upSql, arr)
  }
} 