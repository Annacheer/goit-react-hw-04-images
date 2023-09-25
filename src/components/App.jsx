import React, { useState, useEffect, useCallback } from 'react';
import '../styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from 'Api/Api';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const fetchImagesData = useCallback(() => {
    const perPage = 12;
    setIsLoading(true);

    fetchImages(query, page, perPage)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error fetching images: ', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const handleLoadMore = () => {
    fetchImagesData();
  };

  useEffect(() => {
    if (query !== '') {
      fetchImagesData();
    }
  }, [query, page, fetchImagesData]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt=""
            onClick={() => handleImageClick(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <div className="loader">Loading...</div>}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal src={selectedImage} alt="" onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
