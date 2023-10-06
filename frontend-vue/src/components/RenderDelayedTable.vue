<template>
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
            <h1>Nytt ärende #{{ newTicketId }}</h1>
            <h3 v-if="selectedItem && selectedItem.FromLocation">
                Tåg från {{ selectedItem.FromLocation[0].LocationName }} till
                {{ selectedItem.ToLocation[0].LocationName }}. Just nu i
                {{ selectedItem.LocationSignature }}.
            </h3>
            <p v-if="selectedItem">
                <strong>Försenad:</strong> {{ outputDelay(selectedItem) }}
            </p>
            <form @submit.prevent="createTicket">
                <label for="reason-code">Orsakskod</label><br />

                <reason-codes></reason-codes>
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
        };
    },
    props: {
        data: Array,
    },
    components: {
        ReasonCodes, // Register the ReasonCodes component here
    },
    methods: {
        openTicketView(item) {
            this.selectedItem = item;
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
                alert("Please select a reason code.");
                return;
            }

            // Create an object with the ticket data
            const ticketData = {
                code: this.selectedReason,
                trainnumber: this.selectedItem.trainNumber,
                traindate: this.selectedItem.trainDate,
            };

            try {
                // Make a POST request to your backend API to create a new ticket
                const response = await axios.post("/api/tickets", ticketData);

                // Handle the successful creation of the ticket
                const createdTicket = response.data.data;

                // Set the createdTicket property to display the created ticket details
                this.createdTicket = {
                    code: createdTicket.code,
                    trainnumber: createdTicket.trainnumber,
                    traindate: createdTicket.traindate,
                };

                // Display a success message (you can customize this message)
                alert("Ticket created successfully");

                // Optionally, you can close the ticket view or perform other actions here
            } catch (error) {
                // Handle errors (e.g., display an error message)
                console.error("Error creating ticket:", error);
                alert("Error creating ticket: " + error.message);
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
