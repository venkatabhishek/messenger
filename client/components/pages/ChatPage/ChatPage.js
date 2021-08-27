import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ioclient from 'socket.io-client';
import { addMessage, resetMessages } from '_actions/message';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMsg: '',
      currentGroup: '',
      groupMode: 'all', // 'all', 'new', etc.
      socket: null,
    };
  }

  componentDidMount() {
    this.state.socket = ioclient('http://localhost:3000');

    this.state.socket.on('msg', (data) => {
      this.props.addMessage(data, data.author);
    });
  }

  // assumes each group's messages are sorted
  sortGroups(groups, mode) {
    
    let mappedGroups = groups.map(g=>{

      if(g.messages.length === 0){

        g.latest = {
          text: '',
          date: ''
        }

      }else{

        g.latest = g.messages[g.message.length - 1];

      }


      return g;
    })

    if(mode === 'new'){

      return mappedGroups.sort((a, b) => {
        if(a.latest.time < b.latest.time){
          return -1
        }else{
          return 1;
        }
      })

    }else{
      return mappedGroups;
    }
  }

  setGroup(g) {
    this.props.resetMessages();
    this.setState({ currentGroup: g })
    this.state.socket.emit('join', g );
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
    const { currentMsg, currentGroup, socket } = this.state;
    const { user } = this.props;
    if (currentMsg !== '' && event.key === 'Enter') {
      const data = {
        text: currentMsg,
        author: user,
        date: new Date(),
      };

      this.props.addMessage(data, user);
      this.setState({ currentMsg: '' });

      socket.emit('msg', {room: currentGroup, msg: data});
    }
  };

  render() {
    const { currentMsg, currentGroup, groupMode } = this.state;
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
            <div className={"group" + (g.name === currentGroup ? " group-active" : "")} key={i} onClick={() => this.setGroup(g.name)}>
              <div className="circle"></div>
              <div className="group-content">
                <h3 className="is-size-4">{g.name}</h3>
                <h4 className="is-size-6">{g.latest.text}</h4>
              </div>
              <h4 className="group-time">{g.latest.date}</h4>              
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
              <div
              className="chat-box"
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
                    <div className="chat-message">{m.text}</div>
                    <span className="chat-subtitle" style={margin}>
                      {author}
                    </span>
                  </div>
                );
              })}
            </div>

            <input
              className="input-main"
              value={currentMsg}
              onChange={this.onChange}
              onKeyDown={this.handleKeyDown}
              placeholder="Type your message..."
            />
          </>
          )}

        </div>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ addMessage, resetMessages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
