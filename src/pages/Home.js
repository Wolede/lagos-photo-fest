import React, { Component } from 'react'
import Form from '../components/Form'
import GuestList from './GuestList'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Form />
                <GuestList />
            </div>
        )
    }
}
