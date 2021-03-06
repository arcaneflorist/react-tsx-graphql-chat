import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Dynamic from './components/dynamic'
import Messages from './components/messages'
import Users from './components/users'
import MessageInput from './components/messageInput'
import Loading from './components/loading'

import { useMutation } from 'urql';

const UserJoinedMutation = `
mutation($name: String) {
    userJoined(name: $name) {
    id
  }
}`;

const prefix = ['fluffy', 'delicious', 'mighty']
const suffix = ['nerd', 'burrito', 'kitten']
let userName = ''

function App() {  
  const [res, executeMutation] = useMutation(UserJoinedMutation);

  useEffect(() => {
    userName = prefix[Math.floor(Math.random()*prefix.length)] + '_'
    + suffix[Math.floor(Math.random()*suffix.length)] ;
    executeMutation({name: userName})
  }, []); //only run once

  return (
    <div className="App">
      
      <div className="main-container">
        {res.fetching ? <Loading/> :
        <>
        {/* user joins! */}
        {console.log(res)}
        <Messages hex={res.data}/>
        <MessageInput username={userName} />
        <Users/>
        </>
        
        }       
        
      </div>      
    </div>
  );
}

export default App;