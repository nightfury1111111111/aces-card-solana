(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{104:function(e,t,n){e.exports={Header:"Header_Header__RWSel",HeaderHome:"Header_HeaderHome__4fkBX Header_Header__RWSel",HeaderGame:"Header_HeaderGame__20foV Header_Header__RWSel",ProfileButton:"Header_ProfileButton__77GX2"}},105:function(e,t,n){e.exports={Home:"Home_Home__1aUBM",Content:"Home_Content__2ue8L",Or:"Home_Or__1IcPt","wallet-adapter-button":"Home_wallet-adapter-button__S-GGy"}},106:function(e,t,n){e.exports={LeaderboardContainer:"Leaderboard_LeaderboardContainer__DjWNe",Leaderboard:"Leaderboard_Leaderboard__1JspY",BoldRank:"Leaderboard_BoldRank__2L6LA"}},227:function(e,t,n){},229:function(e,t){},232:function(e,t){},250:function(e,t){},251:function(e,t){},289:function(e,t,n){},291:function(e,t){},293:function(e,t){},304:function(e,t){},306:function(e,t){},31:function(e,t,n){e.exports={DashContainer:"Dashboard_DashContainer__G4W5n",Dashboard:"Dashboard_Dashboard__1uK3T",Play:"Dashboard_Play__1d_2z",Replay:"Dashboard_Replay__2R53y",Hand:"Dashboard_Hand__17d2t",Cards:"Dashboard_Cards__2XYZz",CardGrid:"Dashboard_CardGrid__2Vfkb",Headline:"Dashboard_Headline__3lSWr",Card:"Dashboard_Card__2tCQ2",Stats:"Dashboard_Stats__1e_pm"}},333:function(e,t){},335:function(e,t){},341:function(e,t){},353:function(e,t){},356:function(e,t){},367:function(e,t){},368:function(e,t){},399:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(95),c=n.n(r),s=(n(227),n(17)),i=n(94),o=n(20),l=n(411),d=n(412),j=n(413),u=n(414),b=n(415),f=n(408),O=n(409),h=n(212),p=n(211),x=n(416),_=n(410),m=n(9),g=n(145),v=n(5),k=n(1),C=n.n(k),y=n(51),P=n.n(y),N=function(){var e=Object(v.a)(C.a.mark((function e(t){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.post("/users/login",{user:t},{headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(v.a)(C.a.mark((function e(t){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.get("/users/history/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(v.a)(C.a.mark((function e(t,n){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.get("/users/cards/".concat(t,"-").concat(n));case 2:return a=e.sent,e.abrupt("return",{availableCards:a.data.cards});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S=n(104),R=n.n(S),D=n(4),A=function(e){var t=e.user,n=e.onProfileClick,a="184px";return Object(D.jsxs)("div",{className:t?R.a.HeaderGame:R.a.HeaderHome,children:[Object(D.jsx)("div",{style:{minWidth:a},children:Object(D.jsxs)("p",{children:["The ",Object(D.jsx)("b",{children:"ACES"})]})}),Object(D.jsxs)("p",{children:["The ",Object(D.jsx)("b",{children:"ACES Contest"})]}),Object(D.jsx)("div",{style:{minWidth:a},children:Object(D.jsx)("button",{className:R.a.ProfileButton,onClick:n,style:t?{width:a}:{display:"none"},children:"PROFILE"})})]})},E=n(105),G=n.n(E);n(288),n(289);var T=function(e){var t=e.wallet,n=Object(a.useState)(!1),r=Object(m.a)(n,2),c=r[0],i=r[1];return Object(a.useEffect)((function(){t.publicKey&&(N(t.publicKey.toString()),i(!0))}),[t]),c?Object(D.jsx)(s.a,{to:"/play"}):Object(D.jsxs)("div",{className:G.a.Home,children:[Object(D.jsx)(A,{user:!1,onProfileClick:function(){}}),Object(D.jsxs)("div",{className:G.a.Content,children:[Object(D.jsx)(g.a,{children:Object(D.jsx)(g.b,{children:"PLAY"})}),Object(D.jsxs)("div",{className:G.a.Or,children:[Object(D.jsx)("div",{}),Object(D.jsx)("hr",{}),Object(D.jsx)("p",{children:"Or"}),Object(D.jsx)("hr",{})]}),Object(D.jsx)("a",{href:"https://www.magiceden.io/marketplace/the_aces_nft",children:"BUY"}),Object(D.jsx)("p",{children:"In Order to Play the Game You Must Hold At Least 1 Aces NFT"}),Object(D.jsxs)("p",{children:["This version is in ",Object(D.jsx)("b",{children:"Beta Mode"})]})]})]})},L=function(){var e=Object(v.a)(C.a.mark((function e(t){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.get("/games/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data.entries);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(v.a)(C.a.mark((function e(t,n){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.post("/games/play/".concat(n),{gameType:n.substring(8),user:t});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),B=n(31),W=n.n(B),M=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],K=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).MAX_ENTRIES||15,F=function(e){var t=e.wallet,n=e.gameId,r=e.rank,c=e.setRank,s=e.rankings,i=e.setRankings,o=e.reloadRankings,l=e.setReloadRankings,d=Object(a.useState)([]),j=Object(m.a)(d,2),u=j[0],b=j[1],f=Object(a.useState)([]),O=Object(m.a)(f,2),h=O[0],p=O[1],x=Object(a.useState)(),_=Object(m.a)(x,2),g=_[0],v=_[1],k=Object(a.useState)(),C=Object(m.a)(k,2),y=C[0],P=C[1];Object(a.useEffect)((function(){g?(b(g.aces?g.aces:[]),p(g.wildCards)):w(t,n).then((function(e){b(e.availableCards.filter((function(e){return e.image}))),p(e.availableCards.filter((function(e){return!e.image})))}))}),[t,n,g,b,p]),Object(a.useEffect)((function(){if(s){var e=s.map((function(e){return e.user})).indexOf(t);-1!==e&&v(s[e]),console.log(s[e]);for(var n=0,a=0;a<s.length;a++)s[a].user===t&&(n+=1);P(n)}}),[t,s,P]);var N=Object(a.useState)("PLAY AGAIN"),H=Object(m.a)(N,2),S=H[0],R=H[1],A=function(){R("Thinking..."),I(t,n).then((function(e){e&&e!=={}&&(t&&L(n).then((function(e){if(i(e),e){var n=e.map((function(e){return e.user})).indexOf(t);c(-1===n?"?":n+1),-1!==n&&v(e[n].hand)}})),l(o+1),R("PLAY AGAIN"))}))};return Object(D.jsx)("div",{className:W.a.DashContainer,children:Object(D.jsxs)("div",{className:W.a.Dashboard,children:[Object(D.jsx)("div",{className:W.a.Play,children:g?g.handType?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"".concat((g.handType[0].toUpperCase()+g.handType.slice(1)).replace("-"," "))}),Object(D.jsx)("div",{className:W.a.Hand,children:g.hand.sort((function(e,t){return M.indexOf(1===t.face.length?t.face:t.face[0].toUpperCase())-M.indexOf(1===e.face.length?e.face:e.face[0].toUpperCase())})).map((function(e,t){return Object(D.jsx)("div",{children:e.image?Object(D.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit}):Object(D.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)}))}),Object(D.jsxs)("div",{className:W.a.Replay,children:[Object(D.jsxs)("div",{className:W.a.Stats,children:[Object(D.jsxs)("p",{children:[Object(D.jsx)("b",{children:"Rank: "}),s?"".concat(r,"/").concat(s.length):""]}),Object(D.jsxs)("p",{children:[Object(D.jsx)("b",{children:"Entries: "}),"".concat(y,"/").concat(K)]})]}),Object(D.jsx)("button",{onClick:function(){return A()},disabled:!!(y&&y>=K||"PLAY AGAIN"!==S),children:S})]})]}):Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"Need at least 1 Aces NFT to play the card contest."}),Object(D.jsx)("button",{onClick:function(){return A()},children:"PLAY"}),Object(D.jsx)("p",{children:s?"Rank: ".concat(r,"/").concat(s.length):"Rank"})]}):Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"Best Hand"}),Object(D.jsx)("button",{onClick:function(){return A()},children:"PLAY"}),Object(D.jsx)("p",{children:s?"Rank: ".concat(r,"/").concat(s.length):"Rank"})]})}),Object(D.jsx)("hr",{}),Object(D.jsx)("div",{className:W.a.Cards,children:Object(D.jsxs)("div",{className:W.a.CardGrid,children:[Object(D.jsx)("div",{className:W.a.Headline,children:Object(D.jsx)("p",{children:"ACES"})}),u.sort((function(e,t){return M.indexOf(1===t.face.length?t.face:t.face[0].toUpperCase())-M.indexOf(1===e.face.length?e.face:e.face[0].toUpperCase())})).map((function(e,t){return Object(D.jsx)("div",{className:W.a.Card,children:Object(D.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit})},t)})),Object(D.jsx)("div",{className:W.a.Headline,children:Object(D.jsx)("p",{children:"Table Cards"})}),h.map((function(e,t){return Object(D.jsx)("div",{className:W.a.Card,children:Object(D.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)}))]})})]})})},Y=n(106),U=n.n(Y),z=function(e){var t=e.rankings,n=e.rank,r=e.wallet,c="deuceswild"===e.gameId.substring(8)?"Deuces Wild":"Five Card Poker",s=Object(a.useState)(),i=Object(m.a)(s,2),o=i[0],l=i[1];return Object(a.useEffect)((function(){if(t){var e;e=(e=n<=5||"?"===n?t.slice(0,Math.min(10,t.length)):n>t.length-5?t.slice(t.length-Math.min(10,t.length),t.length):t.slice(n-Math.min(5,t.length/2),n).concat(t.slice(n,n+Math.min(5,t.length/2)))).map((function(e){return{rank:0,user:e.user}}));for(var a=-1,c=0;c<e.length;c++)if(e[c].user===r){a=c;break}if(-1===a)l(t.slice(0,Math.min(10,t.length)).map((function(e,t){return{rank:t+1,user:e.user}})));else{for(var s=0;s<e.length;s++)e[s].rank=a!==s?n+s-a:n;l(e)}}}),[t,n,r,l]),Object(D.jsx)("div",{className:U.a.LeaderboardContainer,children:Object(D.jsxs)("div",{className:U.a.Leaderboard,children:[Object(D.jsxs)("h1",{children:["Leaderboard: ",c]}),Object(D.jsx)("hr",{}),Object(D.jsx)("ul",{children:o?o.map((function(e,t){return Object(D.jsx)("li",{className:Number(e.rank)===Number(n)?U.a.BoldRank:"",children:"#".concat(e.rank,": ")+e.user},t)})):Object(D.jsx)(D.Fragment,{})})]})})},J=n(56),X=n.n(J),Z=function(e){var t=e.wallet,n=e.isProfileOpen,r=e.setIsProfileOpen,c=Object(a.useState)(),s=Object(m.a)(c,2),i=s[0],o=s[1];return Object(a.useEffect)((function(){H(t).then((function(e){o(e)}))}),[t,o]),Object(D.jsx)("div",{className:n?X.a.ProfileBlock:X.a.ProfileNone,children:Object(D.jsxs)("div",{className:X.a.ProfileMain,children:[Object(D.jsx)("button",{onClick:function(){return r(!1)}}),Object(D.jsxs)("div",{className:X.a.ProfileInner,children:[Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Wallet ID"}),Object(D.jsx)("p",{style:{overflow:"hidden",textOverflow:"ellipsis",maxWidth:"50%"},children:t})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Games played:"}),Object(D.jsx)("p",{children:null!==i&&void 0!==i&&i.games?i.games.length:"0"})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Coin balance:"}),Object(D.jsx)("p",{children:"Coming soon!"})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Contest history:"}),Object(D.jsx)("div",{className:X.a.History,children:null!==i&&void 0!==i&&i.games?i.games.slice(0,5).map((function(e,t){return"testtest"!==e.substring(0,8)?Object(D.jsx)("div",{className:X.a.HistoryEntry,children:"".concat("deuceswild"===e.substring(8)?"2's Wild ":"5 Card ").concat(String(Number(e.substring(2,4))+1).padStart(2,"0"),"/").concat(e.substring(0,2)," - Rank ").concat(i.ranks[t],"/").concat(i.totals[t])},t):Object(D.jsx)(D.Fragment,{})})):Object(D.jsx)("p",{children:"Play your first game!"})})]})]})]})})},V=n(75),Q=n.n(V),q=function(e){var t=e.wallet,n=new Date,r=(new Date(n.getTime()+6e4*n.getTimezoneOffset()),"testtestdeuceswild"),c=Object(a.useState)(!1),i=Object(m.a)(c,2),o=i[0],l=i[1],d=Object(a.useState)(),j=Object(m.a)(d,2),u=j[0],b=j[1],f=Object(a.useState)("?"),O=Object(m.a)(f,2),h=O[0],p=O[1],x=Object(a.useState)(0),_=Object(m.a)(x,2),g=_[0],v=_[1];return Object(a.useEffect)((function(){null!==t&&void 0!==t&&t.publicKey&&L(r).then((function(e){if(b(e),e){var n=e.map((function(e){return e.user})).indexOf(t.publicKey.toString());p(-1===n?"?":n+1)}else p("?")}))}),[t,r,g,p,b]),t.publicKey?Object(D.jsxs)("div",{className:Q.a.Game,children:[Object(D.jsx)("p",{children:Object(D.jsx)("b",{children:"BETA"})}),Object(D.jsxs)("div",{className:Q.a.Content,children:[Object(D.jsxs)("div",{className:Q.a.GameArea,children:[Object(D.jsx)(A,{user:!0,onProfileClick:function(){return l(!0)}}),Object(D.jsx)(F,{wallet:t.publicKey.toString(),gameId:r,rankings:u,rank:h,reloadRankings:g,setRankings:b,setRank:p,setReloadRankings:v})]}),Object(D.jsx)("div",{className:Q.a.Rankings,children:Object(D.jsx)(z,{wallet:t.publicKey.toString(),gameId:r,rankings:u,rank:h})})]}),Object(D.jsx)(Z,{wallet:t.publicKey.toString(),isProfileOpen:o,setIsProfileOpen:l})]}):Object(D.jsx)(s.a,{to:"/"})},$=function(){var e=Object(p.b)();return Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(s.d,{children:[Object(D.jsx)(s.b,{path:"/",element:Object(D.jsx)(T,{wallet:e})}),Object(D.jsx)(s.b,{path:"/play",element:Object(D.jsx)(q,{wallet:e})})]})})},ee=function(){var e=h.b.Mainnet,t=Object(o.d)(e),n=Object(a.useMemo)((function(){return[Object(l.a)(),Object(d.a)(),Object(j.a)(),Object(u.a)({options:{clientId:"Get a client ID @ https://developer.tor.us"}}),Object(b.a)(),Object(f.a)({network:e}),Object(O.a)({network:e})]}),[e]);return Object(D.jsx)(x.a,{endpoint:t,children:Object(D.jsx)(_.a,{wallets:n,children:Object(D.jsx)(i.a,{children:Object(D.jsx)($,{})})})})};c.a.render(Object(D.jsx)(ee,{}),document.getElementById("root"))},56:function(e,t,n){e.exports={Profile:"Profile_Profile__nD2-Z",ProfileMain:"Profile_ProfileMain__18I6y",ProfileInner:"Profile_ProfileInner__risdd",ProfileBlock:"Profile_ProfileBlock__1_2dO Profile_Profile__nD2-Z",ProfileNone:"Profile_ProfileNone__ePzbk Profile_Profile__nD2-Z",History:"Profile_History__3oShl",HistoryEntry:"Profile_HistoryEntry__3jN5Y"}},75:function(e,t,n){e.exports={Game:"Game_Game__1qzE8",Content:"Game_Content__2W_3p",GameArea:"Game_GameArea__38dyN",Rankings:"Game_Rankings__1yrWx"}}},[[399,1,2]]]);
//# sourceMappingURL=main.eef63c8f.chunk.js.map