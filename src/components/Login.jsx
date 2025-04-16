import React, {useState, useRef} from 'react'
import Header from './Header'
import { validateData } from '../utils/validateData';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { HOME_BANNER } from '../utils/constants';

const Login = () => {
    const [isLogin, setisLogin] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleSign = () => {
        setisLogin(!isLogin);
    }

    const handleClick = () => {
        const msg = validateData(email.current.value, password.current.value);
        setError(msg);
        if(msg) return;

        if(!isLogin){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                    }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid:uid,email:email,displayName:displayName}));
                    }).catch((error) => {
                     console.log(error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode + "-" + errorMessage);
            });
        }else{
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
            .then((userCredential) => {
                //Signed In
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode + "-" + errorMessage);
            });
        }
    }

    return (
        <>
        <Header />
        <div className="absolute">
            <img src={HOME_BANNER} alt="home banner"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-32 mx-auto right-0 left-0 rounded-lg opacity-80">
            <h1 className="font-bold text-3xl pb-4 text-white">{isLogin ? "Sign In" : "Sign Up"}</h1>
            {!isLogin && <input ref={name} className="p-4 my-4 text-black w-full bg-gray-600" type="text" placeholder="Name" /> }
            <input required ref={email} className="p-4 my-4 text-black w-full bg-gray-600" type="text" placeholder="Email or mobile number" />
            <input required ref={password} className="p-4 my-4 text-black w-full bg-gray-600" type="password" placeholder="Password" />
            <p className='text-red-500'>{error}</p>
            <button className="p-2 my-6 w-full text-white bg-red-700 rounded-lg cursor-pointer" onClick={handleClick}>{isLogin ? "Sign In" : "Sign Up"}</button>
            <p className="text-white cursor-pointer" onClick={handleSign}>{isLogin ? "New to Netflix ? Sign Up now." : "Already Registered ? Sign In!"}</p>
        </form>
        </>
    )
}

export default Login