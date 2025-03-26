import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInSuccess, signOutSuccess } from "../store/auth/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const AuthButton = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signInSuccess(user));
      } else {
        dispatch(signOutSuccess());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  
  const signInWithGoogle = async () => {
      try {
          await signInWithPopup(auth, provider);
          console.log(auth.currentUser)
          if (auth.currentUser) {
            const user: User = auth.currentUser
            dispatch(signInSuccess(user));
            console.log('Пользователь вошел через Google');
          }

      } catch (error: any) {
        console.log(error.message);
      }
  };
  
  const signOut = async () => {
      try {
          await auth.signOut();
          dispatch(signOutSuccess());
      } catch (error) {
          console.error('Ошибка выхода:', error);
      }
  };

  return (
      <>
        {user && (
            <>
              <Typography>{user.email?.split('@')[0]}</Typography>
              <Button onClick={signOut} sx={{ height: '40px', borderRadius: 2, paddingX: 5, textTransform: 'none', backgroundColor: '#fed42b', color: 'black' }}>
                  Выйти
              </Button>
            </>
        )}
        {!user && (
            <Button
              onClick={signInWithGoogle}
              sx={{ height: '40px', borderRadius: 2, paddingX: 5, textTransform: 'none', backgroundColor: '#fed42b', color: 'black' }}
            >
              Войти
            </Button>
        )}
      </>

  );
}

export default AuthButton;