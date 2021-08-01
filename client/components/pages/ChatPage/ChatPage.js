import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ioclient from 'socket.io-client';
import { addMessage } from '_actions/message';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMsg: '',
      socket: null,
    };
  }

  componentDidMount() {
    this.state.socket = ioclient('http://localhost:3000');

    this.state.socket.on('msg', (data) => {
      this.props.addMessage(data, data.author);
    });
  }

  onChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
    this.setState({ currentMsg: e.target.value });
  };

  handleKeyDown = (event) => {
    const { currentMsg, socket } = this.state;
    const { user } = this.props;
    if (currentMsg !== '' && event.key === 'Enter') {
      const data = {
        text: currentMsg,
        author: user,
        date: new Date(),
      };

      this.props.addMessage(data, user);
      this.setState({ currentMsg: '' });

      socket.emit('msg', data);
    }
  };

  render() {
    const { currentMsg } = this.state;
    const { groups, messages, user } = this.props;

    return (
      <div className="chat-page">
        <div className="groups">
          {groups.map((g, i) => (
            <div key={i}>
              {g.name}
            </div>
          ))}
        </div>

        <div className="chat">
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
};

const mapStateToProps = (state) => {
  const { groups, messages, user } = state;
  return { groups, messages, user };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
