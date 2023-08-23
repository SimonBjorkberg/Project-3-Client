import axios from "axios";

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  create = (requestBody) => {
    return this.api.post("/product/create", requestBody);
    
  };

}

// Create one instance (object) of the service
const projectService = new ProjectService();

export default projectService;
