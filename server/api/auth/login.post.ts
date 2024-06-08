//引入所需模块
import Joi from 'joi';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { getDB } from "~/server/utils/db/mysql"
import { responseJson } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    //获取手机号和密码
    const body = await readBody(event);
    console.log('111', body);
    //进行数据校验
    const schema = Joi.object({
        password: Joi.string().required(),
        phone: Joi.string().pattern(/1\d{10}/),
    });
    try {
        const value = await schema.validateAsync(body);
    }
    catch (err) {
        return responseJson(1, '参数错误', {})
    }
    //查询数据库，如果手机号不存在返回手机号不存在或者密码错误
    let salt = 'adhgsyudybhsah'
    let password = md5(md5(body.password) + salt)
    const con = getDB()
    try {
        //判断账号注册
        const [rows] = await con().execute('select * from `users` where `phone`=? and `password`=?', [body.phone,password])
        console.log('222', rows)
        if (rows.length === 0) {
            return responseJson(1, '账号不存在或密码错误', {})
        }
        //释放连接
        await con.end()
        //如果已经注册过，并且密码正确，生成token，并返回客户端
        let secret='wlyskzxfnr'//密钥
        let token=jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),//当前时间再加一小时
            data: {data:{uid:rows[0].id}}//将用户ID放入token的载荷中
          }, secret);
        //返回
        return responseJson(0, '登录成功', {
            accessToken:token,
            userInfo:{
                nickname:rows[0].nickname,
                phone:rows[0].phone
            }
        })
    }
    catch (e) {
        //释放连接
        await con.end()
        return responseJson(1, '服务器错误', {})

    }
})