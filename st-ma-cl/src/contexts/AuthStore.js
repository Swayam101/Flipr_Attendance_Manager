import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = (set, get) => ({
  userData: null,
  isLoggedIn: false,
  isAdmin: false,
  isApproved:false,
  setUserData: (user) => {
    set((state) => ({
      userData: user,
      isLoggedIn: user.isLoggedIn,
      isAdmin: user.isAdmin,
      isApproved:user.approved
    }));
  },
  logOutUser: () => {
    set((state) => ({
      userData: null,
      isLoggedIn: false,
      isAdmin: false,
      isApproved:false
    }));
    toast.info("Logged Out Succcessfully!")
  }
});

const useAuthStore = create(
  persist(store, {
    name: "user-data",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useAuthStore;
