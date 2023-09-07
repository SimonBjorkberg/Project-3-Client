import axios from "axios";

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createReview = (targetId, reviewData) => {
    return this.api.post(`/review/create/${targetId}`, reviewData);
  };
}

const reviewService = new ReviewService();

export default reviewService;
