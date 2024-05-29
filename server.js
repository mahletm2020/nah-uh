const experes = require('express')
const app = experes()
const port=1000
const bycrypt = require('bcrypt')
app.use(experes.json())
const users = []

const posts = [
{
  userName: "me",
  title: "post1"
},{
  userName: "me2",
  title: "post2"
}
]

app.get('/users',(req,res)=>{
 res.json(posts)
})


//dono y post aint working
app.post('/users',async(req,res )=>{
  try {
    const hashedpassword = await bycrypt.hash(req.body.password,10)
    const user = {name:req.body.name,password:hashedpassword}
      users.push(user)
      res.status(201).send()
  } catch  {
    res.status(500).send(console.log("internal server error"))
    
  }
})

app.post('/users/login',async(req,res)=>{
  const user = users.find(user =>user.name = req.body.name)
  if(user==null){
    return res.status(400).send('cant find user')
  } 
  try{
    if(await bycrypt.compare(req.body.password,user.password)){
      res.send('sucess')
  }else {
    res.send('nah uh')
  }
  }  catch{
    res.status(500).send(console.log('internal server error'))
  }
})
app.listen(port,()=>{console.log(`server runnin on ${port}`)})