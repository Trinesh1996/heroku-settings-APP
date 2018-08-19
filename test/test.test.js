let assert = require("assert");
let settings = require("../public/settings-bill");

    describe("Settings Bill test", function(){  
        it('should be able to record calls', function(){
            const settingsBill = settings(); 
            settingsBill.billType('call');
            settingsBill.billType('call');
            assert.equal(2, settingsBill.action('call').length);
        });

        it("should be able to record sms's", function(){
            const settingsBill = settings(); 
            settingsBill.billType("sms");
            assert.equal(1, settingsBill.action('sms').length);
        });

        it("should be able to calculate totals", function(){
            const settingsBill = settings();
            settingsBill.setSms(1);
            settingsBill.setCall(4);
            settingsBill.setCritical(10);
            settingsBill.setWarning(7);

            settingsBill.billType('sms');
            settingsBill.billType('sms');
            settingsBill.billType('call');
            settingsBill.billType('call');

            assert.equal(10, settingsBill.totals());
            assert.equal(8, settingsBill.getCall());
            assert.equal(2, settingsBill.getSms());
        });
    
        it("should be able to know critical level has been reached", function(){
            const settingsBill = settings();
            settingsBill.setCall(4);
            settingsBill.setCritical(10);
            settingsBill.setWarning(7);

            settingsBill.billType("call");
            settingsBill.billType("call");
            settingsBill.billType("call");

            assert.equal("danger", settingsBill.color());
        });
        it("should be able to know when warning level has been reached", function(){
            const settingsBill = settings();            
            settingsBill.setCall(4);
            settingsBill.setSms(2);
            settingsBill.setWarning(6);
            settingsBill.setCritical(20);
            

            settingsBill.billType("call");
            settingsBill.billType("call");
            settingsBill.billType("sms");
            settingsBill.billType("sms");
            
            assert.equal(settingsBill.color(), "warning");
        });
        it("color should not change if total does not exceed warning or critical level", function(){
            const settingsBill = settings();            
            settingsBill.setCall(1);
            settingsBill.setSms(2);
            settingsBill.setWarning(6);
            settingsBill.setCritical(20);
            

            settingsBill.billType("call");
            settingsBill.billType("sms");
            
            assert.equal(settingsBill.color(), "normal");
        });
        it('shoud return default values when reset button is pressed ie. totals equal to zero and colors equal normal', function(){
            const settingsBill = settings();
            settingsBill.setCall(1);
            settingsBill.setSms(8);
            settingsBill.setWarning(10);
            settingsBill.setCritical(20);
            var clear = settingsBill.clear();

            settingsBill.billType('call');
            settingsBill.billType('sms');
         
            if (clear){
            assert.equal(settingsBill.color(), "normal")
            }
            if (clear){
                assert.equal(settingsBill.getCall(), 0)
                }
            if (clear){
                assert.equal(settingsBill.getSms(), 0)
            }    
        })
    })

