import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import {useStateValue} from './StateProvider';

const spotify = new SpotifyWebApi();

function App() {
    
   const [{user, token}, dispatch] = useStateValue();

    useEffect(() => {
        //code..
        const hash = getTokenFromResponse();
        window.location.hash = "";
        const _token = hash.access_token;

        if(_token){

          dispatch({
            type: 'SET_TOKEN',
            token: _token
          });
          

          spotify.setAccessToken(_token);

          spotify.getMe().then((user) => {
            dispatch({
              type: 'SET_USER',
              user: user
            })
          });

          spotify.getUserPlaylists().then((playlists) =>{
            dispatch({
              type: 'SET_PLAYLISTS',
              playlists: playlists,
            });
          });

          spotify.getPlaylist('37i9dQZEVXcTEA8xaAa0d5')
          .then(response => {
            dispatch({
              type: 'SET_DISCOVER_WEEKLY',
              discover_weekly: response,
            });
          })
        }

    }, []);
    //runs code based on a condition

    return (
    <div className="app">
      {token ? (<Player spotify={spotify}/>): (
          <Login />
        )
      }
    </div>
  );
}

export default App;
