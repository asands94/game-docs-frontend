import { useState, useEffect } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneGame, removeGame, updateGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import { LoadingScreen } from '../shared/LoadingScreen'
import { EditGameModal } from './EditGameModal'
import { ShowIdea } from '../ideas/ShowIdea'
import { NewIdeaModal } from '../ideas/NewIdeaModal'

const ideaCardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
}

export const ShowGame = (props) => {
  const [game, setGame] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [ideaModalShow, setIdeaModalShow] = useState(false)
  const [updated, setUpdated] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { user, msgAlert } = props

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

  let ideaCards
  if (game) {
    if (game.ideas.length > 0) {
      ideaCards = game.ideas.map((idea) => (
        <ShowIdea
          idea={idea}
          user={user}
          game={game}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated((prev) => !prev)}
        />
      ))
    }
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
              <Button
                className='m-2'
                variant='warning'
                onClick={() => setModalShow(true)}
              >
                {' '}
                Edit {game.name}
              </Button>
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
      </Container>
      <Container className='m-2' style={ideaCardContainerLayout}>
        {ideaCards}
      </Container>
      <EditGameModal
        user={user}
        show={modalShow}
        handleClose={() => setModalShow(false)}
        updateGame={updateGame}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        game={game}
      />
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
