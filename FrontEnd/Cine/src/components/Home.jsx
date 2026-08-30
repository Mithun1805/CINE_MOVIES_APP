
import React from "react";
import MovieRow from './forms/MovieRow'

function Home() {

  return (
    <div>
        <div className="frst-suggest-movie-box">
            <img src="https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg" alt="frst-image" />
        </div>
        <div className="row">
            <MovieRow/>
        </div>
        <div className="row">
            <MovieRow/>
        </div>
        
        
    </div>
  );
}

export default Home;


