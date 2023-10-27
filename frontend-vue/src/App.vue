<!-- App.vue -->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log("App.vue created");
  },
  mounted() {
    console.log("App.vue mounted");
  },
};
</script>