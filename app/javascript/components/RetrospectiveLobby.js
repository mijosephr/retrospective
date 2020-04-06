import React from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import appStore from 'stores/app_store'
import { join as joinAppearanceChannel } from 'channels/appearanceChannel'
import { join as joinOrchestratorChannel } from 'channels/orchestratorChannel'
import RetrospectiveArea from './RetrospectiveArea'
import ParticipantsList from './ParticipantsList'
import LoginForm from './LoginForm'
import './RetrospectiveLobby.scss'

const RetrospectiveLobby = ({ id: retrospectiveId, name, kind }) => {
  const dispatch = useDispatch()

  const handleNewParticipant = React.useCallback((newParticipant) => {
    dispatch({ type: 'new-participant', newParticipant: newParticipant })
  }, [])

  React.useEffect(() => {
    const appearanceChannel = joinAppearanceChannel({ onParticipantAppears: handleNewParticipant, retrospectiveId })
    dispatch({ type: 'set-channel', channelName: 'appearanceChannel', channel: appearanceChannel })
  }, [])

  const handleActionReceived = React.useCallback((action, data) => {
    if (action === 'next') {
      dispatch({ type: 'change-step', step: data.next_step })
    } else if (action === 'setTimer') {
      dispatch({ type: 'start-timer', duration: data.duration })
    }
  }, [])

  const profile = useSelector(state => state.profile)
  const loggedIn = useSelector(state => !!state.profile)

  React.useEffect(() => {
    // On already logged in
    if (profile) {
      const orchestratorChannel = joinOrchestratorChannel({ retrospectiveId: retrospectiveId, onReceivedAction: handleActionReceived })
      dispatch({ type: 'set-channel', channelName: 'orchestratorChannel', channel: orchestratorChannel })
    }
  }, [])

  return (
    <div id='main-container'>
      <h3>Lobby {name} ({retrospectiveId}) - {kind}</h3>
      <div id='lobby'>
        <ParticipantsList />
        <div id='right-pannel'>
          {!loggedIn && <LoginForm retrospectiveId={retrospectiveId} />}
          {loggedIn && <RetrospectiveArea retrospectiveId={retrospectiveId} kind={kind} />}
        </div>
      </div>
    </div>
  )
}

const RetrospectiveLobbyWithProvider = (props) => {
  const store = appStore({ ...props.initialState, retrospective: props.retrospective })

  return (
    <Provider store={store}>
      <RetrospectiveLobby {...props.retrospective} />
    </Provider>
  )
}

export default RetrospectiveLobbyWithProvider
