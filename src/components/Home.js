import { UserGamesIndex } from "./games/UserGamesIndex"
import Container from 'react-bootstrap/Container'


const Home = (props) => {
  
	return (
		<Container style={{textAlign: 'center'}}>
      <h2>All Your Game Docs</h2>
      <UserGamesIndex msgAlert={props.msgAlert} user={props.user} />
      
		</Container>
	)
}

export default Home
