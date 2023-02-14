// info: this is where the api calls for the games resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllGames = () => {
  return axios(`${apiUrl}/games`)
}

export const getAllArtworks = () => {
  return axios(`${apiUrl}/artworks`)
}

// READ -> Index of specific user
export const getUserGames = (user) => {
  return axios({
    url: `${apiUrl}/games/mine`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  })
}

// READ -> Show
export const getOneGame = (id) => {
  return axios(`${apiUrl}/games/${id}`)
}

// CREATE (create a game)
export const createGame = (user, newGame) => {
  return axios({
    url: `${apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: {
      game: newGame,
    },
  })
}

// UPDATE (update a game)
export const updateGame = (user, updatedGame) => {

  return axios({
    url: `${apiUrl}/games/${updatedGame.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: {
      game: updatedGame,
    },
  })
}

// DELETE (delete a game)
export const removeGame = (user, gameId) => {
  return axios({
    url: `${apiUrl}/games/${gameId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  })
}