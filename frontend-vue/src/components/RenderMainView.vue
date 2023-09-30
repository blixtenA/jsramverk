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
      console.log("Starting renderMainView"); // Log when the function starts

      const container = this.$refs.mainDelayedTrains;
      container.innerHTML = "";

      const map = L.map(this.$refs.map).setView([62.173276, 14.942265], 5);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const socket = io(
        "https://jsramverk-train-adde22anbx22.azurewebsites.net"
      );

      // Add a "message" event listener to handle incoming data
      socket.on("message", (data) => {
        console.log("Received data from socket:", data);

        if (data.trainnumber in this.markers) {
          let marker = this.markers[data.trainnumber];
          marker.setLatLng(data.position);
          console.log("Updated existing marker:", data.trainnumber);
        } else {
          let marker = L.marker(data.position)
            .bindPopup(data.trainnumber)
            .addTo(map);
          this.markers[data.trainnumber] = marker;
          console.log("Added new marker:", data.trainnumber);
        }
      });
      console.log("After defining socket event listener");
      
      // Update the fetch URL to your Azure backend
      fetch(
        "https://jsramverk-train-adde22anbx22.azurewebsites.net/delayed"
      )
        .then((response) => response.json())
        .then((result) => {
          this.delayedData = result.data;
          console.log("Fetched delayed data:", this.delayedData);
        })
        .catch((error) => {
          console.error("Error fetching delayed data:", error);
        });

      console.log("Exiting renderMainView"); // Log when the function finishes
    },
  },
  components: {
    "render-delayed-table": RenderDelayedTable,
  },
};
</script>
