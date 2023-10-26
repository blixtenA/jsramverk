<template>
    <div v-for="(item, index) in data" :key="index" class="Ticket-item">
        <div class="train-number">
            {{ item.trainnumber }}
        </div>
        <div v-if="item.activityId"></div>
        <div><strong>Orsakskod:</strong> {{ item.code }}</div>
        <div> 
            {{ getLevel1Description(item.code) }} :
            {{ getLevel2Description(item.code) }} :
            {{ getLevel3Description(item.code) }}</div>

        <div class="button-container2">
            <button class="edit-button" @click="openTicketView(item)">
                Uppdatera
            </button>
            <button @click="deleteItem(item)" class="delete-button">
                Avsluta ärende
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
                    Ärende för tågnummer {{ this.selectedItem.trainnumber }}
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
import io from "socket.io-client";

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
        getLevel1Description(code) {
            const reasonCode = this.reasonCodes.find((rc) => rc.Code === code);
            return reasonCode ? reasonCode.Level1Description : "N/A"; 
        },

        getLevel2Description(code) {
            const reasonCode = this.reasonCodes.find((rc) => rc.Code === code);
            return reasonCode ? reasonCode.Level2Description : "N/A"; 
        },

        getLevel3Description(code) {
            const reasonCode = this.reasonCodes.find((rc) => rc.Code === code);
            return reasonCode ? reasonCode.Level3Description : "N/A"; 
        },

        async deleteItem(item) {
            this.socket = io("http://localhost:1337");
            // Check if the ticket is already locked
            this.socket.emit("checkLock", { ticketId: item.activityId }, async (response) => {
                if (response.isLocked) {
                alert(`Ticket ${item.activityId} is already being handled.`);
                window.location.reload(); // Refresh the page
                } else {
                try {
                    await this.deleteTicketHelper(item.activityId);
                } catch (error) {
                    console.error("Error deleting ticket:", error);
                }
                }
            });
        },

        async deleteTicket(activityId) {
            if (!this.selectedItem) {
            return;
            }
            await this.deleteTicketHelper(activityId, true);
        },

        async deleteTicketHelper(activityId, closeView = false) {
            // Check if the ticket is already locked
            try {
            const response = await axios.delete(`http://localhost:1337/tickets/${activityId}`);

            if (response.status === 200) {
                alert("Ticket deleted successfully");
                if (closeView) {
                await this.closeTicketView();
                } else {
                window.location.reload();
                }
            } else {
                console.error("Unexpected response status:", response.status);
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
            console.log(item);
            this.selectedItem = item;
            this.selectedItem.trainNumber = item.trainnumber; 
            this.selectedItem.trainDate = item.AdvertisedTimeAtLocation;
            this.selectedItem.activityId = item.activityId;
            this.showTicketView = true;
            console.log(this.selectedItem.trainnumber);

            console.log(this.selectedItem);
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
            // Emit the 'closeErrand' event to the server with the ticketId
            this.socket.emit("closeErrand", {
                ticketId: this.selectedItem.activityId,
            });

            this.showTicketView = false;
            this.selectedItem = null;
            this.tickets = []; 
            this.createdTicket = null; 

            window.location.reload(); 
        },
    },
    mounted() {
    fetch("http://localhost:1337/codes")
      .then((response) => response.json())
      .then((data) => {
        this.reasonCodes = data.data;
        if (this.reasonCodes.length > 0) {
          this.selectedReason = this.reasonCodes[0].Code;
          this.selectedReason = this.reasonCodes[0].Level1Description;
          this.selectedReason = this.reasonCodes[0].Level2Description;
          this.selectedReason = this.reasonCodes[0].Level3Description;
        }
      })
      .catch((error) => {
        console.error("Error fetching reason codes:", error);
      });
  },    
};
</script>

<style>
.button-container2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

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
    z-index: 1001;
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
    width: 250px; 
}

.ticket-item {
    margin-bottom: 0;
}

.edit-button,
.delete-button {
    display: inline-block;
  width: calc(50% - 5px); 
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px; 
  padding: 10px 0; 
  text-align: center; 
  box-sizing: border-box; 
  margin-top: 10px;
}

.edit-button2 {
    background: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px; 
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
