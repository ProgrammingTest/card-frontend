import React, { Component, Fragment } from 'react';
import Player from '../Player/Player';

export default class GameCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: 0,
      cards: [],
      message: '',
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    let className = 'message';

    if (this.state.message !== '') {
      if (!this.state.error) {
        className += ' message--error';
      } else {
        className += ' message--success';
      }
    }

    return (
      <div className="container">
        <p className={className}>{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Number of People:
            <input type="text" value={this.state.people} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="results">
          {this.state.cards && this.state.cards.map((card, index) => (
            <Fragment key={index}>
              <Player cards={card}/>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  distribute(people) {
    // Replace url with the correct endpoint
    let url = 'http://localhost/backend/card_game.php';
    let data = {
      no_of_players: people,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        let cards = null;

        if (data.success) {
          cards = data.data
        }

        this.setState(() => ({
          cards: cards,
          message: data.message,
          error: data.success
        }));
      });
  }

  handleChange(event) {
    this.setState({ people: event.target.value });
  }

  handleSubmit(event) {
    this.distribute(this.state.people);
    event.preventDefault();
  }
}