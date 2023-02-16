import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteIdea } from '../../api/ideas'
import { EditIdeaModal } from './EditIdeaModal'


export const ShowIdea = (props) => {
  const { key, idea, user, game, msgAlert, triggerRefresh } = props

  // here's our hook to display the EditIdeaModal
  const [editModalShow, setEditModalShow] = useState(false)
  
  const setBgCondition = (phase) => {
      if (phase === 'notstarted') {
          return({width: '18rem', backgroundColor: 'gray'})
      } else if (phase === 'started') {
          return({width: '18rem', backgroundColor: 'yellow'})
        } else if (phase === 'fixing') {
        return ({ width: '18rem', backgroundColor: 'orange' })
      } else if (phase === 'complete') {
        return({width: '18rem', backgroundColor: 'green'})
      } else {
          return({width: '18rem', backgroundColor: 'red'})
      }
  }

  // delete, similar to delete for games, all we have to do is ensure that the user is the games owner, and make the api call passing in the right args.
  const destroyIdea = () => {
      // this is the api call file function
      // it requires three args, user, gameId, & ideaId
      deleteIdea(user, game.id, idea._id)
          // upon success, we want to send a message
          .then(() => {
              msgAlert({
                  heading: 'Idea Deleted',
                  message: 'Bye Bye idea!',
                  variant: 'success'
              })
          })
          // then trigger a refresh of the parent component
          .then(() => triggerRefresh())
          // upon failure send an appropriate message
          .catch(() => {
              msgAlert({
                  heading: 'Oh No!',
                  message: 'Something went wrong!',
                  variant: 'danger'
              })
          })
  }

  return (
      <>
      <Card className="m-2" style={setBgCondition(idea.phase)}>
              <Card.Header>{idea.title}</Card.Header>
              <Card.Body>
          <small>{idea.description}</small><br />
              </Card.Body>
              <Card.Footer>
                  <small>Phase: {idea.phase}</small><br/>
                  {
                      user && game.owner && user._id === game.owner._id
                      ?
                      <>
                          <Button
                              onClick={() => setEditModalShow(true)}
                              variant="warning"
                              className="m-2"
                          >
                              Edit Idea
                          </Button>
                          <Button 
                              onClick={() => destroyIdea()} 
                              variant="danger"
                              className="m-2"
                          >
                              Delete Idea
                          </Button>
                      </>
                      :
                      null
                  }
              </Card.Footer>
          </Card>
          <EditIdeaModal
              user={user}
              game={game}
              idea={idea}
              show={editModalShow}
              handleClose={() => setEditModalShow(false)}
              msgAlert={msgAlert}
              triggerRefresh={triggerRefresh}
          />
      </>
  )
}
