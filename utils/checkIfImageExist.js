import axios from "axios";

const checkIfImageExist = async (publicId) => {
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${process.env.EXPO_PUBLIC_CLOUD_NAME}/image/upload/${publicId}.jpg`
    );
    // If the request is successful, the image exists
    console.log("Image exists:", response.status === 200);
    return true;
  } catch (error) {
    // If the request fails, the image doesn't exist
    console.error("Image does not exist:", error.response.status);
    return false;
  }
};

export default checkIfImageExist;
