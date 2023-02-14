import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { IdeaForm } from '../shared/IdeaForm'
import { updateIdea } from '../../api/ideas'

export const EditIdeaModal = (props) => {
  const { user, game, show, handleClose, msgAlert, triggerRefresh } = props

    const [idea, setIdea] = useState(props.idea)

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
        updateIdea(user, game.id, idea)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The idea is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
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
                    heading="Update the idea"
                />
            </Modal.Body>
        </Modal>
    )
}