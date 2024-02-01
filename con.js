const pool=require('../db')

const getCategory=async (req,res)=>{
    await pool.query('select * from category',(err,result)=>{
        if(err) throw err;
        res.send(result)
    })

}

exports.getSubCategory=async (req,res)=>{
    const {id} = req.params;
    console.log('Received request with id:', id);

    const query='select * from subcategory where catid=?';
    try{
        await pool.query(query,[id],(err,result)=>{
            if(err) throw err;
            else
            res.send(result);
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')

    }
}
exports.getCategory=getCategory
