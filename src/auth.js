// src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig'; // Assuming you have set up Firestore


// Sign up with Email and Password (unchanged)
export const signUp = async (email, password, name, address) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user details in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      address,
      email: user.email,
      createdAt: new Date(),
    });

    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Login with Email and Password (unchanged)
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // Save user details if it's their first time logging in
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
    }

    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Error during Google login:', error);
    throw error;
  }
};

// Get user details after login (unchanged)
export const getUserDetails = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
