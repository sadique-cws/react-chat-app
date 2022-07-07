import logo from './logo.svg';
import './App.css';

import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';
import CreateUser from './components/CreateUser';
import OnlineUsers from './components/OnlineUsers';
import MessageContainer from './components/MessageContainer';

const socket = io(`http://localhost:8000`);

function App() {

  const [step, setStep] = useState(1);
  const [username, setusername] = useState("")
  const [users, setUsers]  = useState({});

  const handleSetUsername = () => {
    console.log(username)
    socket.emit("new_user",username)
    setStep(2);
  }

  const selectUser = (name) => {
    setStep(3);
  }

  useEffect(() => {
    socket.on("new_user",(user) => {
      console.log([user])
      setUsers(user);
    })
  },[users])


  return (
    <div className="App">
      <header className="App-header">
          <h1>Messenger App </h1>
      </header>
      <div className='card'>
        <div className='chatBox'>
            {step === 1 && <CreateUser handleSetUsername={handleSetUsername} value={username} onChange={setusername}/>}
            {step === 2 && <OnlineUsers data={users} selectUser={selectUser}/>}
            {step === 3 && <MessageContainer />}

        </div>
        </div>
    </div>
  );
}

export default App;
