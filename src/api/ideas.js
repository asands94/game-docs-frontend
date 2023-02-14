import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createIdea = (user, gameId, newIdea) => {
    return axios({
        url: `${apiUrl}/ideas/${gameId}`,
      method: 'POST',
      headers: {
          Authorization: `Token token=${user.token}`
        },
        data: { idea: newIdea }
    })
}

// UPDATE
export const updateIdea = (user, gameId, updatedIdea) => {
    return axios({
        url: `${apiUrl}/ideas/${gameId}/${updatedIdea._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { idea: updatedIdea }
    })
}

// DELETE
export const deleteIdea = (user, gameId, ideaId) => {
    return axios({
        url: `${apiUrl}/ideas/${gameId}/${ideaId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}