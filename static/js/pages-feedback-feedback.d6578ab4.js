(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-feedback-feedback"],{"090a":function(e,t,n){"use strict";var a=n("4ea4");n("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("cd33")),r={name:"UniIcons",props:{type:{type:String,default:""},color:{type:String,default:"#333333"},size:{type:[Number,String],default:16},customIcons:{type:String,default:""}},data:function(){return{icons:i.default}},methods:{_onClick:function(){this.$emit("click")}}};t.default=r},"0eef":function(e,t,n){"use strict";n.r(t);var a=n("3712"),i=n("38b0");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("64fec");var o,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"eb9329fc",null,!1,a["a"],o);t["default"]=s.exports},1816:function(e,t,n){e.exports=n.p+"static/fonts/uni.75745d34.ttf"},"1de5":function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),e=e&&e.__esModule?e.default:e,"string"!==typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},3712:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var a={uniIcons:n("3c50").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"news-feedback"},[n("v-uni-view",{staticClass:"feedback__back",attrs:{"hover-class":"back-hover","hover-stay-time":"100","hover-start-time":"0"}},[n("uni-icons",{attrs:{type:"back",size:"26",color:"#999"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"feedback__container"},[n("v-uni-view",{staticClass:"feedback-title"},[e._v("意见反馈：")]),n("v-uni-view",{staticClass:"feedback-content"},[n("v-uni-textarea",{staticClass:"feedback-textarea",style:{boxShadow:e.textareaStyle.boxShadow},attrs:{bindfocus:"addFocus",bindblur:"deteleFocus",placeholder:"请输入您要反馈的问题"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.addFocus.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.deteleFocus.apply(void 0,arguments)}},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1),n("v-uni-view",{staticClass:"feedback-title"},[e._v("反馈图片:")]),n("v-uni-view",{staticClass:"feedback-image-box"},[e._l(e.imageList,(function(t,a){return n("v-uni-view",{key:a,staticClass:"feedback-image-item"},[n("v-uni-view",{staticClass:"close-icon",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.deteleImage(a)}}},[n("uni-icons",{attrs:{type:"closeempty",size:"18",color:"#fff"}})],1),n("v-uni-view",{staticClass:"image-box"},[n("v-uni-image",{attrs:{src:t.url,mode:"aspectFill"}})],1)],1)})),e.imageList.length<5?n("v-uni-view",{staticClass:"feedback-image-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addImage.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"image-box"},[n("uni-icons",{attrs:{type:"plusempty",size:"50",color:"#ffffff"}})],1)],1):e._e()],2),n("v-uni-button",{staticClass:"feedback_btn",attrs:{"hover-class":"el-hover","hover-stay-time":"100","hover-start-time":"0"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("提交反馈")])],1)],1)},r=[]},"38b0":function(e,t,n){"use strict";n.r(t);var a=n("7a8f"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},"3bed":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-text",{staticClass:"uni-icons",class:[e.customIcons,e.customIcons?e.type:""],style:{color:e.color,"font-size":e.size+"px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._onClick.apply(void 0,arguments)}}},[e._v(e._s(e.icons[e.type]))])},r=[]},"3c50":function(e,t,n){"use strict";n.r(t);var a=n("3bed"),i=n("faa6");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("c6b1");var o,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"467c48fe",null,!1,a["a"],o);t["default"]=s.exports},"59a1":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-eb9329fc]{background-color:#efeeee}.news-feedback .feedback__back[data-v-eb9329fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?16?%;width:%?122?%;height:%?72?%;margin:%?20?%;background-color:#f0f0f0;border:%?1?% solid #efeeee;box-shadow:%?6?% %?10?% %?20?% rgba(0,0,0,.2),%?-8?% %?-10?% %?20?% #fff}.news-feedback .feedback__container[data-v-eb9329fc]{border-radius:%?16?%;margin:%?40?% %?20?%;padding:%?20?%;box-sizing:border-box;background-color:#f0f0f0;box-shadow:%?2?% %?2?% %?4?% #babecc,%?-2?% %?-2?% %?4?% #fff}.news-feedback .feedback-title[data-v-eb9329fc]{margin:%?30?%;font-size:%?27?%;margin-bottom:0;color:#666}.news-feedback .feedback-content[data-v-eb9329fc]{margin:%?10?%;padding:%?20?%;box-sizing:border-box}.news-feedback .feedback-content .feedback-textarea[data-v-eb9329fc]{outline:none;min-width:%?200?%;padding:%?30?%;border-radius:%?16?%;box-sizing:border-box;background-color:#f0f0f0;box-shadow:inset %?2?% %?2?% %?4?% #babecc,inset %?-2?% %?-2?% %?4?% #fff;color:#666;font-size:%?24?%;width:100%;height:%?200?%}.news-feedback .close-icon[data-v-eb9329fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;right:0;top:0;width:%?24?%;height:%?24?%;border-radius:50%;background-color:#ff5a5f;z-index:2}.news-feedback .feedback-image-box[data-v-eb9329fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin:%?30?%;padding:%?20?%;border-radius:%?16?%;box-shadow:inset %?2?% %?2?% %?4?% #babecc,inset %?-2?% %?-2?% %?4?% #fff}.news-feedback .feedback-image-box .feedback-image-item[data-v-eb9329fc]{width:33.33%;position:relative;height:0;padding-top:33.33%;box-sizing:border-box}.news-feedback .feedback-image-box .feedback-image-item .image-box[data-v-eb9329fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;top:%?10?%;right:%?10?%;bottom:%?10?%;left:%?10?%;border:%?2?% #eee solid;border-radius:%?10?%;overflow:hidden;box-shadow:%?2?% %?2?% %?4?% #babecc,%?-4?% %?-4?% %?8?% #fff}.news-feedback .feedback-image-box .feedback-image-item .image-box uni-image[data-v-eb9329fc]{width:100%;height:100%}.news-feedback .feedback_btn[data-v-eb9329fc]{margin:0 %?40?%;color:#666;background-color:#f1aaa1;box-shadow:3px 5px 10px #c79a97,-4px -5px 10px #fff}.news-feedback .el-hover[data-v-eb9329fc]{opacity:.9;box-shadow:0 0 0 #e7a0a0,0 0 0 #ffb4ab,inset %?20?% %?20?% %?10?% #e7a0a0,inset %?-20?% %?-20?% %?10?% #ffb4ab!important}.news-feedback .back-hover[data-v-eb9329fc]{box-shadow:0 0 0 rgba(0,0,0,.2),0 0 0 hsla(0,0%,100%,.2),inset %?20?% %?20?% %?20?% rgba(0,0,0,.1),inset %?-20?% %?-20?% %?20?% #fff!important}body.?%PAGE?%[data-v-eb9329fc]{background-color:#efeeee}',""]),e.exports=t},"64fec":function(e,t,n){"use strict";var a=n("7065"),i=n.n(a);i.a},7065:function(e,t,n){var a=n("59a1");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("4854408a",a,!0,{sourceMap:!1,shadowMode:!1})},"7a8f":function(e,t,n){"use strict";(function(e){var a=n("4ea4");n("a434"),n("b64b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("b85c"));n("96cf");var r=a(n("1da1")),o=a(n("5530")),c=n("2f62"),s={name:"feedback",computed:(0,o.default)({},(0,c.mapGetters)(["GET_USER_INFO"])),data:function(){return{imageList:[],maxLength:5,feedBackImages:[],content:"",textareaStyle:{},aa:[]}},methods:{addFocus:function(){0===Object.keys(this.textareaStyle).length&&(this.textareaStyle={boxShadow:"inset 4rpx 10rpx 10rpx #babecc, inset -10rpx -10rpx 20rpx #FFFFFF"})},deteleFocus:function(){0!=Object.keys(this.textareaStyle).length&&(this.textareaStyle={})},deteleImage:function(e){this.imageList.splice(e,1)},addImage:function(){var e=this,t=this.maxLength-this.imageList.length;uni.chooseImage({count:t,success:function(n){for(var a=n.tempFilePaths,i=n.tempFiles,r=0;r<a.length;r++){if(!(r<t))break;var o={url:a[r],name:i[r].name};e.imageList.push(o)}}})},submit:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var n,a,r,o,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.GET_USER_INFO._id){t.next=5;break}return t.next=3,e.isULogin();case 3:if(e.GET_USER_INFO._id){t.next=5;break}return t.abrupt("return");case 5:if(e.content){t.next=8;break}return uni.showToast({title:"请输入反馈内容!",icon:"none"}),t.abrupt("return");case 8:uni.showLoading(),n=[],a=(0,i.default)(e.imageList),t.prev=11,a.s();case 13:if((r=a.n()).done){t.next=21;break}return o=r.value,t.next=17,e.uploadFiles(o);case 17:c=t.sent,n.push(c);case 19:t.next=13;break;case 21:t.next=26;break;case 23:t.prev=23,t.t0=t["catch"](11),a.e(t.t0);case 26:return t.prev=26,a.f(),t.finish(26);case 29:e.updateFeedBack({content:e.content,feedbackImages:n}),uni.hideLoading();case 31:case"end":return t.stop()}}),t,null,[[11,23,26,29]])})))()},uploadFiles:function(t){return(0,r.default)(regeneratorRuntime.mark((function n(){var a,i,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.url,i=t.name,n.next=3,e.uploadFile({filePath:a,cloudPath:"/feedback/img/".concat(i)}).catch((function(e){uni.hideLoading()}));case 3:return r=n.sent,n.abrupt("return",r.fileID);case 5:case"end":return n.stop()}}),n)})))()},updateFeedBack:function(e){var t=e.content,n=e.feedbackImages;this.$api.updateFeedback({userId:this.GET_USER_INFO._id,content:t,feedbackImages:n}).then((function(e){200===e.code?(uni.showToast({title:"反馈提交成功!",icon:"none"}),setTimeout((function(){uni.switchTab({url:"/pages/tabBar/user/user"})}),1500)):uni.showToast({title:e.msg,icon:"none"})})).catch((function(e){uni.hideLoading(),uni.showToast({title:"反馈提交失败!",icon:"none"})}))},back:function(){uni.switchTab({url:"/pages/tabBar/user/user"})},isULogin:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.isULogin({$store:t.$store,currentUrl:t.$mp.page.route});case 2:case"end":return e.stop()}}),e)})))()}}};t.default=s}).call(this,n("a9ff")["default"])},b85c:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=i(n("06c5"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=(0,a.default)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){s=!0,o=e},f:function(){try{c||null==n["return"]||n["return"]()}finally{if(s)throw o}}}}},c6b1:function(e,t,n){"use strict";var a=n("ce40"),i=n.n(a);i.a},cd33:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={pulldown:"",refreshempty:"",back:"",forward:"",more:"","more-filled":"",scan:"",qq:"",weibo:"",weixin:"",pengyouquan:"",loop:"",refresh:"","refresh-filled":"",arrowthindown:"",arrowthinleft:"",arrowthinright:"",arrowthinup:"","undo-filled":"",undo:"",redo:"","redo-filled":"",bars:"",chatboxes:"",camera:"","chatboxes-filled":"","camera-filled":"","cart-filled":"",cart:"","checkbox-filled":"",checkbox:"",arrowleft:"",arrowdown:"",arrowright:"","smallcircle-filled":"",arrowup:"",circle:"","eye-filled":"","eye-slash-filled":"","eye-slash":"",eye:"","flag-filled":"",flag:"","gear-filled":"",reload:"",gear:"","hand-thumbsdown-filled":"","hand-thumbsdown":"","hand-thumbsup-filled":"","heart-filled":"","hand-thumbsup":"",heart:"",home:"",info:"","home-filled":"","info-filled":"","circle-filled":"","chat-filled":"",chat:"","mail-open-filled":"","email-filled":"","mail-open":"",email:"",checkmarkempty:"",list:"","locked-filled":"",locked:"","map-filled":"","map-pin":"","map-pin-ellipse":"",map:"","minus-filled":"","mic-filled":"",minus:"",micoff:"",mic:"",clear:"",smallcircle:"",close:"",closeempty:"",paperclip:"",paperplane:"","paperplane-filled":"","person-filled":"","contact-filled":"",person:"",contact:"","images-filled":"",phone:"",images:"",image:"","image-filled":"","location-filled":"",location:"","plus-filled":"",plus:"",plusempty:"","help-filled":"",help:"","navigate-filled":"",navigate:"","mic-slash-filled":"",search:"",settings:"",sound:"","sound-filled":"","spinner-cycle":"","download-filled":"","personadd-filled":"","videocam-filled":"",personadd:"",upload:"","upload-filled":"",starhalf:"","star-filled":"",star:"",trash:"","phone-filled":"",compose:"",videocam:"","trash-filled":"",download:"","chatbubble-filled":"",chatbubble:"","cloud-download":"","cloud-upload-filled":"","cloud-upload":"","cloud-download-filled":"",headphones:"",shop:""};t.default=a},ce40:function(e,t,n){var a=n("e991");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("d5a0f7ba",a,!0,{sourceMap:!1,shadowMode:!1})},e991:function(e,t,n){var a=n("24fb"),i=n("1de5"),r=n("1816");t=a(!1);var o=i(r);t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */@font-face{font-family:uniicons;src:url('+o+') format("truetype")}.uni-icons[data-v-467c48fe]{font-family:uniicons;text-decoration:none;text-align:center}',""]),e.exports=t},faa6:function(e,t,n){"use strict";n.r(t);var a=n("090a"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a}}]);