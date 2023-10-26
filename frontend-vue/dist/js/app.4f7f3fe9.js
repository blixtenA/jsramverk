(function(){"use strict";var e={1955:function(e,t,s){var a=s(9963),i=s(6252);function n(e,t,s,a,n,o){const r=(0,i.up)("router-view");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(r)])}var o={created(){console.log("App.vue created")},mounted(){console.log("App.vue mounted")}},r=s(3744);const c=(0,r.Z)(o,[["render",n]]);var l=c,d=s(2201);const u=e=>((0,i.dD)("data-v-ed40c096"),e=e(),(0,i.Cn)(),e),k=u((()=>(0,i._)("h1",null,"Train controller",-1))),h={class:"container"},m={class:"delay-list"},p={class:"main-delayed-trains",ref:"mainDelayedTrains"},b=u((()=>(0,i._)("h2",null,"Försenade tåg",-1))),v={class:"tickets"},y=u((()=>(0,i._)("h2",null,"Aktiva ärenden",-1))),w={class:"main-ticket-items",ref:"mainTicketsItems"},g={class:"map",ref:"map"};function f(e,t,s,a,n,o){const r=(0,i.up)("render-delayed-table"),c=(0,i.up)("render-ticket-table");return(0,i.wg)(),(0,i.iD)(i.HY,null,[k,(0,i._)("div",h,[(0,i._)("div",m,[(0,i._)("div",p,null,512),b,(0,i.Wm)(r,{data:n.delayedData,datatickets:n.tickets,onTrainNumberSelected:o.handleTrainNumberSelected},null,8,["data","datatickets","onTrainNumberSelected"])]),(0,i._)("div",v,[y,(0,i._)("div",w,[(0,i.Wm)(c,{data:n.tickets,delayedData:n.delayedData},null,8,["data","delayedData"])],512)]),(0,i._)("div",g,null,512)])],64)}s(7658);var T=s(3920),D=s(5243),I=s.n(D),C=s(3577);const _=e=>((0,i.dD)("data-v-69dbde2c"),e=e(),(0,i.Cn)(),e),L={class:"delayed-trains",ref:"delayedTrains",id:"delayed-trains"},R=["onClick"],z={class:"train-number"},V=["onClick"],A=["onClick"],j=["onClick"],x={key:0,class:"modal-container"},N={class:"modal",id:"train-modal"},S={class:"modal-title"},M={class:"activity-id"},O={key:0},U=_((()=>(0,i._)("br",null,null,-1))),E={key:1,class:"delay-info"},Z=_((()=>(0,i._)("strong",null,"Försenad:",-1))),q={key:2,class:"advertised-time"},F=_((()=>(0,i._)("strong",null,"Advertised Time:",-1))),H=_((()=>(0,i._)("label",{for:"reason-code",class:"reason-code-label"},"Orsakskod",-1))),$=_((()=>(0,i._)("br",null,null,-1))),P={class:"create-ticket-button"},Y={class:"selectedItem"},K={key:0},W=_((()=>(0,i._)("strong",null,"Aktuell orsakskod:",-1))),B=_((()=>(0,i._)("br",null,null,-1))),J=_((()=>(0,i._)("br",null,null,-1))),G=["onClick"],Q=["onClick"],X=_((()=>(0,i._)("br",null,null,-1))),ee=_((()=>(0,i._)("br",null,null,-1)));function te(e,t,s,n,o,r){const c=(0,i.up)("reason-codes");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",L,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.data,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t,class:"train-item",onClick:t=>r.sendTrainNumber(e.trainnumber)},[(0,i._)("div",z,(0,C.zw)(e.trainnumber),1),(0,i._)("div",{class:"current-station",onClick:t=>r.sendTrainNumber(e.trainnumber)},[(0,i._)("div",null,(0,C.zw)(e.LocationSignature),1),(0,i._)("div",null,(0,C.zw)(e.FromLocation?e.FromLocation+" -> ":"")+(0,C.zw)(e.ToLocation?e.ToLocation:""),1)],8,V),r.hasDataticket(e.trainnumber)?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"submit",class:"edit-button1",onClick:t=>r.editFunction(e)}," Edit ",8,A)):((0,i.wg)(),(0,i.iD)("button",{key:1,type:"submit",class:"create-button",onClick:t=>r.createFunction(e)}," Create Ticket ",8,j))],8,R)))),128))],512),o.showTicketView?((0,i.wg)(),(0,i.iD)("div",x,[(0,i._)("div",N,[(0,i._)("button",{onClick:t[0]||(t[0]=(...e)=>r.closeTicketView&&r.closeTicketView(...e)),class:"close-button"}," Close Ticket "),(0,i._)("h1",S," Ärende för tågnummer "+(0,C.zw)(o.selectedItem.trainnumber),1),(0,i._)("p",M,"Id: #"+(0,C.zw)(o.selectedItem.activityId),1),o.selectedItem&&o.selectedItem.FromLocation?((0,i.wg)(),(0,i.iD)("h3",O,[(0,i.Uk)(" Tåg från "+(0,C.zw)(o.selectedItem.FromLocation)+" till "+(0,C.zw)(o.selectedItem.ToLocation)+". ",1),U,(0,i.Uk)(" Just nu i "+(0,C.zw)(o.selectedItem.LocationSignature)+". ",1)])):(0,i.kq)("",!0),o.selectedItem?((0,i.wg)(),(0,i.iD)("p",E,[Z,(0,i.Uk)(" "+(0,C.zw)(r.outputDelay(o.selectedItem)),1)])):(0,i.kq)("",!0),o.selectedItem?((0,i.wg)(),(0,i.iD)("p",q,[F,(0,i.Uk)(" "+(0,C.zw)(o.selectedItem.AdvertisedTimeAtLocation),1)])):(0,i.kq)("",!0),(0,i._)("form",{onSubmit:t[3]||(t[3]=(0,a.iM)(((...t)=>e.submitForm&&e.submitForm(...t)),["prevent"])),class:"create-ticket-form"},[H,$,(0,i.Wm)(c,{modelValue:o.selectedReason,"onUpdate:modelValue":t[1]||(t[1]=e=>o.selectedReason=e),reasonCodes:o.reasonCodes},null,8,["modelValue","reasonCodes"]),(0,i._)("div",P,[o.shouldDisplayCreateButton?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"submit-button",onClick:t[2]||(t[2]=e=>r.createTicket())}," Skapa nytt ärende ")):(0,i.kq)("",!0)])],32),(0,i._)("div",Y,[o.selectedItem?((0,i.wg)(),(0,i.iD)("ul",K,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.tickets,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e._id,class:"ticket-item"},[W,(0,i.Uk)(" "+(0,C.zw)(e.code),1),B,J,(0,i._)("button",{onClick:t=>r.updateTicket(e.activityId),class:"edit-button"}," Uppdatera ",8,G),(0,i._)("button",{onClick:t=>r.deleteTicket(e.activityId),class:"delete-button"}," Avsluta ärende",8,Q),X,ee])))),128))])):(0,i.kq)("",!0)])])])):(0,i.kq)("",!0)],64)}const se=["value"];function ae(e,t,s,n,o,r){return(0,i.wy)(((0,i.wg)(),(0,i.iD)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.selectedReason=e)},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.reasonCodes,(e=>((0,i.wg)(),(0,i.iD)("option",{key:e.Code,value:e.Code},(0,C.zw)(e.Code)+" - "+(0,C.zw)(e.Level1Description)+" - "+(0,C.zw)(e.Level2Description)+" - "+(0,C.zw)(e.Level3Description),9,se)))),128))],512)),[[a.bM,o.selectedReason]])}var ie={data(){return{selectedReason:null,reasonCodes:[],selectedLevel1Description:null,selectedLevel2Description:null,selectedLevel3Description:null}},mounted(){fetch("https://jsramverk-train-adde22anbx22.azurewebsites.net/codes").then((e=>e.json())).then((e=>{this.reasonCodes=e.data,this.reasonCodes.length>0&&(this.selectedReason=this.reasonCodes[0].Code,this.selectedReason=this.reasonCodes[0].Level1Description,this.selectedReason=this.reasonCodes[0].Level2Description,this.selectedReason=this.reasonCodes[0].Level3Description),this.$emit("reason-codes-loaded",this.reasonCodes)})).catch((e=>{console.error("Error fetching reason codes:",e)}))}};const ne=(0,r.Z)(ie,[["render",ae]]);var oe=ne,re=s(6154),ce={data(){return{showTicketView:!1,selectedItem:null,selectedReason:null,reasonCodes:[],tickets:[],createdTicket:null,socket:null,shouldDisplayCreateButton:!1}},props:{data:Array,datatickets:{type:Object,required:!0}},emits:["train-number-selected"],components:{ReasonCodes:oe},methods:{async deleteTicket(e=!1){try{const t=await re.Z.delete(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e}`);200===t.status?(alert("Ticket deleted successfully"),await this.closeTicketView()):(console.error("Unexpected response status:",t.status),console.log("Response Data:",t.data))}catch(t){console.error("Error deleting ticket:",t),console.log("Response Data:",t.response.data)}},hasDataticket(e){const t=this.datatickets.some((t=>t.trainnumber.toString()===e.toString()));return t},sendTrainNumber(e){this.$emit("train-number-selected",e)},createFunction(e){this.shouldDisplayCreateButton=!0,this.openTicketView(e)},editFunction(e){this.shouldDisplayCreateButton=!1,this.openTicketView(e)},async updateTicket(e){if(!this.selectedItem)return;if(!this.selectedReason)return void alert("Please select a reason code.");const t={code:this.selectedReason};try{const s=await re.Z.put(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e}`,t,{validateStatus:function(e){return console.log("Response Status Code:",e),e>=200&&e<300}});console.log("Response Data:",s.data),console.log("Response Headers:",s.headers),200===s.status?(alert("Ticket updated successfully"),await this.closeTicketView()):(console.error("Unexpected response status:",s.status),console.log("Response Data:",s.data))}catch(s){console.error("Error updating ticket:",s),console.log("Response Data:",s.response.data)}},async openTicketView(e){this.selectedItem=e,this.selectedItem.trainNumber=e.trainnumber,this.selectedItem.trainDate=e.AdvertisedTimeAtLocation,this.selectedItem.activityId=e.activityId,this.showTicketView=!0,this.socket=(0,T.ZP)("https://jsramverk-train-adde22anbx22.azurewebsites.net"),this.socket.emit("checkLock",{ticketId:e.activityId},(async t=>{if(t.isLocked)alert(`Ticket ${e.activityId} is already being handled.`),window.location.reload();else{this.socket.emit("openErrand",{ticketId:e.activityId});try{const t=await re.Z.get(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e.activityId}`);200===t.status&&(this.tickets=t.data.data,this.selectedItem=e,this.selectedItem.trainNumber=e.trainnumber,this.selectedItem.trainDate=e.AdvertisedTimeAtLocation,this.selectedItem.activityId=e.activityId,this.showTicketView=!0)}catch(s){console.error("No ticket has been created yet",s)}}}))},closeTicketView(){this.socket.emit("closeErrand",{ticketId:this.selectedItem.activityId}),this.showTicketView=!1,this.selectedItem=null,this.tickets=[],this.createdTicket=null,window.location.reload()},outputDelay(e){const t=new Date(e.AdvertisedTimeAtLocation),s=new Date(e.EstimatedTimeAtLocation),a=Math.abs(s-t);return Math.floor(a/6e4)+" minuter"},async createTicket(){if(!this.selectedReason)return void alert("Please select a reason code.");const e={code:this.selectedReason,trainnumber:this.selectedItem.trainnumber,activityId:this.selectedItem.activityId};try{const t=await re.Z.post("https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/",e,{validateStatus:function(e){return console.log("Response Status Code:",e),e>=200&&e<300}});console.log("Response Data:",t.data),console.log("Response Headers:",t.headers),200===t.status?(await this.closeTicketView(),this.createdTicket={code:t.data.code,trainnumber:t.data.trainnumber,traindate:t.data.traindate,activityId:t.data.activityId},alert("Ticket created successfully")):(console.error("Unexpected response status:",t.status),console.log("Response Data:",t.data))}catch(t){console.error("Error creating ticket:",t),console.log("Response Data:",t.response.data)}}}};const le=(0,r.Z)(ce,[["render",te],["__scopeId","data-v-69dbde2c"]]);var de=le;const ue={class:"train-number"},ke={key:0},he=(0,i._)("strong",null,"Orsakskod:",-1),me={class:"button-container2"},pe=["onClick"],be=["onClick"],ve={key:1,class:"modal-container"},ye={class:"modal",id:"train-modal"},we={class:"modal-title"},ge=(0,i._)("label",{for:"reason-code",class:"reason-code-label"},"Orsakskod",-1),fe=(0,i._)("br",null,null,-1),Te={key:0,class:"create-ticket-button"},De=(0,i._)("input",{type:"submit",value:"Skapa nytt ärende",class:"submit-button"},null,-1),Ie=[De],Ce={class:"selectedItem"},_e={key:0},Le=(0,i._)("strong",null,"Aktuell orsakskod:",-1),Re=(0,i._)("br",null,null,-1),ze=(0,i._)("br",null,null,-1),Ve=["onClick"],Ae=["onClick"],je=(0,i._)("br",null,null,-1),xe=(0,i._)("br",null,null,-1);function Ne(e,t,s,n,o,r){const c=(0,i.up)("reason-codes");return(0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.data,((s,n)=>((0,i.wg)(),(0,i.iD)("div",{key:n,class:"Ticket-item"},[(0,i._)("div",ue,(0,C.zw)(s.trainnumber),1),s.activityId?((0,i.wg)(),(0,i.iD)("div",ke)):(0,i.kq)("",!0),(0,i._)("div",null,[he,(0,i.Uk)(" "+(0,C.zw)(s.code),1)]),(0,i._)("div",null,(0,C.zw)(r.getLevel1Description(s.code))+" : "+(0,C.zw)(r.getLevel2Description(s.code))+" : "+(0,C.zw)(r.getLevel3Description(s.code)),1),(0,i._)("div",me,[(0,i._)("button",{class:"edit-button",onClick:e=>r.openTicketView(s)}," Uppdatera ",8,pe),(0,i._)("button",{onClick:e=>r.deleteItem(s),class:"delete-button"}," Avsluta ärende ",8,be)]),o.showTicketView?((0,i.wg)(),(0,i.iD)("div",ve,[(0,i._)("div",ye,[(0,i._)("button",{onClick:t[0]||(t[0]=(...e)=>r.closeTicketView&&r.closeTicketView(...e)),class:"close-button"}," Close Ticket "),(0,i._)("h1",we," Ärende för tågnummer "+(0,C.zw)(this.selectedItem.trainnumber),1),(0,i._)("form",{onSubmit:t[2]||(t[2]=(0,a.iM)(((...t)=>e.createTicket&&e.createTicket(...t)),["prevent"])),class:"create-ticket-form"},[ge,fe,(0,i.Wm)(c,{modelValue:o.selectedReason,"onUpdate:modelValue":t[1]||(t[1]=e=>o.selectedReason=e),reasonCodes:o.reasonCodes},null,8,["modelValue","reasonCodes"]),o.tickets&&0!==o.tickets.length?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",Te,Ie))],32),(0,i._)("div",Ce,[o.selectedItem?((0,i.wg)(),(0,i.iD)("ul",_e,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.tickets,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e._id,class:"ticket-item"},[Le,(0,i.Uk)(" "+(0,C.zw)(e.code),1),Re,ze,(0,i._)("button",{onClick:t=>r.updateTicket(e.activityId),class:"edit-button"}," Uppdatera ",8,Ve),(0,i._)("button",{onClick:t=>r.deleteTicket(e.activityId),class:"delete-button"}," Avsluta ärende",8,Ae),je,xe])))),128))])):(0,i.kq)("",!0)])])])):(0,i.kq)("",!0)])))),128)}var Se={data(){return{showTicketView:!1,selectedItem:null,selectedReason:null,reasonCodes:[],tickets:[],socket:null}},props:{data:{type:Object,required:!0},delayedData:{type:Array,required:!0}},components:{ReasonCodes:oe},methods:{getLevel1Description(e){const t=this.reasonCodes.find((t=>t.Code===e));return t?t.Level1Description:"N/A"},getLevel2Description(e){const t=this.reasonCodes.find((t=>t.Code===e));return t?t.Level2Description:"N/A"},getLevel3Description(e){const t=this.reasonCodes.find((t=>t.Code===e));return t?t.Level3Description:"N/A"},async deleteItem(e){this.socket=(0,T.ZP)("https://jsramverk-train-adde22anbx22.azurewebsites.net"),this.socket.emit("checkLock",{ticketId:e.activityId},(async t=>{if(t.isLocked)alert(`Ticket ${e.activityId} is already being handled.`),window.location.reload();else try{await this.deleteTicketHelper(e.activityId)}catch(s){console.error("Error deleting ticket:",s)}}))},async deleteTicket(e){this.selectedItem&&await this.deleteTicketHelper(e,!0)},async deleteTicketHelper(e,t=!1){try{const s=await re.Z.delete(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e}`);200===s.status?(alert("Ticket deleted successfully"),t?await this.closeTicketView():window.location.reload()):(console.error("Unexpected response status:",s.status),console.log("Response Data:",s.data))}catch(s){console.error("Error deleting ticket:",s),console.log("Response Data:",s.response.data)}},async updateTicket(e){if(!this.selectedItem)return;if(!this.selectedReason)return void alert("Please select a reason code.");const t={code:this.selectedReason};try{const s=await re.Z.put(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e}`,t,{validateStatus:function(e){return console.log("Response Status Code:",e),e>=200&&e<300}});200===s.status?(alert("Ticket updated successfully"),await this.closeTicketView()):(console.error("Unexpected response status:",s.status),console.log("Response Data:",s.data))}catch(s){console.error("Error updating ticket:",s),console.log("Response Data:",s.response.data)}},async openTicketView(e){this.selectedItem=e,this.selectedItem.trainNumber=e.trainnumber,this.selectedItem.trainDate=e.AdvertisedTimeAtLocation,this.selectedItem.activityId=e.activityId,this.showTicketView=!0,this.socket=(0,T.ZP)("https://jsramverk-train-adde22anbx22.azurewebsites.net"),this.socket.emit("checkLock",{ticketId:e.activityId},(async t=>{if(t.isLocked)alert(`Ticket ${e.activityId} is already being handled.`),window.location.reload();else{this.socket.emit("openErrand",{ticketId:e.activityId});try{const t=await re.Z.get(`https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets/${e.activityId}`);200===t.status&&(this.tickets=t.data.data,this.selectedItem=e,this.selectedItem.trainNumber=e.trainnumber,this.selectedItem.trainDate=e.AdvertisedTimeAtLocation,this.selectedItem.activityId=e.activityId,this.showTicketView=!0)}catch(s){console.error("No ticket has been created yet",s)}}}))},closeTicketView(){this.socket.emit("closeErrand",{ticketId:this.selectedItem.activityId}),this.showTicketView=!1,this.selectedItem=null,this.tickets=[],this.createdTicket=null,window.location.reload()}},mounted(){fetch("https://jsramverk-train-adde22anbx22.azurewebsites.net/codes").then((e=>e.json())).then((e=>{this.reasonCodes=e.data,this.reasonCodes.length>0&&(this.selectedReason=this.reasonCodes[0].Code,this.selectedReason=this.reasonCodes[0].Level1Description,this.selectedReason=this.reasonCodes[0].Level2Description,this.selectedReason=this.reasonCodes[0].Level3Description)})).catch((e=>{console.error("Error fetching reason codes:",e)}))}};const Me=(0,r.Z)(Se,[["render",Ne]]);var Oe=Me,Ue={data(){return{markersMap:new Map,delayedData:[],selectedTrainNumber:null,map:null,tickets:[]}},mounted(){this.renderMainView(),this.getAllTickets()},methods:{renderMainView(){const e=this.$refs.mainDelayedTrains;e.innerHTML="";const t=I().map(this.$refs.map).setView([62.173276,14.942265],5);this.map=t,I().tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(t);const a=(0,T.ZP)("https://jsramverk-train-adde22anbx22.azurewebsites.net");a.on("message",(e=>{const a=e.trainnumber;if(null===this.selectedTrainNumber||this.selectedTrainNumber===a){if(this.markersMap.has(a)){const t=this.markersMap.get(a);t.setLatLng(e.position)}else{const i=I().icon({iconUrl:s(7093),iconRetinaUrl:s(6431),iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34]}),n=I().marker(e.position,{icon:i,className:"leaflet-marker"}).bindPopup(a).addTo(t);n._icon.dataset.trainnumber=a,n.on("click",(()=>{this.selectedTrainNumber=a,this.delayedData=this.delayedData.filter((e=>e.trainnumber===this.selectedTrainNumber)),this.markersMap.forEach(((e,s)=>{s!==this.selectedTrainNumber&&(t.removeLayer(e),this.markersMap.delete(s))}))})),this.markersMap.set(a,n)}const i=this.delayedData.findIndex((e=>e.trainnumber===a));-1!==i?Object.assign(this.delayedData[i],e):this.delayedData.push(e)}}))},handleTrainNumberSelected(e){this.selectedTrainNumber=e,this.delayedData=this.delayedData.filter((e=>e.trainnumber===this.selectedTrainNumber)),this.markersMap.forEach(((e,t)=>{t!==this.selectedTrainNumber&&(this.map.removeLayer(e),this.markersMap.delete(t))}))},async getAllTickets(){try{const e=await re.Z.get("https://jsramverk-train-adde22anbx22.azurewebsites.net/tickets");e&&Array.isArray(e.data.data)?this.tickets=[...this.tickets,...e.data.data]:console.error("Response data is not an array or is empty:",e.data)}catch(e){console.error("Error fetching tickets:",e),e.response&&console.log("Response Data:",e.response.data)}}},components:{"render-delayed-table":de,"render-ticket-table":Oe}};const Ee=(0,r.Z)(Ue,[["render",f],["__scopeId","data-v-ed40c096"]]);var Ze=Ee;const qe=[{path:"/",name:"main",component:Ze}],Fe=(0,d.p7)({history:(0,d.r5)(),routes:qe});Fe.beforeEach(((e,t,s)=>{console.log("Navigating to:",e.path),s()}));var He=Fe;const $e=(0,a.ri)(l);$e.use(He),$e.mount("#app")}},t={};function s(a){var i=t[a];if(void 0!==i)return i.exports;var n=t[a]={exports:{}};return e[a].call(n.exports,n,n.exports,s),n.exports}s.m=e,function(){var e=[];s.O=function(t,a,i,n){if(!a){var o=1/0;for(d=0;d<e.length;d++){a=e[d][0],i=e[d][1],n=e[d][2];for(var r=!0,c=0;c<a.length;c++)(!1&n||o>=n)&&Object.keys(s.O).every((function(e){return s.O[e](a[c])}))?a.splice(c--,1):(r=!1,n<o&&(o=n));if(r){e.splice(d--,1);var l=i();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[a,i,n]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,n,o=a[0],r=a[1],c=a[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(c)var d=c(s)}for(t&&t(a);l<o.length;l++)n=o[l],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(d)},a=self["webpackChunktrain_controller_2_0"]=self["webpackChunktrain_controller_2_0"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(1955)}));a=s.O(a)})();
//# sourceMappingURL=app.4f7f3fe9.js.map