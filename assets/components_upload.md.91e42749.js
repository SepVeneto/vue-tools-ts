var m=Object.defineProperty,g=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var C=(n,a,t)=>a in n?m(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t,E=(n,a)=>{for(var t in a||(a={}))A.call(a,t)&&C(n,t,a[t]);if(c)for(var t of c(a))b.call(a,t)&&C(n,t,a[t]);return n},u=(n,a)=>g(n,_(a));import{d as i,i as y,r as p,o as D,c as r,a as o,w as d,F as v,b as h,u as x,h as F,g as B}from"./app.b4dd5e0a.js";const T=h("\u4E0A\u4F20"),w=i({name:"basic"}),V=i(u(E({},w),{setup(n){const a=y(!1);function t(e){return console.log(e),Promise.reject("error")}return(e,s)=>{const k=p("bc-button"),f=p("bc-upload");return D(),r(v,null,[o(k,{onClick:s[0]||(s[0]=l=>a.value=!0)},{default:d(()=>[T]),_:1}),o(f,{modelValue:a.value,"onUpdate:modelValue":s[1]||(s[1]=l=>a.value=l),"upload-api":t,"callback-type":"file"},null,8,["modelValue"])],64)}}}));var j=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:V});const P=F('<h1 id="upload" tabindex="-1">Upload <a class="header-anchor" href="#upload" aria-hidden="true">#</a></h1><p>\u4E0A\u4F20\u5F39\u6846\uFF0C\u81EA\u5B9A\u4E49\u4E0A\u4F20\u65B9\u5F0F\u548C\u4E0B\u8F7D\u6A21\u677F</p><h2 id="\u57FA\u672C\u7528\u6CD5" tabindex="-1">\u57FA\u672C\u7528\u6CD5 <a class="header-anchor" href="#\u57FA\u672C\u7528\u6CD5" aria-hidden="true">#</a></h2><p>\u901A\u8FC7<code>v-model</code>\u53EF\u4EE5\u63A7\u5236\u4E0A\u4F20\u5F39\u6846\u7684\u663E\u793A\u4E0E\u5426\uFF0C\u540C\u65F6\u9700\u8981<code>template-api</code>\u548C<code>upload-api</code>\u6765\u5B9E\u73B0\u6A21\u677F\u4E0B\u8F7D\u548C\u6587\u4EF6\u4E0A\u4F20\u7684\u5177\u4F53\u5B9E\u73B0\u3002</p>',4),S=B("p",null,"upload/basic",-1),q=F('<h2 id="upload-\u5C5E\u6027" tabindex="-1">Upload \u5C5E\u6027 <a class="header-anchor" href="#upload-\u5C5E\u6027" aria-hidden="true">#</a></h2><table><thead><tr><th style="text-align:left;">\u5C5E\u6027</th><th style="text-align:left;">\u8BF4\u660E</th><th style="text-align:left;">\u7C7B\u578B</th><th style="text-align:left;">\u53EF\u9009\u503C</th><th style="text-align:left;">\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td style="text-align:left;">modelValue/v-model</td><td style="text-align:left;">\u63A7\u5236\u5F39\u6846\u5C55\u793A</td><td style="text-align:left;">boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">template-api</td><td style="text-align:left;">\u4E0B\u8F7D\u6A21\u677F\u7684\u56DE\u8C03</td><td style="text-align:left;">(): void</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">upload-api</td><td style="text-align:left;">\u89E6\u53D1\u6587\u4EF6\u4E0A\u4F20\u7684\u56DE\u8C03</td><td style="text-align:left;">(form: File</td><td style="text-align:left;">FormData</td><td style="text-align:left;">UploadRequestOptions): Promise</td></tr><tr><td style="text-align:left;">callback-type</td><td style="text-align:left;">\u6587\u4EF6\u4E0A\u4F20\u56DE\u8C03\u7684\u53C2\u6570</td><td style="text-align:left;">string</td><td style="text-align:left;">&#39;file&#39;,&#39;form&#39;,&#39;raw&#39;</td><td style="text-align:left;">&#39;form&#39;</td></tr></tbody></table>',2),$='{"title":"Upload","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u672C\u7528\u6CD5","slug":"\u57FA\u672C\u7528\u6CD5"},{"level":2,"title":"Upload \u5C5E\u6027","slug":"upload-\u5C5E\u6027"}],"relativePath":"components/upload.md"}',N={},O=Object.assign(N,{__name:"upload",setup(n){const a={"../examples/upload/basic.vue":j};return(t,e)=>{const s=p("Demo");return D(),r("div",null,[P,o(s,{demos:x(a),source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0D%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ebc-button%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%40click%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Evisible%20%3D%20true%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%E4%B8%8A%E4%BC%A0%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Ebc-button%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0D%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ebc-upload%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Ev-model%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Evisible%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aupload-api%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eupload%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Ecallback-type%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Efile%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20defineComponent%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eexport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Edefault%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3EdefineComponent%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20name%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'basic'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20visible%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20boolean%22%3Efalse%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Efunction%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eupload%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20parameter%22%3Edata%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20File%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20%3Cspan%20class%3D%22token%20comment%22%3E%2F%2F%20console.log(data.get('file'))%3C%2Fspan%3E%0D%0A%20%20console%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Elog%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Ereturn%3C%2Fspan%3E%20Promise%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Ereject%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E'error'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0D%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",path:"upload/basic",html:"%0D%0A%20%20%3Cbc-button%20%40click%3D%22visible%20%3D%20true%22%3E%E4%B8%8A%E4%BC%A0%3C%2Fbc-button%3E%0D%0A%20%20%3Cbc-upload%20v-model%3D%22visible%22%20%3Aupload-api%3D%22upload%22%20callback-type%3D%22file%22%20%2F%3E%0D%0A",js:"%0D%0Aimport%20%7B%20defineComponent%20%7D%20from%20'vue'%0D%0Aexport%20default%20defineComponent(%7B%0D%0A%20%20name%3A%20'basic'%2C%0D%0A%7D)%0D%0A",css:"","css-pre-processor":"none","js-pre-processor":"ts","raw-source":"%3Ctemplate%3E%0D%0A%20%20%3Cbc-button%20%40click%3D%22visible%20%3D%20true%22%3E%E4%B8%8A%E4%BC%A0%3C%2Fbc-button%3E%0D%0A%20%20%3Cbc-upload%20v-model%3D%22visible%22%20%3Aupload-api%3D%22upload%22%20callback-type%3D%22file%22%20%2F%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20lang%3D%22ts%22%3E%0D%0Aimport%20%7B%20defineComponent%20%7D%20from%20'vue'%0D%0Aexport%20default%20defineComponent(%7B%0D%0A%20%20name%3A%20'basic'%2C%0D%0A%7D)%0D%0A%3C%2Fscript%3E%0D%0A%0D%0A%3Cscript%20lang%3D%22ts%22%20setup%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20visible%20%3D%20ref(false)%0D%0Afunction%20upload(data%3A%20File)%20%7B%0D%0A%20%20%2F%2F%20console.log(data.get('file'))%0D%0A%20%20console.log(data)%0D%0A%20%20return%20Promise.reject('error')%0D%0A%7D%0D%0A%3C%2Fscript%3E",description:""},{default:d(()=>[S]),_:1},8,["demos"]),q])}}});export{$ as __pageData,O as default};
