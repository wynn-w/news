(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabBar-home-home"],{"101f":function(t,e,n){var i=n("b59e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("6784675c",i,!0,{sourceMap:!1,shadowMode:!1})},1489:function(t,e,n){"use strict";n.r(e);var i=n("35b2"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},"35b2":function(t,e,n){"use strict";n("a9e3"),n("ac1f"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"tab",props:{list:Array,tabIndex:{type:[Number,String],default:0}},watch:{tabIndex:function(t){this.activeIndex=t,this.scroll(this.activeIndex)}},data:function(){return{activeIndex:0,scrollLeft:0,screenWidth:0,widthList:[],scrollList:[]}},methods:{clickItem:function(t,e){this.activeIndex=e,this.$emit("update:selected",{data:t,index:e})},scroll:function(t){0===this.widthList.length&&this.calculateItemWidth();var e=this.widthList,n=this.scrollList[t],i=e[t];n-=this.screenWidth,n-=i/2,this.scrollLeft=n},calculateWindowWidth:function(){var t=uni.getSystemInfoSync();this.screenWidth=t.screenWidth/2},calculateItemWidth:function(){for(var t=this,e=[],n=[],i=0,r=this.list.length,a=function(r){var a=uni.createSelectorQuery().in(t).select("#item-".concat(r));a.fields({size:!0},(function(t){var a=t.width;i+=a,0===r?e.push(0):e.push(i),n.push(t.width)})).exec()},s=0;s<r;s++)a(s);this.widthList=Object.assign([],this.widthList,n),this.scrollList=Object.assign([],this.scrollList,e)}},mounted:function(){this.activeIndex=this.tabIndex,this.calculateWindowWidth()}};e.default=i},"3ed4":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"news-list",props:{tabList:Array,current:{type:Number,default:0},list:Array,load:Object,pageSize:Number,refresherEnabble:{type:Boolean,default:!1}},watch:{current:function(t){this.currentCopy=t}},data:function(){return{currentCopy:0}},methods:{change:function(t){var e=t.detail.current,n=this.tabList[e].name;this.currentCopy=e,this.$emit("update:current",{name:n,current:e})},loadMore:function(t){var e=this.currentCopy;"onMore"!==this.load[e].loading&&this.$store.dispatch("asyncArticle",{name:this.tabList[e].name,index:e,page:++this.load[e].page,pageSize:this.pageSize})},refresher:function(){var t=this.currentCopy,e=this.$refs.listScroll[t];this.$store.dispatch("asyncArticle",{name:this.tabList[t].name,index:t,page:this.load[t].page++,pageSize:this.pageSize,isRefresh:!0}).then((function(t){200===t.code?(e.toastSuccess(),e.refresherabort()):e.toastOther()}))},isLoadInit:function(){var t=this.currentCopy;if(!this.load[t]||0===this.load[t].length){var e={page:1,loading:"loading"};this.$store.commit("setLoad",{index:t,load:e})}}}};e.default=i},"497c":function(t,e,n){"use strict";var i=n("4de1"),r=n.n(i);r.a},"4de1":function(t,e,n){var i=n("6aac");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("7de941e0",i,!0,{sourceMap:!1,shadowMode:!1})},"67e3":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("5530")),a=n("2f62"),s={name:"news-tabBar-home",computed:(0,r.default)((0,r.default)({},(0,a.mapGetters)(["GET_LABEL","GET_ARTICLE","GET_INDEX","GET_LOAD"])),{},{index:{get:function(){return this.GET_INDEX},set:function(t){this.$store.commit("setIndex",t)}}}),data:function(){return{scrollHeight:0,pageSize:10,isReffresher:!1}},methods:{init:function(){var t="全部";this.isLoadInit(),this.$store.dispatch("asyncLabel"),this.dispatch_asyncArticle({name:t,page:1,pageSize:this.pageSize,index:0})},listCurrent:function(t){var e=t.name,n=t.current;this.index=n,this.isLoadInit(),this.dispatch_asyncArticle({name:e,index:n,page:this.GET_LOAD[n].page++,pageSize:this.pageSize})},tabCurrent:function(t){var e=t.data.name,n=t.index;this.index=n,this.isLoadInit(),this.dispatch_asyncArticle(e,n)},dispatch_asyncArticle:function(t){var e=t.index,n=void 0===e?0:e,i=this.GET_ARTICLE[n];i&&0!=i.length||this.$store.dispatch("asyncArticle",t)},isLoadInit:function(){var t=this.GET_INDEX;if(!this.GET_LOAD[t]||0===this.GET_LOAD[t].length){var e={page:1,loading:"loading"};this.$store.commit("setLoad",{index:t,load:e})}}},onLoad:function(){this.init()},onShow:function(){}};e.default=s},"68ad":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.news-list[data-v-9054cc28]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;box-sizing:border-box;height:100%;positon:fixed}.news-list > .news-list__swiper[data-v-9054cc28]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;positon:fixed}.news-list > .news-list__swiper > .news-list__swiper-wrapper[data-v-9054cc28]{height:100%;overflow:hidden;box-sizing:border-box;positon:fixed}',""]),t.exports=e},"6aac":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.news-tab[data-v-205dc084]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;background-color:#efeeee;box-sizing:border-box\r\n  /**\r\n\t * 隐藏滚动条\r\n\t */}.news-tab > .news-tab__srcoll[data-v-205dc084]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;box-sizing:border-box;width:100%;overflow:auto}.news-tab > .news-tab__srcoll .news-tab__srcoll-box[data-v-205dc084]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box;height:%?90?%}.news-tab > .news-tab__srcoll .news-tab__srcoll-box .news-tab__srcoll__item[data-v-205dc084]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;padding:0 %?28?%;font-size:%?28?%;color:#8f8f94;-webkit-flex-shrink:0;flex-shrink:0;box-sizing:border-box}.news-tab > .news-tab__srcoll .news-tab__srcoll-box .news-tab__srcoll__item.active[data-v-205dc084]{color:#f1aaa1;-webkit-transition:all .5s ease;transition:all .5s ease}.news-tab .news-tab__icon[data-v-205dc084]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?16?%}.news-tab .news-tab__icon[data-v-205dc084]::after{position:absolute;top:%?24?%;left:0;bottom:%?24?%;left:0;content:"";width:%?2?%;background-color:#c4c4ca}.news-tab .news-tab__srcoll[data-v-205dc084] ::-webkit-scrollbar{display:none}.news-tab .news-tab__srcoll[data-v-205dc084]{-ms-overflow-style:none}',""]),t.exports=e},"6bcc":function(t,e,n){"use strict";n.r(e);var i=n("8e9a"),r=n("6e54");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("8936");var s,o=n("f0c5"),c=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"77b3bf60",null,!1,i["a"],s);e["default"]=c.exports},"6e54":function(t,e,n){"use strict";n.r(e);var i=n("67e3"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},8936:function(t,e,n){"use strict";var i=n("101f"),r=n.n(i);r.a},"8e9a":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={navBar:n("9123").default,tab:n("c866").default,list:n("dd7f").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"news-page-home"},[n("v-uni-view",{staticClass:"news-page-home__head"},[n("navBar"),n("tab",{attrs:{list:t.GET_LABEL,tabIndex:t.index},on:{"update:selected":function(e){arguments[0]=e=t.$handleEvent(e),t.tabCurrent.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"news-page-home__list"},[n("list",{attrs:{scrollHeight:t.scrollHeight,tabList:t.GET_LABEL,list:t.GET_ARTICLE,current:t.index,load:t.GET_LOAD,pageSize:t.pageSize},on:{"update:current":function(e){arguments[0]=e=t.$handleEvent(e),t.listCurrent.apply(void 0,arguments)},loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}})],1)],1)},a=[]},b458:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"news-tab"},[n("v-uni-scroll-view",{staticClass:"news-tab__srcoll",attrs:{"scroll-x":!0,"scroll-left":t.scrollLeft,"scroll-with-animation":"true"}},[n("v-uni-view",{staticClass:"news-tab__srcoll-box"},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"news-tab__srcoll__item",class:{active:t.activeIndex===i},attrs:{id:"item-"+i},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clickItem(e,i)}}},[t._v(t._s(e.name))])})),1)],1)],1)},a=[]},b48f:function(t,e,n){"use strict";n.r(e);var i=n("3ed4"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},b59e:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-77b3bf60]{height:100%;width:100%;background-color:#efeeee}.news-page-home[data-v-77b3bf60]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;height:100%;overflow:hidden}.news-page-home > .news-page-home__list[data-v-77b3bf60]{-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box}body.?%PAGE?%[data-v-77b3bf60]{background-color:#efeeee}',""]),t.exports=e},c866:function(t,e,n){"use strict";n.r(e);var i=n("b458"),r=n("1489");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("497c");var s,o=n("f0c5"),c=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"205dc084",null,!1,i["a"],s);e["default"]=c.exports},c8ec:function(t,e,n){var i=n("68ad");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("6987b977",i,!0,{sourceMap:!1,shadowMode:!1})},d72a:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={listScroll:n("2b53").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"news-list"},[n("v-uni-swiper",{staticClass:"news-list__swiper",attrs:{current:t.currentCopy},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},t._l(t.tabList,(function(e,i){return n("v-uni-swiper-item",{key:i,staticClass:"news-list__swiper-wrapper"},[n("list-scroll",{ref:"listScroll",refInFor:!0,attrs:{refresherEnabble:!0,list:t.list[t.currentCopy],current:t.currentCopy,load:t.load,pageSize:t.pageSize},on:{loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)},refresher:function(e){arguments[0]=e=t.$handleEvent(e),t.refresher.apply(void 0,arguments)}}})],1)})),1)],1)},a=[]},dd7f:function(t,e,n){"use strict";n.r(e);var i=n("d72a"),r=n("b48f");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("e4bb");var s,o=n("f0c5"),c=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"9054cc28",null,!1,i["a"],s);e["default"]=c.exports},e4bb:function(t,e,n){"use strict";var i=n("c8ec"),r=n.n(i);r.a}}]);