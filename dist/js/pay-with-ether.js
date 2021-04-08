/*! For license information please see pay-with-ether.js.LICENSE.txt */
(()=>{var e={431:function(e,n,r){var t;!function(i){"use strict";var o,s=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,u=Math.ceil,f=Math.floor,l="[BigNumber Error] ",c=l+"Number primitive has more than 15 significant digits: ",a=1e14,h=14,g=9007199254740991,p=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],w=1e7,d=1e9;function m(e){var n=0|e;return e>0||e===n?n:n-1}function v(e){for(var n,r,t=1,i=e.length,o=e[0]+"";t<i;){for(n=e[t++]+"",r=h-n.length;r--;n="0"+n);o+=n}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function N(e,n){var r,t,i=e.c,o=n.c,s=e.s,u=n.s,f=e.e,l=n.e;if(!s||!u)return null;if(r=i&&!i[0],t=o&&!o[0],r||t)return r?t?0:-u:s;if(s!=u)return s;if(r=s<0,t=f==l,!i||!o)return t?0:!i^r?1:-1;if(!t)return f>l^r?1:-1;for(u=(f=i.length)<(l=o.length)?f:l,s=0;s<u;s++)if(i[s]!=o[s])return i[s]>o[s]^r?1:-1;return f==l?0:f>l^r?1:-1}function b(e,n,r,t){if(e<n||e>r||e!==f(e))throw Error(l+(t||"Argument")+("number"==typeof e?e<n||e>r?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function O(e){var n=e.c.length-1;return m(e.e/h)==n&&e.c[n]%2!=0}function y(e,n){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(n<0?"e":"e+")+n}function E(e,n,r){var t,i;if(n<0){for(i=r+".";++n;i+=r);e=i+e}else if(++n>(t=e.length)){for(i=r,n-=t;--n;i+=r);e+=i}else n<t&&(e=e.slice(0,n)+"."+e.slice(n));return e}(o=function e(n){var r,t,i,o,A,S,R,_,x,D,L=j.prototype={constructor:j,toString:null,valueOf:null},U=new j(1),I=20,P=4,C=-7,T=21,M=-1e7,B=1e7,F=!1,k=1,q=0,G={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},$="0123456789abcdefghijklmnopqrstuvwxyz";function j(e,n){var r,o,u,l,a,p,w,d,m=this;if(!(m instanceof j))return new j(e,n);if(null==n){if(e&&!0===e._isBigNumber)return m.s=e.s,void(!e.c||e.e>B?m.c=m.e=null:e.e<M?m.c=[m.e=0]:(m.e=e.e,m.c=e.c.slice()));if((p="number"==typeof e)&&0*e==0){if(m.s=1/e<0?(e=-e,-1):1,e===~~e){for(l=0,a=e;a>=10;a/=10,l++);return void(l>B?m.c=m.e=null:(m.e=l,m.c=[e]))}d=String(e)}else{if(!s.test(d=String(e)))return i(m,d,p);m.s=45==d.charCodeAt(0)?(d=d.slice(1),-1):1}(l=d.indexOf("."))>-1&&(d=d.replace(".","")),(a=d.search(/e/i))>0?(l<0&&(l=a),l+=+d.slice(a+1),d=d.substring(0,a)):l<0&&(l=d.length)}else{if(b(n,2,$.length,"Base"),10==n)return W(m=new j(e),I+m.e+1,P);if(d=String(e),p="number"==typeof e){if(0*e!=0)return i(m,d,p,n);if(m.s=1/e<0?(d=d.slice(1),-1):1,j.DEBUG&&d.replace(/^0\.0*|\./,"").length>15)throw Error(c+e)}else m.s=45===d.charCodeAt(0)?(d=d.slice(1),-1):1;for(r=$.slice(0,n),l=a=0,w=d.length;a<w;a++)if(r.indexOf(o=d.charAt(a))<0){if("."==o){if(a>l){l=w;continue}}else if(!u&&(d==d.toUpperCase()&&(d=d.toLowerCase())||d==d.toLowerCase()&&(d=d.toUpperCase()))){u=!0,a=-1,l=0;continue}return i(m,String(e),p,n)}p=!1,(l=(d=t(d,n,10,m.s)).indexOf("."))>-1?d=d.replace(".",""):l=d.length}for(a=0;48===d.charCodeAt(a);a++);for(w=d.length;48===d.charCodeAt(--w););if(d=d.slice(a,++w)){if(w-=a,p&&j.DEBUG&&w>15&&(e>g||e!==f(e)))throw Error(c+m.s*e);if((l=l-a-1)>B)m.c=m.e=null;else if(l<M)m.c=[m.e=0];else{if(m.e=l,m.c=[],a=(l+1)%h,l<0&&(a+=h),a<w){for(a&&m.c.push(+d.slice(0,a)),w-=h;a<w;)m.c.push(+d.slice(a,a+=h));a=h-(d=d.slice(a)).length}else a-=w;for(;a--;d+="0");m.c.push(+d)}}else m.c=[m.e=0]}function z(e,n,r,t){var i,o,s,u,f;if(null==r?r=P:b(r,0,8),!e.c)return e.toString();if(i=e.c[0],s=e.e,null==n)f=v(e.c),f=1==t||2==t&&(s<=C||s>=T)?y(f,s):E(f,s,"0");else if(o=(e=W(new j(e),n,r)).e,u=(f=v(e.c)).length,1==t||2==t&&(n<=o||o<=C)){for(;u<n;f+="0",u++);f=y(f,o)}else if(n-=s,f=E(f,o,"0"),o+1>u){if(--n>0)for(f+=".";n--;f+="0");}else if((n+=o-u)>0)for(o+1==u&&(f+=".");n--;f+="0");return e.s<0&&i?"-"+f:f}function H(e,n){for(var r,t=1,i=new j(e[0]);t<e.length;t++){if(!(r=new j(e[t])).s){i=r;break}n.call(i,r)&&(i=r)}return i}function V(e,n,r){for(var t=1,i=n.length;!n[--i];n.pop());for(i=n[0];i>=10;i/=10,t++);return(r=t+r*h-1)>B?e.c=e.e=null:r<M?e.c=[e.e=0]:(e.e=r,e.c=n),e}function W(e,n,r,t){var i,o,s,l,c,g,w,d=e.c,m=p;if(d){e:{for(i=1,l=d[0];l>=10;l/=10,i++);if((o=n-i)<0)o+=h,s=n,w=(c=d[g=0])/m[i-s-1]%10|0;else if((g=u((o+1)/h))>=d.length){if(!t)break e;for(;d.length<=g;d.push(0));c=w=0,i=1,s=(o%=h)-h+1}else{for(c=l=d[g],i=1;l>=10;l/=10,i++);w=(s=(o%=h)-h+i)<0?0:c/m[i-s-1]%10|0}if(t=t||n<0||null!=d[g+1]||(s<0?c:c%m[i-s-1]),t=r<4?(w||t)&&(0==r||r==(e.s<0?3:2)):w>5||5==w&&(4==r||t||6==r&&(o>0?s>0?c/m[i-s]:0:d[g-1])%10&1||r==(e.s<0?8:7)),n<1||!d[0])return d.length=0,t?(n-=e.e+1,d[0]=m[(h-n%h)%h],e.e=-n||0):d[0]=e.e=0,e;if(0==o?(d.length=g,l=1,g--):(d.length=g+1,l=m[h-o],d[g]=s>0?f(c/m[i-s]%m[s])*l:0),t)for(;;){if(0==g){for(o=1,s=d[0];s>=10;s/=10,o++);for(s=d[0]+=l,l=1;s>=10;s/=10,l++);o!=l&&(e.e++,d[0]==a&&(d[0]=1));break}if(d[g]+=l,d[g]!=a)break;d[g--]=0,l=1}for(o=d.length;0===d[--o];d.pop());}e.e>B?e.c=e.e=null:e.e<M&&(e.c=[e.e=0])}return e}function J(e){var n,r=e.e;return null===r?e.toString():(n=v(e.c),n=r<=C||r>=T?y(n,r):E(n,r,"0"),e.s<0?"-"+n:n)}return j.clone=e,j.ROUND_UP=0,j.ROUND_DOWN=1,j.ROUND_CEIL=2,j.ROUND_FLOOR=3,j.ROUND_HALF_UP=4,j.ROUND_HALF_DOWN=5,j.ROUND_HALF_EVEN=6,j.ROUND_HALF_CEIL=7,j.ROUND_HALF_FLOOR=8,j.EUCLID=9,j.config=j.set=function(e){var n,r;if(null!=e){if("object"!=typeof e)throw Error(l+"Object expected: "+e);if(e.hasOwnProperty(n="DECIMAL_PLACES")&&(b(r=e[n],0,d,n),I=r),e.hasOwnProperty(n="ROUNDING_MODE")&&(b(r=e[n],0,8,n),P=r),e.hasOwnProperty(n="EXPONENTIAL_AT")&&((r=e[n])&&r.pop?(b(r[0],-d,0,n),b(r[1],0,d,n),C=r[0],T=r[1]):(b(r,-d,d,n),C=-(T=r<0?-r:r))),e.hasOwnProperty(n="RANGE"))if((r=e[n])&&r.pop)b(r[0],-d,-1,n),b(r[1],1,d,n),M=r[0],B=r[1];else{if(b(r,-d,d,n),!r)throw Error(l+n+" cannot be zero: "+r);M=-(B=r<0?-r:r)}if(e.hasOwnProperty(n="CRYPTO")){if((r=e[n])!==!!r)throw Error(l+n+" not true or false: "+r);if(r){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw F=!r,Error(l+"crypto unavailable");F=r}else F=r}if(e.hasOwnProperty(n="MODULO_MODE")&&(b(r=e[n],0,9,n),k=r),e.hasOwnProperty(n="POW_PRECISION")&&(b(r=e[n],0,d,n),q=r),e.hasOwnProperty(n="FORMAT")){if("object"!=typeof(r=e[n]))throw Error(l+n+" not an object: "+r);G=r}if(e.hasOwnProperty(n="ALPHABET")){if("string"!=typeof(r=e[n])||/^.?$|[+\-.\s]|(.).*\1/.test(r))throw Error(l+n+" invalid: "+r);$=r}}return{DECIMAL_PLACES:I,ROUNDING_MODE:P,EXPONENTIAL_AT:[C,T],RANGE:[M,B],CRYPTO:F,MODULO_MODE:k,POW_PRECISION:q,FORMAT:G,ALPHABET:$}},j.isBigNumber=function(e){if(!e||!0!==e._isBigNumber)return!1;if(!j.DEBUG)return!0;var n,r,t=e.c,i=e.e,o=e.s;e:if("[object Array]"=={}.toString.call(t)){if((1===o||-1===o)&&i>=-d&&i<=d&&i===f(i)){if(0===t[0]){if(0===i&&1===t.length)return!0;break e}if((n=(i+1)%h)<1&&(n+=h),String(t[0]).length==n){for(n=0;n<t.length;n++)if((r=t[n])<0||r>=a||r!==f(r))break e;if(0!==r)return!0}}}else if(null===t&&null===i&&(null===o||1===o||-1===o))return!0;throw Error(l+"Invalid BigNumber: "+e)},j.maximum=j.max=function(){return H(arguments,L.lt)},j.minimum=j.min=function(){return H(arguments,L.gt)},j.random=(o=9007199254740992,A=Math.random()*o&2097151?function(){return f(Math.random()*o)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var n,r,t,i,o,s=0,c=[],a=new j(U);if(null==e?e=I:b(e,0,d),i=u(e/h),F)if(crypto.getRandomValues){for(n=crypto.getRandomValues(new Uint32Array(i*=2));s<i;)(o=131072*n[s]+(n[s+1]>>>11))>=9e15?(r=crypto.getRandomValues(new Uint32Array(2)),n[s]=r[0],n[s+1]=r[1]):(c.push(o%1e14),s+=2);s=i/2}else{if(!crypto.randomBytes)throw F=!1,Error(l+"crypto unavailable");for(n=crypto.randomBytes(i*=7);s<i;)(o=281474976710656*(31&n[s])+1099511627776*n[s+1]+4294967296*n[s+2]+16777216*n[s+3]+(n[s+4]<<16)+(n[s+5]<<8)+n[s+6])>=9e15?crypto.randomBytes(7).copy(n,s):(c.push(o%1e14),s+=7);s=i/7}if(!F)for(;s<i;)(o=A())<9e15&&(c[s++]=o%1e14);for(i=c[--s],e%=h,i&&e&&(o=p[h-e],c[s]=f(i/o)*o);0===c[s];c.pop(),s--);if(s<0)c=[t=0];else{for(t=-1;0===c[0];c.splice(0,1),t-=h);for(s=1,o=c[0];o>=10;o/=10,s++);s<h&&(t-=h-s)}return a.e=t,a.c=c,a}),j.sum=function(){for(var e=1,n=arguments,r=new j(n[0]);e<n.length;)r=r.plus(n[e++]);return r},t=function(){var e="0123456789";function n(e,n,r,t){for(var i,o,s=[0],u=0,f=e.length;u<f;){for(o=s.length;o--;s[o]*=n);for(s[0]+=t.indexOf(e.charAt(u++)),i=0;i<s.length;i++)s[i]>r-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/r|0,s[i]%=r)}return s.reverse()}return function(t,i,o,s,u){var f,l,c,a,h,g,p,w,d=t.indexOf("."),m=I,N=P;for(d>=0&&(a=q,q=0,t=t.replace(".",""),g=(w=new j(i)).pow(t.length-d),q=a,w.c=n(E(v(g.c),g.e,"0"),10,o,e),w.e=w.c.length),c=a=(p=n(t,i,o,u?(f=$,e):(f=e,$))).length;0==p[--a];p.pop());if(!p[0])return f.charAt(0);if(d<0?--c:(g.c=p,g.e=c,g.s=s,p=(g=r(g,w,m,N,o)).c,h=g.r,c=g.e),d=p[l=c+m+1],a=o/2,h=h||l<0||null!=p[l+1],h=N<4?(null!=d||h)&&(0==N||N==(g.s<0?3:2)):d>a||d==a&&(4==N||h||6==N&&1&p[l-1]||N==(g.s<0?8:7)),l<1||!p[0])t=h?E(f.charAt(1),-m,f.charAt(0)):f.charAt(0);else{if(p.length=l,h)for(--o;++p[--l]>o;)p[l]=0,l||(++c,p=[1].concat(p));for(a=p.length;!p[--a];);for(d=0,t="";d<=a;t+=f.charAt(p[d++]));t=E(t,c,f.charAt(0))}return t}}(),r=function(){function e(e,n,r){var t,i,o,s,u=0,f=e.length,l=n%w,c=n/w|0;for(e=e.slice();f--;)u=((i=l*(o=e[f]%w)+(t=c*o+(s=e[f]/w|0)*l)%w*w+u)/r|0)+(t/w|0)+c*s,e[f]=i%r;return u&&(e=[u].concat(e)),e}function n(e,n,r,t){var i,o;if(r!=t)o=r>t?1:-1;else for(i=o=0;i<r;i++)if(e[i]!=n[i]){o=e[i]>n[i]?1:-1;break}return o}function r(e,n,r,t){for(var i=0;r--;)e[r]-=i,i=e[r]<n[r]?1:0,e[r]=i*t+e[r]-n[r];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(t,i,o,s,u){var l,c,g,p,w,d,v,N,b,O,y,E,A,S,R,_,x,D=t.s==i.s?1:-1,L=t.c,U=i.c;if(!(L&&L[0]&&U&&U[0]))return new j(t.s&&i.s&&(L?!U||L[0]!=U[0]:U)?L&&0==L[0]||!U?0*D:D/0:NaN);for(b=(N=new j(D)).c=[],D=o+(c=t.e-i.e)+1,u||(u=a,c=m(t.e/h)-m(i.e/h),D=D/h|0),g=0;U[g]==(L[g]||0);g++);if(U[g]>(L[g]||0)&&c--,D<0)b.push(1),p=!0;else{for(S=L.length,_=U.length,g=0,D+=2,(w=f(u/(U[0]+1)))>1&&(U=e(U,w,u),L=e(L,w,u),_=U.length,S=L.length),A=_,y=(O=L.slice(0,_)).length;y<_;O[y++]=0);x=U.slice(),x=[0].concat(x),R=U[0],U[1]>=u/2&&R++;do{if(w=0,(l=n(U,O,_,y))<0){if(E=O[0],_!=y&&(E=E*u+(O[1]||0)),(w=f(E/R))>1)for(w>=u&&(w=u-1),v=(d=e(U,w,u)).length,y=O.length;1==n(d,O,v,y);)w--,r(d,_<v?x:U,v,u),v=d.length,l=1;else 0==w&&(l=w=1),v=(d=U.slice()).length;if(v<y&&(d=[0].concat(d)),r(O,d,y,u),y=O.length,-1==l)for(;n(U,O,_,y)<1;)w++,r(O,_<y?x:U,y,u),y=O.length}else 0===l&&(w++,O=[0]);b[g++]=w,O[0]?O[y++]=L[A]||0:(O=[L[A]],y=1)}while((A++<S||null!=O[0])&&D--);p=null!=O[0],b[0]||b.splice(0,1)}if(u==a){for(g=1,D=b[0];D>=10;D/=10,g++);W(N,o+(N.e=g+c*h-1)+1,s,p)}else N.e=c,N.r=+p;return N}}(),S=/^(-?)0([xbo])(?=\w[\w.]*$)/i,R=/^([^.]+)\.$/,_=/^\.([^.]+)$/,x=/^-?(Infinity|NaN)$/,D=/^\s*\+(?=[\w.])|^\s+|\s+$/g,i=function(e,n,r,t){var i,o=r?n:n.replace(D,"");if(x.test(o))e.s=isNaN(o)?null:o<0?-1:1;else{if(!r&&(o=o.replace(S,(function(e,n,r){return i="x"==(r=r.toLowerCase())?16:"b"==r?2:8,t&&t!=i?e:n})),t&&(i=t,o=o.replace(R,"$1").replace(_,"0.$1")),n!=o))return new j(o,i);if(j.DEBUG)throw Error(l+"Not a"+(t?" base "+t:"")+" number: "+n);e.s=null}e.c=e.e=null},L.absoluteValue=L.abs=function(){var e=new j(this);return e.s<0&&(e.s=1),e},L.comparedTo=function(e,n){return N(this,new j(e,n))},L.decimalPlaces=L.dp=function(e,n){var r,t,i,o=this;if(null!=e)return b(e,0,d),null==n?n=P:b(n,0,8),W(new j(o),e+o.e+1,n);if(!(r=o.c))return null;if(t=((i=r.length-1)-m(this.e/h))*h,i=r[i])for(;i%10==0;i/=10,t--);return t<0&&(t=0),t},L.dividedBy=L.div=function(e,n){return r(this,new j(e,n),I,P)},L.dividedToIntegerBy=L.idiv=function(e,n){return r(this,new j(e,n),0,1)},L.exponentiatedBy=L.pow=function(e,n){var r,t,i,o,s,c,a,g,p=this;if((e=new j(e)).c&&!e.isInteger())throw Error(l+"Exponent not an integer: "+J(e));if(null!=n&&(n=new j(n)),s=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return g=new j(Math.pow(+J(p),s?2-O(e):+J(e))),n?g.mod(n):g;if(c=e.s<0,n){if(n.c?!n.c[0]:!n.s)return new j(NaN);(t=!c&&p.isInteger()&&n.isInteger())&&(p=p.mod(n))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||s&&p.c[1]>=24e7:p.c[0]<8e13||s&&p.c[0]<=9999975e7)))return o=p.s<0&&O(e)?-0:0,p.e>-1&&(o=1/o),new j(c?1/o:o);q&&(o=u(q/h+2))}for(s?(r=new j(.5),c&&(e.s=1),a=O(e)):a=(i=Math.abs(+J(e)))%2,g=new j(U);;){if(a){if(!(g=g.times(p)).c)break;o?g.c.length>o&&(g.c.length=o):t&&(g=g.mod(n))}if(i){if(0===(i=f(i/2)))break;a=i%2}else if(W(e=e.times(r),e.e+1,1),e.e>14)a=O(e);else{if(0==(i=+J(e)))break;a=i%2}p=p.times(p),o?p.c&&p.c.length>o&&(p.c.length=o):t&&(p=p.mod(n))}return t?g:(c&&(g=U.div(g)),n?g.mod(n):o?W(g,q,P,void 0):g)},L.integerValue=function(e){var n=new j(this);return null==e?e=P:b(e,0,8),W(n,n.e+1,e)},L.isEqualTo=L.eq=function(e,n){return 0===N(this,new j(e,n))},L.isFinite=function(){return!!this.c},L.isGreaterThan=L.gt=function(e,n){return N(this,new j(e,n))>0},L.isGreaterThanOrEqualTo=L.gte=function(e,n){return 1===(n=N(this,new j(e,n)))||0===n},L.isInteger=function(){return!!this.c&&m(this.e/h)>this.c.length-2},L.isLessThan=L.lt=function(e,n){return N(this,new j(e,n))<0},L.isLessThanOrEqualTo=L.lte=function(e,n){return-1===(n=N(this,new j(e,n)))||0===n},L.isNaN=function(){return!this.s},L.isNegative=function(){return this.s<0},L.isPositive=function(){return this.s>0},L.isZero=function(){return!!this.c&&0==this.c[0]},L.minus=function(e,n){var r,t,i,o,s=this,u=s.s;if(n=(e=new j(e,n)).s,!u||!n)return new j(NaN);if(u!=n)return e.s=-n,s.plus(e);var f=s.e/h,l=e.e/h,c=s.c,g=e.c;if(!f||!l){if(!c||!g)return c?(e.s=-n,e):new j(g?s:NaN);if(!c[0]||!g[0])return g[0]?(e.s=-n,e):new j(c[0]?s:3==P?-0:0)}if(f=m(f),l=m(l),c=c.slice(),u=f-l){for((o=u<0)?(u=-u,i=c):(l=f,i=g),i.reverse(),n=u;n--;i.push(0));i.reverse()}else for(t=(o=(u=c.length)<(n=g.length))?u:n,u=n=0;n<t;n++)if(c[n]!=g[n]){o=c[n]<g[n];break}if(o&&(i=c,c=g,g=i,e.s=-e.s),(n=(t=g.length)-(r=c.length))>0)for(;n--;c[r++]=0);for(n=a-1;t>u;){if(c[--t]<g[t]){for(r=t;r&&!c[--r];c[r]=n);--c[r],c[t]+=a}c[t]-=g[t]}for(;0==c[0];c.splice(0,1),--l);return c[0]?V(e,c,l):(e.s=3==P?-1:1,e.c=[e.e=0],e)},L.modulo=L.mod=function(e,n){var t,i,o=this;return e=new j(e,n),!o.c||!e.s||e.c&&!e.c[0]?new j(NaN):!e.c||o.c&&!o.c[0]?new j(o):(9==k?(i=e.s,e.s=1,t=r(o,e,0,3),e.s=i,t.s*=i):t=r(o,e,0,k),(e=o.minus(t.times(e))).c[0]||1!=k||(e.s=o.s),e)},L.multipliedBy=L.times=function(e,n){var r,t,i,o,s,u,f,l,c,g,p,d,v,N,b,O=this,y=O.c,E=(e=new j(e,n)).c;if(!(y&&E&&y[0]&&E[0]))return!O.s||!e.s||y&&!y[0]&&!E||E&&!E[0]&&!y?e.c=e.e=e.s=null:(e.s*=O.s,y&&E?(e.c=[0],e.e=0):e.c=e.e=null),e;for(t=m(O.e/h)+m(e.e/h),e.s*=O.s,(f=y.length)<(g=E.length)&&(v=y,y=E,E=v,i=f,f=g,g=i),i=f+g,v=[];i--;v.push(0));for(N=a,b=w,i=g;--i>=0;){for(r=0,p=E[i]%b,d=E[i]/b|0,o=i+(s=f);o>i;)r=((l=p*(l=y[--s]%b)+(u=d*l+(c=y[s]/b|0)*p)%b*b+v[o]+r)/N|0)+(u/b|0)+d*c,v[o--]=l%N;v[o]=r}return r?++t:v.splice(0,1),V(e,v,t)},L.negated=function(){var e=new j(this);return e.s=-e.s||null,e},L.plus=function(e,n){var r,t=this,i=t.s;if(n=(e=new j(e,n)).s,!i||!n)return new j(NaN);if(i!=n)return e.s=-n,t.minus(e);var o=t.e/h,s=e.e/h,u=t.c,f=e.c;if(!o||!s){if(!u||!f)return new j(i/0);if(!u[0]||!f[0])return f[0]?e:new j(u[0]?t:0*i)}if(o=m(o),s=m(s),u=u.slice(),i=o-s){for(i>0?(s=o,r=f):(i=-i,r=u),r.reverse();i--;r.push(0));r.reverse()}for((i=u.length)-(n=f.length)<0&&(r=f,f=u,u=r,n=i),i=0;n;)i=(u[--n]=u[n]+f[n]+i)/a|0,u[n]=a===u[n]?0:u[n]%a;return i&&(u=[i].concat(u),++s),V(e,u,s)},L.precision=L.sd=function(e,n){var r,t,i,o=this;if(null!=e&&e!==!!e)return b(e,1,d),null==n?n=P:b(n,0,8),W(new j(o),e,n);if(!(r=o.c))return null;if(t=(i=r.length-1)*h+1,i=r[i]){for(;i%10==0;i/=10,t--);for(i=r[0];i>=10;i/=10,t++);}return e&&o.e+1>t&&(t=o.e+1),t},L.shiftedBy=function(e){return b(e,-9007199254740991,g),this.times("1e"+e)},L.squareRoot=L.sqrt=function(){var e,n,t,i,o,s=this,u=s.c,f=s.s,l=s.e,c=I+4,a=new j("0.5");if(1!==f||!u||!u[0])return new j(!f||f<0&&(!u||u[0])?NaN:u?s:1/0);if(0==(f=Math.sqrt(+J(s)))||f==1/0?(((n=v(u)).length+l)%2==0&&(n+="0"),f=Math.sqrt(+n),l=m((l+1)/2)-(l<0||l%2),t=new j(n=f==1/0?"5e"+l:(n=f.toExponential()).slice(0,n.indexOf("e")+1)+l)):t=new j(f+""),t.c[0])for((f=(l=t.e)+c)<3&&(f=0);;)if(o=t,t=a.times(o.plus(r(s,o,c,1))),v(o.c).slice(0,f)===(n=v(t.c)).slice(0,f)){if(t.e<l&&--f,"9999"!=(n=n.slice(f-3,f+1))&&(i||"4999"!=n)){+n&&(+n.slice(1)||"5"!=n.charAt(0))||(W(t,t.e+I+2,1),e=!t.times(t).eq(s));break}if(!i&&(W(o,o.e+I+2,0),o.times(o).eq(s))){t=o;break}c+=4,f+=4,i=1}return W(t,t.e+I+1,P,e)},L.toExponential=function(e,n){return null!=e&&(b(e,0,d),e++),z(this,e,n,1)},L.toFixed=function(e,n){return null!=e&&(b(e,0,d),e=e+this.e+1),z(this,e,n)},L.toFormat=function(e,n,r){var t,i=this;if(null==r)null!=e&&n&&"object"==typeof n?(r=n,n=null):e&&"object"==typeof e?(r=e,e=n=null):r=G;else if("object"!=typeof r)throw Error(l+"Argument not an object: "+r);if(t=i.toFixed(e,n),i.c){var o,s=t.split("."),u=+r.groupSize,f=+r.secondaryGroupSize,c=r.groupSeparator||"",a=s[0],h=s[1],g=i.s<0,p=g?a.slice(1):a,w=p.length;if(f&&(o=u,u=f,f=o,w-=o),u>0&&w>0){for(o=w%u||u,a=p.substr(0,o);o<w;o+=u)a+=c+p.substr(o,u);f>0&&(a+=c+p.slice(o)),g&&(a="-"+a)}t=h?a+(r.decimalSeparator||"")+((f=+r.fractionGroupSize)?h.replace(new RegExp("\\d{"+f+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):h):a}return(r.prefix||"")+t+(r.suffix||"")},L.toFraction=function(e){var n,t,i,o,s,u,f,c,a,g,w,d,m=this,N=m.c;if(null!=e&&(!(f=new j(e)).isInteger()&&(f.c||1!==f.s)||f.lt(U)))throw Error(l+"Argument "+(f.isInteger()?"out of range: ":"not an integer: ")+J(f));if(!N)return new j(m);for(n=new j(U),a=t=new j(U),i=c=new j(U),d=v(N),s=n.e=d.length-m.e-1,n.c[0]=p[(u=s%h)<0?h+u:u],e=!e||f.comparedTo(n)>0?s>0?n:a:f,u=B,B=1/0,f=new j(d),c.c[0]=0;g=r(f,n,0,1),1!=(o=t.plus(g.times(i))).comparedTo(e);)t=i,i=o,a=c.plus(g.times(o=a)),c=o,n=f.minus(g.times(o=n)),f=o;return o=r(e.minus(t),i,0,1),c=c.plus(o.times(a)),t=t.plus(o.times(i)),c.s=a.s=m.s,w=r(a,i,s*=2,P).minus(m).abs().comparedTo(r(c,t,s,P).minus(m).abs())<1?[a,i]:[c,t],B=u,w},L.toNumber=function(){return+J(this)},L.toPrecision=function(e,n){return null!=e&&b(e,1,d),z(this,e,n,2)},L.toString=function(e){var n,r=this,i=r.s,o=r.e;return null===o?i?(n="Infinity",i<0&&(n="-"+n)):n="NaN":(null==e?n=o<=C||o>=T?y(v(r.c),o):E(v(r.c),o,"0"):10===e?n=E(v((r=W(new j(r),I+o+1,P)).c),r.e,"0"):(b(e,2,$.length,"Base"),n=t(E(v(r.c),o,"0"),10,e,i,!0)),i<0&&r.c[0]&&(n="-"+n)),n},L.valueOf=L.toJSON=function(){return J(this)},L._isBigNumber=!0,null!=n&&j.set(n),j}()).default=o.BigNumber=o,void 0===(t=function(){return o}.call(n,r,n,e))||(e.exports=t)}()},512:(e,n,r)=>{var t=r(161),i={},o=r(756),s={};Object.keys(o).map((function(e){s[e]=new t(o[e],10)})),i.units=o;var u=RegExp(/^[0-9]+\.?[0-9]*$/);i.convert=function(e,n,r){if(!u.test(e))throw new Error("Unsupported value");if(n=n.toLowerCase(),!s[n])throw new Error("Unsupported input unit");if(r=r.toLowerCase(),!s[r])throw new Error("Unsupported output unit");return new t(e,10).mul(s[n]).round(0,t.ROUND_DOWN).div(s[r]).toString(10)},i.lazyConvert=function(e,n){var r=e.split(" ");if(2!==r.length)throw new Error("Invalid input");return i.convert(r[0],r[1],n)+" "+n},e.exports=i},161:function(e,n,r){var t;!function(i){"use strict";var o,s,u,f=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,l=Math.ceil,c=Math.floor,a=" not a boolean or binary digit",h="rounding mode",g="number type has more than 15 significant digits",p="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",w=1e14,d=14,m=9007199254740991,v=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],N=1e7,b=1e9;function O(e){var n=0|e;return e>0||e===n?n:n-1}function y(e){for(var n,r,t=1,i=e.length,o=e[0]+"";t<i;){for(n=e[t++]+"",r=d-n.length;r--;n="0"+n);o+=n}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function E(e,n){var r,t,i=e.c,o=n.c,s=e.s,u=n.s,f=e.e,l=n.e;if(!s||!u)return null;if(r=i&&!i[0],t=o&&!o[0],r||t)return r?t?0:-u:s;if(s!=u)return s;if(r=s<0,t=f==l,!i||!o)return t?0:!i^r?1:-1;if(!t)return f>l^r?1:-1;for(u=(f=i.length)<(l=o.length)?f:l,s=0;s<u;s++)if(i[s]!=o[s])return i[s]>o[s]^r?1:-1;return f==l?0:f>l^r?1:-1}function A(e,n,r){return(e=D(e))>=n&&e<=r}function S(e){return"[object Array]"==Object.prototype.toString.call(e)}function R(e,n,r){for(var t,i,o=[0],s=0,u=e.length;s<u;){for(i=o.length;i--;o[i]*=n);for(o[t=0]+=p.indexOf(e.charAt(s++));t<o.length;t++)o[t]>r-1&&(null==o[t+1]&&(o[t+1]=0),o[t+1]+=o[t]/r|0,o[t]%=r)}return o.reverse()}function _(e,n){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(n<0?"e":"e+")+n}function x(e,n){var r,t;if(n<0){for(t="0.";++n;t+="0");e=t+e}else if(++n>(r=e.length)){for(t="0",n-=r;--n;t+="0");e+=t}else n<r&&(e=e.slice(0,n)+"."+e.slice(n));return e}function D(e){return(e=parseFloat(e))<0?l(e):c(e)}"undefined"!=typeof crypto&&(s=crypto),(o=function e(n){var r,t,i,o,L,U,I,P,C=0,T=X.prototype,M=new X(1),B=20,F=4,k=-7,q=21,G=-1e7,$=1e7,j=!0,z=K,H=!1,V=1,W=100,J={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0};function X(e,n){var r,t,i,o,s,l,a=this;if(!(a instanceof X))return j&&ne(26,"constructor call without new",e),new X(e,n);if(null!=n&&z(n,2,64,C,"base")){if(l=e+"",10==(n|=0))return re(a=new X(e instanceof X?e:l),B+a.e+1,F);if((o="number"==typeof e)&&0*e!=0||!new RegExp("^-?"+(r="["+p.slice(0,n)+"]+")+"(?:\\."+r+")?$",n<37?"i":"").test(l))return u(a,l,o,n);o?(a.s=1/e<0?(l=l.slice(1),-1):1,j&&l.replace(/^0\.0*|\./,"").length>15&&ne(C,g,e),o=!1):a.s=45===l.charCodeAt(0)?(l=l.slice(1),-1):1,l=Y(l,10,n,a.s)}else{if(e instanceof X)return a.s=e.s,a.e=e.e,a.c=(e=e.c)?e.slice():e,void(C=0);if((o="number"==typeof e)&&0*e==0){if(a.s=1/e<0?(e=-e,-1):1,e===~~e){for(t=0,i=e;i>=10;i/=10,t++);return a.e=t,a.c=[e],void(C=0)}l=e+""}else{if(!f.test(l=e+""))return u(a,l,o);a.s=45===l.charCodeAt(0)?(l=l.slice(1),-1):1}}for((t=l.indexOf("."))>-1&&(l=l.replace(".","")),(i=l.search(/e/i))>0?(t<0&&(t=i),t+=+l.slice(i+1),l=l.substring(0,i)):t<0&&(t=l.length),i=0;48===l.charCodeAt(i);i++);for(s=l.length;48===l.charCodeAt(--s););if(l=l.slice(i,s+1))if(s=l.length,o&&j&&s>15&&(e>m||e!==c(e))&&ne(C,g,a.s*e),(t=t-i-1)>$)a.c=a.e=null;else if(t<G)a.c=[a.e=0];else{if(a.e=t,a.c=[],i=(t+1)%d,t<0&&(i+=d),i<s){for(i&&a.c.push(+l.slice(0,i)),s-=d;i<s;)a.c.push(+l.slice(i,i+=d));l=l.slice(i),i=d-l.length}else i-=s;for(;i--;l+="0");a.c.push(+l)}else a.c=[a.e=0];C=0}function Y(e,n,t,i){var o,s,u,f,l,c,a,h=e.indexOf("."),g=B,w=F;for(t<37&&(e=e.toLowerCase()),h>=0&&(u=W,W=0,e=e.replace(".",""),l=(a=new X(t)).pow(e.length-h),W=u,a.c=R(x(y(l.c),l.e),10,n),a.e=a.c.length),s=u=(c=R(e,t,n)).length;0==c[--u];c.pop());if(!c[0])return"0";if(h<0?--s:(l.c=c,l.e=s,l.s=i,c=(l=r(l,a,g,w,n)).c,f=l.r,s=l.e),h=c[o=s+g+1],u=n/2,f=f||o<0||null!=c[o+1],f=w<4?(null!=h||f)&&(0==w||w==(l.s<0?3:2)):h>u||h==u&&(4==w||f||6==w&&1&c[o-1]||w==(l.s<0?8:7)),o<1||!c[0])e=f?x("1",-g):"0";else{if(c.length=o,f)for(--n;++c[--o]>n;)c[o]=0,o||(++s,c.unshift(1));for(u=c.length;!c[--u];);for(h=0,e="";h<=u;e+=p.charAt(c[h++]));e=x(e,s)}return e}function Q(e,n,r,t){var i,o,s,u,f;if(r=null!=r&&z(r,0,8,t,h)?0|r:F,!e.c)return e.toString();if(i=e.c[0],s=e.e,null==n)f=y(e.c),f=19==t||24==t&&s<=k?_(f,s):x(f,s);else if(o=(e=re(new X(e),n,r)).e,u=(f=y(e.c)).length,19==t||24==t&&(n<=o||o<=k)){for(;u<n;f+="0",u++);f=_(f,o)}else if(n-=s,f=x(f,o),o+1>u){if(--n>0)for(f+=".";n--;f+="0");}else if((n+=o-u)>0)for(o+1==u&&(f+=".");n--;f+="0");return e.s<0&&i?"-"+f:f}function Z(e,n){var r,t,i=0;for(S(e[0])&&(e=e[0]),r=new X(e[0]);++i<e.length;){if(!(t=new X(e[i])).s){r=t;break}n.call(r,t)&&(r=t)}return r}function K(e,n,r,t,i){return(e<n||e>r||e!=D(e))&&ne(t,(i||"decimal places")+(e<n||e>r?" out of range":" not an integer"),e),!0}function ee(e,n,r){for(var t=1,i=n.length;!n[--i];n.pop());for(i=n[0];i>=10;i/=10,t++);return(r=t+r*d-1)>$?e.c=e.e=null:r<G?e.c=[e.e=0]:(e.e=r,e.c=n),e}function ne(e,n,r){var t=new Error(["new BigNumber","cmp","config","div","divToInt","eq","gt","gte","lt","lte","minus","mod","plus","precision","random","round","shift","times","toDigits","toExponential","toFixed","toFormat","toFraction","pow","toPrecision","toString","BigNumber"][e]+"() "+n+": "+r);throw t.name="BigNumber Error",C=0,t}function re(e,n,r,t){var i,o,s,u,f,a,h,g=e.c,p=v;if(g){e:{for(i=1,u=g[0];u>=10;u/=10,i++);if((o=n-i)<0)o+=d,s=n,h=(f=g[a=0])/p[i-s-1]%10|0;else if((a=l((o+1)/d))>=g.length){if(!t)break e;for(;g.length<=a;g.push(0));f=h=0,i=1,s=(o%=d)-d+1}else{for(f=u=g[a],i=1;u>=10;u/=10,i++);h=(s=(o%=d)-d+i)<0?0:f/p[i-s-1]%10|0}if(t=t||n<0||null!=g[a+1]||(s<0?f:f%p[i-s-1]),t=r<4?(h||t)&&(0==r||r==(e.s<0?3:2)):h>5||5==h&&(4==r||t||6==r&&(o>0?s>0?f/p[i-s]:0:g[a-1])%10&1||r==(e.s<0?8:7)),n<1||!g[0])return g.length=0,t?(n-=e.e+1,g[0]=p[(d-n%d)%d],e.e=-n||0):g[0]=e.e=0,e;if(0==o?(g.length=a,u=1,a--):(g.length=a+1,u=p[d-o],g[a]=s>0?c(f/p[i-s]%p[s])*u:0),t)for(;;){if(0==a){for(o=1,s=g[0];s>=10;s/=10,o++);for(s=g[0]+=u,u=1;s>=10;s/=10,u++);o!=u&&(e.e++,g[0]==w&&(g[0]=1));break}if(g[a]+=u,g[a]!=w)break;g[a--]=0,u=1}for(o=g.length;0===g[--o];g.pop());}e.e>$?e.c=e.e=null:e.e<G&&(e.c=[e.e=0])}return e}return X.another=e,X.ROUND_UP=0,X.ROUND_DOWN=1,X.ROUND_CEIL=2,X.ROUND_FLOOR=3,X.ROUND_HALF_UP=4,X.ROUND_HALF_DOWN=5,X.ROUND_HALF_EVEN=6,X.ROUND_HALF_CEIL=7,X.ROUND_HALF_FLOOR=8,X.EUCLID=9,X.config=function(){var e,n,r=0,t={},i=arguments,o=i[0],u=o&&"object"==typeof o?function(){if(o.hasOwnProperty(n))return null!=(e=o[n])}:function(){if(i.length>r)return null!=(e=i[r++])};return u(n="DECIMAL_PLACES")&&z(e,0,b,2,n)&&(B=0|e),t[n]=B,u(n="ROUNDING_MODE")&&z(e,0,8,2,n)&&(F=0|e),t[n]=F,u(n="EXPONENTIAL_AT")&&(S(e)?z(e[0],-b,0,2,n)&&z(e[1],0,b,2,n)&&(k=0|e[0],q=0|e[1]):z(e,-b,b,2,n)&&(k=-(q=0|(e<0?-e:e)))),t[n]=[k,q],u(n="RANGE")&&(S(e)?z(e[0],-b,-1,2,n)&&z(e[1],1,b,2,n)&&(G=0|e[0],$=0|e[1]):z(e,-b,b,2,n)&&(0|e?G=-($=0|(e<0?-e:e)):j&&ne(2,n+" cannot be zero",e))),t[n]=[G,$],u(n="ERRORS")&&(e===!!e||1===e||0===e?(C=0,z=(j=!!e)?K:A):j&&ne(2,n+a,e)),t[n]=j,u(n="CRYPTO")&&(e===!!e||1===e||0===e?(H=!(!e||!s),e&&!H&&j&&ne(2,"crypto unavailable",s)):j&&ne(2,n+a,e)),t[n]=H,u(n="MODULO_MODE")&&z(e,0,9,2,n)&&(V=0|e),t[n]=V,u(n="POW_PRECISION")&&z(e,0,b,2,n)&&(W=0|e),t[n]=W,u(n="FORMAT")&&("object"==typeof e?J=e:j&&ne(2,n+" not an object",e)),t[n]=J,t},X.max=function(){return Z(arguments,T.lt)},X.min=function(){return Z(arguments,T.gt)},X.random=(t=9007199254740992,i=Math.random()*t&2097151?function(){return c(Math.random()*t)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var n,r,t,o,u,f=0,a=[],h=new X(M);if(e=null!=e&&z(e,0,b,14)?0|e:B,o=l(e/d),H)if(s&&s.getRandomValues){for(n=s.getRandomValues(new Uint32Array(o*=2));f<o;)(u=131072*n[f]+(n[f+1]>>>11))>=9e15?(r=s.getRandomValues(new Uint32Array(2)),n[f]=r[0],n[f+1]=r[1]):(a.push(u%1e14),f+=2);f=o/2}else if(s&&s.randomBytes){for(n=s.randomBytes(o*=7);f<o;)(u=281474976710656*(31&n[f])+1099511627776*n[f+1]+4294967296*n[f+2]+16777216*n[f+3]+(n[f+4]<<16)+(n[f+5]<<8)+n[f+6])>=9e15?s.randomBytes(7).copy(n,f):(a.push(u%1e14),f+=7);f=o/7}else j&&ne(14,"crypto unavailable",s);if(!f)for(;f<o;)(u=i())<9e15&&(a[f++]=u%1e14);for(o=a[--f],e%=d,o&&e&&(u=v[d-e],a[f]=c(o/u)*u);0===a[f];a.pop(),f--);if(f<0)a=[t=0];else{for(t=-1;0===a[0];a.shift(),t-=d);for(f=1,u=a[0];u>=10;u/=10,f++);f<d&&(t-=d-f)}return h.e=t,h.c=a,h}),r=function(){function e(e,n,r){var t,i,o,s,u=0,f=e.length,l=n%N,c=n/N|0;for(e=e.slice();f--;)u=((i=l*(o=e[f]%N)+(t=c*o+(s=e[f]/N|0)*l)%N*N+u)/r|0)+(t/N|0)+c*s,e[f]=i%r;return u&&e.unshift(u),e}function n(e,n,r,t){var i,o;if(r!=t)o=r>t?1:-1;else for(i=o=0;i<r;i++)if(e[i]!=n[i]){o=e[i]>n[i]?1:-1;break}return o}function r(e,n,r,t){for(var i=0;r--;)e[r]-=i,i=e[r]<n[r]?1:0,e[r]=i*t+e[r]-n[r];for(;!e[0]&&e.length>1;e.shift());}return function(t,i,o,s,u){var f,l,a,h,g,p,m,v,N,b,y,E,A,S,R,_,x,D=t.s==i.s?1:-1,L=t.c,U=i.c;if(!(L&&L[0]&&U&&U[0]))return new X(t.s&&i.s&&(L?!U||L[0]!=U[0]:U)?L&&0==L[0]||!U?0*D:D/0:NaN);for(N=(v=new X(D)).c=[],D=o+(l=t.e-i.e)+1,u||(u=w,l=O(t.e/d)-O(i.e/d),D=D/d|0),a=0;U[a]==(L[a]||0);a++);if(U[a]>(L[a]||0)&&l--,D<0)N.push(1),h=!0;else{for(S=L.length,_=U.length,a=0,D+=2,(g=c(u/(U[0]+1)))>1&&(U=e(U,g,u),L=e(L,g,u),_=U.length,S=L.length),A=_,y=(b=L.slice(0,_)).length;y<_;b[y++]=0);(x=U.slice()).unshift(0),R=U[0],U[1]>=u/2&&R++;do{if(g=0,(f=n(U,b,_,y))<0){if(E=b[0],_!=y&&(E=E*u+(b[1]||0)),(g=c(E/R))>1)for(g>=u&&(g=u-1),m=(p=e(U,g,u)).length,y=b.length;1==n(p,b,m,y);)g--,r(p,_<m?x:U,m,u),m=p.length,f=1;else 0==g&&(f=g=1),m=(p=U.slice()).length;if(m<y&&p.unshift(0),r(b,p,y,u),y=b.length,-1==f)for(;n(U,b,_,y)<1;)g++,r(b,_<y?x:U,y,u),y=b.length}else 0===f&&(g++,b=[0]);N[a++]=g,b[0]?b[y++]=L[A]||0:(b=[L[A]],y=1)}while((A++<S||null!=b[0])&&D--);h=null!=b[0],N[0]||N.shift()}if(u==w){for(a=1,D=N[0];D>=10;D/=10,a++);re(v,o+(v.e=a+l*d-1)+1,s,h)}else v.e=l,v.r=+h;return v}}(),o=/^(-?)0([xbo])(?=\w[\w.]*$)/i,L=/^([^.]+)\.$/,U=/^\.([^.]+)$/,I=/^-?(Infinity|NaN)$/,P=/^\s*\+(?=[\w.])|^\s+|\s+$/g,u=function(e,n,r,t){var i,s=r?n:n.replace(P,"");if(I.test(s))e.s=isNaN(s)?null:s<0?-1:1;else{if(!r&&(s=s.replace(o,(function(e,n,r){return i="x"==(r=r.toLowerCase())?16:"b"==r?2:8,t&&t!=i?e:n})),t&&(i=t,s=s.replace(L,"$1").replace(U,"0.$1")),n!=s))return new X(s,i);j&&ne(C,"not a"+(t?" base "+t:"")+" number",n),e.s=null}e.c=e.e=null,C=0},T.absoluteValue=T.abs=function(){var e=new X(this);return e.s<0&&(e.s=1),e},T.ceil=function(){return re(new X(this),this.e+1,2)},T.comparedTo=T.cmp=function(e,n){return C=1,E(this,new X(e,n))},T.decimalPlaces=T.dp=function(){var e,n,r=this.c;if(!r)return null;if(e=((n=r.length-1)-O(this.e/d))*d,n=r[n])for(;n%10==0;n/=10,e--);return e<0&&(e=0),e},T.dividedBy=T.div=function(e,n){return C=3,r(this,new X(e,n),B,F)},T.dividedToIntegerBy=T.divToInt=function(e,n){return C=4,r(this,new X(e,n),0,1)},T.equals=T.eq=function(e,n){return C=5,0===E(this,new X(e,n))},T.floor=function(){return re(new X(this),this.e+1,3)},T.greaterThan=T.gt=function(e,n){return C=6,E(this,new X(e,n))>0},T.greaterThanOrEqualTo=T.gte=function(e,n){return C=7,1===(n=E(this,new X(e,n)))||0===n},T.isFinite=function(){return!!this.c},T.isInteger=T.isInt=function(){return!!this.c&&O(this.e/d)>this.c.length-2},T.isNaN=function(){return!this.s},T.isNegative=T.isNeg=function(){return this.s<0},T.isZero=function(){return!!this.c&&0==this.c[0]},T.lessThan=T.lt=function(e,n){return C=8,E(this,new X(e,n))<0},T.lessThanOrEqualTo=T.lte=function(e,n){return C=9,-1===(n=E(this,new X(e,n)))||0===n},T.minus=T.sub=function(e,n){var r,t,i,o,s=this,u=s.s;if(C=10,n=(e=new X(e,n)).s,!u||!n)return new X(NaN);if(u!=n)return e.s=-n,s.plus(e);var f=s.e/d,l=e.e/d,c=s.c,a=e.c;if(!f||!l){if(!c||!a)return c?(e.s=-n,e):new X(a?s:NaN);if(!c[0]||!a[0])return a[0]?(e.s=-n,e):new X(c[0]?s:3==F?-0:0)}if(f=O(f),l=O(l),c=c.slice(),u=f-l){for((o=u<0)?(u=-u,i=c):(l=f,i=a),i.reverse(),n=u;n--;i.push(0));i.reverse()}else for(t=(o=(u=c.length)<(n=a.length))?u:n,u=n=0;n<t;n++)if(c[n]!=a[n]){o=c[n]<a[n];break}if(o&&(i=c,c=a,a=i,e.s=-e.s),(n=(t=a.length)-(r=c.length))>0)for(;n--;c[r++]=0);for(n=w-1;t>u;){if(c[--t]<a[t]){for(r=t;r&&!c[--r];c[r]=n);--c[r],c[t]+=w}c[t]-=a[t]}for(;0==c[0];c.shift(),--l);return c[0]?ee(e,c,l):(e.s=3==F?-1:1,e.c=[e.e=0],e)},T.modulo=T.mod=function(e,n){var t,i,o=this;return C=11,e=new X(e,n),!o.c||!e.s||e.c&&!e.c[0]?new X(NaN):!e.c||o.c&&!o.c[0]?new X(o):(9==V?(i=e.s,e.s=1,t=r(o,e,0,3),e.s=i,t.s*=i):t=r(o,e,0,V),o.minus(t.times(e)))},T.negated=T.neg=function(){var e=new X(this);return e.s=-e.s||null,e},T.plus=T.add=function(e,n){var r,t=this,i=t.s;if(C=12,n=(e=new X(e,n)).s,!i||!n)return new X(NaN);if(i!=n)return e.s=-n,t.minus(e);var o=t.e/d,s=e.e/d,u=t.c,f=e.c;if(!o||!s){if(!u||!f)return new X(i/0);if(!u[0]||!f[0])return f[0]?e:new X(u[0]?t:0*i)}if(o=O(o),s=O(s),u=u.slice(),i=o-s){for(i>0?(s=o,r=f):(i=-i,r=u),r.reverse();i--;r.push(0));r.reverse()}for((i=u.length)-(n=f.length)<0&&(r=f,f=u,u=r,n=i),i=0;n;)i=(u[--n]=u[n]+f[n]+i)/w|0,u[n]%=w;return i&&(u.unshift(i),++s),ee(e,u,s)},T.precision=T.sd=function(e){var n,r,t=this,i=t.c;if(null!=e&&e!==!!e&&1!==e&&0!==e&&(j&&ne(13,"argument"+a,e),e!=!!e&&(e=null)),!i)return null;if(n=(r=i.length-1)*d+1,r=i[r]){for(;r%10==0;r/=10,n--);for(r=i[0];r>=10;r/=10,n++);}return e&&t.e+1>n&&(n=t.e+1),n},T.round=function(e,n){var r=new X(this);return(null==e||z(e,0,b,15))&&re(r,~~e+this.e+1,null!=n&&z(n,0,8,15,h)?0|n:F),r},T.shift=function(e){var n=this;return z(e,-9007199254740991,m,16,"argument")?n.times("1e"+D(e)):new X(n.c&&n.c[0]&&(e<-9007199254740991||e>m)?n.s*(e<0?0:1/0):n)},T.squareRoot=T.sqrt=function(){var e,n,t,i,o,s=this,u=s.c,f=s.s,l=s.e,c=B+4,a=new X("0.5");if(1!==f||!u||!u[0])return new X(!f||f<0&&(!u||u[0])?NaN:u?s:1/0);if(0==(f=Math.sqrt(+s))||f==1/0?(((n=y(u)).length+l)%2==0&&(n+="0"),f=Math.sqrt(n),l=O((l+1)/2)-(l<0||l%2),t=new X(n=f==1/0?"1e"+l:(n=f.toExponential()).slice(0,n.indexOf("e")+1)+l)):t=new X(f+""),t.c[0])for((f=(l=t.e)+c)<3&&(f=0);;)if(o=t,t=a.times(o.plus(r(s,o,c,1))),y(o.c).slice(0,f)===(n=y(t.c)).slice(0,f)){if(t.e<l&&--f,"9999"!=(n=n.slice(f-3,f+1))&&(i||"4999"!=n)){+n&&(+n.slice(1)||"5"!=n.charAt(0))||(re(t,t.e+B+2,1),e=!t.times(t).eq(s));break}if(!i&&(re(o,o.e+B+2,0),o.times(o).eq(s))){t=o;break}c+=4,f+=4,i=1}return re(t,t.e+B+1,F,e)},T.times=T.mul=function(e,n){var r,t,i,o,s,u,f,l,c,a,h,g,p,m,v,b=this,y=b.c,E=(C=17,e=new X(e,n)).c;if(!(y&&E&&y[0]&&E[0]))return!b.s||!e.s||y&&!y[0]&&!E||E&&!E[0]&&!y?e.c=e.e=e.s=null:(e.s*=b.s,y&&E?(e.c=[0],e.e=0):e.c=e.e=null),e;for(t=O(b.e/d)+O(e.e/d),e.s*=b.s,(f=y.length)<(a=E.length)&&(p=y,y=E,E=p,i=f,f=a,a=i),i=f+a,p=[];i--;p.push(0));for(m=w,v=N,i=a;--i>=0;){for(r=0,h=E[i]%v,g=E[i]/v|0,o=i+(s=f);o>i;)r=((l=h*(l=y[--s]%v)+(u=g*l+(c=y[s]/v|0)*h)%v*v+p[o]+r)/m|0)+(u/v|0)+g*c,p[o--]=l%m;p[o]=r}return r?++t:p.shift(),ee(e,p,t)},T.toDigits=function(e,n){var r=new X(this);return e=null!=e&&z(e,1,b,18,"precision")?0|e:null,n=null!=n&&z(n,0,8,18,h)?0|n:F,e?re(r,e,n):r},T.toExponential=function(e,n){return Q(this,null!=e&&z(e,0,b,19)?1+~~e:null,n,19)},T.toFixed=function(e,n){return Q(this,null!=e&&z(e,0,b,20)?~~e+this.e+1:null,n,20)},T.toFormat=function(e,n){var r=Q(this,null!=e&&z(e,0,b,21)?~~e+this.e+1:null,n,21);if(this.c){var t,i=r.split("."),o=+J.groupSize,s=+J.secondaryGroupSize,u=J.groupSeparator,f=i[0],l=i[1],c=this.s<0,a=c?f.slice(1):f,h=a.length;if(s&&(t=o,o=s,s=t,h-=t),o>0&&h>0){for(t=h%o||o,f=a.substr(0,t);t<h;t+=o)f+=u+a.substr(t,o);s>0&&(f+=u+a.slice(t)),c&&(f="-"+f)}r=l?f+J.decimalSeparator+((s=+J.fractionGroupSize)?l.replace(new RegExp("\\d{"+s+"}\\B","g"),"$&"+J.fractionGroupSeparator):l):f}return r},T.toFraction=function(e){var n,t,i,o,s,u,f,l,c,a=j,h=this,g=h.c,p=new X(M),w=t=new X(M),m=f=new X(M);if(null!=e&&(j=!1,u=new X(e),j=a,(a=u.isInt())&&!u.lt(M)||(j&&ne(22,"max denominator "+(a?"out of range":"not an integer"),e),e=!a&&u.c&&re(u,u.e+1,1).gte(M)?u:null)),!g)return h.toString();for(c=y(g),o=p.e=c.length-h.e-1,p.c[0]=v[(s=o%d)<0?d+s:s],e=!e||u.cmp(p)>0?o>0?p:w:u,s=$,$=1/0,u=new X(c),f.c[0]=0;l=r(u,p,0,1),1!=(i=t.plus(l.times(m))).cmp(e);)t=m,m=i,w=f.plus(l.times(i=w)),f=i,p=u.minus(l.times(i=p)),u=i;return i=r(e.minus(t),m,0,1),f=f.plus(i.times(w)),t=t.plus(i.times(m)),f.s=w.s=h.s,n=r(w,m,o*=2,F).minus(h).abs().cmp(r(f,t,o,F).minus(h).abs())<1?[w.toString(),m.toString()]:[f.toString(),t.toString()],$=s,n},T.toNumber=function(){return+this},T.toPower=T.pow=function(e,n){var r,t,i,o=c(e<0?-e:+e),s=this;if(null!=n&&(C=23,n=new X(n)),!z(e,-9007199254740991,m,23,"exponent")&&(!isFinite(e)||o>m&&(e/=0)||parseFloat(e)!=e&&!(e=NaN))||0==e)return r=Math.pow(+s,e),new X(n?r%n:r);for(n?e>1&&s.gt(M)&&s.isInt()&&n.gt(M)&&n.isInt()?s=s.mod(n):(i=n,n=null):W&&(r=l(W/d+2)),t=new X(M);;){if(o%2){if(!(t=t.times(s)).c)break;r?t.c.length>r&&(t.c.length=r):n&&(t=t.mod(n))}if(!(o=c(o/2)))break;s=s.times(s),r?s.c&&s.c.length>r&&(s.c.length=r):n&&(s=s.mod(n))}return n?t:(e<0&&(t=M.div(t)),i?t.mod(i):r?re(t,W,F):t)},T.toPrecision=function(e,n){return Q(this,null!=e&&z(e,1,b,24,"precision")?0|e:null,n,24)},T.toString=function(e){var n,r=this,t=r.s,i=r.e;return null===i?t?(n="Infinity",t<0&&(n="-"+n)):n="NaN":(n=y(r.c),n=null!=e&&z(e,2,64,25,"base")?Y(x(n,i),0|e,10,t):i<=k||i>=q?_(n,i):x(n,i),t<0&&r.c[0]&&(n="-"+n)),n},T.truncated=T.trunc=function(){return re(new X(this),this.e+1,1)},T.valueOf=T.toJSON=function(){var e,n=this,r=n.e;return null===r?n.toString():(e=y(n.c),e=r<=k||r>=q?_(e,r):x(e,r),n.s<0?"-"+e:e)},null!=n&&X.config(n),X}()).default=o.BigNumber=o,void 0===(t=function(){return o}.call(n,r,n,e))||(e.exports=t)}()},756:e=>{"use strict";e.exports=JSON.parse('{"wei":"1","kwei":"1000","Kwei":"1000","babbage":"1000","femtoether":"1000","mwei":"1000000","Mwei":"1000000","lovelace":"1000000","picoether":"1000000","gwei":"1000000000","Gwei":"1000000000","shannon":"1000000000","nanoether":"1000000000","nano":"1000000000","szabo":"1000000000000","microether":"1000000000000","micro":"1000000000000","finney":"1000000000000000","milliether":"1000000000000000","milli":"1000000000000000","ether":"1000000000000000000","eth":"1000000000000000000","kether":"1000000000000000000000","grand":"1000000000000000000000","mether":"1000000000000000000000000","gether":"1000000000000000000000000000","tether":"1000000000000000000000000000000"}')}},n={};function r(t){var i=n[t];if(void 0!==i)return i.exports;var o=n[t]={exports:{}};return e[t].call(o.exports,o,o.exports,r),o.exports}r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{"use strict";var e=r(512),n=r.n(e),t=r(431),i=r.n(t);function o(){window.ethereum.request({method:"eth_requestAccounts"}).then((function(e){const r="0x"+new(i())(n().convert(window.pwe.eth_value,"eth","wei"),10).toString(16),t=[{to:window.pwe.payment_address,value:r,data:window.pwe.tx_ref,from:e[0]}];window.ethereum.request({method:"eth_sendTransaction",params:t}).catch((e=>{console.log(e)}))})).catch((e=>{console.log(e)}))}window.addEventListener("load",(function(){void 0!==window.ethereum&&(jQuery(".pwe-metamask-button").show(),jQuery(".pwe-metamask-button").on("click",o))}))})()})();