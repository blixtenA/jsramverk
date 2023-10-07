<template>
    <select v-model="selectedReason">
        <option
            v-for="reasonCode in reasonCodes"
            :key="reasonCode.Code"
            :value="reasonCode.Code"
        >
            {{ reasonCode.Level1Description }} -
            {{ reasonCode.Level2Description }} -
            {{ reasonCode.Level3Description }}
        </option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            selectedReason: null, // Initialize selectedReason
            reasonCodes: [],
        };
    },
    mounted() {
        // Fetch reason codes from your API
        fetch("https://jsramverk-train-adde22anbx22.azurewebsites.net/codes")
            .then((response) => response.json())
            .then((data) => {
                this.reasonCodes = data.data;
                // Assuming you want to pre-select the first option, you can set selectedReason here:
                if (this.reasonCodes.length > 0) {
                    this.selectedReason = this.reasonCodes[0].Code;
                }
            })
            .catch((error) => {
                console.error("Error fetching reason codes:", error);
            });
    },
};
</script>
