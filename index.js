let express = require("express")
let app = express()
let bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const settingsBill = require("./public/settings-bill")
const moment = require("moment")
const settings = settingsBill()
let PORT = process.env.PORT || 3001;


//DONT FORGET THE BODY PARSER -- parse application!
app.use(bodyParser.urlencoded( {extended: false} ))
// PARSER APPLICATION
app.use(bodyParser.json())
app.use(express.static('public'))

// Handlebars view engine for app
app.engine('handlebars', exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.engine('handlebars', exphbs(
	{defaultLayout: "main",
	helpers:
	{'timeStamp': function(){
		return moment(this.timestamp).fromNow();
	}
}
	}))


app.get("/", function(req, res){	
	res.render('home', settings.renderAll())	
})

app.post("/action", function (req, res){
	let radioButton = req.body.actionType;
	settings.billType(radioButton)
	res.redirect("/")
})

app.get("/actions", function(req, res){
	res.render('actions', {
		actions: settings.action()		
	})	
})

app.get('/actions/:type', function(req, res){
	let type = req.params.type;
	if (type === 'call' || type === 'sms') {
		res.render("actions", {
			actions: settings.filterCost(type)
		})
	}	
})

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
app.listen(PORT, function(){
	console.log("App is starting on port" + PORT)
})