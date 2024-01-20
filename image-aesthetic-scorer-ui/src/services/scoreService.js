// ApiService.js
const BASE_URL = 'http://your-backend-url/api'; // Update with your actual backend URL

const ApiService = {
  predictAestheticScore: async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/predict_aesthetic_score`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data.aesthetic_score;
    } catch (error) {
      throw new Error('Error connecting to the server');
    }
  },
};

export default ApiService;
