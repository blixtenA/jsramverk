<template>
    <div class="container">
        <div class="delayed">
            <h1>Försenade tåg</h1>
            <div class="main-delayed-trains" ref="mainDelayedTrains"></div>
            <render-delayed-table :data="delayedData"></render-delayed-table>
        </div>
        <div class="map" ref="map"></div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
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
      const container = this.$refs.mainDelayedTrains;
      container.innerHTML = "";

      const map = L.map(this.$refs.map).setView([62.173276, 14.942265], 5);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Update the socket connection URL to your Azure backend
      const socket = io("https://jsramverk-train-adde22anbx22.azurewebsites.net");

      socket.on("message", (data) => {
        if (data.trainnumber in this.markers) {
            let marker = this.markers[data.trainnumber];
            marker.setLatLng(data.position);
        } else {
            const defaultIcon = L.icon({
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconSize: [25, 41], 
            iconAnchor: [12, 41], 
            popupAnchor: [1, -34],
            });

            // Create a marker using the default icon and bind it to the map
            let marker = L.marker(data.position, { icon: defaultIcon })
            .bindPopup(data.trainnumber)
            .addTo(map);
            
            this.markers[data.trainnumber] = marker;
        }
    });

      // Update the fetch URL to your Azure backend
      fetch("https://jsramverk-train-adde22anbx22.azurewebsites.net/delayed")
        .then((response) => response.json())
        .then((result) => {
          this.delayedData = result.data;
        });
    },
  },
  components: {
    "render-delayed-table": RenderDelayedTable,
  },
};
</script>
