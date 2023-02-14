import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { getUserGames } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import { LoadingScreen } from '../shared/LoadingScreen'

const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
}

export const UserGamesIndex = (props) => {
  const [games, setGames] = useState(null)
  const [error, setError] = useState(false)

  const { msgAlert, user } = props

  useEffect(() => {
    getUserGames(user)
      .then((res) => setGames(res.data.games))
      .catch((e) => {
        msgAlert({
          heading: 'Error getting games',
          message: messages.getGamesFailure,
          variant: 'danger'
        })
        setError(true)
    })
  }, [])

  if (error) {
    return <p>Error!</p>
  }

  if (!games) {
    return <LoadingScreen />
  } else if (games.length === 0) {
    return <p>No Game Docs yet, go add some!</p>
  }

  const gameCards = games.map(game => (
    <Card key={ game.id } style={{ width: '30%', margin: 5 }}>
        <Card.Header>{ game.name }</Card.Header>
        <Card.Body>
            <Card.Text>
                <Link to={`/games/${game.id}`} className="btn btn-info">View { game.name }</Link>
        </Card.Text>
        </Card.Body>
    </Card>
))

  return (
    <div className="container-md" style={ cardContainerStyle }>
        { gameCards }
    </div>
)
}
