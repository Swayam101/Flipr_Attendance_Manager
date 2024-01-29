import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import io from "socket.io-client";

const store = (set, get) => ({
  socket: io("https://attendance-backend-iovb.onrender.com/"),
  socketId: "",
  setSocketId: (socketId) => {
    console.log("Socket Id Added!");
    set((state) => ({
      socket: state.socket,
      socketId: socketId,
    }));
  },
});

const useSocketStore = create(
  persist(store, {
    name: "socket-data",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useSocketStore;
