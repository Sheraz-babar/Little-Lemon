import LoginForm from "../../components/LoginForm.jsx"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700">Little Lemon</h1>
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-balance">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Welcome back! Please enter your details.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-10 shadow-lg sm:rounded-lg">
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="font-medium text-green-600 hover:text-green-500 text-sm sm:text-base">
                Sign up for Little Lemon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
