import { useState } from 'react'
import { createGame } from '../../api/games'
import { createGameFailure, createGameSuccess } from '../shared/AutoDismissAlert/messages'
import { GameForm } from '../shared/GameForm'
import { useNavigate } from 'react-router-dom'

export const CreateGame = (props) => {
  const [game, setGame] = useState({
    name: '',
    description: '',
    isComplete: false
  })

  const { user, msgAlert } = props
  const navigate = useNavigate()

  const onChange = e => {
    e.persist()
    setGame(prevGame => {
      const updatedName = e.target.name
      let updatedValue = e.target.value

      if (updatedName === 'isComplete' && e.target.checked) {
        updatedValue = true
      } else if (updatedName === 'isComplete' && !e.target.checked) {
        updatedValue = false
      }

      const updatedGame = {
        [updatedName]: updatedValue
      }
      return {
        ...prevGame, ...updatedGame
      }
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    createGame(user, game)
      .then( res => {navigate(`/games/${res.data.game.id}`)})
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: createGameSuccess,
          variant: 'success'
        })
      })
      .catch(() => {
        msgAlert({
          heading: 'Oh No!',
          message: createGameFailure,
          variant: 'danger'
      })
    })
  }

  return (
    <><GameForm handleChange={onChange} game={game} handleSubmit={ onSubmit} heading='Add a New Game Doc!'/></>
  )
}
