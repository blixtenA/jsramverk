<template>
    <div>
        <div class="container">
            <div class="delayed">
                <h1>Försenade tåg</h1>
                <div class="main-delayed-trains" ref="mainDelayedTrains"></div>
                <render-delayed-table
                    :data="delayedData"
                    @train-number-selected="handleTrainNumberSelected"
                ></render-delayed-table>
            </div>
            <div class="map" ref="map"></div>
        </div>
        <div class="container2">
            <div class="tickets">
                <h1>Tickets</h1>
                <div class="main-ticket-items" ref="mainTicketsItems">
                    <render-ticket-table :data="tickets" :delayedData="delayedData"></render-ticket-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet";
import RenderDelayedTable from "./RenderDelayedTable.vue";
import TicketItem from "./TicketItem.vue";
import "../../public/style.css";
import axios from "axios";

export default {
    data() {
        return {
            markersMap: new Map(),
            delayedData: [],
            selectedTrainNumber: null,
            map: null,
            tickets: [], // Initialize tickets as an empty array
        };
    },
    mounted() {
        this.renderMainView();
        this.getAllTickets(); // Fetch all tickets when the component is mounted
    },
    methods: {
        renderMainView() {
            const container = this.$refs.mainDelayedTrains;
            container.innerHTML = "";

            const map = L.map(this.$refs.map).setView(
                [62.173276, 14.942265],
                5
            );
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
                if (
                    this.selectedTrainNumber === null ||
                    this.selectedTrainNumber === trainnumber
                ) {
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
                            className: "leaflet-marker",
                        })
                            .bindPopup(trainnumber)
                            .addTo(map);

                        marker._icon.dataset.trainnumber = trainnumber;

                        marker.on("click", () => {
                            /* When a marker is clicked, set the selected train number */
                            this.selectedTrainNumber = trainnumber;

                            /* Filter the delayedData array based on the selected train number */
                            this.delayedData = this.delayedData.filter(
                                (item) =>
                                    item.trainnumber ===
                                    this.selectedTrainNumber
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
        async getAllTickets() {
            try {
                const response = await axios.get(
                    "http://localhost:1337/tickets"
                );
                if (response && Array.isArray(response.data.data)) {
                    this.tickets = [...this.tickets, ...response.data.data]; // Use spread operator to merge the arrays
                } else {
                    console.error(
                        "Response data is not an array or is empty:",
                        response.data
                    );
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
                if (error.response) {
                    console.log("Response Data:", error.response.data);
                }
            }
        },
    },
    components: {
        "render-delayed-table": RenderDelayedTable,
        "render-ticket-table": TicketItem,
    },
};
</script>
