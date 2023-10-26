<template>
    <div class="delayed-trains" ref="delayedTrains" id="delayed-trains">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="train-item"
        @click="sendTrainNumber(item.trainnumber)"
      >
        <div class="train-number">{{ item.trainnumber }}</div>
        <div
          class="current-station"
          @click="sendTrainNumber(item.trainnumber)"
        >
          <div>{{ item.LocationSignature }}</div>
          <div>
            {{ item.FromLocation ? item.FromLocation + " -> " : ""
            }}{{ item.ToLocation ? item.ToLocation : "" }}
          </div>
        </div>
      <!-- Display the "Edit" button if there's a match, otherwise display the "Create Ticket" button -->
      <button
        v-if="hasDataticket(item.trainnumber)"
        type="submit"
        class="edit-button1"
        @click="editFunction(item)"
      >
        Edit
      </button>
      <button
        v-else
        type="submit"
        class="create-button"
        @click="createFunction(item)"
      >
        Create Ticket
      </button>
      </div>
    </div>

    <div v-if="showTicketView" class="modal-container">
        <div class="modal" id="train-modal">
            <button @click="closeTicketView" class="close-button">
                Close Ticket
            </button>
            <h1 class="modal-title">
                Ärende för tågnummer {{ selectedItem.trainnumber }}
            </h1>
            <p class="activity-id">Id: #{{ selectedItem.activityId }}</p>
            <h3 v-if="selectedItem && selectedItem.FromLocation">
                Tåg från {{ selectedItem.FromLocation }} till
                {{ selectedItem.ToLocation }}. <br />
                Just nu i {{ selectedItem.LocationSignature }}.
            </h3>
            <p v-if="selectedItem" class="delay-info">
                <strong>Försenad:</strong> {{ outputDelay(selectedItem) }}
            </p>
            <p v-if="selectedItem" class="advertised-time">
                <strong>Advertised Time:</strong>
                {{ selectedItem.AdvertisedTimeAtLocation }}
            </p>

            <form @submit.prevent="submitForm" class="create-ticket-form">
            <label for="reason-code" class="reason-code-label">Orsakskod</label><br />
            <reason-codes v-model="selectedReason" :reasonCodes="reasonCodes"></reason-codes>

            <!-- Display "Skapa nytt ärende" button when creating a new ticket -->
            <div class="create-ticket-button">
                <button
                v-if="shouldDisplayCreateButton"
                type="button"
                class="submit-button"
                @click="createTicket()"
                >
                Skapa nytt ärende
                </button>
            </div>
            </form>

            <!-- Edit and Delete buttons -->
            <div class="selectedItem">
            <ul v-if="selectedItem">
                <li v-for="ticket in tickets" :key="ticket._id" class="ticket-item">
                <strong>Aktuell orsakskod:</strong> {{ ticket.code }}<br /><br />
                <button @click="updateTicket(ticket.activityId)" class="edit-button">
                    Uppdatera
                </button>
                <button @click="deleteTicket(ticket.activityId)" class="delete-button">
                    Avsluta ärende
                </button><br /><br />
                </li>
            </ul>
            </div>
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
            tickets: [], 
            createdTicket: null, 
            socket: null,
            shouldDisplayCreateButton: false,
        };
    },
    props: {
        data: Array,
        datatickets: {
            type: Object,
            required: true,
        },
    },
    emits: ["train-number-selected"],
    components: {
        ReasonCodes,
    },
    methods: {
        hasDataticket(trainnumber) {
            const hasMatch = this.datatickets.some((dataticket) => {
                return dataticket.trainnumber.toString() === trainnumber.toString();
            });

            return hasMatch;
        },

        /* Emit an event to send the train number to the map view */
        sendTrainNumber(trainnumber) {
            this.$emit("train-number-selected", trainnumber);
        },

        createFunction(item) {
            this.shouldDisplayCreateButton = true;
            this.openTicketView(item);
        },

        editFunction(item) {
            this.shouldDisplayCreateButton = false;
            this.openTicketView(item);
        },

        async updateTicket(activityId) {
            if (!this.selectedItem) {
                return;
            }

            if (!this.selectedReason) {
                alert("Please select a reason code.");
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
                    await this.closeTicketView();
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
            this.selectedItem.trainNumber = item.trainnumber; 
            this.selectedItem.trainDate = item.AdvertisedTimeAtLocation; 
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
                                this.selectedItem.trainNumber = item.trainnumber; 
                                this.selectedItem.trainDate = item.AdvertisedTimeAtLocation;
                                this.selectedItem.activityId = item.activityId;
                                this.showTicketView = true;
                            }
                        } catch (error) {
                            console.error(
                                "No ticket has been created yet",
                                error
                            );
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
            this.selectedItem = null; 
            this.tickets = []; 
            this.createdTicket = null; 
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
                trainnumber: this.selectedItem.trainnumber,
                activityId: this.selectedItem.activityId,
            };

            console.log("ticketData:", ticketData);

            try {
                console.log("post");
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
                    await this.closeTicketView();

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

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align modal to the top */
    overflow: auto;
    z-index: 1001; /* Ensure the modal is on top of other content */
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 80%;
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

.close-button {
    background: #ff5733;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.modal-title {
    font-size: 24px;
    margin: 10px 0;
}

.activity-id {
    font-size: 14px;
    margin: 5px 0;
}

.ticket-item {
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

.edit-button:hover,
.delete-button:hover {
    background: #2980b9;
}

.delay-info,
.advertised-time {
    font-size: 16px;
    margin: 10px 0;
}

.create-ticket-form {
    margin-top: 20px;
}

.reason-code-label {
    font-size: 16px;
}

.submit-button {
    background: #27ae60;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 0;
    width: 100%;
}

.submit-button:hover {
    background: #219652;
}

.edit-button1 {
  background: #3498db; 
  color: white; 
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.create-button {
  background: #27ae60; 
  color: white; 
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button1:hover {
  background: #0073e6; 
}

.create-button:hover {
  background: #219652; 
}

.edit-button {
  background: #3498db;
}

.selectedItem ul {
    list-style-type: none;
}

h2 {
  margin-bottom: 10px; 
}

</style>
