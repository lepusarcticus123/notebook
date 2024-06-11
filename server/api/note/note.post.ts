import Joi from 'joi'
import { getDB } from "~/server/utils/db/mysql"
import { responseJson, getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    //判断用户是否登录
    let uid = getLoginUid(event)
    if (uid === 0) {
        setResponseStatus(event, 401)
        return responseJson(1, '请先登录', {})
    }
    //获取数据
    const body = await readBody(event);
    //进行数据校验
    const schema = Joi.object({
        notebookId: Joi.number().required()
    });
    try {
        const value = await schema.validateAsync(body);
    }
    catch (err) {
        return responseJson(1, '参数错误', {})
    }
    const con = getDB()
    try {
        //创建文章
        const [rows] = await con.execute(
            'insert into `notes`(`title`,`content_md`,`state`,`uid`) value(?,?,?,?)',
            [genTitle(), "", 1, uid])
        if (rows.affectedRows === 0) {
            return responseJson(1, '创建失败', {})
        }
        //关联文集
        const [rows2] = await con.execute(
            'insert into `notebook_notes`(`notebook_id`,`note_id`) value(?,?)',
            [body.notebookId, rows.insertId])
        await con.end()//释放连接
        if (rows2.affectedRows === 0) {
            return responseJson(1, '关联失败', {})
        }
        return responseJson(0, '创建成功', {
            
        })
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event, 500)
        return responseJson(1, '服务器错误', {})

    }
})