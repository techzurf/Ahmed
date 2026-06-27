import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Mail, Lock, CheckCircle2, MapPin, Calendar, Heart, Shield } from 'lucide-react';
import IslamicGeometricBg from '../IslamicGeometricBg';
import { UserProfile } from '../../types';
import { LOGO_IMAGE, FOUNDER_NAME } from '../../data';

interface AuthProps {
  userProfile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  onSuccess: () => void;
}

export default function LoginAndRegister({ userProfile, setProfile, onSuccess }: AuthProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1998-05-12');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [city, setCity] = useState('Bengaluru');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) {
      setError('Please enter your mobile number.');
      return;
    }
    setError('');
    setSuccessMsg('Logged in successfully!');
    setTimeout(() => {
      onSuccess();
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !address || !occupation) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    
    const updatedProfile: UserProfile = {
      fullName,
      mobileNumber: phone,
      email,
      gender,
      dob,
      bloodGroup,
      occupation,
      address,
      district,
      city,
      profilePhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      memberSince: "Jun 2026",
      membershipId: `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      volunteerStatus: "None",
      serviceHours: 0,
      communityPoints: 100,
      joinedEvents: [],
      certificates: []
    };

    setProfile(updatedProfile);
    setSuccessMsg('Account registered successfully!');
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-[#FAF9F6] overflow-y-auto px-6 py-4 flex flex-col justify-between">
      <IslamicGeometricBg opacity={0.03} />

      {/* Header Backdrops */}
      <div className="flex flex-col items-center pt-4 pb-6">
        <div className="w-16 h-16 rounded-full bg-[#0F5D46] p-0.5 shadow-md flex items-center justify-center border border-[#C8A23A] mb-3">
          <img
            src={LOGO_IMAGE}
            alt="Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-[#0F5D46] tracking-tight">Community Connect</h2>
        <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-0.5">
          Under Leadership of {FOUNDER_NAME}
        </p>
      </div>

      {/* Success / Error Card */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold mb-3">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Main Forms */}
      <div className="flex-1 my-auto">
        {!isRegisterMode ? (
          /* LOGIN VIEW */
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="text-center mb-2">
              <h3 className="text-lg font-bold text-neutral-800">Welcome Back</h3>
              <p className="text-xs text-neutral-500">Sign in to your member account</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#0F5D46] focus:border-[#0F5D46] outline-none text-neutral-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Password recovery: An SMS code has been simulated for your verification.")}
                  className="text-[10px] font-bold text-[#0F5D46] hover:text-[#C8A23A]"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#0F5D46] focus:border-[#0F5D46] outline-none text-neutral-800"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#0c4e3b] transition-all border border-[#C8A23A]/20"
            >
              Sign In
            </motion.button>

            {/* Quick Guest login */}
            <button
              type="button"
              onClick={onSuccess}
              className="text-xs font-bold text-neutral-600 hover:text-[#0F5D46] underline text-center"
            >
              Continue as Guest
            </button>
          </form>
        ) : (
          /* REGISTER VIEW */
          <form onSubmit={handleRegister} className="flex flex-col gap-3 py-1">
            <div className="text-center mb-1">
              <h3 className="text-sm font-extrabold text-neutral-800">Become a Registered Member</h3>
              <p className="text-[10px] text-neutral-500">Access exclusive welfare benefits, ID cards, and updates</p>
            </div>

            {/* Scrollable Register Core */}
            <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-3">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  />
                </div>
              </div>

              {/* Grid 1: Mobile & Email */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Gender & DOB */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  />
                </div>
              </div>

              {/* Grid 3: Blood Group & Occupation */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800 font-bold"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Occupation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Business, Teacher"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
                  <textarea
                    required
                    rows={2}
                    placeholder="House details, street, etc."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800 resize-none"
                  />
                </div>
              </div>

              {/* District & City */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800"
                  />
                </div>
              </div>

              {/* Image info */}
              <div className="flex items-center gap-2.5 p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] text-emerald-800 font-medium">
                <Shield className="w-4 h-4 text-emerald-600" />
                Your profile picture is pre-assigned securely with an official member avatar. You can customize it in the profile tab later.
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2 bg-[#0F5D46] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#0c4e3b] transition-all mt-1"
            >
              Submit Registration
            </motion.button>
          </form>
        )}
      </div>

      {/* Footer Switch */}
      <div className="text-center pt-4 border-t border-neutral-200/50">
        <button
          onClick={() => {
            setError('');
            setSuccessMsg('');
            setIsRegisterMode(!isRegisterMode);
          }}
          className="text-xs font-bold text-[#0F5D46] hover:text-[#C8A23A] transition-colors"
        >
          {isRegisterMode ? "Already a Member? Log In" : "New Here? Create Member Account"}
        </button>
      </div>
    </div>
  );
}
