module.exports = function() {

	var callCosts = 0
	var smsCosts = 0	
	var criticalLevels = 0
	var warningLevel = 0


	var callsTotal = 0
	var smsTotal = 0
	var total = 0

	var actionList = []

	

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
			criticalLevels = parseFloat(float)		
		}
	}
	function setWarning(float){
		if(float !== undefined){
			warningLevel = parseFloat(float)		
		}
	}

	
	function settingValues(){
		return {
			callsTotal: callsTotal.toFixed(2),
			smsTotal: smsTotal.toFixed(2),
			total: total.toFixed(2),
			callCosts,
			smsCosts,
			criticalLevels,
			warningLevel
		}
	}
	function radio (butn){
		if(butn == "call"){
			callsTotal += callCosts;
			total += callCosts;
		}
		if(butn == "sms"){
			smsTotal += smsCosts
			total += smsCosts
		}
	}


	function colorChange(){
		if(total >= criticalLevel){
			return "danger"
		}
		else if(total >= warningLevel){
			return "warning"
		}
		actionList.push({
			type: action,
			cost,
			timestamp: new Date()
		})

	}	

var criticalStop = function(){
	return total >= criticalLevel
}

var warningStop = function(){
	return total >= warningLevel
}

var notColorLevel = function(){
	if(total < warningLevel){
		return "warning"
	}
	else if(total < criticalLevel){
		return "danger"
	}

}

return {
	setCall,
	setSms,
	setCritical,
	setWarning,
	settingValues,
	radio,
	colorChange,
	actionList,
	

	
	
		
		notColor: notColorLevel,
		stopCritical: criticalStop,
		stopWarning: warningStop
}
}

	
