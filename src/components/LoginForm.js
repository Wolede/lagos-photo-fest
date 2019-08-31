import React from 'react'

const LoginForm = ({ inputValues: { email, password, error, loading}, onChange, onClick }) => {
    return (
        <div className="passport-form">
            <form>
                <div>
                    <h2 className="header bold">
                        Admin Login
                    </h2>
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
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        onChange={ (e) => onChange(e.currentTarget) }
                        value={password}/>
                </div>
                <div className="form-control">
                    <button 
                        type="button"
                        className="button primary"
                        onClick={ onClick }> Continue </button>
                        { (error) ? <span className="">{error.message}</span> : null }
                </div>
            </form>
        </div>
    )
}

export default LoginForm;