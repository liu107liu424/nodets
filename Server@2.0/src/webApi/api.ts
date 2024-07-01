import { Request, Response, response } from 'express'
import config from '../../config';
import mysqlData from './operateSql'
import utils from '../utils/utils';
export default {
  /**登录 */
  login: async (req: Request, res: Response) => {
    const { userName, password } = req.body
    mysqlData.login(userName, password).then((results: any) => {
      if (results.length > 0) {
        const token = config.token({ userName })
        results[0].token = token
        res.send({ code: 200, data: results[0] })
        return
      }
      res.send({ code: 201, data: { msg: '账号或密码有误，请重试' } })
    })
  },
  /**注册 */
  enroll: async (req: Request, res: Response) => {
    const { userName, password } = req.body
    let suspend = false
    await mysqlData.userInfo(userName).then((results: any) => {
      if (results.length) {
        suspend = true
        res.send({ code: 200, data: '用户名重复，请换一个试试' })
        return
      }
    })
    if (suspend) return ''
    await mysqlData.enroll(userName, password).then(results => res.send({ code: 200, data: '注册成功' }))
  },
  /**添加商品 */
  addGoods: async (req: Request, res: Response) => {
    const data = req.body
    const goodsId = await utils.goodsId()
    if (!goodsId) return res.send({ code: 201, data: '网络延迟，稍后再试' })
    const Array = [goodsId, data.goodsName, data.price, data.class, data.sku, data.sales, data.coverImg, data.skuImgList, data.goodsRemark]
    const results: any = await mysqlData.addGoods(Array)
    let obj = { code: 200, data: '添加成功' }
    if (!results.affectedRows) {
      obj.code = 201;
      obj.data = '添加失败，稍后再试';
    }
    res.send(obj)
  },
  /**修改商品 */
  setGoods: async (req: Request, res: Response) => {
    const data = req.body
    const results: any = await mysqlData.setGoods(data)
    let obj = { code: 200, data: '修改成功' }
    if (!results.affectedRows) {
      obj.code = 201;
      obj.data = '修改失败，稍后再试';
    }
    res.send(obj)
  },

}