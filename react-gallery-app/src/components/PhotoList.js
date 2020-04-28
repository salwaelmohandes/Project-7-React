import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';

const PhotoList = props => { 

    const results = props.data
    let photos = results.map(photo => 
        <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
    );
            
    return (
        <div class="photo-container">
            <h2>{props.title}</h2>
            <ul className="photo-list">
                {photos.length === 0 ? <NoPhotos/> : photos}
            </ul>
        </div>
    );
}


export default PhotoList;