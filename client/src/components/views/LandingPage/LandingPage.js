import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {Row} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../config';
import MainImage from "./Sections/MainImage";
import GridCards from "../../commons/GridCards";

function LandingPage(props) {

  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  useEffect(() => {

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetchData(endpoint);
  
  }, []);

  const fetchData = async (endpoint) => {
    const response = await (await fetch(endpoint)).json();
    console.log(response);
    setMovies([...movies, ...response.results]);
    console.log("movies", movies);
    setMainMovieImage(movies.length>0 ? movies[0] : response.results[0]);
    setCurrentPageNum(response.page);
    //fetch(endpoint).then(res => res.json()).then(res => console.log(res));
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPageNum+1}`;

    fetchData(endpoint);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          margint: '0'
        }}
      >
        {/*Main Image */}
        {mainMovieImage && <MainImage image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
        title={mainMovieImage.original_title}
        overview={mainMovieImage.overview} />}
        <div style={{width: '85%', margint: '1rem auto'}}>
          <h2>Movies by latest</h2>
          <hr />

          {/* Movie Grid Cards */}
          <Row gutter={[10, 10]}>
            {movies && movies.map((movie, index) => (
              <React.Fragment key={index}>
              <GridCards 
              image={movie.poster_path ?  `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
              movieId={movie.id}
              movieName={movie.original_title} />
              </React.Fragment>
            ))}
            
         
          </Row>
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={loadMoreItems}> Load More</button>
        </div>
      </div>
    </>
  );
}

export default withRouter(LandingPage);
