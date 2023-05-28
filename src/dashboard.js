import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { browserPopupRedirectResolver } from 'firebase/auth';
import Signup from './signup';
function Dashboard() {

    const [user, loading] = useAuthState(auth);

    return (
        <div className='h-fit'>
            <div className='max-w-3xl mx-auto p-4 rounded-lg flex justify-center'>

                {!user && (
                    <>
                        <div className='space-x-4 block space-y-2'>
                            <div className='signup'>
                                <Signup />
                            </div>
                        </div>
                    </>
                )}

            </div>


            {user && (

                <div className='h-96 max-w-3xl mx-auto flex justify-center items-center'>


                    <div className='block space-y-10'>

                        <div className='flex items-center justify-center space-x-3'>
                            <img className='rounded-full' src={user.photoURL}></img>
                            <span className='text-2xl'>{user.displayName?user.displayName : user.email}</span>
                        </div>

                        <div className='flex justify-center items-center'>
                            <button className='bg-lime-400 hover:bg-lime-300 shadow-xl rounded-full px-3 py-1 font-bold transition duration-300 hover:scale-105' onClick={() => auth.signOut()}>Log Out</button>
                        </div>
                    </div>

                </div>
            )}


        </div>
    );
}
export default Dashboard;