<template>
    <div class="container">
        <div class="delayed">
            <h1>Försenade tåg</h1>
            <div class="main-delayed-trains" ref="mainDelayedTrains"></div>
            <render-delayed-table 
                :data="delayedData"
                @train-number-selected="handleTrainNumberSelected">
            </render-delayed-table>
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
      markersMap: new Map(),
      delayedData: [],
      selectedTrainNumber: null,
      map: null,
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
      this.map = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const socket = io("http://localhost:1337");

      socket.on("message", (data) => {
        const trainnumber = data.trainnumber;

        /* Update markers and data for the selected train number */
        if (this.selectedTrainNumber === null || this.selectedTrainNumber === trainnumber) {
          if (this.markersMap.has(trainnumber)) {
            const marker = this.markersMap.get(trainnumber);
            marker.setLatLng(data.position);
          } else {
            const defaultIcon = L.icon({
              iconUrl: require("leaflet/dist/images/marker-icon.png"),
              iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            });

            const marker = L.marker(data.position, {
              icon: defaultIcon,
              className: 'leaflet-marker'
            })
              .bindPopup(trainnumber)
              .addTo(map);

            marker._icon.dataset.trainnumber = trainnumber;

            marker.on("click", () => {
              /* When a marker is clicked, set the selected train number */
              this.selectedTrainNumber = trainnumber;

              /* Filter the delayedData array based on the selected train number */
              this.delayedData = this.delayedData.filter(
                (item) => item.trainnumber === this.selectedTrainNumber
              );

              /* Remove markers for non-selected train numbers from map */
              this.markersMap.forEach((marker, num) => {
                if (num !== this.selectedTrainNumber) {
                  map.removeLayer(marker);
                  this.markersMap.delete(num);
                }
              });
            });

            /* Store the marker in markersMap */
            this.markersMap.set(trainnumber, marker);
          }

          const dataIndex = this.delayedData.findIndex(
            (item) => item.trainnumber === trainnumber
          );

          if (dataIndex !== -1) {
            Object.assign(this.delayedData[dataIndex], data);
          } else {
            this.delayedData.push(data);
          }
        }
      });
    },

    handleTrainNumberSelected(trainnumber) {
      this.selectedTrainNumber = trainnumber;

    /* Filter the array based on the selected train number */
    this.delayedData = this.delayedData.filter(
        (item) => item.trainnumber === this.selectedTrainNumber
    );

    /* Remove markers for non-selected train numbers from map */
    this.markersMap.forEach((marker, num) => {
        if (num !== this.selectedTrainNumber) {
        this.map.removeLayer(marker);
        this.markersMap.delete(num);
        }
    });
    },
  },

  components: {
    "render-delayed-table": RenderDelayedTable,
  },
};
</script>

    