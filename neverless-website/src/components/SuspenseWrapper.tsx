import React, { Suspense, lazy } from 'react';
const Navbar = lazy(() => import('./Navbar'));
const LoginModal = lazy(() => import('./LoginModal'));

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
};

export {SuspenseWrapper, Navbar, LoginModal};