const url = `https://api.cloudinary.com/v1_1/dlessujl6/image/upload`;

import axios from "axios";

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset","mern-product")

  const dataResponse = await axios.post(url,formData);
    
  return dataResponse;

};



export default UploadImage;
