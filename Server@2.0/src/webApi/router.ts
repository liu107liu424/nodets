import express from "express";
const router = express.Router(); // 2. 创建路由对象
import api from './api'

router.post('/login', api.login)
router.post('/enroll', api.enroll)
router.post('/addGoods', api.addGoods)
router.post('/setGoods', api.setGoods)

export default router
