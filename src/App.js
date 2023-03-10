import { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import { ShowGame } from './components/games/ShowGame'
import { CreateGame } from './components/games/CreateGame'

const App = () => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const clearUser = () => {
    setUser(null)
  }

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id)
    })
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }]
    })
  }

  return (
    <>
      
        <Header user={user} />
        
      <Routes>
    
          <Route
            path='/'
          element={
            <RequireAuth user={user}>
              <Home msgAlert={msgAlert} user={user} />
            </RequireAuth>
          } />
          
        <Route
          path='/sign-up'
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-in'
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-out'
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/change-password'
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/create-game'
          element={
            <RequireAuth user={user}>
              <CreateGame msgAlert={msgAlert} user={user}/>
            </RequireAuth>
          }
        />
        <Route
          path='/games/:id'
          element={
            <RequireAuth user={user}>
              <ShowGame msgAlert={msgAlert} user={ user} />
            </RequireAuth>
          }
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </>
  )
}

export default App
