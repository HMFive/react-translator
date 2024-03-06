import axiosInstance from "./axiosHelper";

const translationService = {
  translate: async (item) => {
    try {
      const response = await axiosInstance.post("translate", {
        q: "another",
        source: "en",
        target: "tr",
        api: "",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      return null;
    }
  },
};

export default translationService;
