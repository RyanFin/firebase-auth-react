// src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig'; // Assuming you have set up Firestore

// Sign up function
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

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Get user details after login
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
