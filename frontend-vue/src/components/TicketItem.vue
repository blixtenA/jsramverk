<template>
    <div v-for="(item, index) in data" :key="index" class="Ticket-item">
        <div class="train-number">
            <strong>Tågnummer:</strong> {{ item.trainnumber }}
        </div>
        <div v-if="item.activityId"></div>
        <div><strong>Orsakskod:</strong> {{ item.code }}</div>

        <div>
            <button class="edit-button2" @click="openTicketView(item)">
                Edit Ticket
            </button>
        </div>

        <!-- Full-page modal -->
        <div v-if="showTicketView" class="modal-container">
            <div class="modal" id="train-modal">
                <!-- Rest of your template -->
                <button @click="closeTicketView" class="close-button">
                    Close Ticket
                </button>

                <h1 class="modal-title">
                    Ärende för tågnummer {{ item.trainnumber }}
                </h1>

                <form @submit.prevent="createTicket" class="create-ticket-form">
                    <label for="reason-code" class="reason-code-label"
                        >Orsakskod</label
                    ><br />
                    <reason-codes
                        v-model="selectedReason"
                        :reasonCodes="reasonCodes"
                    ></reason-codes>

                    <div
                        v-if="!tickets || tickets.length === 0"
                        class="create-ticket-button"
                    >
                        <input
                            type="submit"
                            value="Skapa nytt ärende"
                            class="submit-button"
                        />
                    </div>
                </form>

                <!-- Edit and Delete buttons -->
                <div class="selectedItem">
                    <ul v-if="selectedItem">
                        <li
                            v-for="ticket in tickets"
                            :key="ticket._id"
                            class="ticket-item"
                        >
                            <strong>Aktuell orsakskod:</strong> {{ ticket.code
                            }}<br /><br />
                            <button
                                @click="updateTicket(ticket.activityId)"
                                class="edit-button"
                            >
                                Uppdatera
                            </button>
                            <button
                                @click="deleteTicket(ticket.activityId)"
                                class="delete-button"
                            >
                                Avsluta ärende</button
                            ><br /><br />
                        </li>
                    </ul>
                </div>
            </div>
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
                    window.location.reload(); // Refresh the page
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
            this.selectedItem = {
                ...item,
                trainNumber: item.OperationalTrainNumber,
                trainDate: item.AdvertisedTimeAtLocation,
                activityId: item.activityId,
            };
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

.close-button {
    background: #ff5733;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

.modal-title {
    font-size: 24px;
    margin: 10px 0;
}

select {
    width: 250px; /* Set a specific width that suits your content */
}
</style>

<style scoped>
.ticket-item {
    padding: 10px;
    margin-bottom: 10px;
}

.edit-button,
.delete-button {
    background: #3498db;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
}

.edit-button2 {
    background: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px; /* Adjust the padding as needed */
    border-radius: 4px;
    cursor: pointer;
    margin-left: 6vh;
}

.edit-button2:hover {
    background: #2980b9;
}

.edit-button:hover,
.delete-button:hover {
    background: #2980b9;
}

.selectedItem ul {
    list-style-type: none;
}
</style>
