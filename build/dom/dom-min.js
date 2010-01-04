YUI.add("dom-base",function(D){(function(I){var S="nodeType",F="ownerDocument",E="defaultView",K="parentWindow",N="tagName",P="parentNode",R="firstChild",M="previousSibling",Q="nextSibling",L="contains",H="compareDocumentPosition",G="",O=document.documentElement,J=/<([a-z]+)/i;I.DOM={byId:function(U,T){T=T||I.config.doc;return T.getElementById(U);},children:function(V,T){var U=[];if(V){T=T||"*";U=I.Selector.query("> "+T,V);}return U;},firstByTag:function(T,U){var V;U=U||I.config.doc;if(T&&U.getElementsByTagName){V=U.getElementsByTagName(T)[0];}return V||null;},getText:(O.textContent!==undefined)?function(U){var T="";if(U){T=U.textContent;}return T||"";}:function(U){var T="";if(U){T=U.innerText;}return T||"";},setText:(O.textContent!==undefined)?function(T,U){if(T){T.textContent=U;}}:function(T,U){if(T){T.innerText=U;}},previous:function(T,V,U){return I.DOM.elementByAxis(T,M,V,U);},next:function(T,V,U){return I.DOM.elementByAxis(T,Q,V,U);},ancestor:function(U,V,W){var T=null;if(W){T=(!V||V(U))?U:null;}return T||I.DOM.elementByAxis(U,P,V,null);},elementByAxis:function(T,W,V,U){while(T&&(T=T[W])){if((U||T[N])&&(!V||V(T))){return T;}}return null;},contains:function(U,V){var T=false;if(!V||!U||!V[S]||!U[S]){T=false;}else{if(U[L]){if(I.UA.opera||V[S]===1){T=U[L](V);}else{T=I.DOM._bruteContains(U,V);}}else{if(U[H]){if(U===V||!!(U[H](V)&16)){T=true;}}}}return T;},inDoc:function(W,Z){Z=Z||W[F];var T=[],U=false,V,X,Y;W.id=W.id||I.guid();T=I.DOM.allById(W.id,Z);for(V=0;X=T[V++];){if(X===W){U=true;break;}}return U;},allById:function(Y,T){T=T||I.config.doc;var U=[],V=[],W,X;if(T.querySelectorAll){V=T.querySelectorAll('[id="'+Y+'"]');}else{if(T.all){U=T.all(Y);if(U&&U.nodeType){U=[U];}if(U&&U.length){for(W=0;X=U[W++];){if(X.id===Y){V.push(X);}}}}}return V;},create:function(Y,a){if(typeof Y==="string"){Y=I.Lang.trim(Y);}a=a||I.config.doc;var U=J.exec(Y),X=I.DOM._create,Z=I.DOM.creators,W=null,T,V;if(U&&Z[U[1]]){if(typeof Z[U[1]]==="function"){X=Z[U[1]];}else{T=Z[U[1]];}}V=X(Y,a,T).childNodes;if(V.length===1){W=V[0].parentNode.removeChild(V[0]);}else{W=I.DOM._nl2frag(V,a);}return W;},_nl2frag:function(U,X){var V=null,W,T;if(U&&(U.push||U.item)&&U[0]){X=X||U[0].ownerDocument;V=X.createDocumentFragment();if(U.item){U=I.Array(U,0,true);}for(W=0,T=U.length;W<T;W++){V.appendChild(U[W]);}}return V;},CUSTOM_ATTRIBUTES:(!O.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(V,T,W,U){if(V&&V.setAttribute){T=I.DOM.CUSTOM_ATTRIBUTES[T]||T;V.setAttribute(T,W,U);}},getAttribute:function(W,T,V){V=(V!==undefined)?V:2;var U="";if(W&&W.getAttribute){T=I.DOM.CUSTOM_ATTRIBUTES[T]||T;U=W.getAttribute(T,V);if(U===null){U="";}}return U;},isWindow:function(T){return T.alert&&T.document;},_fragClones:{},_create:function(U,V,T){T=T||"div";var W=I.DOM._fragClones[T];if(W){W=W.cloneNode(false);}else{W=I.DOM._fragClones[T]=V.createElement(T);}W.innerHTML=U;return W;},_removeChildNodes:function(T){while(T.firstChild){T.removeChild(T.firstChild);}},addHTML:function(X,W,U){if(typeof W==="string"){W=I.Lang.trim(W);}var T=X.parentNode,V;if(W){if(W.nodeType){V=W;}else{V=I.DOM.create(W);}}if(U){if(U.nodeType){U.parentNode.insertBefore(V,U);}else{switch(U){case"replace":while(X.firstChild){X.removeChild(X.firstChild);}if(V){X.appendChild(V);}break;case"before":T.insertBefore(V,X);break;case"after":if(X.nextSibling){T.insertBefore(V,X.nextSibling);}else{T.appendChild(V);}break;default:X.appendChild(V);}}}else{X.appendChild(V);}return V;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(V){var U="",T;if(V&&V[N]){T=I.DOM.VALUE_GETTERS[V[N].toLowerCase()];if(T){U=T(V);}else{U=V.value;}}if(U===G){U=G;}return(typeof U==="string")?U:"";},setValue:function(T,U){var V;if(T&&T[N]){V=I.DOM.VALUE_SETTERS[T[N].toLowerCase()];if(V){V(T,U);}else{T.value=U;}}},_bruteContains:function(T,U){while(U){if(T===U){return true;}U=U.parentNode;}return false;},_getRegExp:function(U,T){T=T||"";I.DOM._regexCache=I.DOM._regexCache||{};if(!I.DOM._regexCache[U+T]){I.DOM._regexCache[U+T]=new RegExp(U,T);}return I.DOM._regexCache[U+T];},_getDoc:function(T){T=T||{};return(T[S]===9)?T:T[F]||T.document||I.config.doc;},_getWin:function(T){var U=I.DOM._getDoc(T);return U[E]||U[K]||I.config.win;},_batch:function(W,a,Z,V,U,Y){a=(typeof name==="string")?I.DOM[a]:a;var T,X=[];if(a&&W){I.each(W,function(b){if((T=a.call(I.DOM,b,Z,V,U,Y))!==undefined){X[X.length]=T;}});}return X.length?X:W;},_testElement:function(U,T,V){T=(T&&T!=="*")?T.toUpperCase():null;return(U&&U[N]&&(!T||U[N].toUpperCase()===T)&&(!V||V(U)));},creators:{},_IESimpleCreate:function(T,U){U=U||I.config.doc;return U.createElement(T);}};(function(X){var Z=X.DOM.creators,T=X.DOM.create,W=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,V="<table>",U="</table>";if(X.UA.ie){X.mix(Z,{tbody:function(a,b){var c=T(V+a+U,b),Y=c.children.tags("tbody")[0];if(c.children.length>1&&Y&&!W.test(a)){Y[P].removeChild(Y);}return c;},script:function(Y,a){var b=a.createElement("div");b.innerHTML="-"+Y;b.removeChild(b[R]);return b;}},true);X.mix(X.DOM.VALUE_GETTERS,{button:function(Y){return(Y.attributes&&Y.attributes.value)?Y.attributes.value.value:"";}});X.mix(X.DOM.VALUE_SETTERS,{button:function(a,b){var Y=a.attributes.value;if(!Y){Y=a[F].createAttribute("value");a.setAttributeNode(Y);}Y.value=b;}});}if(X.UA.gecko||X.UA.ie){X.mix(Z,{option:function(Y,a){return T("<select>"+Y+"</select>",a);},tr:function(Y,a){return T("<tbody>"+Y+"</tbody>",a);},td:function(Y,a){return T("<tr>"+Y+"</tr>",a);},tbody:function(Y,a){return T(V+Y+U,a);}});X.mix(Z,{legend:"fieldset",th:Z.td,thead:Z.tbody,tfoot:Z.tbody,caption:Z.tbody,colgroup:Z.tbody,col:Z.tbody,optgroup:Z.option});}X.mix(X.DOM.VALUE_GETTERS,{option:function(a){var Y=a.attributes;return(Y.value&&Y.value.specified)?a.value:a.text;},select:function(a){var b=a.value,Y=a.options;if(Y&&b===""){if(a.multiple){}else{b=X.DOM.getValue(Y[a.selectedIndex],"value");}}return b;}});})(I);})(D);var B,A,C;D.mix(D.DOM,{hasClass:function(G,F){var E=D.DOM._getRegExp("(?:^|\\s+)"+F+"(?:\\s+|$)");
return E.test(G.className);},addClass:function(F,E){if(!D.DOM.hasClass(F,E)){F.className=D.Lang.trim([F.className,E].join(" "));}},removeClass:function(F,E){if(E&&A(F,E)){F.className=D.Lang.trim(F.className.replace(D.DOM._getRegExp("(?:^|\\s+)"+E+"(?:\\s+|$)")," "));if(A(F,E)){C(F,E);}}},replaceClass:function(F,E,G){B(F,G);C(F,E);},toggleClass:function(F,E,G){var H=(G!==undefined)?G:!(A(F,E));if(H){B(F,E);}else{C(F,E);}}});A=D.DOM.hasClass;C=D.DOM.removeClass;B=D.DOM.addClass;},"@VERSION@",{requires:["oop"]});YUI.add("dom-style",function(A){(function(E){var C="documentElement",B="defaultView",D="ownerDocument",L="style",N="float",F="cssFloat",G="styleFloat",J="transparent",H="getComputedStyle",M=E.config.doc,I=undefined,K=/color$/i;E.mix(E.DOM,{CUSTOM_STYLES:{},setStyle:function(R,O,S,Q){Q=Q||R.style;var P=E.DOM.CUSTOM_STYLES;if(Q){if(S===null){S="";}if(O in P){if(P[O].set){P[O].set(R,S,Q);return;}else{if(typeof P[O]==="string"){O=P[O];}}}Q[O]=S;}},getStyle:function(R,O){var Q=R[L],P=E.DOM.CUSTOM_STYLES,S="";if(Q){if(O in P){if(P[O].get){return P[O].get(R,O,Q);}else{if(typeof P[O]==="string"){O=P[O];}}}S=Q[O];if(S===""){S=E.DOM[H](R,O);}}return S;},setStyles:function(P,Q){var O=P.style;E.each(Q,function(R,S){E.DOM.setStyle(P,S,R,O);},E.DOM);},getComputedStyle:function(P,O){var R="",Q=P[D];if(P[L]){R=Q[B][H](P,null)[O];}return R;}});if(M[C][L][F]!==I){E.DOM.CUSTOM_STYLES[N]=F;}else{if(M[C][L][G]!==I){E.DOM.CUSTOM_STYLES[N]=G;}}if(E.UA.opera){E.DOM[H]=function(Q,P){var O=Q[D][B],R=O[H](Q,"")[P];if(K.test(P)){R=E.Color.toRGB(R);}return R;};}if(E.UA.webkit){E.DOM[H]=function(Q,P){var O=Q[D][B],R=O[H](Q,"")[P];if(R==="rgba(0, 0, 0, 0)"){R=J;}return R;};}})(A);(function(D){var B=parseInt,C=RegExp;D.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Color.re_RGB.test(E)){E=D.Color.toHex(E);}if(D.Color.re_hex.exec(E)){E="rgb("+[B(C.$1,16),B(C.$2,16),B(C.$3,16)].join(", ")+")";}return E;},toHex:function(F){F=D.Color.KEYWORDS[F]||F;if(D.Color.re_RGB.exec(F)){F=[Number(C.$1).toString(16),Number(C.$2).toString(16),Number(C.$3).toString(16)];for(var E=0;E<F.length;E++){if(F[E].length<2){F[E]="0"+F[E];}}F=F.join("");}if(F.length<6){F=F.replace(D.Color.re_hex3,"$1$1");}if(F!=="transparent"&&F.indexOf("#")<0){F="#"+F;}return F.toUpperCase();}};})(A);(function(D){var W="hasLayout",K="px",L="filter",B="filters",T="opacity",M="auto",G="borderWidth",J="borderTopWidth",Q="borderRightWidth",V="borderBottomWidth",H="borderLeftWidth",I="width",O="height",R="transparent",S="visible",C="getComputedStyle",Z=undefined,X=document.documentElement,P=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,E=function(Y){return Y.currentStyle||Y.style;},N={CUSTOM_STYLES:{},get:function(Y,b){var a="",c;if(Y){c=E(Y)[b];if(b===T&&D.DOM.CUSTOM_STYLES[T]){a=D.DOM.CUSTOM_STYLES[T].get(Y);}else{if(!c||(c.indexOf&&c.indexOf(K)>-1)){a=c;}else{if(D.DOM.IE.COMPUTED[b]){a=D.DOM.IE.COMPUTED[b](Y,b);}else{if(P.test(c)){a=N.getPixel(Y,b)+K;}else{a=c;}}}}}return a;},sizeOffsets:{width:["Left","Right"],height:["Top","Bottom"],top:["Top"],bottom:["Bottom"]},getOffset:function(b,g){var d=E(b)[g],Y=g.charAt(0).toUpperCase()+g.substr(1),f="offset"+Y,a="pixel"+Y,e=N.sizeOffsets[g],c="";if(d===M||d.indexOf("%")>-1){c=b["offset"+Y];if(e[0]){c-=N.getPixel(b,"padding"+e[0]);c-=N.getBorderWidth(b,"border"+e[0]+"Width",1);}if(e[1]){c-=N.getPixel(b,"padding"+e[1]);c-=N.getBorderWidth(b,"border"+e[1]+"Width",1);}}else{if(!b.style[a]&&!b.style[g]){b.style[g]=d;}c=b.style[a];}return c+K;},borderMap:{thin:"2px",medium:"4px",thick:"6px"},getBorderWidth:function(a,c,Y){var b=Y?"":K,d=a.currentStyle[c];if(d.indexOf(K)<0){if(N.borderMap[d]){d=N.borderMap[d];}else{}}return(Y)?parseFloat(d):d;},getPixel:function(b,Y){var d=null,a=E(b),e=a.right,c=a[Y];b.style.right=c;d=b.style.pixelRight;b.style.right=e;return d;},getMargin:function(b,Y){var c,a=E(b);if(a[Y]==M){c=0;}else{c=N.getPixel(b,Y);}return c+K;},getVisibility:function(a,Y){var b;while((b=a.currentStyle)&&b[Y]=="inherit"){a=a.parentNode;}return(b)?b[Y]:S;},getColor:function(a,Y){var b=E(a)[Y];if(!b||b===R){D.DOM.elementByAxis(a,"parentNode",null,function(c){b=E(c)[Y];if(b&&b!==R){a=c;return true;}});}return D.Color.toRGB(b);},getBorderColor:function(a,Y){var b=E(a),c=b[Y]||b.color;return D.Color.toRGB(D.Color.toHex(c));}},F={};try{if(X.style[T]===Z&&X[B]){D.DOM.CUSTOM_STYLES[T]={get:function(a){var c=100;try{c=a[B]["DXImageTransform.Microsoft.Alpha"][T];}catch(b){try{c=a[B]("alpha")[T];}catch(Y){}}return c/100;},set:function(a,d,Y){var c,b;if(d===""){b=E(a);c=(T in b)?b[T]:1;d=c;}if(typeof Y[L]=="string"){Y[L]="alpha("+T+"="+d*100+")";if(!a.currentStyle||!a.currentStyle[W]){Y.zoom=1;}}}};}}catch(U){}try{document.createElement("div").style.height="-1px";}catch(U){D.DOM.CUSTOM_STYLES.height={set:function(b,c,a){var Y=parseFloat(c);if(isNaN(Y)||Y>=0){a.height=c;}else{}}};D.DOM.CUSTOM_STYLES.width={set:function(b,c,a){var Y=parseFloat(c);if(isNaN(Y)||Y>=0){a.width=c;}else{}}};}F[I]=F[O]=N.getOffset;F.color=F.backgroundColor=N.getColor;F[G]=F[J]=F[Q]=F[V]=F[H]=N.getBorderWidth;F.marginTop=F.marginRight=F.marginBottom=F.marginLeft=N.getMargin;F.visibility=N.getVisibility;F.borderColor=F.borderTopColor=F.borderRightColor=F.borderBottomColor=F.borderLeftColor=N.getBorderColor;if(!D.config.win[C]){D.DOM[C]=N.get;}D.namespace("DOM.IE");D.DOM.IE.COMPUTED=F;D.DOM.IE.ComputedStyle=N;})(A);A.mix(A.DOM,{setWidth:function(C,B){A.DOM._setSize(C,"width",B);},setHeight:function(C,B){A.DOM._setSize(C,"height",B);},_getOffsetProp:function(B,C){return"offset"+C.charAt(0).toUpperCase()+C.substr(1);},_setSize:function(B,E,D){var C;A.DOM.setStyle(B,E,D+"px");C=B[A.DOM._getOffsetProp(B,E)];
D=D-(C-D);if(D<0){D=0;}A.DOM.setStyle(B,E,D+"px");}});},"@VERSION@",{requires:["dom-base"]});YUI.add("dom-screen",function(A){(function(F){var D="documentElement",O="compatMode",M="position",C="fixed",K="relative",G="left",H="top",I="BackCompat",N="medium",E="borderLeftWidth",B="borderTopWidth",P="getBoundingClientRect",J="getComputedStyle",L=/^t(?:able|d|h)$/i;F.mix(F.DOM,{winHeight:function(R){var Q=F.DOM._getWinSize(R).height;return Q;},winWidth:function(R){var Q=F.DOM._getWinSize(R).width;return Q;},docHeight:function(R){var Q=F.DOM._getDocSize(R).height;return Math.max(Q,F.DOM._getWinSize(R).height);},docWidth:function(R){var Q=F.DOM._getDocSize(R).width;return Math.max(Q,F.DOM._getWinSize(R).width);},docScrollX:function(Q){var R=F.DOM._getDoc(Q);return Math.max(R[D].scrollLeft,R.body.scrollLeft);},docScrollY:function(Q){var R=F.DOM._getDoc(Q);return Math.max(R[D].scrollTop,R.body.scrollTop);},getXY:function(){if(document[D][P]){return function(T){var a=null,U,R,V,Y,X,Q,S,W,Z;if(T){if(F.DOM.inDoc(T)){U=F.DOM.docScrollX(T);R=F.DOM.docScrollY(T);V=T[P]();Z=F.DOM._getDoc(T);a=[V.left,V.top];if(F.UA.ie){Y=2;X=2;W=Z[O];Q=F.DOM[J](Z[D],E);S=F.DOM[J](Z[D],B);if(F.UA.ie===6){if(W!==I){Y=0;X=0;}}if((W==I)){if(Q!==N){Y=parseInt(Q,10);}if(S!==N){X=parseInt(S,10);}}a[0]-=Y;a[1]-=X;}if((R||U)){a[0]+=U;a[1]+=R;}}else{a=F.DOM._getOffset(T);}}return a;};}else{return function(R){var T=null,Q,V,S,U;if(R){if(F.DOM.inDoc(R)){T=[R.offsetLeft,R.offsetTop];Q=R;V=((F.UA.gecko||F.UA.webkit>519)?true:false);while((Q=Q.offsetParent)){T[0]+=Q.offsetLeft;T[1]+=Q.offsetTop;if(V){T=F.DOM._calcBorders(Q,T);}}if(F.DOM.getStyle(R,M)!=C){Q=R;while((Q=Q.parentNode)){S=Q.scrollTop;U=Q.scrollLeft;if(F.UA.gecko&&(F.DOM.getStyle(Q,"overflow")!=="visible")){T=F.DOM._calcBorders(Q,T);}if(S||U){T[0]-=U;T[1]-=S;}}T[0]+=F.DOM.docScrollX(R);T[1]+=F.DOM.docScrollY(R);}else{T[0]+=F.DOM.docScrollX(R);T[1]+=F.DOM.docScrollY(R);}}else{T=F.DOM._getOffset(R);}}return T;};}}(),_getOffset:function(Q){var S,R=null;if(Q){S=F.DOM.getStyle(Q,M);R=[parseInt(F.DOM[J](Q,G),10),parseInt(F.DOM[J](Q,H),10)];if(isNaN(R[0])){R[0]=parseInt(F.DOM.getStyle(Q,G),10);if(isNaN(R[0])){R[0]=(S===K)?0:Q.offsetLeft||0;}}if(isNaN(R[1])){R[1]=parseInt(F.DOM.getStyle(Q,H),10);if(isNaN(R[1])){R[1]=(S===K)?0:Q.offsetTop||0;}}}return R;},getX:function(Q){return F.DOM.getXY(Q)[0];},getY:function(Q){return F.DOM.getXY(Q)[1];},setXY:function(R,U,X){var S=F.DOM.setStyle,W,V,Q,T;if(R&&U){W=F.DOM.getStyle(R,M);V=F.DOM._getOffset(R);if(W=="static"){W=K;S(R,M,W);}T=F.DOM.getXY(R);if(U[0]!==null){S(R,G,U[0]-T[0]+V[0]+"px");}if(U[1]!==null){S(R,H,U[1]-T[1]+V[1]+"px");}if(!X){Q=F.DOM.getXY(R);if(Q[0]!==U[0]||Q[1]!==U[1]){F.DOM.setXY(R,U,true);}}}else{}},setX:function(R,Q){return F.DOM.setXY(R,[Q,null]);},setY:function(Q,R){return F.DOM.setXY(Q,[null,R]);},_calcBorders:function(S,T){var R=parseInt(F.DOM[J](S,B),10)||0,Q=parseInt(F.DOM[J](S,E),10)||0;if(F.UA.gecko){if(L.test(S.tagName)){R=0;Q=0;}}T[0]+=Q;T[1]+=R;return T;},_getWinSize:function(T){var V=F.DOM._getDoc(),U=V.defaultView||V.parentWindow,W=V[O],S=U.innerHeight,R=U.innerWidth,Q=V[D];if(W&&!F.UA.opera){if(W!="CSS1Compat"){Q=V.body;}S=Q.clientHeight;R=Q.clientWidth;}return{height:S,width:R};},_getDocSize:function(R){var S=F.DOM._getDoc(),Q=S[D];if(S[O]!="CSS1Compat"){Q=S.body;}return{height:Q.scrollHeight,width:Q.scrollWidth};}});})(A);(function(G){var D="top",C="right",H="bottom",B="left",F=function(L,K){var N=Math.max(L[D],K[D]),O=Math.min(L[C],K[C]),I=Math.min(L[H],K[H]),J=Math.max(L[B],K[B]),M={};M[D]=N;M[C]=O;M[H]=I;M[B]=J;return M;},E=G.DOM;G.mix(E,{region:function(J){var K=E.getXY(J),I=false;if(J&&K){I=E._getRegion(K[1],K[0]+J.offsetWidth,K[1]+J.offsetHeight,K[0]);}return I;},intersect:function(K,I,M){var J=M||E.region(K),L={},O=I,N;if(O.tagName){L=E.region(O);}else{if(G.Lang.isObject(I)){L=I;}else{return false;}}N=F(L,J);return{top:N[D],right:N[C],bottom:N[H],left:N[B],area:((N[H]-N[D])*(N[C]-N[B])),yoff:((N[H]-N[D])),xoff:(N[C]-N[B]),inRegion:E.inRegion(K,I,false,M)};},inRegion:function(L,I,J,N){var M={},K=N||E.region(L),P=I,O;if(P.tagName){M=E.region(P);}else{if(G.Lang.isObject(I)){M=I;}else{return false;}}if(J){return(K[B]>=M[B]&&K[C]<=M[C]&&K[D]>=M[D]&&K[H]<=M[H]);}else{O=F(M,K);if(O[H]>=O[D]&&O[C]>=O[B]){return true;}else{return false;}}},inViewportRegion:function(J,I,K){return E.inRegion(J,E.viewportRegion(J),I,K);},_getRegion:function(K,L,I,J){var M={};M[D]=M[1]=K;M[B]=M[0]=J;M[H]=I;M[C]=L;M.width=M[C]-M[B];M.height=M[H]-M[D];return M;},viewportRegion:function(J){J=J||G.config.doc.documentElement;var I=false,L,K;if(J){L=E.docScrollX(J);K=E.docScrollY(J);I=E._getRegion(K,E.winWidth(J)+L,K+E.winHeight(J),L);}return I;}});})(A);},"@VERSION@",{requires:["dom-base","dom-style"]});YUI.add("selector-native",function(A){(function(E){E.namespace("Selector");var C="compareDocumentPosition",D="ownerDocument";var B={_foundCache:[],useNative:true,_compare:("sourceIndex" in document.documentElement)?function(I,H){var G=I.sourceIndex,F=H.sourceIndex;if(G===F){return 0;}else{if(G>F){return 1;}}return -1;}:(document.documentElement[C]?function(G,F){if(G[C](F)&4){return -1;}else{return 1;}}:function(J,I){var H,F,G;if(J&&I){H=J[D].createRange();H.setStart(J,0);F=I[D].createRange();F.setStart(I,0);G=H.compareBoundaryPoints(1,F);}return G;}),_sort:function(F){if(F){F=E.Array(F,0,true);if(F.sort){F.sort(B._compare);}}return F;},_deDupe:function(F){var G=[],H,I;for(H=0;(I=F[H++]);){if(!I._found){G[G.length]=I;I._found=true;}}for(H=0;(I=G[H++]);){I._found=null;I.removeAttribute("_found");}return G;},query:function(G,N,O,F){N=N||E.config.doc;var K=[],H=(E.Selector.useNative&&document.querySelector&&!F),J=[[G,N]],L,P,I,M=(H)?E.Selector._nativeQuery:E.Selector._bruteQuery;if(G&&M){if(!F&&(!H||N.tagName)){J=B._splitQueries(G,N);}for(I=0;(L=J[I++]);){P=M(L[0],L[1],O);if(!O){P=E.Array(P,0,true);}if(P){K=K.concat(P);}}if(J.length>1){K=B._sort(B._deDupe(K));}}return(O)?(K[0]||null):K;},_splitQueries:function(H,K){var G=H.split(","),I=[],L="",J,F;
if(K){if(K.tagName){K.id=K.id||E.guid();L='[id="'+K.id+'"] ';}for(J=0,F=G.length;J<F;++J){H=L+G[J];I.push([H,K]);}}return I;},_nativeQuery:function(F,G,H){try{return G["querySelector"+(H?"":"All")](F);}catch(I){return E.Selector.query(F,G,H,true);}},filter:function(G,F){var H=[],I,J;if(G&&F){for(I=0;(J=G[I++]);){if(E.Selector.test(J,F)){H[H.length]=J;}}}else{}return H;},test:function(H,I,N){var L=false,G=I.split(","),F=false,O,R,M,Q,K,J,P;if(H&&H.tagName){if(!N&&!E.DOM.inDoc(H)){O=H.parentNode;if(O){N=O;}else{Q=H[D].createDocumentFragment();Q.appendChild(H);N=Q;F=true;}}N=N||H[D];if(!H.id){H.id=E.guid();}for(K=0;(P=G[K++]);){P+='[id="'+H.id+'"]';M=E.Selector.query(P,N);for(J=0;R=M[J++];){if(R===H){L=true;break;}}if(L){break;}}if(F){Q.removeChild(H);}}return L;}};E.mix(E.Selector,B,true);})(A);},"@VERSION@",{requires:["dom-base"]});YUI.add("selector-css2",function(G){var H="parentNode",D="tagName",E="attributes",A="combinator",F="pseudos",C=G.Selector,B={SORT_RESULTS:true,_children:function(M,I){var J=M.children,L,K=[],N,O;if(M.children&&I&&M.children.tags){K=M.children.tags(I);}else{if((!J&&M[D])||(J&&I)){N=J||M.childNodes;J=[];for(L=0;(O=N[L++]);){if(O.tagName){if(!I||I===O.tagName){J.push(O);}}}}}return J||[];},_regexCache:{},_re:{attr:/(\[[^\]]*\])/g,pseudos:/:([\-\w]+(?:\(?:['"]?(.+)['"]?\)))*/i},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(J,I){return G.DOM.getAttribute(J,I)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(I){return G.Selector._children(I[H])[0]===I;}},_bruteQuery:function(M,Q,S){var N=[],I=[],P=C._tokenize(M),L=P[P.length-1],R=G.DOM._getDoc(Q),J,O,K;if(L){J=L.id;O=L.className;K=L.tagName||"*";if(J){I=G.DOM.allById(J,Q);}else{if(O){I=Q.getElementsByClassName(O);}else{I=Q.getElementsByTagName(K);}}if(I.length){N=C._filterNodes(I,P,S);}}return N;},_filterNodes:function(R,N,P){var W=0,V,X=N.length,Q=X-1,M=[],T=R[0],a=T,Y=G.Selector.getters,L,U,K,O,I,S,J,Z;for(W=0;(a=T=R[W++]);){Q=X-1;O=null;testLoop:while(a&&a.tagName){K=N[Q];J=K.tests;V=J.length;if(V&&!I){while((Z=J[--V])){L=Z[1];if(Y[Z[0]]){S=Y[Z[0]](a,Z[0]);}else{S=a[Z[0]];if(S===undefined&&a.getAttribute){S=a.getAttribute(Z[0]);}}if((L==="="&&S!==Z[2])||(L.test&&!L.test(S))||(L.call&&!L(a,Z[0]))){if((a=a[O])){while(a&&(!a.tagName||(K.tagName&&K.tagName!==a.tagName))){a=a[O];}}continue testLoop;}}}Q--;if(!I&&(U=K.combinator)){O=U.axis;a=a[O];while(a&&!a.tagName){a=a[O];}if(U.direct){O=null;}}else{M.push(T);if(P){return M;}break;}}}T=a=null;return M;},_getRegExp:function(K,I){var J=C._regexCache;I=I||"";if(!J[K+I]){J[K+I]=new RegExp(K,I);}return J[K+I];},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:E,re:/^\[(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(K,L){var J=K[2]||"",I=G.Selector.operators,M;if((K[1]==="id"&&J==="=")||(K[1]==="className"&&document.documentElement.getElementsByClassName&&(J==="~="||J==="="))){L.prefilter=K[1];L[K[1]]=K[3];}if(J in I){M=I[J];if(typeof M==="string"){M=G.Selector._getRegExp(M.replace("{val}",K[3]));}K[2]=M;}if(!L.last||L.prefilter!==K[1]){return K.slice(1);}}},{name:D,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(J,K){var I=J[1].toUpperCase();K.tagName=I;if(I!=="*"&&(!K.last||K.prefilter)){return[D,"=",I];}if(!K.prefilter){K.prefilter="tagName";}}},{name:A,re:/^\s*([>+~]|\s)\s*/,fn:function(I,J){}},{name:F,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(I,J){var K=C[F][I[1]];if(K){return[I[2],K];}else{return false;}}}],_getToken:function(I){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(K){K=K||"";K=C._replaceShorthand(G.Lang.trim(K));var J=C._getToken(),P=K,O=[],Q=false,M,N,L,I;outer:do{Q=false;for(L=0;(I=C._parsers[L++]);){if((M=I.re.exec(K))){if(I.name!==A){J.selector=K;}K=K.replace(M[0],"");if(!K.length){J.last=true;}if(C._attrFilters[M[1]]){M[1]=C._attrFilters[M[1]];}N=I.fn(M,J);if(N===false){Q=false;break outer;}else{if(N){J.tests.push(N);}}if(!K.length||I.name===A){O.push(J);J=C._getToken(J);if(I.name===A){J.combinator=G.Selector.combinators[M[1]];}}Q=true;}}}while(Q&&K.length);if(!Q||K.length){O=[];}return O;},_replaceShorthand:function(J){var K=C.shorthand,L=J.match(C._re.attr),O=J.match(C._re.pseudos),N,M,I;if(O){J=J.replace(C._re.pseudos,"!!REPLACED_PSEUDO!!");}if(L){J=J.replace(C._re.attr,"!!REPLACED_ATTRIBUTE!!");}for(N in K){if(K.hasOwnProperty(N)){J=J.replace(C._getRegExp(N,"gi"),K[N]);}}if(L){for(M=0,I=L.length;M<I;++M){J=J.replace("!!REPLACED_ATTRIBUTE!!",L[M]);}}if(O){for(M=0,I=O.length;M<I;++M){J=J.replace("!!REPLACED_PSEUDO!!",O[M]);}}return J;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(J,I){return G.DOM.getAttribute(J,I);}}};G.mix(G.Selector,B,true);G.Selector.getters.src=G.Selector.getters.rel=G.Selector.getters.href;if(G.Selector.useNative&&document.querySelector){G.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"@VERSION@",{requires:["selector-native"]});YUI.add("selector",function(A){},"@VERSION@",{use:["selector-native","selector-css2"]});YUI.add("dom",function(A){},"@VERSION@",{use:["dom-base","dom-style","dom-screen","selector"]});