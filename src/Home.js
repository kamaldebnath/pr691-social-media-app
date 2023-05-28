
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from './firebase';
import { useState, useEffect } from 'react';
import { addDoc, onSnapshot, serverTimestamp, orderBy, query, or } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import Posts from './Posts';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



function Home() {
    const [user, loading] = useAuthState(auth);
    async function google_login() {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            console.log(error);
        }
    }


    const [post, setpost] = useState({ postdata: '' });
    const [myimage, setmyimage] = useState();

    const collectionRef = collection(db, "posts");

    async function submitPost(e) {
        e.preventDefault();

        if (post.postdata || myimage) {
            if (myimage) {
                const ImageRef = ref(storage, `images/${myimage.name}`);
                await uploadBytes(ImageRef, myimage);
                var url = await getDownloadURL(ImageRef).then((e) => { return e });
            }
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
                useremail: user.email,
                postImage: url ? url : null,

            });
        }
        setpost({ postdata: "" });
        setmyimage(null);

    };

    const [allpost, setallpost] = useState([]);

    async function getPosts() {
        const q = query(collectionRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setallpost(snapshot.docs.map((doc) => ({ ...doc.data() })))
        })
        return unsubscribe;

    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="max-w-xl mx-auto">
            <div className="max-w-xl mx-auto py-2">

                {user && (
                    <div>
                        <div>
                        </div>
                        <form className="h-52 max-w-2xl md:mx-auto space-y-6 p-3 bg-slate-200 rounded-lg my-2 mx-4" onSubmit={submitPost}>

                            <div className="flex justify-center">
                                <textarea value={post.postdata} onChange={(e) => setpost({ ...post, postdata: e.target.value })} className="bg-gray-200 p-2 rounded-xl text-xl resize-none shadow-xl outline-none" cols="40" rows="4" placeholder="what's happening?"></textarea>

                            </div>
                            <div className="flex justify-around items-center">
                                <div className="space-x-4 flex">
                                    <div className='transition duration-300 hover:bg-slate-100 rounded-full p-2'>
                                        <input accept='images/*' className="hidden" type="file" id="file" onChange={(e) => setmyimage(e.target.files[0])}></input>
                                        <label className="cursor-pointer" for="file"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        </label>
                                    </div>
                                    <button className='transition duration-300 hover:bg-slate-100 rounded-full p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    </button>
                                    <button className='transition duration-300 hover:bg-slate-100 rounded-full p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                    </svg>
                                    </button>
                                </div>
                                <div>
                                    <button className="px-2 py-2 rounded-full transition duration-300 hover:bg-slate-100" type="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                )}

                {/* posts */}
                {user && (
                    <div className='space-y-6 p-4 md:p-0'>
                        {allpost.map((post) => (
                            <div className=''>

                                <Posts {...post}>
                                

                                </Posts>

                            </div>
                        ))}
                    </div>
                )}

                {!user && (
                    <div className="h-52 max-w-2xl mx-auto space-y-6 p-4 flex justify-center items-center flex-col">
                        <h1 className='text-lg font-serif bg-lime-400 px-4 py-2 rounded-sm shadow-xl'>Sign in to see posts</h1>

                        <div className=''>
                            <div className='flex justify-center max-w-xs mx-auto px-2 py-1 rounded-sm bg-lime-400 shadow-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 animate-bounce'>
                                <Link to='/dashboard'>Sign in</Link>
                            </div>
                        </div>


                    </div>
                )}
            </div>

        </div>
    );
}
export default Home;