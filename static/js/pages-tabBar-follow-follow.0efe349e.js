(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabBar-follow-follow"],{"0a6a":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"news-list-scroll",props:{refresherEnabble:{type:Boolean,default:!1}},data:function(){return{trigger:!1,_refresher:!1}},methods:{loadMore:function(){var t=this.currentCom;this.$emit("loadMore",{index:t})},refresher:function(){this._refresher||(this.trigger=!0,this._refresher=!0,this.$emit("refresher"))},refresherabort:function(){this.trigger=!1,this._refresher=!1},toastSuccess:function(){this.$refs.mpopup.open({type:"success",content:"刷新成功！",timeout:1e3})},toastOther:function(){this.$refs.mpopup.open({type:"err",content:"遇到一些问题",timeout:1e3})}}};e.default=i},"0c1e":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list-item-author[data-v-98bafb78]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?20?% 0;margin:0 %?20?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box;border-bottom:%?2?% #f5f5f5 solid}.list-item-author .list-item-author-image[data-v-98bafb78]{-webkit-flex-shrink:0;flex-shrink:0;width:%?90?%;height:%?90?%;border-radius:%?8?%;overflow:hidden}.list-item-author .list-item-author-image uni-image[data-v-98bafb78]{width:100%;height:100%}.list-item-author .list-item-author__content[data-v-98bafb78]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding-left:%?20?%;width:100%}.list-item-author .list-item-author__content .list-item-author__content__title[data-v-98bafb78]{padding-right:%?60?%;font-size:%?28?%;color:#666;font-weight:700;line-height:1.2}.list-item-author .list-item-author__content .list-item-author__content__des[data-v-98bafb78]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?24?%}.list-item-author .list-item-author__content .list-item-author__content__des .list-item-author__content__desc-label[data-v-98bafb78]{color:#888}.list-item-author .list-item-author__content .list-item-author__content__des .list-item-author__content__des-info[data-v-98bafb78]{color:#999;line-height:1.5}.list-item-author .list-item-author__content .list-item-author__content__des .list-item-author__content__des-info uni-text[data-v-98bafb78]:first-child{margin-right:%?20?%}.list-item-author[data-v-98bafb78]:last-child{border-radius:%?20?%}',""]),t.exports=e},"145a":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={xuanPopup:n("859f").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-scroll-view",{staticClass:"news-list__scroll",style:{height:"100%"},attrs:{"scroll-y":!0,"refresher-enabled":t.refresherEnabble,"refresher-triggered":t.trigger},on:{refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresher.apply(void 0,arguments)}}},[t._t("default"),n("xuan-popup",{ref:"mpopup",attrs:{isdistance:!0}})],2)},a=[]},"1fef":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var o=i(n("1da1")),a=i(n("2909")),r=i(n("5530")),s=n("2f62"),l={name:"news-follow",computed:(0,r.default)({},(0,s.mapGetters)(["GET_LOGIN","GET_AUTH","GET_OPENID","GET_USER_INFO"])),data:function(){return{choose:0,acticleLiks:[],authorLiks:[],load:{},loadMoreTag:!1,loadMoreAuthorTag:!1,contentInfo:null,height:"100px"}},methods:{navChoose:function(t){if(this.choose!==t){if(1===this.choose)return this.choose=0;this.choose=1,0===this.authorLiks.length&&this.updataAuthor()}},deleteAuthorLike:function(t){var e=this;this.$api.updateAuthorLikes({authorId:t,userId:this.GET_USER_INFO._id}).then((function(t){200===t.code&&(e.loadInit(),e.updataAuthor({delete:!0}),uni.showToast({title:"取消关注成功",icon:"none"}))}))},deleteActicleLike:function(t){var e=this;uni.showModal({title:"提示",content:"取消收藏",cancelText:"返回",confirmText:"确认",success:function(n){n.confirm&&e.$api.updateArticleLikes({articleId:t,userId:e.GET_USER_INFO._id}).then((function(t){200===t.code&&(e.loadInit(),e.updateActicle({delete:!0}),uni.showToast({title:"取消收藏成功",icon:"none"}))}))}})},updataAuthor:function(t){var e=this;this.load[this.choose]||this.loadInit(),this.GET_USER_INFO._id&&this.$api.getAuthorLikes({userId:this.GET_USER_INFO._id,page:this.load[this.choose].page,pageSize:this.load[this.choose].pageSize}).then((function(n){var i=n.data;if(0===i.length){var o=e.load[e.choose];return o.loading="noMore",t&&t.delete&&(e.authorLiks=[]),void(e.load=Object.assign({},e.load,o))}e.loadMoreAuthorTag=!1,e.authorLiks=i}))},updateActicle:function(t){var e=this;this.load[this.choose]||this.loadInit(),this.GET_USER_INFO._id&&this.$api.getArticleLikes({userId:this.GET_USER_INFO._id,page:this.load[this.choose].page,pageSize:this.load[this.choose].pageSize}).then((function(n){var i,o=n.data;if(0===o.length){var r=e.load[e.choose];return r.loading="noMore",t&&t.delete&&(e.acticleLiks=[]),e.load=Object.assign({},e.load,r),void e.$forceUpdate()}if(t&&"loadMore"===t.flag)return(i=e.acticleLiks).push.apply(i,(0,a.default)(o)),void(e.loadMoreTag=!1);e.loadMoreTag=!1,e.acticleLiks=o}))},loadMore:function(){this.loadMoreTag||(this.loadMoreTag=!0,"noMore"!==this.load[this.choose].loading&&(this.load[this.choose].page++,this.updateActicle({flag:"loadMore"})))},loadInit:function(){this.choose?this.$set(this.load,this.choose,{page:1,loading:"loading",pageSize:6}):this.$set(this.load,this.choose,{page:1,loading:"loading",pageSize:7})},calcHeight:function(){},eventListener:function(){var t=this;uni.$on("updateActicle",(function(){t.load[t.choose].page=1,t.updateActicle()})),uni.$on("updataAuthorLikes",(function(){t.updataAuthor()})),uni.$on("deleteActicleLike",(function(e){t.deleteActicleLike(e)}))},isULogin:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.isULogin({$store:t.$store,currentUrl:t.$mp.page.route});case 2:case"end":return e.stop()}}),e)})))()}},onLoad:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.calcHeight(),t.loadInit(),t.eventListener(),t.updateActicle();case 4:case"end":return e.stop()}}),e)})))()},onShow:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.GET_LOGIN){e.next=5;break}return e.next=3,t.isULogin();case 3:e.next=7;break;case 5:1===t.choose&&0===t.authorLiks.length&&t.updataAuthor(),0===t.choose&&0===t.authorLiks.length&&t.updateActicle();case 7:case"end":return e.stop()}}),e)})))()}};e.default=l},"250b":function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("7f9d")),a={mixins:[o.default],props:{show:{type:String,default:"none"},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},threshold:{type:Number,default:20},leftOptions:{type:Array,default:function(){return[]}},rightOptions:{type:Array,default:function(){return[]}}},inject:["swipeaction"]};e.default=a},2817:function(t,e,n){"use strict";var i=n("a3e0"),o=n.n(i);o.a},"438e":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-48b836a1]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;background-color:#efeeee}uni-page-body [v-cloak][data-v-48b836a1]{display:none}.news-follow[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box}.news-follow .follow__header[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:space-around;justify-content:space-around;margin:%?20?%;margin-bottom:%?40?%;box-sizing:border-box}.news-follow .follow__header .follow__header__item[data-v-48b836a1]{padding:%?20?% 0;font-size:%?32?%;font-weight:500;color:#838383;border-bottom:%?8?% solid transparent}.news-follow .follow__header .follow__header__item.active[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:4px 20px;border:1px solid #f3f3f3;border-radius:20px;color:#f1aaa1;font-weight:700;line-height:1;box-shadow:inset 2px 2px 4px #babecc,inset -2px -2px 4px #e4e4e4}.news-follow .follow__content[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.news-follow .follow__content > .follow__content__article[data-v-48b836a1]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.news-follow .follow__content > .follow__content__article .news-list__scroll[data-v-48b836a1]{height:100%}.news-follow .follow__content > .follow__content__author[data-v-48b836a1]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.news-follow .follow__content > .follow__content__author .aass[data-v-48b836a1]{margin:%?60?% %?20?%;box-sizing:border-box;background-color:#f0f0f0;border-radius:%?16?%;box-shadow:%?10?% %?14?% %?20?% rgba(0,0,0,.2),%?-16?% %?-10?% %?16?% #fff}.news-follow .follow__content > .follow__content__author .aass.el-hover[data-v-48b836a1]{box-shadow:0 0 0 rgba(0,0,0,.2),0 0 0 hsla(0,0%,100%,.2),inset 10px 10px 10px rgba(0,0,0,.1),inset -10px -10px 10px #fff!important}.news-follow .follow__content > .follow__content__author .news-list__scroll[data-v-48b836a1]{height:100%}.btn-delete-wrapper[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?100?%;height:100%}.btn-delete-wrapper .btn-delete[data-v-48b836a1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box;background-color:#f1aaa1;color:#fff;font-size:%?32?%;font-weight:500;line-height:1;letter-spacing:%?3?%}body.?%PAGE?%[data-v-48b836a1]{background-color:#efeeee}',""]),t.exports=e},"4dfc":function(t,e,n){"use strict";function i(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length-1;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}n("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.isPC=i},"4fa2":function(t,e,n){"use strict";var i=n("fbc0"),o=n.n(i);o.a},"5a20":function(t,e,n){var i=n("438e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("41f4bcf0",i,!0,{sourceMap:!1,shadowMode:!1})},"5e7e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}},provide:function(){return{swipeaction:this}},created:function(){this.children=[]},methods:{closeOther:function(t){this.openItem&&this.openItem!==t&&(this.openItem.button.show="none"),this.openItem=t}}};e.default=i},"63ca":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-swipe"},[n("v-uni-view",{wxsProps:{"change:prop":"btn"},staticClass:"uni-swipe_box",attrs:{"data-threshold":t.threshold,"data-disabled":t.disabled,"change:prop":t.swipe.sizeReady,prop:t.btn},on:{touchstart:function(e){e=t.$handleWxsEvent(e),t.swipe.touchstart(e,t.$getComponentDescriptor())},touchmove:function(e){e=t.$handleWxsEvent(e),t.swipe.touchmove(e,t.$getComponentDescriptor())},touchend:function(e){e=t.$handleWxsEvent(e),t.swipe.touchend(e,t.$getComponentDescriptor())},mousedown:function(e){e=t.$handleWxsEvent(e),t.swipe.mousedown(e,t.$getComponentDescriptor())},mousemove:function(e){e=t.$handleWxsEvent(e),t.swipe.mousemove(e,t.$getComponentDescriptor())},mouseup:function(e){e=t.$handleWxsEvent(e),t.swipe.mouseup(e,t.$getComponentDescriptor())},mouseleave:function(e){e=t.$handleWxsEvent(e),t.swipe.mouseleave(e,t.$getComponentDescriptor())}}},[n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--left"},[t._t("left",t._l(t.leftOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"left")},click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.onClickForPC(i,e,"left")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2),n("v-uni-view",{staticClass:"uni-swipe_text--center"},[t._t("default")],2),n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--right"},[t._t("right",t._l(t.rightOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"right")},click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.onClickForPC(i,e,"right")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2)],1)],1)},a=[]},"6a0e":function(t,e,n){"use strict";n.r(e);var i=n("1fef"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"6b9c":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uniLoadMore:n("9304").default,listScroll:n("2b53").default,listScrollSlot:n("d18b").default,uniSwipeAction:n("9fd1").default,uniSwipeActionItem:n("ae1d").default,listItemAuthor:n("70f5").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"news-follow"},[n("v-uni-view",{staticClass:"follow__header"},[n("v-uni-view",{staticClass:"follow__header__item",class:{active:0===t.choose},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navChoose(0)}}},[t._v("文章")]),n("v-uni-view",{staticClass:"follow__header__item",class:{active:1===t.choose},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navChoose(1)}}},[t._v("作者")])],1),n("v-uni-view",{staticClass:"follow__content"},[n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:0===t.choose,expression:"choose === 0"}],staticClass:"follow__content__article",style:{height:t.height}},[0===t.acticleLiks.length?n("uni-load-more",{attrs:{iconType:"snow",status:t.load[t.choose].loading}}):t._e(),n("list-scroll",{attrs:{list:t.acticleLiks,topLoadMore:!1,load:t.load,isSelf:!0,pageSize:t.load[t.choose].pageSize,current:t.choose},on:{loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}})],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.choose,expression:"choose === 1"}],staticClass:"follow__content__author",style:{height:t.height}},[0===t.authorLiks.length?n("uni-load-more",{attrs:{iconType:"snow",status:t.load[t.choose].loading}}):t._e(),n("list-scroll-slot",{attrs:{load:t.load,pageSize:t.load[t.choose].pageSize,current:t.choose}},[n("uni-swipe-action",{attrs:{threshold:"60"}},t._l(t.authorLiks,(function(e,i){return n("uni-swipe-action-item",{key:e.id,staticClass:"aass",attrs:{"data-aa":"a","hover-class":"el-hover","hover-stay-time":"100","hover-start-time":"0",show:"right"},scopedSlots:t._u([{key:"right",fn:function(){return[n("v-uni-view",{staticClass:"btn-delete-wrapper",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.deleteAuthorLike(e.id)}}},[n("v-uni-text",{staticClass:"btn-delete"},[t._v("取关")])],1)]},proxy:!0}],null,!0)},[n("list-item-author",{attrs:{author:e},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navToAuthor.apply(void 0,arguments)}}})],1)})),1)],1)],1)],1)],1)},a=[]},"70f5":function(t,e,n){"use strict";n.r(e);var i=n("7c16"),o=n("7520");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("2817");var r,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"98bafb78",null,!1,i["a"],r);e["default"]=l.exports},7520:function(t,e,n){"use strict";n.r(e);var i=n("d12d"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},7669:function(t,e,n){"use strict";n.r(e);var i=n("0a6a"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"79f4":function(t,e,n){"use strict";var i=n("5a20"),o=n.n(i);o.a},"7c16":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"list-item-author",on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.emitLongpress.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"list-item-author-image"},[n("v-uni-image",{attrs:{src:"https://images.weserv.nl/?url="+t.author.avatar,mode:"aspectFill"}})],1),n("v-uni-view",{staticClass:"list-item-author__content"},[n("v-uni-view",{staticClass:"list-item-author__content__title"},[t._v(t._s(t.author.author_name))]),n("v-uni-view",{staticClass:"list-item-author__content__des"},[n("v-uni-view",{staticClass:"list-item-author__content__desc-label"},[t._v(t._s(t.author.professional))]),n("v-uni-view",{staticClass:"list-item-author__content__des-info"},[n("v-uni-text",[t._v("发帖 "+t._s(t.author.article_ids.length))]),n("v-uni-text",[t._v("粉丝 "+t._s(t.author.fans_count))])],1)],1)],1)],1)},a=[]},"7f9d":function(t,e,n){"use strict";n("4160"),n("a434"),n("ac1f"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("4dfc"),o={data:function(){return{position:[],button:{},btn:"[]"}},watch:{button:{handler:function(t){this.btn=JSON.stringify(t)},deep:!0},show:function(t){this.autoClose||(this.button?this.button.show=t:this.init())},leftOptions:function(){this.init()},rightOptions:function(){this.init()}},created:function(){void 0!==this.swipeaction.children&&this.swipeaction.children.push(this)},mounted:function(){this.init()},beforeDestroy:function(){var t=this;this.swipeaction.children.forEach((function(e,n){e===t&&t.swipeaction.children.splice(n,1)}))},methods:{init:function(){var t=this;clearTimeout(this.swipetimer),this.swipetimer=setTimeout((function(){t.getButtonSize()}),50)},closeSwipe:function(t){this.autoClose&&this.swipeaction.closeOther(this)},change:function(t){this.$emit("change",t.open);var e=this.button.show;e!==t.open&&(this.button.show=t.open)},appTouchStart:function(t){if(!(0,i.isPC)()){var e=t.changedTouches[0].clientX;this.clientX=e,this.timestamp=(new Date).getTime()}},appTouchEnd:function(t,e,n,o){if(!(0,i.isPC)()){var a=t.changedTouches[0].clientX,r=Math.abs(this.clientX-a),s=(new Date).getTime()-this.timestamp;r<40&&s<300&&this.$emit("click",{content:n,index:e,position:o})}},onClickForPC:function(t,e,n){(0,i.isPC)()&&this.$emit("click",{content:e,index:t,position:n})},getButtonSize:function(){var t=this,e=uni.createSelectorQuery().in(this);e.selectAll(".uni-swipe_button-group").boundingClientRect((function(e){var n="none";n=t.autoClose?"none":t.show,t.button={data:e,show:n}})).exec()}}};e.default=o},"93dc":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default")],2)},a=[]},9996:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-swipe[data-v-5faec9b1]{position:relative;overflow:hidden}.uni-swipe_box[data-v-5faec9b1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-shrink:0;flex-shrink:0;position:relative}.uni-swipe_text--center[data-v-5faec9b1]{width:100%;cursor:grab}.uni-swipe_button-group[data-v-5faec9b1]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:absolute;top:0;bottom:0;cursor:pointer}.button-group--left[data-v-5faec9b1]{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.button-group--right[data-v-5faec9b1]{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uni-swipe_button[data-v-5faec9b1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 20px}.uni-swipe_button-text[data-v-5faec9b1]{-webkit-flex-shrink:0;flex-shrink:0;font-size:14px}.ani[data-v-5faec9b1]{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-timing-function:cubic-bezier(.165,.84,.44,1)}',""]),t.exports=e},"9e8b":function(t,e,n){"use strict";n.r(e);var i=n("5e7e"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"9fd1":function(t,e,n){"use strict";n.r(e);var i=n("93dc"),o=n("9e8b");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var r,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"0ae322e8",null,!1,i["a"],r);e["default"]=l.exports},a3e0:function(t,e,n){var i=n("0c1e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("f1d81244",i,!0,{sourceMap:!1,shadowMode:!1})},ae1d:function(t,e,n){"use strict";n.r(e);var i=n("63ca"),o=n("e543");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("4fa2");var r,s=n("f0c5"),l=n("f81c"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"5faec9b1",null,!1,i["a"],r);"function"===typeof l["a"]&&Object(l["a"])(c),e["default"]=c.exports},d12d:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"list-item-author",props:{author:Object},methods:{emitLongpress:function(){this.$emit("longpress",this.author.id)}}};e.default=i},d18b:function(t,e,n){"use strict";n.r(e);var i=n("145a"),o=n("7669");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var r,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"1bc120c5",null,!1,i["a"],r);e["default"]=l.exports},da79:function(t,e,n){"use strict";n.r(e);var i=n("6b9c"),o=n("6a0e");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("79f4");var r,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"48b836a1",null,!1,i["a"],r);e["default"]=l.exports},e543:function(t,e,n){"use strict";n.r(e);var i=n("250b"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},f81c:function(t,e,n){"use strict";var i=function(t){(t.options.wxs||(t.options.wxs={}))["swipe"]=function(t){var e=10,n=!1;function i(t,e,n,i){var o=i.getState(),a=JSON.parse(t);a&&a.data&&0!==a.data.length&&(o.leftWidth=a.data[0].width,o.rightWidth=a.data[1].width,o.threshold=i.getDataset().threshold,a.show&&"none"!==a.show?u(a.show,i,n):(o.left&&u("none",i,n),f(i)))}function o(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(n.requestAnimationFrame((function(){n.removeClass("ani"),e.callMethod("closeSwipe")})),o.x=o.left||0,h(t,e))}function a(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(p(t),"horizontal"===o.direction&&(t.preventDefault&&t.preventDefault(),s(o.x+o.deltaX,n,e)))}function r(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||c(o.left,n,e)}function s(t,e,n){t=t||0;var i=e.getState(),o=i.leftWidth,a=i.rightWidth;i.left=l(t,-a,o),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+i.left+"px)","-webkit-transform":"translateX("+i.left+"px)"})}))}function l(t,e,n){return Math.min(Math.max(t,e),n)}function c(t,e,n){var i=e.getState(),o=i.threshold,a=(i.position,i.isopen||"none"),r=i.leftWidth,s=i.rightWidth;0!==i.deltaX?u("none"===a&&s>0&&-t>o||"none"!==a&&s>0&&s+t<o?"right":"none"===a&&r>0&&t>o||"none"!==a&&r>0&&r-t<o?"left":"none",e,n):u("none",e,n)}function u(t,e,n){var i=e.getState(),o=(i.position,i.leftWidth),a=i.rightWidth,r="";switch(i.isopen=i.isopen?i.isopen:"none",t){case"left":r=o;break;case"right":r=-a;break;default:r=0}i.isopen!==t&&(i.throttle=!0,n.callMethod("change",{open:t})),i.isopen=t,e.requestAnimationFrame((function(){e.addClass("ani"),s(r,e,n)}))}function d(t,n){return t>n&&t>e?"horizontal":n>t&&n>e?"vertical":""}function f(t){var e=t.getState();e.direction="",e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0}function h(t){var e=t.instance,i=e.getState();f(e);var o=t.touches[0];n&&b()&&(o=t),i.startX=o.clientX,i.startY=o.clientY}function p(t){var e=t.instance,i=e.getState(),o=t.touches[0];n&&b()&&(o=t),i.deltaX=o.clientX-i.startX,i.deltaY=o.clientY-i.startY,i.offsetY=Math.abs(i.deltaY),i.offsetX=Math.abs(i.deltaX),i.direction=i.direction||d(i.offsetX,i.offsetY)}function b(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length-1;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}"object"===typeof window&&(n=!0);var w=!1;function v(t,e){n&&b()&&(o(t,e),w=!0)}function _(t,e){n&&b()&&w&&a(t,e)}function g(t,e){n&&b()&&(r(t,e),w=!1)}function x(t,e){n&&b()&&(w=!1)}return t.exports={sizeReady:i,touchstart:o,touchmove:a,touchend:r,mousedown:v,mousemove:_,mouseup:g,mouseleave:x},t.exports}({exports:{}})};e["a"]=i},fbc0:function(t,e,n){var i=n("9996");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("14883dde",i,!0,{sourceMap:!1,shadowMode:!1})}}]);