let Express = require('express')
let app = Express()
let jsonwebtoken = require("jsonwebtoken")
const { default: mongoose } = require('mongoose')



mongoose.connect('mongodb+srv://nouman:411801@cluster0.ranznsc.mongodb.net/ShoeStore').then((result) => {
    console.log("DB IS CHALLING");
}).catch((error) => { console.error("DB IS NOT CHALLING"); })

let { Users } = require("./module/user")

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.use(Express.static("build"))




app.post('/signup', async function (incoming, outgoing) {
    console.log(incoming.body);
    // users.push(incoming.body)
    let saveuser = new Users(incoming.body);
    await saveuser.save();
    console.log(saveuser);
    outgoing.json(true)
})




app.post("/checkusers", async function (req, resp) {
    //   let usermila=  users.find(user=>user.email ==req.body.email &&user.password==req.body.password)
    //     resp.json(usermila)
    //     console.log(usermila);
    // let deletekaro=   await Users.deleteMany({email:check._doc.email} );

    let check = await Users.findOne(req.body)

    if (check) {
        jsonwebtoken.sign({ check: check.email }, "save password",
            { expiresIn: "1w" },
            function (err, token) {
                resp.json({
                    myToken: token,
                    check
                })
            }
        )
    }
    //    resp.json(check)
})

app.post("/check-token", async function (req, resp) {
    
    try {
        let token = jsonwebtoken.verify(req.body.token, "save password");
        let check = await Users.findOne({ email: token.check });
        if (check) {
            resp.status(200).json({
                check
            }
            )
        }

           
    }catch (error) {
    console.log(error)
}
    // console.log(req.body.token);
})



app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})

app.listen("6070", function () {
    console.log("code chal gaya");
})
