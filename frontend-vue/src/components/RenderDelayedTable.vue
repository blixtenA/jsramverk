<template>
    <h2>Total Delays: {{ data.length }}</h2>
    <div class="delayed-trains" ref="delayedTrains" id="delayed-trains">
        <div
            v-for="(item, index) in data"
            :key="index"
            class="train-item"
            @click="sendTrainNumber(item.trainnumber)"
        >
            <!-- Display train information -->
            <div class="train-number">{{ item.trainnumber }}</div>
            <div
                class="current-station"
                @click="sendTrainNumber(item.trainnumber)"
            >
                <!-- Click here to send the train number -->
                <div>{{ item.LocationSignature }}</div>
                <div>
                    {{ item.FromLocation ? item.FromLocation + " -> " : "" }}
                    {{ item.ToLocation ? item.ToLocation : "" }}
                </div>
            </div>
            <!-- Edit and Delete buttons -->
            <button @click="openTicketView(item)">Open Errand</button>
        </div>
    </div>

    <!-- Full-page modal -->
    <div v-if="showTicketView" class="modal-container">
        <div class="modal" id="train-modal">
            <!-- Rest of your template -->
            <button @click="closeTicketView" id="back">Close Ticket</button>
            <button @click="deleteTicket(selectedItem.activityId)">
                Delete
            </button>
            <h1>Nytt ärende #{{ selectedItem.activityId }}</h1>
            <ul v-if="selectedItem">
                <li v-for="ticket in tickets" :key="ticket._id">
                    <strong>Id:</strong> {{ ticket._id }}<br />
                    <strong>Orsakskod:</strong> {{ ticket.code }}<br /><br />
                    <button @click="updateTicket(ticket.activityId)">
                        Edit</button
                    ><br /><br />
                    <strong>Tågnummer:</strong> {{ ticket.trainnumber }}<br />
                    <strong>Tågdatum:</strong> {{ ticket.traindate }}
                    <strong>ActivityID:</strong> {{ ticket.activityId }}
                </li>
            </ul>
            <h3 v-if="selectedItem && selectedItem.FromLocation">
                Tåg från {{ selectedItem.FromLocation }} till
                {{ selectedItem.ToLocation }}. Just nu i
                {{ selectedItem.LocationSignature }}.
            </h3>
            <p v-if="selectedItem">
                <strong>Försenad:</strong> {{ outputDelay(selectedItem) }}
            </p>

            <p v-if="selectedItem">
                <strong>Advertised Time:</strong>
                {{ selectedItem.AdvertisedTimeAtLocation }}
            </p>
            <form @submit.prevent="createTicket">
                <label for="reason-code">Orsakskod</label><br />

                <reason-codes
                    v-model="selectedReason"
                    :reasonCodes="reasonCodes"
                ></reason-codes>
                <br /><br />
                <input type="submit" value="Skapa nytt ärende" />
            </form>
        </div>
    </div>
</template>

<script>
import ReasonCodes from "./ReasonCodes.vue";
import axios from "axios";
import io from "socket.io-client";

