const db=require('../db')
const nodemailer=require('nodemailer')


const register=async(req,res)=>{


    const {firstname,lastname,mobileno,gender,address,email,password}=req.body
    const query1='select * from user where email=?';
    try{
     db.query(query1,email,(err,result)=>{
       if(err) throw err;
        if(result.length>0){
          console.log('already regitered')
        }
        else{
          const query = 'INSERT INTO user (firstname, lastname, mobileno, gender, address, email,password) VALUES (?, ?, ?, ?, ?, ?,?)';
          const values = [firstname, lastname, mobileno, gender, address, email,password];
        
          try {
            db.query(query, values);
            res.status(200).send('User registered successfully');
          } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
          }

        }
     })
    }
    catch(e){
      res.status(500).send('server error')
    }

  
}

const login=async(req,res)=>{
  const{email,password}=req.body
  const query='SELECT firstName, address, password FROM user WHERE email= ?';
   try{
  db.query(query,[email],(err,result)=>{
    if(err) throw err;
    if(result.length > 0 && result[0].password === password){
      res.status(200).json({
        message: 'password correct',
        firstName: result[0].firstName,
        address: result[0].address
      });
       }
    else{
      res.status(401).send('Login failed');
    }
  
  })
 }
 catch(e){
  res.status(500).send('server error')
}
}

const doCheckout=async (req,res)=>{
  const{cart,subTotal,total,taxPrice,email}=req.body

  const sender=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'jo214841@gmail.com',
        pass:'xzwb jwbd qosi lzaz'
    }
})


const composemail = {
  from: 'jo214841@gmail.com',
  to: email,
  subject: 'aws products',
  html: `
    <p>Bill</p>
    <h1>Your Order</h1>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Base Price</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.subcategory}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <br/> 
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Bill</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">sub total</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${subTotal}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Tax</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${taxPrice}</td>
        </tr>
        <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Total</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${total}</td>
      </tr>
      </tbody>
    </table>
  `
};
await sender.sendMail(composemail);

return res.status(200).json('success purchase')



}

exports.doCheckout=doCheckout

exports.register=register
exports.login=login