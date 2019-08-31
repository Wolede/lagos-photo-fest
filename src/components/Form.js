import React from 'react'

const Form = ({ first_name, last_name, email, onChange, onClick}) => {
    
    return (
        <div className="passport-form">
            <form>
                <div>
                    <h2 className="header bold">
                        Get Your Passport
                    </h2>
                </div>
                <div className="form-control">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="first_name" 
                        onChange={(e) => onChange(e.currentTarget)}
                        value={first_name}/>
                </div>
                <div className="form-control">
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="last_name" 
                        onChange={(e) => onChange(e.currentTarget)}
                        value={last_name}/>
                </div>
                <div className="form-control">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        onChange={(e) => onChange(e.currentTarget)}
                        value={email}/>
                </div>
                <div className="form-control">
                    <input 
                        type="file" 
                        name="guest_image" />
                </div>
                <div className="form-control">
                    <button 
                        type="button"
                        className="button primary"
                        onClick={onClick}> Continue </button>
                </div>
            </form>
        </div>
    )
}

export default Form;