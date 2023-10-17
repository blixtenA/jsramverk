<template>
    <h2>Total Delays: {{ data.length }}</h2>
    <div class="delayed-trains" ref="delayedTrains" id="delayed-trains">
        <div
            v-for="(item, index) in data"
            :key="index"
            @click="openTicketView(item)"
            class="train-item"
        >
            <!-- Display train information -->
            <div class="train-number">{{ item.OperationalTrainNumber }}</div>
            <div class="current-station">
                <div>{{ item.LocationSignature }}</div>

                <div>
                    {{
                        item.FromLocation
                            ? item.FromLocation[0].LocationName + " -> "
                            : ""
                    }}
                    {{ item.ToLocation ? item.ToLocation[0].LocationName : "" }}
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
            <button @click="editTicket(item)">Edit</button>
            <button @click="deleteTicket(item._id)">Delete</button>
            <h1>Nytt ärende #{{ selectedItem.ActivityId }}</h1>
            <ul v-if="selectedItem">
                <li v-for="ticket in tickets" :key="ticket._id">
                    <strong>Orsakskod:</strong> {{ ticket.code }}<br />
                    <strong>Tågnummer:</strong> {{ ticket.trainnumber }}<br />
                    <strong>Tågdatum:</strong> {{ ticket.traindate }}
                </li>
            </ul>
            <h3 v-if="selectedItem && selectedItem.FromLocation">
                Tåg från {{ selectedItem.FromLocation[0].LocationName }} till
                {{ selectedItem.ToLocation[0].LocationName }}. Just nu i
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

export default {
    data() {
        return {
            showTicketView: false,
            selectedItem: null,
            selectedReason: null,
            reasonCodes: [],
            tickets: [], // Store ticket data
            createdTicket: null, // Declare createdTicket
        };
    },
    props: {
        data: Array,
    },
    components: {
        ReasonCodes, // Register the ReasonCodes component here
    },
    methods: {
        async openTicketView(item) {
            this.selectedItem = item;
            this.selectedItem.trainNumber = item.OperationalTrainNumber; // Set trainNumber
            this.selectedItem.trainDate = item.AdvertisedTimeAtLocation; // Set trainDate (update with the correct property)
            this.selectedItem.activityId = item.ActivityId;
            this.showTicketView = true;
            // Fetch ticket data when a ticket is opened
            try {
                const response = await axios.get(
                    "https://localhost:1337/tickets"
                );

                if (response.status === 200) {
                    this.tickets = response.data.data;
                } else {
                    console.error(
                        "Failed to fetch ticket data:",
                        response.status
                    );
                }
            } catch (error) {
                console.error("Error fetching ticket data:", error);
            }

            this.showTicketView = true;
        },
        closeTicketView() {
            this.showTicketView = false;
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
                    "https:https://localhost:3000/tickets",
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
    padding: 10px 20px;
}

select {
    width: 250px; /* Set a specific width that suits your content */
}
</style>
