import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, UserButton } from '@clerk/clerk-react';

export function Login() {
  return (
        <div className='flex mt-12 jutify justify-center bg-white'>
            <SignIn></SignIn>
        </div>
  );
}
export function Signup()
{
    return (
         <div className='flex mt-12 jutify justify-center bg-white'>
            <SignUp></SignUp>
        </div>
    )
}