import axios from 'axios';

const galleryApiService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31497264-8254871d687ec8d5b65884355',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchGallery = async (searchQuery, page = 1) => {
  try {
    const { data } = await galleryApiService.get('', {
      params: { q: searchQuery, page },
    });
    const images = data.hits.map(
      ({ id, webformatURL, tags, largeImageURL }) => ({
        id,
        webformatURL,
        tags,
        largeImageURL,
      })
    );
    return { images, totalImages: data.totalHits };
  } catch (error) {
    return error.message;
  }
};
