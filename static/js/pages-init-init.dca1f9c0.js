(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-init-init"],{"337a":function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{isMobile:!1}},created:function(){var e=uni.getSystemInfoSync();!e.model&&"devtools"!=e.platform&&e.windowWidth>400?this.isMobile=!1:uni.reLaunch({url:"/pages/tabBar/home/home"})}};i.default=n},"5a66":function(e,i,t){"use strict";var n=t("8106"),r=t.n(n);r.a},"6cd1":function(e,i,t){"use strict";t.r(i);var n=t("337a"),r=t.n(n);for(var o in n)"default"!==o&&function(e){t.d(i,e,(function(){return n[e]}))}(o);i["default"]=r.a},8106:function(e,i,t){var n=t("8f50");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=t("4f06").default;r("8e20e9c6",n,!0,{sourceMap:!1,shadowMode:!1})},"8f50":function(e,i,t){var n=t("24fb");i=n(!1),i.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-28125772]{width:100vw;height:100vh}.pc[data-v-28125772]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;height:100%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#f8f7f7}.pc .mobile[data-v-28125772]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;justify-items:end;margin-top:%?40?%}.pc .mobile .mobile_preview_header[data-v-28125772]{height:40px;width:387px;background:#eeeff2;text-align:center;line-height:40px;border-top-right-radius:50px;border-top-left-radius:50px}.pc .mobile .mobile_preview_header .mobile_preview_header_icon[data-v-28125772]{display:inline-block;width:65px;height:10px;background:#c8c9cc;border-radius:9px;vertical-align:middle;margin-top:18px}.pc .mobile .mobile_preview_frame[data-v-28125772]{width:375px;min-height:294px;height:667px;max-height:calc(100vh - 166px);border:6px solid #eeeff2;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex}.pc .mobile .mobile_preview_footer[data-v-28125772]{display:block;height:52px;width:387px;background:#eeeff2;text-align:center;line-height:45px;border-bottom-right-radius:50px;border-bottom-left-radius:50px}.pc .mobile .mobile_preview_footer .mobile_preview_footer_icon[data-v-28125772]{display:inline-block;width:43px;height:43px;background:#c8c9cc;border-radius:50%;vertical-align:middle}.content__wrap[data-v-28125772]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box;padding:0 %?20?%}.content__wrap uni-image[data-v-28125772]{width:%?300?%;height:%?300?%}.content__wrap uni-text[data-v-28125772]{margin-top:%?20?%;font-size:%?24?%;font-weight:700}',""]),e.exports=i},d2c9:function(e,i,t){"use strict";var n;t.d(i,"b",(function(){return r})),t.d(i,"c",(function(){return o})),t.d(i,"a",(function(){return n}));var r=function(){var e=this,i=e.$createElement,t=e._self._c||i;return e.isMobile?e._e():t("v-uni-view",{staticClass:"pc"},[t("v-uni-view",{staticClass:"mobile"},[t("v-uni-view",{staticClass:"mobile_preview_header"},[t("i",{staticClass:"mobile_preview_header_icon"})]),t("v-uni-view",{staticClass:"mobile_preview_frame"},[t("v-uni-view",{staticClass:"content__wrap"},[t("v-uni-image",{attrs:{src:"/static/url.png",mode:"scaleToFill"}}),t("v-uni-text",[e._v("请使用手机浏览器，扫描上方二维码预览。")]),t("v-uni-text",[e._v("PC浏览器，请打开控制台并切换至手机模式后再次刷新浏览。")])],1)],1),t("v-uni-view",{staticClass:"mobile_preview_footer"},[t("i",{staticClass:"mobile_preview_footer_icon"})])],1)],1)},o=[]},fa34:function(e,i,t){"use strict";t.r(i);var n=t("d2c9"),r=t("6cd1");for(var o in r)"default"!==o&&function(e){t.d(i,e,(function(){return r[e]}))}(o);t("5a66");var a,c=t("f0c5"),l=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"28125772",null,!1,n["a"],a);i["default"]=l.exports}}]);