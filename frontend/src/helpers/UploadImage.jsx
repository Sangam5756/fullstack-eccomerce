const url = `https://api.cloudinary.com/v1_1/dlessujl6/auto/upload`;
import axios from "axios";

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset","chatapp-Photo")

  const dataResponse = await axios.post(url,formData);
    
  return dataResponse;

};



export default UploadImage;
