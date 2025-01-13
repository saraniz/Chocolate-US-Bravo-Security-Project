import React from 'react'

const RegisterPage = () => {
  return (
    <>
    <div className='log-bag'>
        <div className="container-fluid ">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-6 text-white login-form p-5">
                    <h1 class="text-center">SING UP</h1>

                <form action="" id="loginForm" onsubmit="">

                    <div className="form-group">
                        <label for="username">User Name</label>
                        <input className="form-control mt-2" placeholder="eg:STU2220009" type="text" name="" id="username" />
                        <span className="error text-danger" id="usernameError"></span>
                    </div>
                    
                    <div className="form-group mt-3">
                        <label for="password">Password</label>
                        <input className="form-control mt-2" placeholder="Enter your password" type="text" name="" id="password" />
                        <span className="error text-danger" id="passwordError"></span>

                    </div>
                    <div className="form-group">
                        <label for="username">Re Password</label>
                        <input className="form-control mt-2" placeholder="enter password" type="password" name="" id="repass" />
                        <span className="error text-danger" id="usernameError"></span>
                    </div>
                    
                    <div className="form-group mt-3">
                        <label for="password">Email</label>
                        <input className="form-control mt-2" placeholder="Enter your email" type="email" name="" id="password" />
                        <span className="error text-danger" id="passwordError"></span>

                    </div>

                    <div className="row text-center mt-3">
                        <div className="col">
                            <p>Don't have an account?</p>
                        </div>
                        <div className="col">
                            <a href="" className="text-decoration-none text-light">Login</a>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-center">
                        <button type="submit" id='btnn' className=" btn w-50 my-2">Sign Up</button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default RegisterPage