import React, { Component } from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';

class PhotoList extends Component {

    render() { 
        const results = this.props.data;
        let photos = results.map(photo => 
            <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
        );
        return (
            this.props.loading 
            ? <p>Loading...</p>
            : photos.length === 0
                ? <NoPhotos/> 
                : <div className="photo-container">
                    <h2>{this.props.title}</h2>
                    <ul className="photo-list">
                        {photos}
                    </ul>
                </div>
        );
    }    
}


export default PhotoList;