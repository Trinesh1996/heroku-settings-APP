let express = require("express")
let app = express()
let bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const settingsBill = require("./public/settings-bill")
const settings = settingsBill()
const port = 3001


//DONT FORGET THE BODY PARSER -- parse application!
app.use(bodyParser.urlencoded( {extended: false} ))
// PARSER APPLICATION
app.use(bodyParser.json())
app.use(express.static('public'))

// Handlebars view engine for app
app.engine('handlebars', exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")


app.get("/", function(req, res){	
	res.render('home', 	settings.settingValues())
})


app.post("/action", function (req, res){
	let radioButton = req.body.billItemTypeWithSettings
	settings.radio(radioButton)
	res.redirect("/")
	})

app.get("/actions", function(req, res){
	res.render('actions')

})

// app.get("/actions/sms", function(req, res){
	

// })
// app.get("/actions/total", function(req, res){

// })


	

app.post("/settings", function(req, res){
	let callPrice = req.body.callCost
	let smsPrice = req.body.smsCost
	let warning = req.body.warningLevel
	let critical = req.body.criticalLevel

	settings.setCall(callPrice)
	settings.setSms(smsPrice)
	settings.setCritical(critical)
	settings.setWarning(warning)
	res.redirect("/")
	
})
app.listen(port, function(){
	console.log("App is starting on port" + port)
})