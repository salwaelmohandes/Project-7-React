import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';

const PhotoList = props => {

    const results = props.data;
    let photos = results.map(photo => 
        <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
    );
    return (
        props.loading 
        ? <p>Loading...</p>
        : photos.length === 0
        ? <NoPhotos/> 
        : <div className="photo-container">
            <h2>{props.title}</h2>
            <ul className="photo-list">
                {photos}
            </ul>
        </div>
    );        
}


export default PhotoList;