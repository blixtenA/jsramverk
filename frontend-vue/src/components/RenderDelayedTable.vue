<template>
  <div class="delayed-trains" ref="delayedTrains" id="delayed-trains">
    <div v-for="(item, index) in data" :key="index" @click="openTicketView(item)">

      <!-- Display train information -->
      <div class="train-number">{{ item.OperationalTrainNumber }}</div>
      <div class="current-station">
        <div>{{ item.LocationSignature }}</div>
        <div>
          {{ item.FromLocation ? item.FromLocation[0].LocationName + " -> " : "" }}
          {{ item.ToLocation ? item.ToLocation[0].LocationName : "" }}
        </div>
    </div>

    <!-- Full-page modal -->
    <div v-if="showTicketView" class="modal" id="train-modal">
      <div class="modal-content">
        <button @click="closeTicketView" id="back">Close Ticket</button>
        <h1>Nytt ärende #{{ newTicketId }}</h1>
        <h3 v-if="selectedItem && selectedItem.FromLocation">
          Tåg från {{ selectedItem.FromLocation[0].LocationName }} till {{ selectedItem.ToLocation[0].LocationName }}. Just nu i {{ selectedItem.LocationSignature }}.
        </h3>
        <p v-if="selectedItem"><strong>Försenad:</strong> {{ outputDelay(selectedItem) }}</p>
        <form @submit.prevent="createTicket">
          <label for="reason-code">Orsakskod</label><br>
          <select id="reason-code" v-model="selectedReason">
            <option v-for="reasonCode in reasonCodes" :key="reasonCode.Code" :value="reasonCode.Code">{{ reasonCode.Level3Description }}</option>
          </select><br><br>
          <input type="submit" value="Skapa nytt ärende" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      showTicketView: false, // Visa TicketView
      selectedItem: null, // Item to be displayed in TicketView
    };
  },
  props: {
    data: Array,
  },
  methods: {
    openTicketView(item) {
      this.selectedItem = item; 
      this.showTicketView = true;
    },
    closeTicketView() {
      this.showTicketView = false;
    },
    props: {
        data: Array,
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
  z-index: 9999; 
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

</style>
