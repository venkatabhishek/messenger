import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';


export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "bob",
      date: new Date(),
      text: "bob's message"
    },
    {
      author: "me",
      date: new Date(),
      text: "my message"
    },
    {
      author: "bob",
      date: new Date(),
      text: "bob's message"
    },
    {
      author: "me",
      date: new Date(),
      text: "my message"
    }
  ]);
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));
  let chat = null;

  useEffect(() => {
    chat.scrollTop = chat.scrollHeight;
  })

  const onChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight + 5) + "px";
    setMsg(e.target.value);
  }

  const addMessage = (message) => {

    if(messages.length >= 1){

      let last = messages[messages.length - 1]

      if(last.author == "me"){

        last.text += "\n"+message.text;
        last.date = message.date;

        messages[messages.length - 1] = last;
        setMessages(messages);

        return;

      }

    }


    let m = [...messages, message];
    setMessages(m);


  }

  const handleKeyDown = (event) => {

      if(msg != "" && event.key === "Enter"){
        addMessage({
          text: msg,
          author: "me",
          date: new Date()
        });
        setMsg("");

      }
  }

  return (
    <div className="chat-page">

      <div className="groups"></div>

      <div className="chat">

        <div className="chat-box" 
          ref={(div) => { chat = div }}>

          {messages.map((m, i) => {

            let align = m.author == "me" ? "flex-end" : "flex-start";
            let margin = m.author == "me" ? {marginRight: "8px"} : {marginLeft: "8px"}

            let date = null; // TODO: if date is today show time, else show mm/dd/yyyy

            return (
              <div key={i} className="chat-message-wrapper" style={{alignItems: align}}>
                <div className="chat-message" >
                  {m.text}
                </div>
                <span className="chat-subtitle" style={margin}>{m.author}</span>
              </div>
            )
          })}

        </div>

        <input className="input-main" 
          value={msg}
          onChange={onChange}
          placeholder="Type your message..." 
          onKeyDown={handleKeyDown} />

      </div>
    </div>
  );
}
