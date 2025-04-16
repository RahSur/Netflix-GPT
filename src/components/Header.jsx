import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    useEffect(()=>{
        //onAuthStateChange returns a fn to unsubscribe when a component destroyed.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName}));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        
        return () => unsubscribe();
    },[]);

    const handleSignOut = () => {
            signOut(auth).then(() => {})
            .catch(() => {
                navigate("/error");
            });
    }

    return (
        <>
            <div className='absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
                <img className='w-48 block' src={LOGO} alt="logo" />
                {user && <p className='text-s font-bold text-red-600 mr-8 mt-4 cursor-pointer' onClick={handleSignOut}><span className='text-black block'>{user?.displayName ? 'Hi, '+user.displayName+'!' : 'Hi User!'}</span>Sign Out</p> }
            </div>
        </>
    )
}

export default Header