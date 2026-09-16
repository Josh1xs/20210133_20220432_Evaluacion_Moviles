import { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { database } from "../config/firebase";

export default function useProfile(uid) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onSnapshot(
      doc(database, "users", uid),
      (snapshot) => {
        setProfile(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [uid]);

  const updateProfile = async ({ fullName, birthDate, carnet, imageUrl }) => {
    await updateDoc(doc(database, "users", uid), {
      fullName,
      birthDate,
      carnet,
      imageUrl,
      updatedAt: serverTimestamp()
    });
  };

  return {
    profile,
    loading,
    updateProfile
  };
}
