import React from 'react'


const Form = ({ inputValues: { first_name, last_name, email, guest_image, inputValidation, emailValidation }, onChange, onClick }) => {
    console.log(first_name);
    console.log(emailValidation);
    
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
                        value={first_name}
                        required    
                        />
                </div>
                <div className="form-control">
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="last_name" 
                        onChange={(e) => onChange(e.currentTarget)}
                        value={last_name}
                        required    
                        />
                </div>
                <div className="form-control">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        onChange={(e) => onChange(e.currentTarget)}
                        value={email}
                        required
                        />
                         
                </div>
                <div className="form-control">
                    <input className ="fileUpload"
                        type="file" 
                        name="guest_image"
                        data-max-size="2500" 
                        accept="image/png, image/jpeg, image/jpg"
                                            
                        />
                </div>
                <div className="form-control">
                    <button 
                        type="button"
                        className="button primary"
                        onClick={onClick}> Continue </button>
                        { (inputValidation) ? null : (emailValidation ? <span className="form-error">Kindly ensure all fields are filled</span> 
                        : <span className="form-error">Enter a valid email address</span>) }
                </div>
            </form>
        </div>
    )
}

export default Form;