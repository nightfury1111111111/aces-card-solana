(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{105:function(e,t,n){e.exports={Header:"Header_Header__RWSel",HeaderHome:"Header_HeaderHome__4fkBX Header_Header__RWSel",HeaderGame:"Header_HeaderGame__20foV Header_Header__RWSel",ProfileButton:"Header_ProfileButton__77GX2"}},106:function(e,t,n){e.exports={Home:"Home_Home__1aUBM",Content:"Home_Content__2ue8L",Or:"Home_Or__1IcPt","wallet-adapter-button":"Home_wallet-adapter-button__S-GGy"}},107:function(e,t,n){e.exports={LeaderboardContainer:"Leaderboard_LeaderboardContainer__DjWNe",Leaderboard:"Leaderboard_Leaderboard__1JspY",BoldRank:"Leaderboard_BoldRank__2L6LA"}},228:function(e,t,n){},230:function(e,t){},233:function(e,t){},251:function(e,t){},252:function(e,t){},27:function(e,t,n){e.exports={DashContainer:"Dashboard_DashContainer__G4W5n",Dashboard:"Dashboard_Dashboard__1uK3T",Play:"Dashboard_Play__1d_2z",Replay:"Dashboard_Replay__2R53y",Hand:"Dashboard_Hand__17d2t",Cards:"Dashboard_Cards__2XYZz",CardGrid:"Dashboard_CardGrid__2Vfkb",Headline:"Dashboard_Headline__3lSWr",Card:"Dashboard_Card__2tCQ2",Stats:"Dashboard_Stats__1e_pm",RulesButton:"Dashboard_RulesButton__1Da-z",Footer:"Dashboard_Footer__CVF82"}},290:function(e,t,n){},292:function(e,t){},294:function(e,t){},305:function(e,t){},307:function(e,t){},334:function(e,t){},336:function(e,t){},342:function(e,t){},354:function(e,t){},357:function(e,t){},368:function(e,t){},369:function(e,t){},400:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(96),s=n.n(r),c=(n(228),n(9)),i=n(17),o=n(95),l=n(20),d=n(412),j=n(413),u=n(414),b=n(415),h=n(416),O=n(409),f=n(410),p=n(213),x=n(212),_=n(417),m=n(411),g=n(5),v=n(1),k=n.n(v),y=n(51),R=n.n(y),C=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("/games/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data.entries);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(g.a)(k.a.mark((function e(t,n){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/games/play/".concat(n),{gameType:n.substring(8),user:t});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),P=n(146),N=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/users/login",{user:t},{headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("/users/history/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=n(105),D=n.n(S),A=n(3),G=function(e){var t=e.user,n=e.onProfileClick,a="184px";return Object(A.jsxs)("div",{className:t?D.a.HeaderGame:D.a.HeaderHome,children:[Object(A.jsx)("div",{style:{minWidth:a},children:Object(A.jsxs)("p",{children:["The ",Object(A.jsx)("b",{children:"ACES"})]})}),Object(A.jsxs)("p",{children:["The ",Object(A.jsx)("b",{children:"ACES Contest"})]}),Object(A.jsx)("div",{style:{minWidth:a},children:Object(A.jsx)("button",{className:D.a.ProfileButton,onClick:n,style:t?{width:a}:{display:"none"},children:"PROFILE"})})]})},I=n(106),T=n.n(I);n(289),n(290);var B=function(e){var t=e.wallet,n=Object(a.useState)(!1),r=Object(c.a)(n,2),s=r[0],o=r[1];return Object(a.useEffect)((function(){t.publicKey&&(N(t.publicKey.toString()),o(!0))}),[t]),s?Object(A.jsx)(i.a,{to:"/play"}):Object(A.jsxs)("div",{className:T.a.Home,children:[Object(A.jsx)(G,{user:!1,onProfileClick:function(){}}),Object(A.jsxs)("div",{className:T.a.Content,children:[Object(A.jsx)(P.a,{children:Object(A.jsx)(P.b,{children:"PLAY"})}),Object(A.jsxs)("div",{className:T.a.Or,children:[Object(A.jsx)("div",{}),Object(A.jsx)("hr",{}),Object(A.jsx)("p",{children:"Or"}),Object(A.jsx)("hr",{})]}),Object(A.jsx)("a",{href:"https://www.magiceden.io/marketplace/the_aces_nft",children:"BUY"}),Object(A.jsx)("p",{children:"In Order to Play the Game You Must Hold At Least 1 Aces NFT"}),Object(A.jsxs)("p",{children:["This version is in ",Object(A.jsx)("b",{children:"Beta Mode"})]})]})]})},L=n(27),E=n.n(L),W=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],F=function(e){var t,n=e.wallet,r=e.gameId,s=e.rank,i=e.setRank,o=e.rankings,l=e.setRankings,d=e.reloadRankings,j=e.setReloadRankings,u=e.setIsRulesOpen,b=Object(a.useState)([]),h=Object(c.a)(b,2),O=h[0],f=h[1],p=Object(a.useState)([]),x=Object(c.a)(p,2),_=x[0],m=x[1],g=Object(a.useState)(),v=Object(c.a)(g,2),k=v[0],y=v[1];console.log(r.substring(2,4)),t="30"===r.substring(0,2)?15:20;var R=Object(a.useState)(t),P=Object(c.a)(R,2),N=P[0],H=P[1];Object(a.useEffect)((function(){k&&0===d&&(f(k.aces?k.aces:[]),m(k.wildCards))}),[n,r,k,d,f,m]),Object(a.useEffect)((function(){if(o){var e=o.map((function(e){return e.user})).indexOf(n);-1!==e&&y(o[e]);for(var t=0,a=0;a<o.length;a++)o[a].user===n&&(t+=1);H(t)}}),[n,o,H]);var S=Object(a.useState)("PLAY AGAIN"),D=Object(c.a)(S,2),G=D[0],I=D[1],T=function(){I("Thinking..."),w(n,r).then((function(e){e&&e!=={}&&(f(e.aces),m(e.wildCards),n&&C(r).then((function(e){if(l(e),e){var t=e.map((function(e){return e.user})).indexOf(n);i(-1===t?"?":t+1),-1!==t&&y(e[t])}})),j(d+1),I("PLAY AGAIN"))}))};return Object(A.jsxs)("div",{className:E.a.DashContainer,children:[Object(A.jsxs)("div",{className:E.a.Dashboard,children:[Object(A.jsx)("div",{className:E.a.Play,children:k?k.handType?Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)("p",{children:"".concat((k.handType[0].toUpperCase()+k.handType.slice(1)).replace("-"," "))}),Object(A.jsx)("div",{className:E.a.Hand,children:k.hand.sort((function(e,t){return W.indexOf(1===t.face.length?t.face:t.face[0].toUpperCase())-W.indexOf(1===e.face.length?e.face:e.face[0].toUpperCase())})).map((function(e,t){return Object(A.jsx)("div",{children:e.image?Object(A.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit}):Object(A.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)}))}),Object(A.jsxs)("div",{className:E.a.Replay,children:[Object(A.jsxs)("div",{className:E.a.Stats,children:[Object(A.jsxs)("p",{children:[Object(A.jsx)("b",{children:"Rank: "}),o?"".concat(s,"/").concat(o.length):""]}),Object(A.jsxs)("p",{children:[Object(A.jsx)("b",{children:"Entries: "}),"".concat(N,"/").concat(t)]})]}),Object(A.jsx)("button",{onClick:function(){return T()},disabled:!!(N&&N>=t||"PLAY AGAIN"!==G||0===O.length),children:G})]})]}):Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)("p",{children:"Need at least 1 Aces NFT to play the card contest."}),Object(A.jsx)("button",{onClick:function(){return T()},disabled:!1===o||0===O.length,children:"PLAY"}),Object(A.jsx)("p",{children:o?"Rank: ".concat(s,"/").concat(o.length):"Rank"})]}):Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)("p",{children:"Best Hand"}),Object(A.jsx)("button",{onClick:function(){return T()},children:"PLAY"}),Object(A.jsx)("p",{children:o?"Rank: ".concat(s,"/").concat(o.length):"Rank"})]})}),Object(A.jsx)("hr",{}),Object(A.jsx)("div",{className:E.a.Cards,children:Object(A.jsxs)("div",{className:E.a.CardGrid,children:[Object(A.jsx)("div",{className:E.a.Headline,children:Object(A.jsx)("p",{children:"Table Cards"})}),_.map((function(e,t){return Object(A.jsx)("div",{className:E.a.Card,children:Object(A.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)})),Object(A.jsx)("div",{className:E.a.Headline,children:Object(A.jsx)("p",{children:"ACES"})}),O&&O.length>0?O.map((function(e,t){return Object(A.jsx)("div",{className:E.a.Card,children:Object(A.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit})},t)})):Object(A.jsx)(A.Fragment,{})]})})]}),Object(A.jsx)("div",{className:E.a.Footer,children:Object(A.jsx)("button",{className:E.a.RulesButton,onClick:function(){return u(!0)},children:"RULES"})})]})},M=n(107),Y=n.n(M),K=function(e){var t,n=e.rankings,r=e.rank,s=e.wallet,i=e.gameId;t="deuceswild"===i.substring(8)?"Deuces Wild":"4swild"===i.substring(8)?"4's Wild":"Five Card Poker";var o=Object(a.useState)(),l=Object(c.a)(o,2),d=l[0],j=l[1];return Object(a.useEffect)((function(){if(n){var e;e=(e=r<=5||"?"===r?n.slice(0,Math.min(10,n.length)):r>n.length-5?n.slice(n.length-Math.min(10,n.length),n.length):n.slice(r-Math.min(5,n.length/2),r).concat(n.slice(r,r+Math.min(5,n.length/2)))).map((function(e){return{rank:0,user:e.user}}));for(var t=-1,a=0;a<e.length;a++)if(e[a].user===s){t=a;break}if(-1===t)j(n.slice(0,Math.min(10,n.length)).map((function(e,t){return{rank:t+1,user:e.user}})));else{for(var c=0;c<e.length;c++)e[c].rank=t!==c?r+c-t:r;j(e)}}}),[n,r,s,j]),Object(A.jsx)("div",{className:Y.a.LeaderboardContainer,children:Object(A.jsxs)("div",{className:Y.a.Leaderboard,children:[Object(A.jsxs)("h1",{children:["Leaderboard: ",t]}),Object(A.jsx)("hr",{}),Object(A.jsx)("ul",{children:d?d.map((function(e,t){return Object(A.jsx)("li",{className:Number(e.rank)===Number(r)?Y.a.BoldRank:"",children:"#".concat(e.rank,": ")+e.user},t)})):Object(A.jsx)(A.Fragment,{})})]})})},U=n(56),z=n.n(U),J=function(e){var t=e.wallet,n=e.isProfileOpen,r=e.setIsProfileOpen,s=Object(a.useState)(),i=Object(c.a)(s,2),o=i[0],l=i[1];return Object(a.useEffect)((function(){H(t).then((function(e){l(e)}))}),[t,l]),Object(A.jsx)("div",{className:n?z.a.ProfileBlock:z.a.ProfileNone,children:Object(A.jsxs)("div",{className:z.a.ProfileMain,children:[Object(A.jsx)("button",{onClick:function(){return r(!1)}}),Object(A.jsxs)("div",{className:z.a.ProfileInner,children:[Object(A.jsxs)("div",{children:[Object(A.jsx)("p",{children:"Wallet ID"}),Object(A.jsx)("p",{style:{overflow:"hidden",textOverflow:"ellipsis",maxWidth:"50%"},children:t})]}),Object(A.jsxs)("div",{children:[Object(A.jsx)("p",{children:"Games played:"}),Object(A.jsx)("p",{children:null!==o&&void 0!==o&&o.games?o.games.length:"0"})]}),Object(A.jsxs)("div",{children:[Object(A.jsx)("p",{children:"Coin balance:"}),Object(A.jsx)("p",{children:"Coming soon!"})]}),Object(A.jsxs)("div",{children:[Object(A.jsx)("p",{children:"Contest history:"}),Object(A.jsx)("div",{className:z.a.History,children:null!==o&&void 0!==o&&o.games?o.games.slice(0,5).map((function(e,t){return"testtest"!==e.substring(0,8)?Object(A.jsx)("div",{className:z.a.HistoryEntry,children:"".concat("deuceswild"===e.substring(8)?"2's Wild ":"4swild"===e.substring(8)?"4's wild":"5 Card ","\n                                                ").concat(String(Number(e.substring(2,4))+1).padStart(2,"0"),"/").concat(e.substring(0,2)," - \n                                                Rank ").concat(o.ranks[t],"/").concat(o.totals[t])},t):Object(A.jsx)(A.Fragment,{})})):Object(A.jsx)("p",{children:"Play your first game!"})})]})]})]})})},X=n(75),Z=n.n(X),V=function(e){var t=e.isProfileOpen,n=e.setIsProfileOpen;return Object(A.jsx)("div",{className:t?Z.a.RulesBlock:Z.a.RulesNone,children:Object(A.jsxs)("div",{className:Z.a.RulesMain,children:[Object(A.jsx)("button",{onClick:function(){return n(!1)}}),Object(A.jsxs)("div",{className:Z.a.RulesInner,children:["The Aces Card Contest runs every day from 12AM-11:59PM UTC.",Object(A.jsx)("br",{}),'You get up to 20 entries per day, with each entry providing you with 4 new "Table Cards."',Object(A.jsx)("br",{}),"Each entry, you will get up to 10 of your Aces NFTs randomly drawn from your deck alone with those 4 Table Cards to make your best hand.",Object(A.jsx)("br",{}),"After you enter, your entry's respective Aces and Table Cards will appear on the bottom of the screen. The top shows your best entry from the current contest.",Object(A.jsx)("br",{}),"Currently, the contest is \"Best 5 Card Poker Hand.\" This game has variants such as 2's Wild and 4's Wild, which provides players with another wild card (on top of the Joker) to increase their chances of drawing low probability hands.",Object(A.jsx)("br",{}),"Give it a try!"]})]})})},Q=n(76),q=n.n(Q),$=function(e){var t=e.wallet,n=e.gameId,r=e.rankings,s=e.setRankings,o=e.reloadRankings,l=e.setReloadRankings,d=Object(a.useState)(!1),j=Object(c.a)(d,2),u=j[0],b=j[1],h=Object(a.useState)(!1),O=Object(c.a)(h,2),f=O[0],p=O[1],x=Object(a.useState)("?"),_=Object(c.a)(x,2),m=_[0],g=_[1];return Object(a.useEffect)((function(){if(null!==t&&void 0!==t&&t.publicKey)if(r){var e=r.map((function(e){return e.user})).indexOf(t.publicKey.toString());g(-1===e?"?":e+1)}else g("?")}),[t,n,r,g]),t.publicKey?Object(A.jsxs)("div",{className:q.a.Game,children:[Object(A.jsx)("p",{children:Object(A.jsx)("b",{children:"BETA"})}),Object(A.jsxs)("div",{className:q.a.Content,children:[Object(A.jsxs)("div",{className:q.a.GameArea,children:[Object(A.jsx)(G,{user:!0,onProfileClick:function(){return b(!0)}}),Object(A.jsx)(F,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:m,reloadRankings:o,setRankings:s,setRank:g,setReloadRankings:l})]}),Object(A.jsx)("div",{className:q.a.Rankings,children:Object(A.jsx)(K,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:m})})]}),Object(A.jsx)(J,{wallet:t.publicKey.toString(),isProfileOpen:u,setIsProfileOpen:b}),Object(A.jsx)(V,{isRulesOpen:f,setIsRulesOpen:p})]}):Object(A.jsx)(i.a,{to:"/"})},ee=function(){var e,t=Object(x.b)(),n=new Date,r=new Date(n.getTime()+6e4*n.getTimezoneOffset());e=-1!==["24","25","26","27","28","29","30"].indexOf(String(r.getDate()).padStart(2,"0"))?"deuceswild":-1!==["31","01","02","03","04","05","06"].indexOf(String(r.getDate()).padStart(2,"0"))?"4swild":"5card";var s=String(r.getDate()).padStart(2,"0")+String(r.getMonth()).padStart(2,"0")+String(r.getFullYear())+e,o=Object(a.useState)(!1),l=Object(c.a)(o,2),d=l[0],j=l[1],u=Object(a.useState)(0),b=Object(c.a)(u,2),h=b[0],O=b[1];return Object(a.useEffect)((function(){C(s).then((function(e){j(e||[])}))}),[t,s,h,j]),Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(i.d,{children:[Object(A.jsx)(i.b,{path:"/",element:Object(A.jsx)(B,{wallet:t})}),Object(A.jsx)(i.b,{path:"/play",element:Object(A.jsx)($,{wallet:t,gameId:s,rankings:d,setRankings:j,reloadRankings:h,setReloadRankings:O})})]})})},te=function(){var e=p.b.Mainnet,t=Object(l.d)(e),n=Object(a.useMemo)((function(){return[Object(d.a)(),Object(j.a)(),Object(u.a)(),Object(b.a)({options:{clientId:"Get a client ID @ https://developer.tor.us"}}),Object(h.a)(),Object(O.a)({network:e}),Object(f.a)({network:e})]}),[e]);return Object(A.jsx)(_.a,{endpoint:t,children:Object(A.jsx)(m.a,{wallets:n,children:Object(A.jsx)(o.a,{children:Object(A.jsx)(ee,{})})})})};s.a.render(Object(A.jsx)(te,{}),document.getElementById("root"))},56:function(e,t,n){e.exports={Profile:"Profile_Profile__nD2-Z",ProfileMain:"Profile_ProfileMain__18I6y",ProfileInner:"Profile_ProfileInner__risdd",ProfileBlock:"Profile_ProfileBlock__1_2dO Profile_Profile__nD2-Z",ProfileNone:"Profile_ProfileNone__ePzbk Profile_Profile__nD2-Z",History:"Profile_History__3oShl",HistoryEntry:"Profile_HistoryEntry__3jN5Y"}},75:function(e,t,n){e.exports={Rules:"Rules_Rules__24oWh",RulesMain:"Rules_RulesMain___9aKG",RulesInner:"Rules_RulesInner__1ZpXD",RulesBlock:"Rules_RulesBlock__sU4FC Rules_Rules__24oWh",RulesNone:"Rules_RulesNone__2rXF0 Rules_Rules__24oWh"}},76:function(e,t,n){e.exports={Game:"Game_Game__1qzE8",Content:"Game_Content__2W_3p",GameArea:"Game_GameArea__38dyN",Rankings:"Game_Rankings__1yrWx"}}},[[400,1,2]]]);
//# sourceMappingURL=main.080cd703.chunk.js.map