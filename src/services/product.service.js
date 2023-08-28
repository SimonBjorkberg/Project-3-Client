import axios from "axios";

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
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
    // title, description, images, price, quantity, categories = requestBody
    return this.api.post("/product/create", requestBody);
  };

  getOne = (productId) => {
    return this.api.get(`/product/single/${productId}`)
  }

  getAll = () => {
    return this.api.get(`/product/all`)
  }

  editOne = (productId) => {
    return this.api.put(`/product/edit/${productId}`)
  }

  deleteOne = (productId) => {
    return this.api.post(`/product/delete/${productId}`)
  }
}

// Create one instance (object) of the service
const productService = new ProductService();

export default productService;
