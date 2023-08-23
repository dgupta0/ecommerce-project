import { createContext, Dispatch, SetStateAction } from "react";

interface LoginContextType {
    isLoggedIn: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    setIsLogged: () => { },
});

export default LoginContext;






