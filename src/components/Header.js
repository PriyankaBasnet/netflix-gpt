import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth  } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from '../utils/userSlice';
import {LOGO} from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
  const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            navigate('/error');
      });
    }

  useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
                // User is signed in
                await user.reload(); 
                console.log('user', user);
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, 
            displayName: displayName,
            photoURL: photoURL,
                }));
        navigate("/browse");
               
      } else {
                // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
            
        }, [])
  return (
        <div className="absolute top-0 left-0 w-full flex justify-between p-5 w-screen">   
          <div>
          <img className="h-16 w-50" src={LOGO}/>  

        </div>

           {user && (<div className="flex items-center space-x-4">
               <img className="profile-icon w-16 h-16" src={user.photoURL} alt=""/>
               <button className="font-bold text-Red" onClick={handleSignOut}>Sign out</button>
            </div>)}
    </div>
    )
}

export default Header;