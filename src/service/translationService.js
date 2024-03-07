import axiosInstance from "./axiosHelper";

const translationService = {
  translate: async (text) => {
    try {
      const response = await axiosInstance.post("translate", {
        q: text,
        source: "en",
        target: "tr",
        api: "",
      });
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  },
};

export default translationService;
