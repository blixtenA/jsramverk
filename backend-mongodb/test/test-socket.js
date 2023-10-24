const io = require("socket.io-client");

const socket = io("http://localhost:8081"); // Replace your_port_number with your actual port number

socket.on("connect", () => {
    console.log("Connected to the socket server");

    const data = { activityId: "your_activity_id" }; // Replace your_activity_id with a valid activity ID

    socket.emit("openErrand", data);

    socket.on("ticketAlreadyLocked", (message) => {
        console.log(message);
    });

    socket.on("errandOpened", (data) => {
        console.log("Errand opened:", data);
    });
});
