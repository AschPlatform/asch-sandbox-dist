"use strict";var _setImmediate2=require("babel-runtime/core-js/set-immediate"),_setImmediate3=_interopRequireDefault(_setImmediate2);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var EventEmitter=require("events").EventEmitter,util=require("util");function Sandbox(){this.callbacks={},this.callbackCounter=1,this.messageHandler=null,this.dappMessageCb=null,EventEmitter.call(this)}util.inherits(Sandbox,EventEmitter),Sandbox.prototype.processParentMessage=function(e){if("function"==typeof this.onMessage){var r,t=e;if(!t.callback_id)return void app.logger.error("Incorrent response from parent, missed callback_id field");try{r=parseInt(t.callback_id)}catch(e){return void app.logger.error("Failed to convert callback_id to integer")}if(isNaN(r))return void app.logger.error("Incorrect callback_id field, callback_id should be a number");if("asch_response"==t.type){if(!(n=this.callbacks[r]))return void app.logger.error("Can't find callback_id from parent");var a=t.error,i=t.response;delete this.callbacks[r],(0,_setImmediate3.default)(n,a,i)}else if("asch_call"==t.type){var n=function(e,t){var a={type:"dapp_response",callback_id:r,error:e};!e&&t&&(a.response=t.response),this.emit("message",a)}.bind(this),s=t.message;"function"==typeof this.messageHandler&&(0,_setImmediate3.default)(this.messageHandler,s,r,n)}}},Sandbox.prototype._getCallbackCounter=function(){return this.callbackCounter++},Sandbox.prototype.onMessage=function(e){this.messageHandler=e},Sandbox.prototype.sendMessage=function(e,t){t||(t=function(){});var a=this._getCallbackCounter(),r={type:"dapp_call",callback_id:a,message:e};this.callbacks[a]=t,this.emit("message",r)},Sandbox.prototype.run=function(t){var e={sandbox:this};global.app=t,global.PIFY=require("./helpers/index").PIFY;var a=this;require("./init")(e,function(e){e?(console.error("Failed to init: "+e),a.emit("exit")):(t.logger.info("Initialize complete"),this.emit("ready"))}.bind(this))};var instance=new Sandbox;module.exports=instance;