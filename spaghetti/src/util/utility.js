import axios from "axios";

export const fetching = async (address, option) => {
  const res = await axios.get(address, option);
  return res.data;
};
