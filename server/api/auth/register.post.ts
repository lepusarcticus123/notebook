//引入所需模块
import Joi from 'joi';//校验
import md5 from 'md5';//加密
import { getDB } from "~/server/utils/db/mysql" //数据池连接
import { responseJson } from '~/server/utils/helper';   //响应
export default defineEventHandler(async (event) => {
    //获取数据
    const body = await readBody(event);
    //数据校验Joi
    const schema = Joi.object({     //提供约束类型
        nickname: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
    })
    try {
        const value = await schema.validateAsync(body);
    }
    catch (err) {
        return responseJson(1, '参数错误', {})
    }
    //密码加密加盐md5
    let salt = 'adhgsyudybhsah'
    let password = md5(md5(body.password) + salt)
    const con = getDB()
    try {
        //判断账号注册
        const [rows] = await con.execute('select * from `users` where `phone`=?', [body.phone])
        //账号已注册
        if (rows.length > 0) {
            return responseJson(1, '账号已注册', {})
        }
        //未注册，创建账号
        const [rows2] = await con.execute('insert into `users`(`nickname`,`phone`,`password`) value(?,?,?)', [body.nickname, body.phone, password])
        //释放连接
        await con.end()
        if (rows2.affectedRows === 1) {
            return responseJson(0, '注册成功', {})
        }
    }
    catch (e) {
        //释放连接
        await con.end()
        return responseJson(1, '服务器错误', {})
    }
})