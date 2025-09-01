import Header from './Header';
import { useState, useRef } from 'react';
import {checkValidData} from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR} from "../utils/constants";

const Login = () => {
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const toggleSignInform = () => {
        setIsSignInForm(!isSignInForm);
    }
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const handleButtonClick = () => {
        //validateform data
        //if valid then redirect to browse page
        //else show error message

           const message = checkValidData(email.current.value, password.current.value);
           setErrorMessage(message);
           if(message) return;
           //if user sign up
           if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: USER_AVATAR
                      }).then((user) => {
                        // Profile updated!
                        console.log('Profile updated', user);
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, 
                            displayName: displayName,
                            photoURL: photoURL,
                        }));                        

                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.code+'-'+error.message);
                      });
                 
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+'-'+errorMessage);
                });
               
           } else {
                      
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);                     
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+'-'+errorMessage);           
                });
           }
    }
    return (     
        <div className="container "> 
        <div className="absolute">
          <Header/>  
           <img className='' src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_small.jpg 959w" />  
        </div>
        

        <form onClick={(e)=> {e.preventDefault()}} className="absolute w-1/3 p-12 bg-black z-70 mx-auto mx-36 right-0 left-0 bg-opacity-85 ">
            <p className="text-3xl text-white mb-4">{isSignInForm? "Sign In": "Sign up"}</p>
            {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="w-full p-2 m-2 rounded-md opacity-100 bg-gray-700"/>) }
            <input ref={email} type="text" placeholder="Email Address" className="w-full p-2 m-2 rounded-md opacity-100 bg-gray-700"/>
            <input ref={password} type="text" placeholder="Password" className="w-full p-2 m-2 rounded-md pacity-100 bg-gray-700"/>
            <p className='text-red-500 p-2 m-2'>{errorMessage}</p>
            <button className="p-2 m-2 bg-[#E50914] text-white font-bold pacity-100 w-full rounded-md"
            onClick={handleButtonClick}>{isSignInForm? "Sign In": "Sign up"}</button>

            <p className="text-white p-2 cursor-pointer" onClick={toggleSignInform}> {isSignInForm? "New to Netflix? Sign up now.": "Already registered please Sign in"}</p>
        </form>
                        
        </div>
    )
};
export default Login;