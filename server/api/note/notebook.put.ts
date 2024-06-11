import Joi from 'joi'
import { getDB } from "~/server/utils/db/mysql"
import { responseJson,getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    //判断用户是否登录
    let uid=getLoginUid(event)
    if(uid===0){
        setResponseStatus(event,401)
        return responseJson(1, '请先登录', {})
    }
    //获取数据
    const body = await readBody(event);
    //进行数据校验
    const schema = Joi.object({
        id:Joi.number().required(),
        name: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(body);
    }
    catch (err) {
        console.log('err',err)
        return responseJson(1, '参数错误', {})
    }
    const con = getDB()
    try {
        //修改文集
        const [rows] = await con.execute('update `notebooks` set `name`=? where `id`=? and `uid`=?', [body.name,body.id,uid])
        await con.end()//释放连接
        if (rows.affectedRows === 0) {
            return responseJson(1, '修改失败', {})
        }
        return responseJson(0, '修改文集成功', {})
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})

    }
})