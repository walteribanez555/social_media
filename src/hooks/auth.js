import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { DASHBOARD } from 'lib/routes';
import { useState } from 'react';
import { useAuthState} from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';


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
            return false; //login failed
        }
        

        setLoading(false);
        return true; //login succeded

    }

    return{login, isLoading}
}