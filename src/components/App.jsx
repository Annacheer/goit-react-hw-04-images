import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (query !== '') {
      const perPage = 12;
      setIsLoading(true);

      fetchImages(query, page, perPage)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
        })
        .catch(error => console.error('Error fetching images: ', error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page]);

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
      {images.length > 0 && !isLoading && (
        <Button onClick={() => setPage(prevPage => prevPage + 1)} />
      )}
      {showModal && (
        <Modal src={selectedImage} alt="" onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
