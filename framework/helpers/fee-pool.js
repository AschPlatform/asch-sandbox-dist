"use strict";var _slicedToArray2=require("babel-runtime/helpers/slicedToArray"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_getIterator2=require("babel-runtime/core-js/get-iterator"),_getIterator3=_interopRequireDefault(_getIterator2),_map=require("babel-runtime/core-js/map"),_map2=_interopRequireDefault(_map),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("babel-runtime/helpers/createClass"),_createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var bignum=require("bignumber"),MODEL_NAME="RoundFee",FeePool=function(){function r(e){(0,_classCallCheck3.default)(this,r),this.sdb=e,this.round=1}return(0,_createClass3.default)(r,[{key:"setRound",value:function(e){this.round=e}},{key:"add",value:function(e,r){var t={round:this.round,currency:e},a=this.sdb.get(MODEL_NAME,t);if(a){var u=bignum(a.amount).plus(r).toString();this.sdb.update(MODEL_NAME,{amount:u},t)}else t.amount=r,this.sdb.create(MODEL_NAME,t)}},{key:"getFees",value:function(){var e=this.sdb.entries(MODEL_NAME);app.logger.debug("fee pool get fees",e,this.round);var r=new _map2.default,t=!0,a=!1,u=void 0;try{for(var l,i=(0,_getIterator3.default)(e);!(t=(l=i.next()).done);t=!0){var s=(0,_slicedToArray3.default)(l.value,2),o=s[0],n=s[1],c=o.split(","),d=(0,_slicedToArray3.default)(c,2),_=d[0],f=d[1],p=Number(_.split(":")[1]),b=f.split(":")[1];p===this.round&&r.set(b,n.amount)}}catch(e){a=!0,u=e}finally{try{!t&&i.return&&i.return()}finally{if(a)throw u}}return r}}]),r}();module.exports=FeePool;