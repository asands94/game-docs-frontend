import { useState, useEffect } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneGame, removeGame, updateGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import { LoadingScreen } from '../shared/LoadingScreen'
import { ShowIdea } from '../ideas/ShowIdea'
import { NewIdeaModal } from '../ideas/NewIdeaModal'
import { GameForm } from '../shared/GameForm'

const ideaCardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
}

export const ShowGame = (props) => {
  const [game, setGame] = useState(null) // getting the game data
  const [ideaModalShow, setIdeaModalShow] = useState(false) // show and hide the idea modal
  const [updated, setUpdated] = useState(false) // update the idea to display new info after an update
  const [showForm, setShowForm] = useState(false) // show and hide the update game form

  const { id } = useParams() // grab the id that is in the URL to get the correct game to display
  const navigate = useNavigate() // navigate to a new page

  const { user, msgAlert } = props // user info and mesgAlert that will display a success or failure message

  // ==============================
  // SHOW ONE GAME
  // ==============================

  useEffect(() => {
    getOneGame(id)
      .then((res) => setGame(res.data.game))
      .catch(() => {
        msgAlert({
          heading: 'Error getting games',
          message: messages.getGamesFailure,
          variant: 'danger',
        })
      })
  }, [updated])

  const setGameFree = () => {
    removeGame(user, game.id)
      .then(() => {
        msgAlert({
          heading: 'Success',
          message: messages.removeGameSuccess,
          variant: 'success',
        })
      })
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        msgAlert({
          heading: 'Error',
          message: messages.removeGameFailure,
          variant: 'danger',
        })
      })
  }
  // ==============================
  // SHOW EACH IDEA FOR THE GAME
  // ==============================
  let ideaCards
  if (game) {
    if (game.ideas.length > 0) {
      ideaCards = game.ideas.map((idea) => (
        <ShowIdea
          key={idea.id}
          idea={idea}
          user={user}
          game={game}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated((prev) => !prev)}
        />
      ))
    }
  }
  // ==============================
  // UPDATE THE GAME
  // ==============================

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
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: messages.updateGameSuccess,
          variant: 'success'
        })
      })
      .then(() => setShowForm((prev) => !prev))
      .catch(() => {
        msgAlert({
          heading: 'Oh No!',
          message: messages.updateGameFailure,
          variant: 'danger'
      })
    })
  }

  if (!game) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container className='m-2'>
        <Card>
          <Card.Header>{game.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <small>Description: {game.description}</small>
              <br />
              <small>Complete: {game.isComplete ? 'yes' : 'no'}</small>
            </Card.Text>
          </Card.Body>
          {game.owner && user && game.owner._id === user._id ? (
            <Card.Footer>
              <Button
                className='m-2'
                variant='info'
                onClick={() => setIdeaModalShow(true)}
              >
                Add an idea for {game.name}!
              </Button>
              <Button onClick={() => setShowForm((prev) => !prev)}>Edit</Button>
              <Button
                className='m-2'
                variant='danger'
                onClick={() => setGameFree()}
              >
                Delete {game.name}
              </Button>
            </Card.Footer>
          ) : null}
        </Card>
        {
          showForm &&
          <GameForm
            game={game}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Update Game" />
        }
      </Container>
      <Container className='m-2' style={ideaCardContainerLayout}>
        {ideaCards}
      </Container>
      <NewIdeaModal
        user={user}
        game={game}
        show={ideaModalShow}
        handleClose={() => setIdeaModalShow(false)}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
      />
    </>
  )
}
