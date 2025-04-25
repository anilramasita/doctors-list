import axios from 'axios';

export const fetchDoctors = async () => {
  try {
    const { data } = await axios.get(
      "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
    );
    return data;
  } catch (err) {
    console.error("Failed to fetch doctors", err);
    return [];
  }
};
