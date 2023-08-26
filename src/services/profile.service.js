import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  getOne = async (userId) => {
    return this.api.get(`/profile/${userId}`)
  }
  edit = async (userId, requestBody) => {
    return this.api.put(`/profile/edit/${userId}`, requestBody)
  }
  uploadImage = async (image) => {
    return this.api.post(`/api/upload`, image)
  }
}

const profileService = new ProfileService();

export default profileService;
