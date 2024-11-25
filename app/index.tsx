import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";

export default function Home() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state to track authentication check

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);  // User is authenticated
            } else {
                setIsSignedIn(false);  // User is not authenticated
            }
            setLoading(false);  // Once authentication check is done, set loading to false
        });

        // Cleanup on component unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // Show a loading indicator or nothing until Firebase finishes authentication check
        return null;  // You can replace this with a loading spinner if needed
    }

    if (isSignedIn) {
        return <Redirect href={"/(tabs)"} />;
    }

    return <Redirect href="/login" />;
}
