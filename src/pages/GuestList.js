import React, { Component } from 'react'
import GuestListItem from '../components/GuestListItem'
import searchIcon from '../assets/images/icons-search.svg'

export default class GuestList extends Component {
    render() {
        return (
            <section className="guest-list">
                <div className="container">
                    <p className="logout">Logout</p>
                    <div className="flex">
                        <div className="col-1">
                            <h2 className="header bold text-white">Guest List</h2>
                        </div>
                        <div className="col-2 text-right">
                            <div class="search">
                                <span class="search-icon"><img src={searchIcon}/></span>
                                <input placeholder="Search.."/>
                            </div>
                            <button class="button primary">Export</button>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email Address</td>
                                    <td>Passport No</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <GuestListItem />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}
