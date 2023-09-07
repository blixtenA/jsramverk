<template>
  <div class="ticket-container">
    <div class="ticket">
      <button @click="goBack">Tillbaka</button>
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
    <br>
    <div class="old-tickets" id="old-tickets">
      <h2>Befintliga ärenden</h2>
      <div v-for="ticket in oldTickets" :key="ticket.id">{{ ticket.id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RenderTicketView",
  props: {
    selectedItem: String,
  },
  setup(props) {
    const router = useRouter();

    console.log("Props in child component:", props);

    const parsedSelectedItem = computed(() => {
      try {
        return JSON.parse(props.selectedItem || "{}");
      } catch (error) {
        console.error("Error parsing 'selectedItem':", error);
        return {};
      }
    });

    const goBack = () => {
      router.go(-1);
    };

    const outputDelay = (item) => {
      if (item) {
        const advertised = new Date(item.AdvertisedTimeAtLocation);
        const estimated = new Date(item.EstimatedTimeAtLocation);
        const diff = Math.abs(estimated - advertised);
        return Math.floor(diff / (1000 * 60)) + " minuter";
      }
      return "";
    };

    return {
      goBack,
      outputDelay,
      parsedSelectedItem,
    };
  },
};
</script>


