import {createContext, useContext} from "react";
import {AuthModalState} from "../AuthModal/AuthModal.tsx";

type AuthModalContextType = {
    openModal: (state: AuthModalState) => void;
    checkAuth: VoidFunction;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);

    if(!context) throw new Error("useAuthModal must be used within useAuthModal");

    return context;
}

export const AuthModalProvider = AuthModalContext.Provider;