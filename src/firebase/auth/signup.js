import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email, password, userName) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, {
            displayName:userName, photoURL:''
        })
    } catch (e) {
        error = e;
    }

    return { result, error };
}