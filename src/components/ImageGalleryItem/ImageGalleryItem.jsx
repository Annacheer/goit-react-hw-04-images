import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={this.props.src}
          alt={this.props.alt}
          onClick={() => this.props.onClick(this.props.largeImageURL)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
