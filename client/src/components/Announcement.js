
import React, { Component } from 'react'


export default class Announcement extends Component {


    render() {
        return (

            <div>
                <h3>{this.props.children}</h3>
            </div>

        )
    }
}