import db from '../db'

async function repetition(numTries = 1) {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 获取月份，并格式化为两位数字
  const day = ("0" + date.getDate()).slice(-2); // 获取日期，并格式化为两位数字
  let Dates = year + "" + month + "" + day; // 组合成 YYYYMMDD 格式
  Dates = Dates.slice(-6);
  const n = Math.floor(Math.random() * 9) + 1;
  const id = Dates + ((n + Math.random()) * Math.pow(10, 5)).toString().slice(0, 6);
  const sqlStr = "SELECT * FROM goods WHERE goodsId=?";
  const res: any = await db(sqlStr, [id])
  if (!res.length) {
    return id
  } else if (numTries < 50) {
    return repetition(numTries + 1)
  } else {
    return false
  }
}

export default {
  goodsId: async () => {
    const id = await repetition()
    return id
  }
}