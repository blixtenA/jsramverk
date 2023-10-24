const setupSocketServer = (io) => {
    const lockedTickets = new Set(); // Keep track of locked tickets

    io.on("connection", (socket) => {
        console.log("A user connected to Tickets");

        socket.on("openErrand", async (data) => {
            let ticketId; // Define ticketId here

            try {
                ticketId = data.activityId; // Assuming activityId is the unique ticket identifier

                console.log(ticketId);

                if (lockedTickets.has(ticketId)) {
                    // If the ticket is already locked by another user, emit a message indicating the same
                    socket.emit("ticketAlreadyLocked", {
                        message: "Ticket already locked by another user.",
                    });
                    return;
                }

                lockedTickets.add(ticketId); // Lock the ticket

                // Emit a message indicating that the ticket has been opened
                socket.emit("ticketOpened");
            } finally {
                // Do not delete the ticket from the lockedTickets set here
            }
        });

        socket.on("closeErrand", async (data) => {
            let ticketId; // Define ticketId here

            try {
                ticketId = data.activityId; // Assuming activityId is the unique ticket identifier

                lockedTickets.delete(ticketId); // Delete the ticket from the lockedTickets set
                // Perform other actions associated with closing the ticket here
            } catch (error) {
                // Handle errors if necessary
                console.error(error);
            }
        });

        // You can add more socket event listeners here as needed
    });
};

module.exports = setupSocketServer;
