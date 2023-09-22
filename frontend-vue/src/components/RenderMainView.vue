<template>
    <div class="container">
      <div class="delayed">
        <h1>Försenade tåg</h1>
        <div class="delayed-trains" ref="delayedTrains"></div>
        <render-delayed-table :data="delayedData"></render-delayed-table>
      </div>
      <div class="map" ref="map"></div>
    </div>
  </template>
  
  <script>
  import io from "socket.io-client";
  import L from "leaflet";
  import RenderDelayedTable from "./RenderDelayedTable.vue";
  import "../../public/style.css";

  export default {
    data() {
      return {
        markers: {},
        delayedData: [],
      };
    },
    mounted() {
      this.renderMainView();
    },
    methods: {
      renderMainView() {
        const container = this.$refs.delayedTrains;
        container.innerHTML = '';
  
        const map = L.map(this.$refs.map).setView([62.173276, 14.942265], 5);
  
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
  
        const socket = io("http://localhost:1337");
  
        socket.on("message", (data) => {
            if (data.trainnumber in this.markers) {
                let marker = this.markers[data.trainnumber];
                marker.setLatLng(data.position);
            } else {
                let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
                this.markers[data.trainnumber] = marker;
            }
        });
  
        fetch("http://localhost:1337/delayed")
        .then((response) => response.json())
        .then((result) => {
          this.delayedData = result.data;
        });
    },
  },
  components: {
    'render-delayed-table': RenderDelayedTable,
  },
};
</script>
