import { createContext } from "react";

const LoginContext = createContext({
    loggedin: false
});

export default LoginContext;