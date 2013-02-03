(function(){(function(r,n){return n.Color=function(){function r(r){var o;o=null!=r?r:{r:255,g:255,b:255,a:255},this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,null==this.r&&(this.r=0),null==this.g&&(this.g=0),null==this.b&&(this.b=0),null==this.a&&(this.a=0),n.Math.clamp(this.r,0,t),n.Math.clamp(this.g,0,t),n.Math.clamp(this.b,0,t),n.Math.clamp(this.a,0,t)}var t;return t=255,r.prototype.toString=function(){return 1===this.a/t?"rgb("+this.r+", "+this.g+", "+this.b+")":"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a/t+")"},r.prototype.toHex=function(){var r,n,t;return t=(~~this.r).toString(16),n=(~~this.g).toString(16),r=(~~this.b).toString(16),1===t.length&&(t="0"+t),1===n.length&&(n="0"+n),1===r.length&&(r="0"+r),"#"+t+n+r},r.prototype.lighten=function(r){var o;return r=n.Math.clamp(r),o=~~(t*r),this.r+=o,this.g+=o,this.b+=o,this},r.prototype.darken=function(r){var o;return r=n.Math.clamp(r),o=~~(t*r),this.r-=o,this.g-=o,this.b-=o,this},r.prototype.fadeIn=function(r){var o;return r=n.Math.clamp(r),o=~~(t*r),this.a+=o,this},r.prototype.fadeOut=function(r){var o;return r=n.Math.clamp(r),o=~~(t*r),this.a-=o,this},r.aqua=function(){return new n.Color({r:0,g:255,b:255})},r.black=function(){return new n.Color({r:0,g:0,b:0})},r.blue=function(){return new n.Color({r:0,g:0,b:255})},r.fuchsia=function(){return new n.Color({r:255,g:0,b:255})},r.gray=function(){return new n.Color({r:128,g:128,b:128})},r.grey=r.gray,r.green=function(){return new n.Color({r:0,g:128,b:0})},r.lime=function(){return new n.Color({r:0,g:255,b:0})},r.maroon=function(){return new n.Color({r:128,g:0,b:0})},r.navy=function(){return new n.Color({r:0,g:0,b:128})},r.olive=function(){return new n.Color({r:128,g:128,b:0})},r.purple=function(){return new n.Color({r:128,g:0,b:128})},r.red=function(){return new n.Color({r:255,g:0,b:0})},r.silver=function(){return new n.Color({r:192,g:192,b:192})},r.teal=function(){return new n.Color({r:0,g:128,b:128})},r.white=function(){return new n.Color({r:255,g:255,b:255})},r.yellow=function(){return new n.Color({r:255,g:255,b:0})},r.transparent=function(){return new n.Color({r:0,g:0,b:0,a:0})},r.aliceBlue=function(){return new n.Color({r:240,g:248,b:255})},r.antiqueWhite=function(){return new n.Color({r:250,g:235,b:215})},r.aquamarine=function(){return new n.Color({r:127,g:255,b:212})},r.azure=function(){return new n.Color({r:240,g:255,b:255})},r.beige=function(){return new n.Color({r:245,g:245,g:220})},r.bisque=function(){return new n.Color({r:255,g:228,b:196})},r.blanchedAlmond=function(){return new n.Color({r:255,g:235,b:205})},r.blueViolet=function(){return new n.Color({r:138,g:43,b:226})},r.brown=function(){return new n.Color({r:165,g:42,b:42})},r.burlyWood=function(){return new n.Color({r:222,g:184,b:135})},r.cadetBlue=function(){return new n.Color({r:95,g:158,b:160})},r.chartreuse=function(){return new n.Color({r:127,g:255,b:0})},r.chocolate=function(){return new n.Color({r:210,g:105,b:30})},r.coral=function(){return new n.Color({r:255,g:127,b:80})},r.cornflowerBlue=function(){return new n.Color({r:100,g:149,b:237})},r.cornsilk=function(){return new n.Color({r:255,g:248,b:220})},r.crimson=function(){return new n.Color({r:220,g:20,b:60})},r.cyan=function(){return new n.Color({r:0,g:255,b:255})},r.darkBlue=function(){return new n.Color({r:0,g:0,b:139})},r.darkCyan=function(){return new n.Color({r:0,g:139,b:139})},r.darkGoldenRod=function(){return new n.Color({r:184,g:134,b:11})},r.darkGray=function(){return new n.Color({r:169,g:169,b:169})},r.darkGrey=r.darkGray,r.darkGreen=function(){return new n.Color({r:0,g:100,b:0})},r.darkKhaki=function(){return new n.Color({r:189,g:183,b:107})},r.darkMagenta=function(){return new n.Color({r:139,g:0,b:139})},r.darkOliveGreen=function(){return new n.Color({r:85,g:107,b:47})},r.darkOrange=function(){return new n.Color({r:255,g:140,b:0})},r.darkOrchid=function(){return new n.Color({r:153,g:50,b:204})},r.darkRed=function(){return new n.Color({r:139,g:0,b:0})},r.darkSalmon=function(){return new n.Color({r:233,g:150,b:122})},r.darkSeaGreen=function(){return new n.Color({r:143,g:188,b:143})},r.darkSlateBlue=function(){return new n.Color({r:72,g:61,b:139})},r.darkSlateGray=function(){return new n.Color({r:47,g:79,b:79})},r.darkSlateGrey=r.darkSlateGray,r.darkTurquoise=function(){return new n.Color({r:0,g:206,b:209})},r.darkViolet=function(){return new n.Color({r:148,g:0,b:211})},r.deepPink=function(){return new n.Color({r:255,g:20,b:147})},r.deepSkyBlue=function(){return new n.Color({r:0,g:191,b:255})},r.dimGray=function(){return new n.Color({r:105,g:105,b:105})},r.dimGrey=r.dimGray,r.dodgerBlue=function(){return new n.Color({r:30,g:144,b:255})},r.fireBrick=function(){return new n.Color({r:178,g:34,b:34})},r.floralWhite=function(){return new n.Color({r:255,g:250,b:240})},r.forestGreen=function(){return new n.Color({r:34,g:139,b:34})},r.gainsboro=function(){return new n.Color({r:220,g:220,b:220})},r.ghostWhite=function(){return new n.Color({r:248,g:248,b:255})},r.gold=function(){return new n.Color({r:255,g:215,b:0})},r.goldenRod=function(){return new n.Color({r:218,g:165,b:32})},r.greenYellow=function(){return new n.Color({r:173,g:255,b:47})},r.honeyDew=function(){return new n.Color({r:240,g:255,b:240})},r.hotPink=function(){return new n.Color({r:255,g:105,b:180})},r.indianRed=function(){return new n.Color({r:205,g:92,b:92})},r.indigo=function(){return new n.Color({r:75,g:0,b:130})},r.ivory=function(){return new n.Color({r:255,g:255,b:240})},r.khaki=function(){return new n.Color({r:240,g:230,b:140})},r.lavender=function(){return new n.Color({r:230,g:230,b:250})},r.lavenderBlush=function(){return new n.Color({r:255,g:240,b:245})},r.lawnGreen=function(){return new n.Color({r:124,g:252,b:0})},r.lemonChiffon=function(){return new n.Color({r:255,g:250,b:205})},r.lightBlue=function(){return new n.Color({r:173,g:216,b:230})},r.lightCoral=function(){return new n.Color({r:240,g:128,b:128})},r.lightCyan=function(){return new n.Color({r:224,g:255,b:255})},r.lightGoldenRodYellow=function(){return new n.Color({r:250,g:250,b:210})},r.lightGray=function(){return new n.Color({r:211,g:211,b:211})},r.lightGrey=r.lightGray,r.lightGreen=function(){return new n.Color({r:144,g:238,b:144})},r.lightPink=function(){return new n.Color({r:255,g:182,b:193})},r.lightSalmon=function(){return new n.Color({r:255,g:160,b:122})},r.lightSeaGreen=function(){return new n.Color({r:32,g:178,b:170})},r.lightSkyBlue=function(){return new n.Color({r:135,g:206,b:250})},r.lightSlateGray=function(){return new n.Color({r:119,g:136,b:153})},r.lightSlateGrey=r.lightSlateGray,r.lightSteelBlue=function(){return new n.Color({r:176,g:196,b:222})},r.lightYellow=function(){return new n.Color({r:255,g:255,b:224})},r.limeGreen=function(){return new n.Color({r:50,g:205,b:50})},r.linen=function(){return new n.Color({r:250,g:240,b:230})},r.magenta=r.fuchsia,r.mediumAquaMarine=function(){return new n.Color({r:102,g:205,b:170})},r.mediumBlue=function(){return new n.Color({r:0,g:0,b:205})},r.mediumOrchid=function(){return new n.Color({r:186,g:85,b:211})},r.mediumPurple=function(){return new n.Color({r:157,g:112,b:219})},r.mediumSeaGreen=function(){return new n.Color({r:60,g:179,b:113})},r.mediumSlateBlue=function(){return new n.Color({r:123,g:104,b:238})},r.mediumSpringGreen=function(){return new n.Color({r:0,g:250,b:154})},r.mediumTurquoise=function(){return new n.Color({r:72,g:209,b:204})},r.mediumVioletRed=function(){return new n.Color({r:199,g:21,b:133})},r.midnightBlue=function(){return new n.Color({r:25,g:25,b:112})},r.mintCream=function(){return new n.Color({r:245,g:255,b:250})},r.mistyRose=function(){return new n.Color({r:255,g:228,b:225})},r.moccasin=function(){return new n.Color({r:255,g:228,b:181})},r.navajoWhite=function(){return new n.Color({r:255,g:222,b:173})},r.oldLace=function(){return new n.Color({r:253,g:245,b:230})},r.oliveDrab=function(){return new n.Color({r:107,g:142,b:35})},r.orange=function(){return new n.Color({r:255,g:165,b:0})},r.orangeRed=function(){return new n.Color({r:255,g:69,b:0})},r.orchid=function(){return new n.Color({r:218,g:112,b:214})},r.paleGoldenRod=function(){return new n.Color({r:238,g:232,b:170})},r.paleGreen=function(){return new n.Color({r:152,g:251,b:152})},r.paleTurquoise=function(){return new n.Color({r:175,g:238,b:238})},r.paleVioletRed=function(){return new n.Color({r:219,g:112,b:147})},r.papayaWhip=function(){return new n.Color({r:255,g:239,b:213})},r.peachPuff=function(){return new n.Color({r:255,g:218,b:185})},r.peru=function(){return new n.Color({r:205,g:133,b:63})},r.pink=function(){return new n.Color({r:255,g:192,b:203})},r.plum=function(){return new n.Color({r:221,g:160,b:221})},r.powderBlue=function(){return new n.Color({r:176,g:224,b:230})},r.rosyBrown=function(){return new n.Color({r:188,g:143,b:143})},r.royalBlue=function(){return new n.Color({r:65,g:105,b:225})},r.saddleBrown=function(){return new n.Color({r:139,g:69,b:19})},r.salmon=function(){return new n.Color({r:250,g:128,b:114})},r.sandyBrown=function(){return new n.Color({r:244,g:164,g:96})},r.seaGreen=function(){return new n.Color({r:46,g:139,b:87})},r.seaShell=function(){return new n.Color({r:255,g:245,b:238})},r.sienna=function(){return new n.Color({r:160,g:82,b:45})},r.skyBlue=function(){return new n.Color({r:135,g:206,b:235})},r.slateBlue=function(){return new n.Color({r:106,g:90,b:205})},r.slateGray=function(){return new n.Color({r:112,g:128,b:144})},r.slateGrey=r.slateGray,r.snow=function(){return new n.Color({r:255,g:250,b:250})},r.springGreen=function(){return new n.Color({r:0,g:255,b:127})},r.steelBlue=function(){return new n.Color({r:70,g:130,b:180})},r.tan=function(){return new n.Color({r:210,g:180,b:140})},r.thistle=function(){return new n.Color({r:216,g:191,b:216})},r.tomato=function(){return new n.Color({r:255,g:99,b:71})},r.turquoise=function(){return new n.Color({r:64,g:224,b:208})},r.violet=function(){return new n.Color({r:238,g:130,b:238})},r.wheat=function(){return new n.Color({r:245,g:222,b:179})},r.whiteSmoke=function(){return new n.Color({r:245,g:245,b:245})},r.yellowGreen=function(){return new n.Color({r:154,g:205,b:50})},r.freezeDevBlue=function(){return new n.Color({r:73,g:92,b:108})},r}()})(this,this.Elyssa||(this.Elyssa={}))}).call(this),function(){(function(r,n){return n.Rect=function(){function r(r){var n;n=null!=r?r:{x:0,y:0,w:0,h:0},this.x=n.x,this.y=n.y,this.w=n.w,this.h=n.h,null==this.x&&(this.x=0),null==this.y&&(this.y=0),null==this.w&&(this.w=0),null==this.h&&(this.h=0)}return r.prototype.contains=function(r){var n,t,o,e,u,i;return o=r.x,e=r.y,t=r.w,n=r.h,null!=t&&null!=n?this.x<=(u=o+n)&&this.x+this.w>=u&&this.y<=(i=e+t)&&this.y+this.h>=i:o>=this.x&&this.x+this.w>=o&&e>=this.y&&this.y+this.h>=e},r.prototype.center=function(){return{x:this.w/2+this.x,y:this.h/2+this.y}},r.prototype.add=function(r){var n,t,o,e;return o=r.x,e=r.y,t=r.w,n=r.h,{x:this.x+=o,y:this.y+=e,w:this.w+=t,h:this.h+=n}},r.prototype.toSize=function(){return new n.Size({w:this.w,h:this.h})},r.prototype.toVector=function(){return new n.Vector({x:this.x,y:this.y,z:0})},r.prototype.toString=function(){return JSON.stringify({x:this.x,y:this.y,w:this.w,h:this.h})},r}()})(this,this.Elyssa||(this.Elyssa={}))}.call(this),function(){(function(r,n){return n.Size=function(){function r(r){var n;n=null!=r?r:{w:0,h:0},this.w=n.w,this.h=n.h,null==this.w&&(this.w=0),null==this.h&&(this.h=0)}return r.prototype.toRect=function(){return new n.Rect({x:0,y:0,w:this.w,h:this.h})},r.prototype.center=function(){return{x:this.w/2,y:this.h/2}},r.prototype.toString=function(){return JSON.stringify({x:this.x,y:this.y,z:this.z})},r}()})(this,this.Elyssa||(this.Elyssa={}))}.call(this),function(){(function(r,n){return n.Vector=function(){function r(r){var n;n=null!=r?r:{x:0,y:0,z:0},this.x=n.x,this.y=n.y,this.z=n.z,null==this.x&&(this.x=0),null==this.y&&(this.y=0),null==this.z&&(this.z=0)}return r.prototype.toRect=function(){return new n.Rect({x:this.x,y:this.y,w:0,h:0})},r.prototype.toString=function(){return JSON.stringify({x:this.x,y:this.y,z:this.z})},r}()})(this,this.Elyssa||(this.Elyssa={}))}.call(this);