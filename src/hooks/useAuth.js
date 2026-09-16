import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, database } from "../config/firebase";

export default function useAuth() {
  const register = async ({ email, password, fullName, birthDate, carnet, imageUrl }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(database, "users", credential.user.uid), {
      fullName,
      birthDate,
      carnet,
      imageUrl,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return credential.user;
  };

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return {
    register,
    login,
    logout
  };
}
