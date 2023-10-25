<template>
    <div v-for="(item, index) in data" :key="index" class="Ticket-item">
        <div><strong>Id:</strong> {{ item._id }}</div>
        <div v-if="item.activityId">
            <strong>ActivityId:</strong> {{ item.activityId }}
        </div>
        <div><strong>Orsakskod:</strong> {{ item.code }}</div>
        <div><strong>Tågnummer:</strong> {{ item.trainnumber }}</div>
        <div><strong>Tågdatum:</strong> {{ item.traindate }}</div>
        <div>
            <button @click="openTicketView(item)">Open Errand</button>
        </div>
    </div>

    <!-- Full-page modal -->
    <div v-if="showTicketView" class="modal-container">
        <div class="modal" id="train-modal">
            <!-- Rest of your template -->
            <button @click="closeTicketView" id="back">Close Ticket</button>

            <h1 v-if="selectedItem && selectedItem.activityId">
                Nytt ärende #{{ selectedItem.activityId }}
            </h1>
            <ul v-if="selectedItem">
                <li v-for="ticket in tickets" :key="ticket._id">
                    <strong>Id:</strong> {{ ticket._id }}<br />
                    <strong>Orsakskod:</strong> {{ ticket.code }}<br /><br />
                    <button @click="updateTicket(ticket.activityId)">
                        Edit</button
                    ><br /><br />
                    <button @click="deleteTicket(ticket.activityId)">
                        Delete
                    </button>
                    <br /><br />
                    <strong>Tågnummer:</strong> {{ ticket.trainnumber }}
                    <br /><br />
                    <strong>Tågdatum:</strong> {{ ticket.traindate }}
                    <br />
                </li>
            </ul>

            <form @submit.prevent="createTicket">
                <label for="reason-code">Orsakskod</label><br />
                <reason-codes
                    v-model="selectedReason"
                    :reasonCodes="reasonCodes"
                ></reason-codes>
                <div
                    v-if="!tickets || tickets.length === 0"
                    class="create-ticket-button"
                >
                    <br /><br />
                    <input type="submit" value="Skapa nytt ärende" />
                </div>
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
            socket: null,
        };
    },
    props: {
        data: {
            type: Object, // Change the prop type to Object
            required: true,
        },
        delayedData: {
            type: Array,
            required: true,
        },
    },
    components: {
        ReasonCodes,
    },
    methods: {
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
                code: this.selectedReason,
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

            try {
                const response = await axios.get(
                    `http://localhost:1337/tickets/${item.activityId}`
                );

                if (response.status === 200) {
                    this.tickets = response.data.data;
                    this.selectedItem = item;
                    this.selectedItem.trainNumber = item.OperationalTrainNumber; // Set trainNumber
                    this.selectedItem.trainDate = item.AdvertisedTimeAtLocation; // Set trainDate (update with the correct property)
                    this.selectedItem.activityId = item.activityId;
                    this.showTicketView = true;
                }
            } catch (error) {
                console.error("No ticket have been created yet");
            }
        },
        closeTicketView() {
            this.showTicketView = false;
            // Emit the 'closeErrand' event to the server with the ticketId
            this.selectedItem = null; // Reset selectedItem
            this.tickets = []; // Reset tickets
            this.createdTicket = null; // Reset createdTicket
            // Emit the 'releaseTicket' event to the server with the activityId

            window.location.reload(); // Refresh the pages
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

<style scoped>
.ticket-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
