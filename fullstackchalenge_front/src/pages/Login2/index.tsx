import React from 'react';

import './styles.css';

const Login2 = () => {
    return (
        <div>
            <body>
                <section className="form-section">
                    <h1>Enter the Rocket</h1>

                    <div className="form-wrapper">
                        <form>
                        <div className="input-block">
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" />
                        </div>
                        <div className="input-block">
                            <label htmlFor="login-password">Password</label>
                            <input type="password" id="login-password" />
                        </div>
                        <button type="submit" className="btn-login">Login</button>
                        </form>
                    </div>
                </section>
                <script src="script.js"></script>               
            </body>
        </div>
    );
}

export default Login2;