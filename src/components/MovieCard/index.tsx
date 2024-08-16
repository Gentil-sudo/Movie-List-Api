'use client';

import { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';
import MovieList from '../MovieList';
import {Movie} from '@/types/movie';
import ReactLoading from 'react-loading'

export default function MovieCard() {
    

    const [movies, setMovies] = useState<Movie[]>([]);
    const [ isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, [])
    const getMovies = async () => {
         await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'e4f41f8e0dcc95762106abf944433ceb',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results)
        });

       setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type='spin' color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <ul className='movie-card'>
            {movies.map((movie) =>
               <MovieList
                key={movie.id}
                movie={movie}
               />
            )}
        </ul>
    );
}