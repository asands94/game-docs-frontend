import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {IdeaForm} from '../shared/IdeaForm'
import { createIdea } from '../../api/ideas'
import messages from '../shared/AutoDismissAlert/messages'

export const NewIdeaModal = (props) => {
  const { user, game, show, handleClose, msgAlert, triggerRefresh } = props

  const [idea, setIdea] = useState({
    title: '', 
    description: '',
    phase: ''
  })

  const onChange = (e) => {
      e.persist()
      
      setIdea(prevIdea => {
          const updatedName = e.target.name
          let updatedValue = e.target.value
         
          const updatedIdea = {
              [updatedName] : updatedValue
          }

          return {
              ...prevIdea, ...updatedIdea
          }
      })
  }

  const onSubmit = (e) => {
      e.preventDefault()
      createIdea(user, game.id, idea)
          // first we'll close the modal
          .then(() => handleClose())
          // we'll also send a success message
          .then(() => {
              msgAlert({
                  heading: 'Oh Yeah!',
                  message: messages.createIdeaSuccess,
                  variant: 'success'
              })
          })
          .then(() => triggerRefresh())
          // if there is an error, tell the user about it
          .catch(() => {
              msgAlert({
                  heading: 'Oh No!',
                  message: messages.createIdeaFailure,
                  variant: 'danger'
              })
          })
  }

  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
              <IdeaForm 
                  idea={idea}
                  handleChange={onChange}
                  handleSubmit={onSubmit}
                  heading={`Give ${game.name} an idea!`}
              />
          </Modal.Body>
      </Modal>
  )
}
