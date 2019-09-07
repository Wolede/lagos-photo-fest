import React from 'react'

const LoginForm = React.forwardRef(({ inputValues: { email, password, error, loading}, onChange, onClick }, ref) => {
    
    const enterHandler = () => {
        window.addEventListener("keyup", function (event) {
            // 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel default action
                event.preventDefault();
                // Trigger the button element with a click
                // Trigger the button element with a click
                let ref = React.createRef();
                this.console.log(this.ref);
                let loginTrigger  =  document.querySelector("#loginButtonRef");
                if(loginTrigger && loginTrigger !== null ){
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
                        id="loginButtonRef"
                        type="button"
                        className="button primary"
                        onClick={ onClick }> Continue </button>
                        { (error) ? <span className="">{error.message}</span> : null }
                </div>
            </form>
        </div>
    )
});

export default LoginForm;