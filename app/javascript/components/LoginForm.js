import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { post } from 'lib/httpClient'
import { useDispatch } from 'react-redux'

const LoginForm = ({ retrospectiveId }) => {
  const dispatch = useDispatch()
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')

  const login = () => {
    post({
      url: `/retrospectives/${retrospectiveId}/participants`,
      payload: {
        surname: surname,
        email: email
      }
    })
    .then(data => dispatch({ type: 'login', profile: data }))
    .catch(error => console.warn(error))
  }

  return (
    <form noValidate autoComplete='off'>
      <div>
        <div>
          You:<br />
          <TextField label='Surname' name='surname' value={surname} onChange={(event) => setSurname(event.target.value)} />
          <TextField label='E-mail' name='email' value={email} onChange={(event) => setEmail(event.target.value)} style={{ marginLeft: '20px' }} />
        </div>
        <Button variant='contained' color='primary' onClick={login}>Join</Button>
      </div>
    </form>
  )
}

export default LoginForm
