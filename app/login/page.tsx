import LoginForm from '@/app/ui/login-form';
import { Header_login } from '@/app/ui/login-form';



export default function LoginPage() {
    return (
        // { /* <div className="bg-fixed bg-gradient-to-r from-violet-500 to-fuchsia-500"> */}
        <div>
            <div>
                <Header_login />
            </div>
            <div className="flex items-center justify-center relative md:h-screen mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-24">
                <LoginForm />
            </div>
        </div>
    );
}