import { Form, Button, Container } from 'react-bootstrap'

export const IdeaForm = (props) => {
  const {idea, handleChange, handleSubmit, heading } = props

  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            placeholder='What is title of this idea?'
            name='title'
            id='title'
            value={idea.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            placeholder='Brief description of the idea.'
            name='description'
            id='description'
            value={idea.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Select
            aria-label='phase'
            name='phase'
            defaultValue={idea.phase}
            onChange={handleChange}
          >
            <option>
              What phase is this idea in?
            </option>
            <option value='notstarted'>not started</option>
            <option value='started'>started</option>
            <option value='fixing'>fixing</option>
            <option value='complete'>complete</option>
            <option value='abandoned'>abandoned</option>
          </Form.Select>
        </Form.Group>
        <Button className='m-2' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
