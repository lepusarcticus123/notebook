import mysql from 'mysql2';
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'notebook'
})
connection.connect(err=>{
    if (err) throw err;
    console.log('数据库连接成功')
})