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
    //获取手机号和密码
    const body = await readBody(event);
    console.log('111', body);
    //进行数据校验
    const schema = Joi.object({
        name: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(body);
    }
    catch (err) {
        return responseJson(1, '参数错误', {})
    }
    const con = getDB()
    try {
        //创建文集
        const [rows] = await con.execute('insert into `notebooks`(`name`,`uid`) value(?,?)', [body.name,uid])
        await con.end()//释放连接
        if (rows.affectedRows === 0) {
            return responseJson(1, '创建失败', {})
        }
        return responseJson(0, '创建文集成功', {}) 
    }
    catch (e) {
        console.log('err', e)
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})

    }
})