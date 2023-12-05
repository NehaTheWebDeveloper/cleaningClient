
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../Database/Firebase";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});

//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function logOut() {
//     return signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
//       setUser(currentuser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider value={{ user, logIn, logOut }}>
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }


// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider = ({ children }) => {
//   const dispatch = useDispatch()
//   // const [user, setUser] = useState(null);
//   const { user } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(true);

//   // Check for user data in local storage when the app starts
//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       dispatch(setUser(JSON.parse(storedUserData)));
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(getFirestore(), 'users', user.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             const userObj = {
//               uid: user.uid,
//               email: user.email,
//               name: userData.name,
//               role: userData.role,
//             };
//             dispatch(setUser(userObj));

//             // Store user data in local storage
//             localStorage.setItem('userData', JSON.stringify(userObj));
//             localStorage.setItem('user', JSON.stringify(user));

//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       } 
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const login = async (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     await signOut(auth);
//     dispatch(setUser(null));

//     // Remove user data from local storage on logout
//     localStorage.removeItem('userData');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login,  logout }}>
//       {loading ? null : children}
//     </AuthContext.Provider>
//   );
// };
