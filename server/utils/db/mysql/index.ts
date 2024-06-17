import mysql from 'mysql2'
//连接池链接
// Create the connection pool. The pool-specific settings are the defaults
export const getDB = () => {
    const config=useRuntimeConfig()
    return mysql.createPool({
        host: config.DB_HOST,
        user: config.DB_USER,
        database: config.DB_DATABASE,
        password: config.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    }).promise();
}