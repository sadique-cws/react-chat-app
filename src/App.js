import {io} from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
import CreateUser from './components/CreateUser';
import OnlineUsers from './components/OnlineUsers';
import MessageContainer from './components/MessageContainer';

const socket = io(`http://localhost:8000`);

function App() {

  const [step, setStep] = useState(1);
  const [username, setusername] = useState("")
  const [users, setUsers]  = useState({});
  const [media,setMedia] = useState(null)
  const [message, setMessage] = useState("")
  const [reciever, setReciever] = useState("")
  const [groupMessage, setGroupMessage] = useState({})
  const recieverRef = useRef(null)


const sortNames = (username1, username2) => {
  return [username1, username2].sort().join('-');
}

  const handleSetUsername = () => {
    socket.emit("new_user",username)
    setStep(2);
  }

  const selectUser = (name) => {
    setReciever(name)
    recieverRef.current = name;
    setStep(3);
  }
  const handleGoBack = () => {
    setStep(2);
  }

  const goBottom = () => {
    const el = document.querySelector(".card-body ul");

    console.log(el)

    if(el){
      el.scrollTop = el.scrollHeight;
      console.log(el.screenTop);
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender:username,
      message,
      reciever,
      media,
      view:false,
    }

    socket.emit("send_message", data);
    setMessage("")


    const key = sortNames(username,reciever);
    const tempGroupMessage = {...groupMessage};
    if(key in tempGroupMessage){
      tempGroupMessage[key] = [...tempGroupMessage[key],{...data,view:false}]
    }
    else{
      tempGroupMessage[key] = [{...data,view:false}];
    }


    setGroupMessage({...tempGroupMessage})


      if(media !== null){
        setMedia(null);
      }

    //alok, amit [alok-amit] => [m1, m2, m3]
    //alok, sachin [alok-sachin] => [m1, m2, m2]
    //amit, sachin [amit-sachin] => [m1, m2, m3]

  }

  const checkUnseenMessages = (user) => {
    // here user = reciever
      const key = sortNames(username,user);
      let unseenmsg = [];
      if(key in groupMessage){
        unseenmsg = groupMessage[key].filter((msg) => msg.reciever === username && !msg.view)
      }
      return unseenmsg.length;
  }
  useEffect(() => {
    socket.on("all_user",(user) => {
      console.log([user])
      setUsers(user);
    })


    socket.on("new_message", (data) => {
      // console.log(data)
  
      setGroupMessage(prevGroupMessage => {
        const msg = {...prevGroupMessage};
        const key = sortNames(data.sender, data.reciever);

        if(recieverRef.current === data.sender){
          data.view = true;
        }

        if(key in msg){
          msg[key] = [...msg[key], data]
        }
        else{
          msg[key] = [data]
        }

        return {...msg}
      })
  })
  },[])


  useEffect(() => {
    updateMsgView();
  },[reciever])

  useEffect(() => {
    const key = sortNames(username,reciever);

    if(key in groupMessage){
      if(groupMessage[key].length > 0){
        goBottom();
      }
    }
   
},[groupMessage])

  const updateMsgView = () => {
    const key = sortNames(username,reciever);
    if(key in groupMessage){
      const msgs = groupMessage[key].map(msg => !msg.view ? {...msg, view:true} : msg)

      groupMessage[key] = [...msgs];
    }
  }
  console.log(groupMessage)

  return (
    <div className="container">
      <header className="container mx-auto my-3 text-center">
          <h1 className='text-white fw-bold'>Messenger App </h1>
      </header>
      <div className='card col-lg-5 col-12 mx-auto'>
        <div className='card-body p-0'>
            {step === 1 && <CreateUser handleSetUsername={handleSetUsername} value={username} onChange={setusername}/>}
            
            {step === 2 && <OnlineUsers 
            username={username} 
            data={users} 
            selectUser={selectUser} 
            checkUnseenMessages={checkUnseenMessages}/>}

            {step === 3 && <MessageContainer
            reciever={reciever} 
            value={message} 
            onChange={setMessage} 
            sendMessage={sendMessage} 
            handleGoBack={handleGoBack} 
            sortNames={sortNames}
            groupMessage={groupMessage}
            username={username}
            setMedia={setMedia}
            />}

        </div>
        </div>
    </div>
  );
}

export default App;
