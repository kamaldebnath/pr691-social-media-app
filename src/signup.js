import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { browserPopupRedirectResolver } from 'firebase/auth';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Signup() {
    const [user, loading] = useAuthState(auth);

    const [Email, SetEmail] = useState('');
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');

    async function google_login() {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(result.user);
        } catch (error) {
            console.log(error);
        }
    }
    async function cred_login(e) {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, Email, Password);
        } catch (e) {
            console.log(e.message);
            document.querySelector('.loginclass').classList.toggle('')
        }
        SetEmail("");
        SetPassword("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, Email, Password);
        } catch (e) {
            console.log(e.message);
        }
        SetEmail("");
        SetPassword("");
    }

    async function show_sign_up(e) {
        e.preventDefault();
        document.querySelector('.login').classList.toggle('hidden');
        document.querySelector('.form').classList.toggle('hidden');

    }
    async function hide_sign_up(e) {
        e.preventDefault();
        document.querySelector('.login').classList.toggle('hidden');
        document.querySelector('.form').classList.toggle('hidden');
    }

    return (
        <>
            <div className='signup max-w-3xl mx-auto p-4 rounded-lg space-y-2'>
                <div className='block space-y-4'>
                    <div className='block space-y-2'>

                        <form  className='form flex flex-col space-y-2 bg-gray-300 px-4 py-4 w-64 rounded-xl shadow-lg bg-opacity-30 border-e-2 border-b-2 transition duration-300 hover:bg-opacity-5'>
                            <div className='flex justify-center flex-col'>
                                <label className='flex justify-start mx-2'>Email</label>
                                <input value={Email} onChange={(e) => SetEmail(e.target.value)} className='outline-none rounded-xl p-2 focus-within:scale-110 bg-gray-300 focus-within:caret-pink-500' type='email' placeholder='Enter Email'></input>
                            </div>

                            <div className='flex justify-center flex-col'>
                                <label className='flex justify-start mx-2'>Password</label>
                                <input onChange={(e) => SetPassword(e.target.value)} className='outline-none rounded-xl p-2 bg-gray-300 focus-within:scale-110 focus-within:caret-pink-500' type='password' placeholder='Enter password'></input>
                            </div>

                            <div className='loginclass flex justify-center '>
                                <button onClick={cred_login} className='bg-lime-300 rounded-xl w-20 px-2 py-2' type='submit'>Log in</button>
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='hover:text-gray-700'>Forgot Password?</button>
                            </div>
                            <div className='block'>
                                <label className='flex justify-center'>don't have an account?</label>
                                <div className='flex justify-center'>
                                    <button className='px-2 py-2 w-20 bg-orange-400 rounded-xl' onClick={show_sign_up}>Sign Up</button>
                                </div>
                            </div>
                        </form>

                    </div>

                    <div className='login hidden'>
                        <div className='flex flex-col space-y-2 bg-gray-300 px-4 py-4 w-64 rounded-xl shadow-lg bg-opacity-30 border-e-2 border-b-2 transition duration-300 hover:bg-opacity-5'>
                            <div className='flex justify-end'>
                                <button className='text-2xl bg-white px-2' onClick={hide_sign_up}>X</button>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='block space-y-2'>

                                    <form onSubmit={handleSubmit} className='flex flex-col space-y-2 px-4 py-4 w-64 rounded-xl'>
                                        <div className='flex justify-center flex-col'>
                                            <label className='flex justify-start mx-2'>Email</label>
                                            <input value={Email} onChange={(e) => SetEmail(e.target.value)} className='focus-within:scale-110 outline-none rounded-xl p-2 bg-gray-300 focus-within:caret-pink-500' type='email' placeholder='Enter Email'></input>
                                        </div>
                                        <div className='flex justify-center flex-col'>
                                            <label className='flex justify-start mx-2'>Password</label>
                                            <input value={Password} onChange={(e) => SetPassword(e.target.value)} className='focus-within:scale-110 outline-none rounded-xl p-2 bg-gray-300 focus-within:caret-pink-500' type='password' placeholder='Enter password'></input>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button className='bg-lime-300 rounded-xl w-20 px-2 py-2' type='submit'>Sign Up</button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center max-w-xs mx-auto px-2 py-1 rounded-xl bg-lime-100 shadow-lg transition duration-300 hover:scale-x-105'>

                        <button className='flex justify-center items-center space-x-2' onClick={google_login}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="48" height="48"
                                viewBox="0 0 48 48">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span className='text-lg'>Sign in using google</span>
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}
export default Signup;