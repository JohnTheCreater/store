const mysql=require('mysql2')
const util=require('util')

const pool=mysql.createPool({

    host:'mysql-1c2a13dc-jo214841-519f.a.aivencloud.com',
    user:'avnadmin',
    password:'AVNS_GHnugt4s7JiNT8DSARW',
    port:13373,
    database:'john',




    // user:'rssdinfo_john@localhost',
    // password:'john@123',
    // database:'rssdinfo_john'
    
});

pool.query= util.promisify(pool.query)


module.exports=pool