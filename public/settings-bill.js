module.exports = function() {
	var callCosts = 0;
	var smsCosts = 0;
	var criticalLevel = 0
	var warningLevel = 0

	var callsTotal = 0
	var smsTotal = 0
	var total = 0

	var actionList = [];
	var colors = "normal"

	
	function setSms(float){
		if(float !== undefined){
			smsCosts = parseFloat(float)
		}
	 }
	function setCall(float){
		if(float !== undefined){
			callCosts = parseFloat(float)
		}
	}
	function setCritical(float){
		if(float !== undefined){
			criticalLevel = parseFloat(float)		
		}
	}
	function setWarning(float){
		if(float !== undefined){
			warningLevel = parseFloat(float)		
		}
	}
	function color(){	
		if(total > criticalLevel){
			return "danger"
		}	
		if(total > warningLevel){
			return "warning"
		}				
		else {
			return "normal"
		}	
	}
	function billType (bill) {		
		let cost = 0;	
		if(total < criticalLevel) {
			if	(bill == "call"){
				callsTotal += callCosts;
				total += callCosts;
				cost = callsTotal
			}
			else if	(bill == "sms"){
				smsTotal += smsCosts
				total += smsCosts
				cost = smsTotal
			}
			else{
				return true
			}
		}
		
	actionList.push(
		{"type": bill,
		"price": cost.toFixed(2),
		"timeStamp": new Date()
		})			
	}

	function clear(){
		actionList = [];
		return{
			callCosts: callCosts = 0,
			smsCosts: smsCosts = 0,
			call: callsTotal = 0,
			sms: smsTotal = 0,
			tot: total = 0,
			warn: warningLevel= 0,
			critical: criticalLevel = 0,			
			col: colors="normal"
		}		
	}

	function filterCost(type){
		let filter = []
		for (let i = 0; i < actionList.length; i++){
			let actiontype = actionList[i];
			if(actiontype.type == type){
				filter.push(actiontype)
			}
		}return filter
	}

	// var type = actionList.map(function(bills){
	// 	return bill.type
	// })
	function actionFor(){
		return actionList
	}

	function getCall() {
		return callsTotal
	}
	function getSms() { 
		return smsTotal
	}
	function totals(){
		return total
	}
	function criticalStop(){
		return total >= criticalLevel
		}

	function renderAll(){
		return {
			color,
			callCosts,
			smsCosts,
			criticalLevel,
			warningLevel,
			callsTotal: callsTotal.toFixed(2),
			smsTotal: smsTotal.toFixed(2),
			total: total.toFixed(2),
			totals
		}
	}
		return {
			setCall,
			setSms,
			setCritical,
			setWarning,
			renderAll,
			action: actionFor,			
			billType,
			criticalStop,
			getCall,
			getSms,
			filterCost,
			color,
			totals,
			clear,
			colors
		}
	}