import { getAuth, signOut } from "firebase/auth";

export default function signOutUser (router) {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      router.push("/login")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }