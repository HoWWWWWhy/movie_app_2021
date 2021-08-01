import React from 'react';
import PropTypes from 'prop-types';

const MainImage = props => {
    return (
        <div style={{
            background: `url(${props.image})`, 
            width: '100%', height: '500px', 
            backgroundSize: '100%, cover', 
            backgroundPosition: 'center, center', 
            position: 'relative'}}>
            <div style={{position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                <h2 style={{color: 'white'}}> {props.title} </h2>
                <p style = {{color: 'white', fontSize: '1rem'}}>{props.overview}</p>

            </div>
        </div>
    )
}

MainImage.propTypes = {
    title: PropTypes.string,
    overview: PropTypes.string
}

export default MainImage;

