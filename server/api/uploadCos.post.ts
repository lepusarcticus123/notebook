import COS from 'cos-nodejs-sdk-v5'
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
        const config=useRuntimeConfig()
        //初始化存储桶
        const cos = new COS({
            SecretId: config.SecretId, 
            SecretKey: config.SecretKey, 
        });
        //图片名称
        const fileName = Date.now() + '-' + body[0].filename
        //图片数据
        const buffer = body[0].data
        //COS请求文件
        const data=await cos.putObject({
            Bucket: 'notebook-1327145221', /* 必须 */
            Region: 'ap-chengdu',    /* 必须 */
            Key: fileName,              /* 必须 */
            Body:buffer, // 上传文件对象
        });
        const avatarUrl=`https://${data.Location}`
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
            return responseJson(0, 'ok', {
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
    return responseJson(1, '请上传头像', {})
})