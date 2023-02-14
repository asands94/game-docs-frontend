import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GameForm } from '../shared/GameForm'
import messages from '../shared/AutoDismissAlert/messages'

export const EditGameModal = (props) => {
  const { user, show, handleClose, updateGame, msgAlert, triggerRefresh } = props
  
  const [game, setGame] = useState(props.game)
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

    updateGame(user, game)
      .then(() => handleClose())
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: messages.updateGameSuccess,
          variant: 'success'
        })
      })
      .then(() => triggerRefresh())
      .catch(() => {
        msgAlert({
          heading: 'Oh No!',
          message: messages.updateGameFailure,
          variant: 'danger'
      })
    })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <GameForm
          game={game}
          handleChange={onChange}
          handleSubmit={onSubmit}
          heading="Update Game"
        />
      </Modal.Body>
    </Modal>
  )
}