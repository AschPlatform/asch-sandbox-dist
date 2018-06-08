"use strict";var _setImmediate2=require("babel-runtime/core-js/set-immediate"),_setImmediate3=_interopRequireDefault(_setImmediate2);function _interopRequireDefault(r){return r&&r.__esModule?r:{default:r}}var EventEmitter=require("events").EventEmitter,util=require("util"),fs=require("fs"),path=require("path"),querystring=require("querystring"),Sandbox=require("./sandbox");function SandboxWrapper(r,e,t,i,n,a){if(EventEmitter.call(this),"string"!=typeof r||null==r)throw new Error("First argument should be a path to file to launch in vm");if("string"!=typeof e||null==e)throw new Error("Second argument should be a id of dapp");if("function"!=typeof i||null==i)throw new Error("Third argument should be a api hanlder callback");this.params=t,this.file=r,this.id=e,this.apiHandler=i,this.child=null,this.debug=n||!1,this.callbackCounter=1,this.logger=a,this.callbacks={}}util.inherits(SandboxWrapper,EventEmitter),SandboxWrapper.prototype._getCallbackCounter=function(){return this.callbackCounter++},SandboxWrapper.prototype._parse=function(r){var e=r;if(null===e.callback_id||void 0===e.callback_id)return this._onError(new Error("Incorrect response from vm, missed callback id field"));try{var i=parseInt(e.callback_id)}catch(r){return this._onError(new Error("Incorrect callback_id field, callback_id should be a number"))}if(isNaN(i))return this._onError(new Error("Incorrect callback_id field, callback_id should be a number"));if("dapp_response"==e.type){var t=this.callbacks[i];if(!t)return this._onError(new Error("Asch can't find callback_id from vm"));var n=e.error,a=e.response;delete this.callbacks[i],(0,_setImmediate3.default)(t,n,a)}else if("dapp_call"==e.type){var o=e.message;if(null==o)return this._onError(new Error("Asch can't find message for request from vm"));o.chain=this.id,this.apiHandler(o,function(r,e){var t={type:"asch_response",callback_id:i,error:r,response:e||{}};this.child.postMessage(t)}.bind(this))}else this._onError(new Error("Incorrect response type from vm"))},SandboxWrapper.prototype.run=function(){this.child=new Sandbox({file:this.file,args:this.params});var e=this;e.child.run(function(r){return e._onError("dapp exit with reason: "+r.result)}),e.child.on("exit",function(r){e.emit("exit",r)}),e.child.on("error",e._onError.bind(e)),e.debug&&e.child.on("stdout",e._debug.bind(e)),e.child.on("stderr",e._debug.bind(e)),e.child.on("message",e._parse.bind(e))},SandboxWrapper.prototype.setApi=function(r){if("function"!=typeof r||null==r)throw new Error("First argument should be a function");this.apiHandler=r},SandboxWrapper.prototype.sendMessage=function(r,e){var t=this._getCallbackCounter(),i={callback_id:t,type:"asch_call",message:r};this.callbacks[t]=e,this.child.postMessage(i)},SandboxWrapper.prototype.exit=function(){this.child&&this.child.kill()},SandboxWrapper.prototype._debug=function(r){this.logger.log("dapp["+this.id+"]",r)},SandboxWrapper.prototype._onError=function(r){this.logger.error("dapp["+this.id+"]",r)},SandboxWrapper.routes=require("./framework/routes.json"),module.exports=SandboxWrapper;