export default {
    data() {
        return {
            showTicketView: false,
            selectedItem: null,
            selectedReason: null,
            reasonCodes: [],
            tickets: [], // Store ticket data
            createdTicket: null, // Declare createdTicket
            socket: null,
        };
    },
    props: {
        data: Array,
    },
    emits: ["train-number-selected"],
    components: {
        ReasonCodes,
    },
    methods: {
        logItem() {
            console.log("Current Item:", this.item);
        },
        /* Emit an event to send the train number to the map view */
        sendTrainNumber(trainnumber) {
            this.$emit("train-number-selected", trainnumber);
        },

        async deleteTicket(activityId) {
            if (!this.selectedItem) {
                return;
            }

            try {
                const response = await axios.delete(
                    `http://localhost:1337/tickets/${activityId}`
                );

                if (response.status === 200) {
                    alert("Ticket deleted successfully");
                    // Reload the list of tickets after deletion
                    window.location.reload(); // Refresh the page
                } else {
                    console.error(
                        "Unexpected response status:",
                        response.status
                    );
                    console.log("Response Data:", response.data);
                }
            } catch (error) {
                console.error("Error deleting ticket:", error);
                console.log("Response Data:", error.response.data);
            }
        },

        async updateTicket(activityId) {
            if (!this.selectedItem) {
                return;
            }

            const updatedTicketData = {
                _id: this.selectedItem._id,
                code: this.selectedReason,
                trainnumber: this.selectedItem.trainNumber,
                traindate: this.selectedItem.trainDate,
                activityId: this.selectedItem.activityId,
            };

            try {
                const response = await axios.put(
                    `http://localhost:1337/tickets/${activityId}`,
                    updatedTicketData,
                    {
                        validateStatus: function (status) {
                            console.log("Response Status Code:", status);
                            return status >= 200 && status < 300;
                        },
                    }
                );

                console.log("Response Data:", response.data);
                console.log("Response Headers:", response.headers);

                if (response.status === 200) {
                    alert("Ticket updated successfully");
                    await this.openTicketView(this.selectedItem);
                } else {
                    console.error(
                        "Unexpected response status:",
                        response.status
                    );
                    console.log("Response Data:", response.data);
                }
            } catch (error) {
                console.error("Error updating ticket:", error);
                console.log("Response Data:", error.response.data);
            }
        },

        async openTicketView(item) {
            this.selectedItem = item;
            this.selectedItem.trainNumber = item.OperationalTrainNumber; // Set trainNumber
            this.selectedItem.trainDate = item.AdvertisedTimeAtLocation; // Set trainDate (update with the correct property)
            this.selectedItem.activityId = item.activityId;
            this.showTicketView = true;
            // Connect to Socket.IO server
            this.socket = io("http://localhost:1337");

            // Check if the ticket is already locked
            this.socket.emit(
                "checkLock",
                { ticketId: item.activityId },
                async (response) => {
                    if (response.isLocked) {
                        alert(
                            `Ticket ${item.activityId} is already being handled.`
                        );
                        window.location.reload(); // Refresh the page
                    } else {
                        // Emit the 'openErrand' event to the server with the ticketId
                        this.socket.emit("openErrand", {
                            ticketId: item.activityId,
                        });

                        try {
                            const response = await axios.get(
                                `http://localhost:1337/tickets/${item.activityId}`
                            );

                            if (response.status === 200) {
                                this.tickets = response.data.data;
                                this.selectedItem = item;
                                this.selectedItem.trainNumber =
                                    item.OperationalTrainNumber; // Set trainNumber
                                this.selectedItem.trainDate =
                                    item.AdvertisedTimeAtLocation; // Set trainDate (update with the correct property)
                                this.selectedItem.activityId = item.activityId;
                                this.showTicketView = true;
                            } else {
                                console.error(
                                    "Failed to fetch ticket data:",
                                    response.status
                                );
                            }
                        } catch (error) {
                            console.error("Error fetching ticket data:", error);
                        }
                    }
                }
            );
        },
        closeTicketView() {
            this.socket.emit("closeErrand", {
                ticketId: this.selectedItem.activityId,
            });
            this.showTicketView = false;
            // Emit the 'closeErrand' event to the server with the ticketId
            this.selectedItem = null; // Reset selectedItem
            this.tickets = []; // Reset tickets
            this.createdTicket = null; // Reset createdTicket
            // Emit the 'releaseTicket' event to the server with the activityId

            window.location.reload(); // Refresh the pages
        },
        outputDelay(item) {
            const advertised = new Date(item.AdvertisedTimeAtLocation);
            const estimated = new Date(item.EstimatedTimeAtLocation);
            const diff = Math.abs(estimated - advertised);
            return Math.floor(diff / (1000 * 60)) + " minuter";
        },
        async createTicket() {
            // Check if a reason code is selected
            if (!this.selectedReason) {
                // Use this.selectedReason here
                alert("Please select a reason code.");
                return;
            }

            // Create an object with the ticket data
            const ticketData = {
                code: this.selectedReason,
                trainnumber: this.selectedItem.trainNumber,
                traindate: this.selectedItem.trainDate,
                activityId: this.selectedItem.activityId, // Corrected line
            };

            // Log the ticketData object to the console for debugging
            console.log("ticketData:", ticketData);

            try {
                const response = await axios.post(
                    "http://localhost:1337/tickets",
                    ticketData,
                    {
                        validateStatus: function (status) {
                            console.log("Response Status Code:", status);
                            return status >= 200 && status < 300;
                        },
                    }
                );

                // Log the entire response object
                console.log("Response Data:", response.data);
                console.log("Response Headers:", response.headers);

                // Handle the successful creation of the ticket
                if (response.status === 200) {
                    // Set the createdTicket property and display a success message
                    await this.openTicketView(this.selectedItem);

                    this.createdTicket = {
                        code: response.data.code,
                        trainnumber: response.data.trainnumber,
                        traindate: response.data.traindate,
                        activityId: response.data.activityId,
                    };
                    alert("Ticket created successfully");
                } else {
                    console.error(
                        "Unexpected response status:",
                        response.status
                    );
                    console.log("Response Data:", response.data); // Log response data
                }
            } catch (error) {
                console.error("Error creating ticket:", error);
                console.log("Response Data:", error.response.data); // Log response data in the case of an error
            }
        },
    },
};
</script>

<style>
.modal {
    position: fixed;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-content {
    padding: 20px;
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;
    z-index: 10000;
}

/* Close button */
.modal-content button {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 40px;
}

select {
    width: 250px; /* Set a specific width that suits your content */
}
</style>
