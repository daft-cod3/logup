export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Logup</h1>
        <p className="text-gray-600 mb-8">Your secure authentication platform</p>
        <div className="space-y-4">
          <a href="/logIn" className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all">
            Login
          </a>
          <a href="/signUp" className="block w-full border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}