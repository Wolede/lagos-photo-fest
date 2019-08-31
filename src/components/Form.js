import React from 'react'

export default function Form() {
    return (
        <div className="passport-form">
            <form>
                <div>
                    <h2 className="header bold">
                        Get Your Passport
                    </h2>
                </div>
                <div className="form-control">
                    <input type="text" placeholder="First Name" name="first-name" />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Last Name" name="last-name" />
                </div>
                <div className="form-control">
                    <input type="email" placeholder="Email Address" name="email-address" />
                </div>
                <div className="form-control">
                    <input type="file" />
                </div>
                <div className="form-control">
                    <button className="button primary"> Continue </button>
                </div>
            </form>
        </div>
    )
}
