import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const GridCards = props => {
    return (
        <Col lg={6} md={8} sm={12} xs={24}>
            <div style ={{position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width: '200px', height: '300px'}} src={props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col>
    )
}

GridCards.propTypes = {

}

export default GridCards
