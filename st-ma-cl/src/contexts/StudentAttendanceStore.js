import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useAuthStore from "./AuthStore";
import axiosConfig from "../utils/axiosConfig";

function getDaysFromDateTillNow(startDate) {
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}



const store = (set, get) => ({
  attendances: [],
  totalDays: 0,
  absentDays: 0,
  presentDays:0,
  fetchAttendanceData:()=>{
    const userId=useAuthStore.getState().userData._id
    const createdAt=useAuthStore.getState().userData.createdAt
    axiosConfig({
        url:`/attendance/${userId}`,
        method:"GET",
        withCredentials:true
    }).then((response)=>{
      // const absentDays= 
      const absent=response.data.attendances
      set((state)=>({
        attendances:response.data.attendances,
        totalDays:getDaysFromDateTillNow(createdAt),
        absentDays:"",
        presentDays:""
      }))
        
    })
    
  },
  setAttendanceData: (user) => {
    set((state) => ({
       
    }));
  },
  removeAttendanceData: () => {
    set((state) => ({
      userData: null,
      isLoggedIn: false,
      isAdmin: false,
    }));
  }
});

const useAttendanceStore = create(
  persist(store, {
    name: "user-data",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAttendanceStore;