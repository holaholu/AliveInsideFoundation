import Spotify from '../core/Spotify';
import history from './../utils/history';
import * as appActions from './app';

export function create(songs) {
  return {
    type: 'ADD_SONGS',
    songs: songs
  };
}

export function createPlaylist(answers, year) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.makePlaylist(answers, year).then(collectionTracks => {
      dispatch(create(collectionTracks));
      dispatch(appActions.loadingOff());
      history.get().push('/playlist');
    });
  };
}

export function remove(id) {
  return {
    type: 'REMOVE_SONG',
    id: id
  };
}

export function appendSongs(index, songs) {
  return {
    type: 'APPEND_SONGS',
    index: index,
    songs: songs
  };
}

export function addFive(id, index) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.getTopTracksByArtist(id).then(collectionTracks => {
      dispatch(appActions.loadingOff());
      dispatch(appendSongs(index, collectionTracks.splice(5)));
    });
  };
}

export function addTrack(track) {
  return {
    type: 'ADD_SONG',
    track: track
  };
}

export function makePlaylist(artist) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.makePlaylistBasedSong(artist).then(collectionTracks => {
      dispatch(appActions.loadingOff());
      dispatch(create(collectionTracks));
    });
  };
}

export function savePlaylist(tracks, name) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.save(tracks, name).then(res => {
      dispatch(setPlaylistURI(res.uri));
      dispatch(appActions.loadingOff());
      dispatch(showPopupSuccess());
    });
  };
}

export function showPopupError() {
  return {
    type: 'POPUP_SHOW_ERROR'
  };
}

export function closePopupError() {
  return {
    type: 'POPUP_CLOSE_ERROR'
  };
}

export function showPopupSuccess() {
  return {
    type: 'POPUP_SHOW_SUCCESS'
  };
}

export function closePopupSuccess() {
  return {
    type: 'POPUP_CLOSE_SUCCESS'
  };
}

export function setPlaylistURI(uri) {
  return {
    type: 'PLAYLIST_SET_URI',
    uri: uri
  };
}
