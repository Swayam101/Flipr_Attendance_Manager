import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = (set, get) => ({
  userData: null,
  isLoggedIn: false,
  isAdmin: false,
  setUserData: (user) => {
    set((state) => ({
      userData: user,
      isLoggedIn: user.isLoggedIn,
      isAdmin: user.isAdmin,
    }));
  },
  logOutUser: () => {
    set((state) => ({
      userData: null,
      isLoggedIn: false,
      isAdmin: false,
    }));
    toast.info("Logged Out Succcessfully!")
  }
});

const useAuthStore = create(
  persist(store, {
    name: "user-data",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAuthStore;
