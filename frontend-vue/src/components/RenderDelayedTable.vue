<template>
  <div>
    <div v-for="(item, index) in data" :key="index" @click="renderTicketView(item)">
      <div class="train-number">{{ item.OperationalTrainNumber }}</div>
      <div class="current-station">
        <div>{{ item.LocationSignature }}</div>
        <div>
          {{ item.FromLocation ? item.FromLocation[0].LocationName + " -> " : "" }}
          {{ item.ToLocation ? item.ToLocation[0].LocationName : "" }}
        </div>
      </div>
      <div class="delay">{{ outputDelay(item) }}</div>
    </div>
  </div>
</template>

<script>
  import "../../public/style.css";

export default {
  props: {
    data: Array,
  },
  methods: {
    renderTicketView(item) {

      console.log("Selected Item in Parent:", item);
      console.log("Type of selectedItem:", typeof item);

      this.$router.push({ name: 'ticket', params: { selectedItem: item } });
    },
    outputDelay(item) {
      const advertised = new Date(item.AdvertisedTimeAtLocation);
      const estimated = new Date(item.EstimatedTimeAtLocation);
      const diff = Math.abs(estimated - advertised);
      return Math.floor(diff / (1000 * 60)) + ' minuter';
    },
  },
};
</script>
