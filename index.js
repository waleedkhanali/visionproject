const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')
const otpGenerator = require("otp-generator");
const student_login = require("./database_modules/login.js")
const templatePath = path.join(__dirname,"/templates/view");
const mentor_info = require("./database_modules/mentor_data.js");
const filePath = path.join(__dirname,"/src");
const cookieParser = require('cookie-parser');
const pdf2img = require('pdf-img-convert');
const url = require('url');
const { waitForDebugger } = require("inspector");
const { rmSync } = require("fs");
require("./db_connection/db_connection.js");
const fs = require("fs");
require('dotenv').config()
const app = express();
////////////Socket io///////////////////
const server = require('http').createServer(app);
const {Server} = require("socket.io");
const { Console } = require("console");
const { env } = require("process");
const io = new Server(server);
io.on("connection",(socket) => {
    console.log("connected succesfully");
})
app.set('view engine', 'hbs');
app.set("views",templatePath);
app.use(express.static(filePath));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
hbs.registerPartials(__dirname + '/templates/partials/');

app.get("/",async (req,res) => {
    try{
        
        const getToken = req.cookies.jwt;
        console.log(getToken);
        if(getToken == undefined){
            res.render("index");
        }else{
            const getDetail = await jwt.verify(getToken,process.env.token);
            console.log(getDetail)
            if(getDetail.userType == "mentor"){

                
                
                var email = getDetail.email;
           
                const find_mentor_info = await mentor_info.findOne({mentor_email:email});
                console.log(find_mentor_info)
                if(find_mentor_info === null){
                    res.render("mentor_verify");
                }else if(find_mentor_info.mentor_status    == "unverified"){
                    res.render("mentor_verify",{
                        mentor_status : find_mentor_info.mentor_status
                    });
                }else{
                    res.render("mentor");
                }





            }
            else if(getDetail.userType == "student"){
                res.render("student")
            }else{
                throw new Error("SOMETHING WENTS WRONG")
            }
            
        }
    }
    catch(err){
        console.log(err)
    }
    
});
// MENTOR SECTION START
app.post("/mentor_apply",async (req,res) => {
    try{
    var email_token = req.cookies.jwt;
    var email_verify = jwt.verify(email_token,process.env.token);
    var email = email_verify.email;
    var username = req.body.username;
    var education = req.body.education;
    var university = req.body.university;
    var experience = req.body.experience;
    var work = req.body.work;
    var phone = req.body.phone;
    var id = req.body.id;
    var about = req.body.about;
    var skills = req.body.skills;
    var files = req.files;
    var profle_pic = req.files.profile_pic;
    const save_mentor_info = new mentor_info({
        mentor_username: username,
        mentor_email: email,
        mentor_education: education,
        mentor_university: university,
        mentor_about: about,
        mentor_work : work,
        mentor_phone : phone,
        mentor_id: id,
        mentor_experience: experience,
        mentor_skills: skills ,
        mentor_attachments: null,
        mentor_profile: null
    });
   
    var userpath = path.join(__dirname,`./mentor_attachments/${ req.files.attachments.name}`)
    const images =  req.files.attachments.mv(userpath).then(async () => {

  
    var data = new FormData();

if(req.files.attachments.mimetype == "application/pdf"){
    var outputImages1 = await pdf2img.convert(userpath);
    for (i = 0; i < outputImages1.length; i++){
        fs.writeFile(userpath.replace(".pdf",".jpg"),outputImages1[i], function (error) {
            console.log(error)
        }); //writeFile
      } //
      //// DELTE OLD FILE
      fs.unlinkSync(userpath)
      userpath = userpath.replace(".pdf",".jpg");
}
 var urls = await fs.readFile(userpath, {encoding: 'base64'}, function (err, data1) {
    data.append('image', data1)
        fetch("https://api.imgbb.com/1/upload?key=3db5e9ddb2c37da86407d46ca0a86dc2",{
        method: "POST",
        body: data
    })
    .then(result => {
        
        return result.text()
    }).then(result1 => {
         var result = JSON.parse(result1)
         var url = result.data.url;
         return url;
    }).then(result1 => {
         save_mentor_info.mentor_attachments = result1;
        // save_mentor_info.save();
        fs.unlinkSync(userpath);
        return result1;
    })
    .then(data => {
        var userpath1 = path.join(__dirname,`./mentor_attachments/${ req.files.profile_pic.name}`)
        const profile_pic_image =  req.files.profile_pic.mv(userpath1).then(async () => {

  
            var data = new FormData();
        
         var urls = await fs.readFile(userpath1, {encoding: 'base64'}, function (err, data1) {
            data.append('image', data1)
                fetch("https://api.imgbb.com/1/upload?key=3db5e9ddb2c37da86407d46ca0a86dc2",{
                method: "POST",
                body: data
            })
            .then(result => {
                
                return result.text()
            }).then(result1 => {
                 var result = JSON.parse(result1)
                 var url = result.data.url;
                 return url;
            }).then(result1 => {
                 save_mentor_info.mentor_profile = result1;
                 console.log("profile_pic url")
                 console.log(result1)
                // save_mentor_info.save();
                // fs.unlinkSync(userpath);
                save_mentor_info.save();
                return result1;
        
            })
         })
        })
          
        
        
        
    })
 })

 


 ///////////////////////Profile pic work here//////////////////
 

//   io.emit("service",JSON.stringify(save_mentor_info));
 })

res.redirect("/");
 
}catch(err){
    res.send("form not submitted");
    console.log(err)
}
})
app.get("/mentor_info",async (req,res) => {
    const email_token = req.cookies.jwt;
    const email = jwt.verify(email_token,process.env.token)
    const get_mentor_data = await mentor_info.findOne({mentor_email:email.email});
    var getAge = await student_login.findOne({email:email.email});
    //get_mentor_data.push({age:getAge.age})
    console.log(get_mentor_data)
    res.send(JSON.stringify([get_mentor_data,getAge]))

})
//MENTOR SECTION END

