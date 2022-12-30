import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'lib/firebase';
import { DASHBOARD } from 'lib/routes';
import { useState } from 'react';
import { useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {setDoc, doc} from "firebase/firestore"
import isUsernameExist from 'utils/isUsernameExist';




export function useAuth(){
    const [authUser, isLoading, error] = useAuthState(auth);

    return {user: authUser, isLoading, error };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function login({email, password, redirectTo = DASHBOARD}) {
        
        setLoading(true);

        try{
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "You are logged in",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
           navigate(redirectTo);
        }
        catch (error){ 
            toast({
                title:"Loggin in failed",
                description: error.message,
                status: "error",
                position: "top",
                duration: 5000,
            });
            setLoading(false);
            return false; //login failed
        }
        

        setLoading(false);
        return true; //login succeded

    }

    return{login, isLoading}
}

export function useRegister(){
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function register({username, email, password, redirectTo= DASHBOARD}) {
        setLoading(true);

        const usernameExists =  await isUsernameExist(username);


        if ( usernameExists) {
            toast({
                title: "Username already exists",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
            return false;
        }else{
            try{
                
                const res = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date : Date.now(),
                });

                toast({
                    title: "Account created",
                    description: "You are logged in",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
                navigate(redirectTo);



            }
            catch(error){
                toast({
                    title: "Siging up failed",
                    description: error.message,
                    status: "error",
                    isClosable : true,
                    position: "top",
                    duration : 5000,
                });
                
            } finally{
                setLoading(false)
            }
        }

        setLoading(false);

    }

    return { register, isLoading};

}

export function useLogout() {

    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
    


    async function logout(){



       if( await signOut()){
            toast({
                title: "Succesfully logged out",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
 
            navigate(DASHBOARD);
       } else{
        toast({
            title: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
        })

       } // else show error signout doesn't working

    }

    return {logout, isLoading};
}