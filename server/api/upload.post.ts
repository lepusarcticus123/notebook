import Joi from 'joi'
import * as fs from "fs";
import path from 'path'
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
    const body = await readMultipartFormData(event);
    if (body) {
        if (body[0].type !== 'image/jpeg' && body[0].type !== 'image/png' && body[0].type !== 'image/jpg') {
            return responseJson(1, '请上传jpg/png/jpeg类型图片', {})
        }
        //图片名称
        const fileName = Date.now() + '-' + body[0].filename
        //图片路径
        const filePath = path.join('./public', 'img', fileName)
        //图片数据
        const buffer = body[0].data
        await fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.log('err', err)
            } else {

            }
        })
        //存储图片路径
        const avatarUrl = '/img/' + fileName
        //数据库操作
        const con = getDB()
        try {
            //插入users
            const [rows] = await con.execute(
                'update `users` set `avatar`=? where `id`=?',
                [avatarUrl, uid])
            await con.end()//释放连接
            if (rows.affectedRows === 0) {
                return responseJson(1, '上传头像失败', {})
            }
            return responseJson(0, '上传头像成功', {
                avatar: avatarUrl
            })
        }
        catch (e) {
            //释放连接
            await con.end()
            setResponseStatus(event, 500)
            return responseJson(1, '服务器错误', {})
        }
    }
    return responseJson(1,'请上传头像',{})
})