import { axiosInstance } from ".";

export const GetAllBloodBroupsInInventory = () => {
  return axiosInstance("get", "/api/dashboard/blood-groups-data");
};
