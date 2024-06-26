import axios from "axios";
import { instance } from "../api/axios.api";
import { MyRequests, PublicTrip, TripFilter } from "../types/types";

export const TripService = {
    async getPublicTrips(filters: TripFilter) {
        try {
          const { data } = await instance.get<PublicTrip>('api/trip/public', {
            params: filters,
          });
          return data;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
          }
          throw error;
        }
    },
    async applyToTrip(tripId: string | undefined) {
        await instance.post(`api/trip/apply/${tripId}`) 
    },
    async getMyRequests() {
        const {data} = await instance.get<MyRequests[]>('api/trip/requests/my')
        return data;
    },
    async cancelTripApplication(tripId: string | undefined) {
        await instance.put(`api/trip/remove/request/${tripId}`) 
    },
    async leaveFromTrip(tripId: string | undefined) {
        await instance.put(`api/trip/leave/${tripId}`) 
    },
}