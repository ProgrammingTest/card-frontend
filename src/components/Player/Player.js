import React, { Component, Fragment } from 'react';
import './Player.css';

export default class Player extends Component {

    render() {
        return (
            <div className="player-wrapper">
                <div className="player-info">
                    Player {this.props.cards.player} (Cards: {this.props.cards.hand.length})
                </div>
                <div className="player-hand">
                    {this.props.cards.hand && this.props.cards.hand.map((card, index) => (
                        <Fragment key={index}>
                            <div className="card">{card}</div>
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }
}
