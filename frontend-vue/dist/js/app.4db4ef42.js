(function(){"use strict";var e={7831:function(e,t,n){var a=n(9963),o=n(6252);function i(e,t,n,a,i,s){const r=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(r)])}var s={created(){console.log("App.vue created")},mounted(){console.log("App.vue mounted")}},r=n(3744);const l=(0,r.Z)(s,[["render",i]]);var c=l,d=n(2201);const u={class:"container"},m={class:"delayed"},h=(0,o._)("h1",null,"Försenade tåg",-1),p={class:"main-delayed-trains",ref:"mainDelayedTrains"},k={class:"map",ref:"map"};function v(e,t,n,a,i,s){const r=(0,o.up)("render-delayed-table");return(0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("div",m,[h,(0,o._)("div",p,null,512),(0,o.Wm)(r,{data:i.delayedData,onTrainNumberSelected:s.handleTrainNumberSelected},null,8,["data","onTrainNumberSelected"])]),(0,o._)("div",k,null,512)])}n(7658);var f=n(3920),b=n(5243),w=n.n(b),y=n(3577);const g={class:"delayed-trains",ref:"delayedTrains",id:"delayed-trains"},T=["onClick"],D={class:"train-number"},_=["onClick"],I=["onClick"],C={key:0,class:"modal-container"},L={class:"modal",id:"train-modal"},N={key:0},R=(0,o._)("strong",null,"Id:",-1),z=(0,o._)("br",null,null,-1),M=(0,o._)("strong",null,"Orsakskod:",-1),O=(0,o._)("br",null,null,-1),S=(0,o._)("br",null,null,-1),V=["onClick"],A=(0,o._)("br",null,null,-1),U=(0,o._)("br",null,null,-1),E=(0,o._)("strong",null,"Tågnummer:",-1),j=(0,o._)("br",null,null,-1),x=(0,o._)("strong",null,"Tågdatum:",-1),Z=(0,o._)("strong",null,"ActivityID:",-1),F={key:1},H={key:2},P=(0,o._)("strong",null,"Försenad:",-1),q={key:3},$=(0,o._)("strong",null,"Advertised Time:",-1),Y=(0,o._)("label",{for:"reason-code"},"Orsakskod",-1),K=(0,o._)("br",null,null,-1),W=(0,o._)("br",null,null,-1),J=(0,o._)("br",null,null,-1),B=(0,o._)("input",{type:"submit",value:"Skapa nytt ärende"},null,-1);function G(e,t,n,i,s,r){const l=(0,o.up)("reason-codes");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("h2",null,"Total Delays: "+(0,y.zw)(n.data.length),1),(0,o._)("div",g,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.data,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{key:t,class:"train-item",onClick:t=>r.sendTrainNumber(e.trainnumber)},[(0,o._)("div",D,(0,y.zw)(e.trainnumber),1),(0,o._)("div",{class:"current-station",onClick:t=>r.sendTrainNumber(e.trainnumber)},[(0,o._)("div",null,(0,y.zw)(e.LocationSignature),1),(0,o._)("div",null,(0,y.zw)(e.FromLocation?e.FromLocation[0].LocationName+" -> ":"")+" "+(0,y.zw)(e.ToLocation?e.ToLocation[0].LocationName:""),1)],8,_),(0,o._)("button",{onClick:t=>r.openTicketView(e)},"Open Errand",8,I)],8,T)))),128))],512),s.showTicketView?((0,o.wg)(),(0,o.iD)("div",C,[(0,o._)("div",L,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>r.closeTicketView&&r.closeTicketView(...e)),id:"back"},"Close Ticket"),(0,o._)("button",{onClick:t[1]||(t[1]=t=>e.deleteTicket(e.item._id))},"Delete"),(0,o._)("h1",null,"Nytt ärende #"+(0,y.zw)(s.selectedItem.ActivityId),1),s.selectedItem?((0,o.wg)(),(0,o.iD)("ul",N,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(s.tickets,(e=>((0,o.wg)(),(0,o.iD)("li",{key:e._id},[R,(0,o.Uk)(" "+(0,y.zw)(e._id),1),z,M,(0,o.Uk)(" "+(0,y.zw)(e.code),1),O,S,(0,o._)("button",{onClick:t=>r.updateTicket(e.activityId)}," Edit",8,V),A,U,E,(0,o.Uk)(" "+(0,y.zw)(e.trainnumber),1),j,x,(0,o.Uk)(" "+(0,y.zw)(e.traindate)+" ",1),Z,(0,o.Uk)(" "+(0,y.zw)(e.activityId),1)])))),128))])):(0,o.kq)("",!0),s.selectedItem&&s.selectedItem.FromLocation?((0,o.wg)(),(0,o.iD)("h3",F," Tåg från "+(0,y.zw)(s.selectedItem.FromLocation[0].LocationName)+" till "+(0,y.zw)(s.selectedItem.ToLocation[0].LocationName)+". Just nu i "+(0,y.zw)(s.selectedItem.LocationSignature)+". ",1)):(0,o.kq)("",!0),s.selectedItem?((0,o.wg)(),(0,o.iD)("p",H,[P,(0,o.Uk)(" "+(0,y.zw)(r.outputDelay(s.selectedItem)),1)])):(0,o.kq)("",!0),s.selectedItem?((0,o.wg)(),(0,o.iD)("p",q,[$,(0,o.Uk)(" "+(0,y.zw)(s.selectedItem.AdvertisedTimeAtLocation),1)])):(0,o.kq)("",!0),(0,o._)("form",{onSubmit:t[3]||(t[3]=(0,a.iM)(((...e)=>r.createTicket&&r.createTicket(...e)),["prevent"]))},[Y,K,(0,o.Wm)(l,{modelValue:s.selectedReason,"onUpdate:modelValue":t[2]||(t[2]=e=>s.selectedReason=e),reasonCodes:s.reasonCodes},null,8,["modelValue","reasonCodes"]),W,J,B],32)])])):(0,o.kq)("",!0)],64)}const Q=["value"];function X(e,t,n,i,s,r){return(0,o.wy)(((0,o.wg)(),(0,o.iD)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.selectedReason=e)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(s.reasonCodes,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.Code,value:e.Code},(0,y.zw)(e.Code)+" - "+(0,y.zw)(e.Level1Description)+" - "+(0,y.zw)(e.Level2Description)+" - "+(0,y.zw)(e.Level3Description),9,Q)))),128))],512)),[[a.bM,s.selectedReason]])}var ee={data(){return{selectedReason:null,reasonCodes:[],selectedLevel1Description:null,selectedLevel2Description:null,selectedLevel3Description:null}},mounted(){fetch("http://localhost:1337/codes").then((e=>e.json())).then((e=>{this.reasonCodes=e.data,this.reasonCodes.length>0&&(this.selectedReason=this.reasonCodes[0].Code,this.selectedReason=this.reasonCodes[0].Level1Description,this.selectedReason=this.reasonCodes[0].Level2Description,this.selectedReason=this.reasonCodes[0].Level3Description)})).catch((e=>{console.error("Error fetching reason codes:",e)}))}};const te=(0,r.Z)(ee,[["render",X]]);var ne=te,ae=n(6154),oe={data(){return{showTicketView:!1,selectedItem:null,selectedReason:null,reasonCodes:[],tickets:[],createdTicket:null}},props:{data:Array},emits:["train-number-selected"],components:{ReasonCodes:ne},methods:{sendTrainNumber(e){this.$emit("train-number-selected",e)},async updateTicket(e){if(!this.selectedItem)return;const t={_id:this.selectedItem._id,code:this.selectedReason,trainnumber:this.selectedItem.trainNumber,traindate:this.selectedItem.trainDate,activityId:this.selectedItem.activityId};try{const n=await ae.Z.put(`http://localhost:1337/tickets/${e}`,t,{validateStatus:function(e){return console.log("Response Status Code:",e),e>=200&&e<300}});console.log("Response Data:",n.data),console.log("Response Headers:",n.headers),200===n.status?(alert("Ticket updated successfully"),await this.openTicketView(this.selectedItem)):(console.error("Unexpected response status:",n.status),console.log("Response Data:",n.data))}catch(n){console.error("Error updating ticket:",n),console.log("Response Data:",n.response.data)}},async openTicketView(e){this.selectedItem=e,this.selectedItem.trainNumber=e.OperationalTrainNumber,this.selectedItem.trainDate=e.AdvertisedTimeAtLocation,this.selectedItem.activityId=e.ActivityId,this.showTicketView=!0;try{const t=await ae.Z.get(`http://localhost:1337/tickets/${e.ActivityId}`);200===t.status?this.tickets=t.data.data:console.error("Failed to fetch ticket data:",t.status)}catch(t){console.error("Error fetching ticket data:",t)}this.showTicketView=!0},closeTicketView(){this.showTicketView=!1,this.selectedItem=null,this.tickets=[],this.createdTicket=null},outputDelay(e){const t=new Date(e.AdvertisedTimeAtLocation),n=new Date(e.EstimatedTimeAtLocation),a=Math.abs(n-t);return Math.floor(a/6e4)+" minuter"},async createTicket(){if(!this.selectedReason)return void alert("Please select a reason code.");const e={code:this.selectedReason,trainnumber:this.selectedItem.trainNumber,traindate:this.selectedItem.trainDate,activityId:this.selectedItem.activityId};console.log("ticketData:",e);try{const t=await ae.Z.post("http://localhost:1337/tickets",e,{validateStatus:function(e){return console.log("Response Status Code:",e),e>=200&&e<300}});console.log("Response Data:",t.data),console.log("Response Headers:",t.headers),200===t.status?(await this.openTicketView(this.selectedItem),this.createdTicket={code:t.data.code,trainnumber:t.data.trainnumber,traindate:t.data.traindate,activityId:t.data.activityId},alert("Ticket created successfully")):(console.error("Unexpected response status:",t.status),console.log("Response Data:",t.data))}catch(t){console.error("Error creating ticket:",t),console.log("Response Data:",t.response.data)}}}};const ie=(0,r.Z)(oe,[["render",G]]);var se=ie,re={data(){return{markersMap:new Map,delayedData:[],selectedTrainNumber:null,map:null}},mounted(){this.renderMainView()},methods:{renderMainView(){const e=this.$refs.mainDelayedTrains;e.innerHTML="";const t=w().map(this.$refs.map).setView([62.173276,14.942265],5);this.map=t,w().tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(t);const a=(0,f.ZP)("http://localhost:1337");a.on("message",(e=>{const a=e.trainnumber;if(null===this.selectedTrainNumber||this.selectedTrainNumber===a){if(this.markersMap.has(a)){const t=this.markersMap.get(a);t.setLatLng(e.position)}else{const o=w().icon({iconUrl:n(7093),iconRetinaUrl:n(6431),iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34]}),i=w().marker(e.position,{icon:o}).bindPopup(a).addTo(t);i.on("click",(()=>{this.selectedTrainNumber=a,this.delayedData=this.delayedData.filter((e=>e.trainnumber===this.selectedTrainNumber)),this.markersMap.forEach(((e,n)=>{n!==this.selectedTrainNumber&&(t.removeLayer(e),this.markersMap.delete(n))}))})),this.markersMap.set(a,i)}const o=this.delayedData.findIndex((e=>e.trainnumber===a));-1!==o?Object.assign(this.delayedData[o],e):this.delayedData.push(e)}}))},handleTrainNumberSelected(e){this.selectedTrainNumber=e,this.delayedData=this.delayedData.filter((e=>e.trainnumber===this.selectedTrainNumber)),this.markersMap.forEach(((e,t)=>{t!==this.selectedTrainNumber&&(this.map.removeLayer(e),this.markersMap.delete(t))}))}},components:{"render-delayed-table":se}};const le=(0,r.Z)(re,[["render",v]]);var ce=le;const de=[{path:"/",name:"main",component:ce}],ue=(0,d.p7)({history:(0,d.r5)(),routes:de});ue.beforeEach(((e,t,n)=>{console.log("Navigating to:",e.path),n()}));var me=ue;const he=(0,a.ri)(c);he.use(me),he.mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,i){if(!a){var s=1/0;for(d=0;d<e.length;d++){a=e[d][0],o=e[d][1],i=e[d][2];for(var r=!0,l=0;l<a.length;l++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(r=!1,i<s&&(s=i));if(r){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[a,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,i,s=a[0],r=a[1],l=a[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(l)var d=l(n)}for(t&&t(a);c<s.length;c++)i=s[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},a=self["webpackChunktrain_controller_2_0"]=self["webpackChunktrain_controller_2_0"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(7831)}));a=n.O(a)})();
//# sourceMappingURL=app.4db4ef42.js.map