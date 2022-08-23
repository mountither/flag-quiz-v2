import { Server } from "socket.io";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log("New Socket connected: ", socket.id);

    socket.on("join_session", async (message) => {
      const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);

      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );

      console.log(socketRooms.length, connectedSockets?.size);
      if (
        socketRooms.length > 0 ||
        (connectedSockets && connectedSockets.size > 2)
      ) {
        console.log("error");
        socket.emit("session_join_error", {
          error: "Room is full!",
        });
      } else {
        await socket.join(message.roomId);
        socket.emit("session_joined");
        console.log("Game session joined!: ", message);

        if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
          console.log("GAME HAS 2 PLAYERS!");
          socket.emit("start_game");
          // to all clients in room except the sender
          socket.to(message.roomId).emit("start_game");
        }
      }
    });

    socket.on("friend_score", (data) => {
      console.log(data);
      socket.broadcast.emit("get_friend_score", { score: data.score });
    });


    socket.on("set_winner", (data) =>{
      socket.broadcast.emit("friend_won");
    })
  });

  return io;
};
