import { Form, Button, Container } from 'react-bootstrap'

export const GameForm = (props) => {
  const { game, handleChange, handleSubmit, heading } = props
  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            placeholder='What is the name of your game?'
            name='name'
            id='name'
            value={game.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            placeholder='What is your game about?'
            name='description'
            id='description'
            value={game.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Check
            label='Is this game complete?'
            name='isComplete'
            defaultChecked={game.isComplete}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='m-2'>Submit</Button>
      </Form>
    </Container>
  )
}
