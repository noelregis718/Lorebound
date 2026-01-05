import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/useAuth";
import { logout } from "@/utils/logout";
import UserBadge from "@/components/UserBadge";

export default function JoinRoom() {
  const [roomId, setRoom] = useState("");
  const router = useRouter();

  useAuth();

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 right-0 z-50 p-6">
        <div className="flex items-center gap-4">
          {/* User Badge */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <UserBadge />
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => logout(router)}
            className="group relative bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full border border-white/30 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Button Content */}
            <div className="relative flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-purple-500/20 blur-xl"></div>
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg mt-16">
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
        
        <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_90px_rgba(168,85,247,0.4)]">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-purple-500/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-500/30 rounded-br-3xl"></div>

          {/* Microphone Icon Header with Enhanced Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Multiple Glow Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 group-hover:blur-3xl transition-all duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full p-7 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {/* Inner Glow */}
                <div className="absolute inset-2 bg-white/10 rounded-full"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white relative z-10 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>

              {/* Orbiting Dots */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -ml-1"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full -ml-1"></div>
              </div>
            </div>
          </div>

          {/* Title Section with Enhanced Typography */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm inline-block hover:scale-105 transition-transform duration-300">
                VoxTale
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300"></div>
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Connect, Share, and Create Stories Together
            </p>
          </div>

          {/* Input Section with Enhanced Styling */}
          <div className="space-y-6">
            <div className="relative group">
              {/* Animated Border Gradient */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              
              <div className="relative">
                <input
                  placeholder="Enter room id"
                  value={roomId}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                  className="relative w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl font-medium"
                />
                {/* Icon with Animation */}
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Button */}
            <button 
              onClick={handleJoinRoom}
              disabled={!roomId.trim()}
              className="relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-lg py-5 px-6 rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-2xl overflow-hidden group"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              
              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-3">
                <span className="tracking-wide">Join Room</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Pulse Ring on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 animate-ping-slow"></div>
            </button>
          </div>

          {/* Enhanced Footer Info */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-green-600 transition-colors">Secure</span>
              </div>
              
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">Real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Text with Icon */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <svg className="w-5 h-5 text-yellow-300 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <p className="text-white font-semibold text-sm tracking-wide drop-shadow-lg">
              Enter a room ID to start your storytelling journey
            </p>
            <svg className="w-5 h-5 text-yellow-300 animate-pulse animation-delay-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}