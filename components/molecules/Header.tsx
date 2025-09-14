'use client'
import { SquaresExclude } from "lucide-react";
import AuthModal from "./AuthModal";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import UserDropDown from "../atoms/UserDropDown";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  console.log(user);

  return (
    <div className="flex justify-between items-center py-4 px-10">
      <Link href={'/'} className="flex gap-1 items-center cursor-pointer">
        <SquaresExclude size={18} />
        <div className="font-medium">Share It</div>
      </Link>

      <div className="flex gap-4 items-center">
        <div className="text-sm flex gap-4">
          <div className="hover:text-white cursor-pointer text-gray-400 font-medium"> Learn </div>
          <div className="hover:text-white cursor-pointer text-gray-400 font-medium"> Featues </div>
          <div className="hover:text-white cursor-pointer text-gray-400 font-medium"> Contact </div>
        </div>

        {
          user ? (
            <UserDropDown user={user} logoutUser={logoutUser} />
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsOpen(true)} className="border-[1px] py-2 px-4 rounded-md text-xs font-semibold"> Sign In </button>
              <button onClick={() => setIsOpen(true)} className="bg-[#40AB74] text-white p-2 rounded-md text-xs cursor-pointer border-[1px] font-semibold hover:bg-[#40AB74]/80"> Try for free </button>
            </div>
          )
        }
      </div>

      {isOpen && <AuthModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Header;