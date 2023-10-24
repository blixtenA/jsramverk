<template>
    <select v-model="selectedReason">
        <option
            v-for="reasonCode in reasonCodes"
            :key="reasonCode.Code"
            :value="reasonCode.Code"
        >
            {{ reasonCode.Code }} - {{ reasonCode.Level1Description }} -
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
            selectedLevel1Description: null,
            selectedLevel2Description: null,
            selectedLevel3Description: null,
        };
    },
    mounted() {
        // Fetch reason codes from your API
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
