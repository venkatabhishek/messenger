import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ioclient from 'socket.io-client';
import { addMessage, resetMessages } from '_actions/message';
import { getMessages } from '_thunks/message';
import moment from 'moment'

import InfoDialog from '_molecules/InfoDialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatbox: React.createRef(),
      currentMsg: '',
      currentGroup: '',
      groupMode: 'all', // 'all', 'new', etc.
      socket: null,
      isTyping: new Set(),
      typingTimer: {},
      open: false
    };

    this.chatbox = React.createRef();
  }

  scrollToBottom () {
    this.chatbox.scrollIntoView();
  }

  componentDidMount() {
    this.state.socket = ioclient('http://localhost:3000');

    this.state.socket.on('msg', (data) => {
      console.log("external message", data)
      this.props.addMessage(data);
    });

    this.state.socket.on('typing', (user) => {

      let { username } = user;

      let { isTyping, typingTimer } = this.state;
      
      this.setState({ isTyping: isTyping.add(username) });

      if(username in typingTimer){
        window.clearTimeout(typingTimer[username]);
      }

      let context = this;

      typingTimer[username] = window.setTimeout(() => {
        
        context.state.typingTimer[username] = null;
        context.state.isTyping.delete(username)

        context.setState(context.state)

      }, 2500)

      this.setState({ typingTimer })

    });

    if(this.state.currentGroup != ''){
      this.scrollToBottom();      
    }
  }

  componentDidUpdate(){
    let { groups } = this.props;
    let { currentGroup } = this.state;
    if(groups.length > 0 && currentGroup == ''){
      this.setGroup(groups[0])
    }

    if(currentGroup != ''){
      this.scrollToBottom();      
    }

  }

  // assumes each group's messages are sorted
  sortGroups(groups, mode) {
    
    if(mode === 'new'){

      return groups.sort((a, b) => {
        if(!a.latest){
          return 1;
        }else if(!b.latest){
          return -1;
        }else if(a.latest.date < b.latest.date){
          return -1
        }else{
          return 1;
        }
      })

    }else{
      return groups;
    }
  }

  formatDate(d){
    let date = moment(d);
    let isToday = date.isSame(new Date(), "day");
    let isYear = date.isSame(new Date(), "year");
    if(isToday){
      return date.format("h:mm a")
    }else if(isYear){
      return date.format("MMM. Do")
    }
    return date.format("dd/MM/YY");
  }

  setGroup(g) {
    this.props.resetMessages();
    this.setState({ currentGroup: g });
    this.state.socket.emit('join', g._id );
    this.props.getMessages(g._id);
  }

  changeMode(mode) {
    this.setState({ groupMode: mode })
  }

  onChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
    this.setState({ currentMsg: e.target.value });
  };

  handleKeyDown = (event) => {
    const { chatbox, currentMsg, currentGroup, socket } = this.state;
    const { user } = this.props;

    // message socket
    if (currentMsg !== '' && event.key === 'Enter') {
      const data = {
        content: currentMsg,
        author: user,
        date: new Date(),
      };

      // this.props.addMessage(data);
      socket.emit('msg', {room: currentGroup, msg: data});
      this.setState({ currentMsg: '' });


    }

    // typing socket
    socket.emit('typing', {room: currentGroup})
  };


  toggleInfo(status){
    this.setState({
      open: status
    })
  }
  
  // shortCut = (e) => {
  //   let { groups } = this.props;
  //   if(e.ctrlKey && e.keyCode == '1'.charCodeAt(0)){
  //     e.preventDefault();
  //     this.setGroup(groups[0])
  //   }
  // }

  render() {
    const { chatbox, currentMsg, currentGroup, groupMode, isTyping, open, t } = this.state;
    const { groups, messages, user } = this.props;

    return (
      <div className="chat-page">
        <div className="groups">
          <h1 className="is-size-1">Chats</h1>
          
          <div className="tab-nav">
              <h3 className={"tab-option is-size-4" + (groupMode === "all" ? " tab-active" : "")} onClick={() => this.changeMode('all')}>All</h3>
              <h3 className={"tab-option is-size-4" + (groupMode === "new" ? " tab-active" : "")} onClick={() => this.changeMode('new')}>New</h3>
          </div>

          {this.sortGroups(groups).map((g, i) => (
            <div className={"group" + (g._id === currentGroup._id ? " group-active" : "")} key={i} onClick={() => this.setGroup(g)}>
              <div className="circle">
                <img src={`https://robohash.org/${encodeURIComponent(g.name)}.png`} alt="" />
              </div>
              <div className="group-content">
                <h3 className="is-size-4">{g.name}</h3>
                <h4 className="is-size-6">{g.latest ? `${g.latest.author.username}: ${g.latest.content}` : ""}</h4>
              </div>
              <h4 className="group-time">{g.latest ? this.formatDate(g.latest.date) : ""}</h4>              
            </div>
          ))}
        </div>

        <div className="chat">
          {currentGroup === '' && 
          (
            <h1>Select a group</h1>
          )}

          {currentGroup !== '' && 
          (
            <>
              <div className="top-bar"> 

                <div className="info" onClick={() => this.toggleInfo(true)}>
                  <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                </div>

              </div>
              <div
              className="chat-box"
              ref={chatbox}
              >

             

              {messages.map((m, i) => {
                const author = m.author.username === user.username ? 'me' : m.author.username;
                const align = author === 'me' ? 'flex-end' : 'flex-start';
                const margin = author === 'me' ? { marginRight: '8px' } : { marginLeft: '8px' };
                return (
                  <div
                    key={i}
                    className="chat-message-wrapper"
                    style={{ alignItems: align }}
                  >
                    <div className="chat-message">{m.content}</div>
                  { ( i == messages.length-1 || m.author.username != messages[i+1].author.username ) &&
                    <span className="chat-subtitle" style={margin}>
                      {author == 'me' ? '' : author + ": "} {this.formatDate(m.date)}
                    </span>
                  }
                  </div>
                );
              })}
              {isTyping.size != 0 && 
              (<div className="chat-message" style={{marginTop: "15px"}}>
                {Array.from(isTyping).join(', ')} {isTyping.size == 1 ? "is" : "are"} typing...
              </div>
              )}
              <div ref={(el) => { this.chatbox = el; }}></div>
            </div>

            <input
              className="input-main"
              value={currentMsg}
              onChange={this.onChange}
              onKeyDown={this.handleKeyDown}
              autoFocus
              placeholder="Type your message..."
            />
          </>
          )}

        </div>

        <InfoDialog open={open} onClose={() => this.toggleInfo(false)} group={currentGroup}/>
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { groups, messages, user } = state;
  return { groups, messages, user };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addMessage, resetMessages, getMessages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
