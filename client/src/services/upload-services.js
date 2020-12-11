import axios from "axios";

class UploadService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true,
    });
  }

  uploadProfile = (theFile) => {
    return this.service
      .post("/api/upload-profile", theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  uploadHero = (theFile) => {
    return this.service
      .post("/api/upload-hero", theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  uploadImages = (theFiles) => {
    return this.service
      .post("/api/upload-images", theFiles)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export default UploadService;