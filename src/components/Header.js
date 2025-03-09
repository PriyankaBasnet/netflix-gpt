import { useState } from 'react';
const Header = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInform = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div className="container absolute">
        <div className="">
            <img className="h-16 w-50" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"/>
        </div>
        <form className=" relative p-12 bg-black m-34 z-70 w-1/3 m-auto bg-opacity-85">
            <p className="text-3xl text-white mb-4">{isSignInForm? "Sign In": "Sign up"}</p>
            {!isSignInForm && (<input type="text" placeholder="Full Name" className="w-full p-2 m-2 rounded-md opacity-100 bg-gray-700"/>) }
            <input type="text" placeholder="Email Address" className="w-full p-2 m-2 rounded-md opacity-100 bg-gray-700"/>
            <input type="text" placeholder="Password" className="w-full p-2 m-2 rounded-md pacity-100 bg-gray-700"/>
            <button className="p-2 m-2 bg-[#E50914] text-white font-bold pacity-100 w-full rounded-md">{isSignInForm? "Sign In": "Sign up"}</button>

            <p className="text-white p-2 cursor-pointer" onClick={toggleSignInform}> {isSignInForm? "New to Netflix? Sign up now.": "Already registered please Sign in"}</p>
        </form>
        </div>  
    )
}

export default Header;