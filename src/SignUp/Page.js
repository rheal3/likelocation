import {useState} from 'react'

const SignUpPage = () => {

    const [signupState, setSignupValues] = useState({})

    const updateSignup = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputVal = target.value;
        const updatedSignup = {...signupState, [inputName]: inputVal }
        setSignupValues(updatedSignup)
    }

    const {email, password, password2} = signupState

    return (
        <div onChange={updateSignup}>
            <input type="email" name="email" placeholder='Enter Email' value={email}/>
            <input type="password" name="password" placeholder='Password' value={password}/>
            <input type="password" name="password2" placeholder='Verify Password' value={password2}/>
            <button>submit</button>
        </div>
    )
}

export default SignUpPage