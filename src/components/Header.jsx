import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName}));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        }); 
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
                <img className='w-48 block' src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
                {user && <p className='text-s font-bold text-red-600 mr-8 mt-4 cursor-pointer' onClick={handleSignOut}><span className='text-black block'>{user?.displayName ? 'Hi, '+user.displayName+'!' : 'Hi User!'}</span>Sign Out</p> }
            </div>
        </>
    )
}

export default Header