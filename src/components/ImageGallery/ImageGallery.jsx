import React, { Component } from 'react';

class ImageGallery extends Component {
  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}

export default ImageGallery;
