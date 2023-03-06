import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MovieList } from '../index';
import axios from 'axios';



function Movies1() {
    const { movieName } = useParams();
    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

    const [recommededList, setRecommededList] = useState({});
    const [isPredictFetching, setIsPredictFetching] = useState(true);

    if (movieName) {
        let moviePredicturl = "http://127.0.0.1:8000/predict";
        useEffect(() => {
            axios.post(moviePredicturl, { "movie_name": movieName })
                .then((res) => {
                    setRecommededList(res.data);
                    setIsPredictFetching(false);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }, []);

        console.log("recommededList", recommededList)
    }

    if (isPredictFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }



    return (
        <div>
            <MovieList movies={recommededList} numberOfMovies={12} />
        </div>
    );
}

export default Movies1;
