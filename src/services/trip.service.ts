import axios from "axios";
import { instance } from "../api/axios.api";
import { ChangeUserStatus, CreateTripModal, InviteCode, MyRequests, MyTripsFilter, PublicTrip, RequestFilter, Requests, TripFilter, UserProfile } from "../types/types";

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
    async createNewTrip(createNewTripData: CreateTripModal) {
      await instance.post('api/trip/create', createNewTripData)
  },
  async loginByCode(inviteCode: InviteCode) {
    await instance.post('api/trip/login/code', inviteCode)
},
  async deleteTrip(tripId: string | undefined) {
    await instance.delete(`api/trip/remove/${tripId}`)
},
    async getMyTrips(filters: MyTripsFilter) {
      try {
        const { data } = await instance.get<PublicTrip>('api/trip/my', {
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
  async getTripRequests(filter: RequestFilter) {
    try {
      const { data } = await instance.get<Requests>(`/api/trip/requests/${filter.tripId}`, {
        params: filter,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  async changeStatus(requestData: ChangeUserStatus) {
    await instance.put(`api/trip/user/status`, requestData) 
  },
  async getTripMembers(tripId: string) {
    const {data} = await instance.get<UserProfile[]>(`api/trip/users/${tripId}`)
    return data;
},
}