import React from 'react'


const Form = ({ inputValues: { first_name, last_name, email, date_of_birth, place_of_birth, sex, nationality, inputValidation, emailValidation, fileTooLarge, fileNotFound }, onChange, onClick }) => {
    const enterHandler = () => {
        window.addEventListener("keyup", function (event) {
            // 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel default action
                event.preventDefault();
                // Trigger the button element with a click
                // Trigger the button element with a click
                let loginTrigger = document.querySelector("#loginButtonRef");
                this.console.log(event.target);
                if (loginTrigger && loginTrigger !== null) {
                    loginTrigger.click();
                }
            }
        });
    };

    enterHandler();

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
                <div className="form-control form-control__2col">
                    <input
                        type="text"
                        placeholder="Nationality"
                        name="nationality"
                        onChange={(e) => onChange(e.currentTarget)}
                        value={nationality}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Birthday"
                        name="date_of_birth"
                        onChange={(e) => onChange(e.currentTarget)}
                        value={date_of_birth}
                        // min="2019-01-01" 
                        // max="2019-12-31"
                        required
                    />
                </div>
                
                <div className="form-control form-control__2col">
                    <select className="select" name="sex" onChange={(e) => onChange(e.currentTarget)}>
                        <option className="select__value" disabled defaultValue selected="selected">Select Gender</option>
                        <option className="select__value" value='M'>Male</option>
                        <option className="select__value" value="F">Female</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Place of Birth"
                        name="place_of_birth"
                        onChange={(e) => onChange(e.currentTarget)}
                        value={place_of_birth}
                        required
                    />
                </div>
                
                <div className="form-control">
                    <input className="fileUpload"
                        type="file"
                        name="guest_image"
                        onChange={(e) => onChange(e.currentTarget)}
                        data-max-size="10000"
                        accept="image/png, image/jpeg, image/jpg" />
                </div>
                <div className="form-control">
                    <button
                        type="button"
                        id="loginButtonRef"
                        className="button primary"
                        onClick={onClick}> Continue </button>
                    {(!inputValidation) ? <span className="form-error">Kindly ensure all fields are filled</span> :
                        (!emailValidation) ? <span className="form-error">Enter a valid email address</span> :
                            (fileNotFound) ?
                                (<span className="form-error">
                                    <br />  Your have not selected a file for upload
                                    </span>
                                ) :
                                (fileTooLarge) ?
                                    (<span className="form-error">
                                        <br />  Your image is too large. Upload smaller file
                                            <br />
                                        Try out <a href="http://www.imageoptimizer.net/" target="_blank" without="true" rel="noopener noreferrer">imageoptimizer.net</a>
                                    </span>
                                    ) : null
                    }
                </div>
            </form>
        </div>
    )
}

export default Form;