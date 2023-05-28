import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import {Home ,showPostMenu} from "./Home";

function Posts({ children, avatar, username, postdata, useremail, postImage }) {
    const [loggeduser, loading] = useAuthState(auth);

   

    return (
        <div className="">

            <div className="h-auto py-4 rounded-lg bg-gray-200 transition duration-300 hover:bg-gray-100 ">
                <div>
                    <div className="px-4 flex justify-between">
                        <div className="flex items-center space-x-2">
                            <img className="w-10 h-10 rounded-full" src={avatar ? avatar : 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'}></img>
                            <div className="flex space-x-1 items-center">
                                <span className="text-sm font-bold">{username ? username : useremail}</span>

                                <>
                                    {username && (

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-sky-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>

                                    )}
                                </>
                            </div>
                        </div>
                        <div>
                            <button className="transition duration-300 hover:bg-white p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-8 py-1 break-words">
                        <h1>{postdata}</h1>
                    </div>
                    <div className="flex items-center justify-center px-8">
                        <img src={postImage}></img>
                    </div>
                </div>
                <div className="flex justify-start px-4">
                    <div className="flex items-center space-x-4 transition duration-300">
                        <div className="flex items-center justify-center space-x-1  transition duration-300 hover:bg-red-300 py-1 px-2 rounded-xl cursor-pointer">
                            <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition duration-300 hover:fill-red-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            </button>
                            <span>200</span>

                        </div>
                        <div className="flex items-center justify-center space-x-1 transition duration-300 hover:bg-sky-300 py-1 px-2 rounded-xl cursor-pointer ">
                            <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>
                            </button>
                            <span>200</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Posts;