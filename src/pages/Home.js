import React, { Component } from 'react'
import Form from '../components/Form'
import GuestList from './GuestList'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="flex">
                    <div className="col-1">
                        <div className="text-wrapper text-white"> 
                            <h1 className="mega bold">
                                10th Annual Festival
                            </h1>
                            <p >
                            Begin your journey on this special 10th Edition of Lagos Photo.
                            <br /><br />
                            Get a passport to ensure you have an exciting time as you experience all the events lined up this year.
                            </p>
                            <h3 className="header regular">
                                Time: 00:00
                                <br /><br />
                                Location: xxxx, xxx, xxxxxxxx, xxxxx
                            </h3>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="form-wrapper">
                            <Form />
                            <div className="text-center powered-by">powered by <a href="http://minimalyst.design" target="_blank">minimalyst.design</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