app.get("/login",(req,res)=>{
    var Error = req.cookies.login;
    res.clearCookie("login")
    res.render("login",{
        er: Error
    })
})
app.get("/contact",(re,res) => {
    res.render("contact")
})
app.get("/faq",(re,res) => {
    res.render("faq")
})
app.get("/councelling",(req,res) => {
    res.render("councelling");
})
app.get("/university",(req,res) => {
    res.render("universities")
})
app.post("/login",async (req,res) => {
    try{
    var email = req.body.email;
    var password = req.body.password;
    const UserData = await student_login.findOne({email:email});
   console.log(email)
   console.log(UserData)
    if(UserData.isVerified == true){

   
    const userPassword = await bcrypt.compare(password,UserData.password);
    console.log(userPassword)
    if(userPassword){
        const userInfo = ({
            email:email,
            userType: UserData.userType
        })
        const token = await jwt.sign(JSON.stringify(userInfo),process.env.token);
         res.cookie("jwt",token);
         console.log(req.cookies.jwt)

        
       
    }else{
        console.log("hello status code send");
        res.cookie("login","Error Password Not matched");
        res.redirect("/login");
    }
}else{
    await student_login.deleteOne({email:email});
        throw new Error(402); 
    }
    res.redirect("/")

}catch(err){
    console.log(err.message)
    
    if(err.message == 402){
        res.render("login",{
            er: "NO RECORDS FOUND."
        })
    }else{
    res.render("login",{
        er: "SOMETHING WENTS WRONG"
    })
}
    console.log()
}
})
app.get("/navbar",(req,res)=>{
    res.render("navbar")
})
app.post("/register",async(req,res) => {
    const username = req.body.name;
    const country = req.body.country
    const email = req.body.email;
    const password = req.body.password;
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    const expireDate =  new Date(Date.now() + 10 * 60 * 1000);
    const userType = req.body.register;
        const registerUser = new student_login({
            username: username,
            age : 18,
            classes : "none",
            email : email ,
            userType: userType,
            password:password,
            country:country,
            otp:otp,
            isVerified:false,
            lastTimeOtp:expireDate
        });
        console.log(otp);
        const result = await registerUser.save();
        const userInfo = ({
            email:email,
            userType: userType
        })
        const token = await jwt.sign(JSON.stringify(userInfo),process.env.token);
        res.cookie("jwt",token);
        res.redirect(url.format({
            pathname:"/otp",
            query: {
            email:email
            }
        }));

});
app.get("/otp",(req,res) => {
    const email = req.query.email;
    res.render("otp",{
        email:email,
    });

});
app.post("/otp",async (req,res) => {
    try{
    const email = req.body.email;
    const otp = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4;
    const UserData = await student_login.findOne({email:email});
    const UserDataOtp = await bcrypt.compare(otp,UserData.otp);
    const startDate = new Date(UserData.lastTimeOtp);
    const currentDate = new Date();
    console.log(    startDate.getTime()>currentDate.getTime())
    if(UserDataOtp && startDate.getTime()>currentDate.getTime()){
        const updateData = await student_login.updateOne({email:email},{isVerified:true});
        res.redirect("/");
    }else{
        if(startDate.getTime()>currentDate.getTime()){
            throw new Error(410)
        }else{
            throw new Error(402)
        }
    }
    console.log(UserData)
}catch(err){
    console.log(err)
    if(err.message == 410){
        res.redirect("/otp")
    }else if(402){
        res.redirect("/otp")
    }else{
        res.redirect("/otp")
    }
    
}
});
app.get("/admin",async (req,res) => {
    res.render("admin")
})
app.get("/worldwidesale", async(req,res) => {
    var count_people_pakistan = await student_login.countDocuments({country : "Pakistan"});
    var count_people_china = await student_login.countDocuments({country : "China"});
    var count_people_japan = await student_login.countDocuments({country : "Japan"});
    var count_people_india = await student_login.countDocuments({country : "India"});
    var count_people_usa = await student_login.countDocuments({country : "Usa"});
    const userData = {
        pakistan: count_people_pakistan,
        china: count_people_china,
        japan: count_people_japan,
        india: count_people_india,
        usa: count_people_usa,
    }
    console.log(userData)
    res.json(userData);
})
app.get("/blog",(req,res) => {
    res.render("blogs")
})
app.get("/contact",(req,res) =>{
    res.render("contact");
})
app.get("/faq",(req,res) =>{
    res.render("faq");
})
app.get("/terms",(req,res) =>{
    res.render("terms");
})
app.post("/upload_blog",(req,res) => {
    console.log(req.files);
    console.log(req.body);
    res.send("hello");
    
})
app.get("/admin/mentor",async (req,res) => {
    const get_all_mentor = await mentor_info.find({mentor_status:"unverified"});
    res.render("admin_mentor",{
        mentor_info: JSON.stringify(get_all_mentor)
    })
})
app.post("/admin/get_other_info",async (req,res) => {
    var email = req.body.email;
   const get_other_info = await student_login.findOne({email:email});
    res.send(JSON.stringify(get_other_info))
})
app.post("/admin/approve_mentor",async (req,res) => {
    try{
    var email = req.body.email;
    const update_mentor_info = await mentor_info.updateOne({mentor_email:email},{ $set: { mentor_status:"verified"}});
    console.log(update_mentor_info)
    res.send("verified")
    }catch(err){
        res.send("error")
        console.log(err)
    }

})
app.post("/mentor/change_attachments", async(req,res)  => {
    var file = req.files.file;
    const email = req.body.email;
    var userpath = path.join(__dirname,`./mentor_attachments/${ req.files.attachments.name}`)
   
    const images =  req.files.attachments.mv(userpath).then(async () => {

  
    var data = new FormData();

if(req.files.attachments.mimetype == "application/pdf"){
    var outputImages1 = await pdf2img.convert(userpath);
    for (i = 0; i < outputImages1.length; i++){
        fs.writeFile(userpath.replace(".pdf",".jpg"),outputImages1[i], function (error) {
            console.log(error)
        }); //writeFile
      } //
      //// DELTE OLD FILE
      fs.unlinkSync(userpath)
      userpath = userpath.replace(".pdf",".jpg");
}
 await fs.readFile(userpath, {encoding: 'base64'}, function (err, data1) {
    data.append('image', data1)
        fetch("https://api.imgbb.com/1/upload?key=3db5e9ddb2c37da86407d46ca0a86dc2",{
        method: "POST",
        body: data
    })
    .then(result => {
        
        return result.text()
    }).then(result1 => {
         var result = JSON.parse(result1)
         var url = result.data.url;
         return url;
    }).then(async result1 => {
        const update_mentor_info = await mentor_info.updateOne({mentor_email:email},{$set:{mentor_attachments: result1}});
        fs.unlinkSync(userpath);
    })
})
    })

})
app.post("/mentor/change_profile_pic",(req,res) => {
    console.log(req.files)
})
app.get("/privacy",(req,res) => {
    res.render("privacy")
})
app.get("/blog1",(req,res) => {
    res.render("ACCA")
})
app.get("/blog2",(req,res) => {
    res.render("AIblog")
})
app.get("/blog3",(req,res) => {
    res.render("csBlogs")
})
app.get("/blog4",(req,res) => {
    res.render("cssblog")
})
app.get("/blog5",(req,res) => {
    res.render("LLBBLOG")
})
app.get("/blog6",(req,res) => {
    res.render("media sciuence blog")
})
app.get("/blog7",(req,res) => {
    res.render("medicalBlog")
})
app.get("/blog8",(req,res) => {
    res.render("softwareblog")
})
app.get("/logout",(req,res) => {
    res.clearCookie("jwt");
    res.redirect("/")
})
app.get("/message",async (req,res) => {
    const getToken = req.cookies.jwt;
    const verifyToken = jwt.verify(getToken,process.env.token);
    const email = verifyToken.email;
    const getInfo = await student_login.findOne({email});
    const message = getInfo.message;
    console.log(message)
    res.render("message",{
        message:message
    })
})
server.listen("8000",()=> {
    console.log("i am listening")
})