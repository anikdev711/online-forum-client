import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const axiosPublicUser = useAxiosPublic();

    //user registration
    const registrationToForum = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //user login
    const loginToForum = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //user google login
    const googleSignInToForum = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    //sign out from the forum
    const signOutFromForum = () => {
        setLoading(true);
        return signOut(auth);
    }

    //update user profile
    const profileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })

    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser => {
            setUser(currentUser);
            console.log('The present user is now:', currentUser);
            if (currentUser) {
                const authUserInfo = {
                    email: user?.email
                }
                axiosPublicUser.post('/jwt', authUserInfo)
                    .then(res => {
                        console.log(res);
                        if (res.data.token) {
                            localStorage.setItem('user-token', res.data.token)
                            setLoading(false);
                        }
                    })

            }
            else {
                localStorage.removeItem('user-token');
                setLoading(false);
            }

        }))
        return () => {
            return unSubscribe();
        }
    }, [user?.email, axiosPublicUser])


    const authInfo = {
        user,
        loading,
        registrationToForum,
        loginToForum,
        googleSignInToForum,
        signOutFromForum,
        profileUpdate
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;