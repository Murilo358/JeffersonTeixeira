"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {AiOutlineMenu} from "react-icons/ai";
import React, {useState} from "react";
import Link from "next/link";
import {ImWhatsapp} from "react-icons/im";


const Header = () => {

    const handleLoginClick = () => {
        signIn();
    };
    const handleSignOutClick = () => {
        signOut();
        setOpenedMenu(false);
    };

    const {status, data} = useSession();

    const [openedMenu, setOpenedMenu] = useState(false);

    const openWhatsApp = () => {
        window.open(
            "https://wa.me/5511999151834?text=Olà%20Jefferson%20gostaria%20",
            "_blank",
            "noopener,noreferrer"
        );
    };
    const handleMenuClick = () => {
        setOpenedMenu(!openedMenu);
    };

    return (
        <div
            className="bg-[#3A2E23] shadow-lg  mx-auto p-5 py-0 h-[93px] flex justify-between items-center border-b border-grayLighter">
            <div className="container mx-auto flex justify-between items-center ">

                <Link href={"/"} className="flex items-center gap-3">
                    <div className="relative h-[45px] w-[45px]">
                        <Image src="/logo-3.png" alt="Jefferson teixeira" fill/>
                    </div>
                    <h1 className="font-premium font-cursive font-bold text-3xl text-primary">Jefferson teixeira</h1>
                </Link>

                <button
                    onClick={openWhatsApp}
                    className="text-primary text-2xl font-semibold pb-0.5"
                >
                    <div className="flex items-center gap-2">
                        <ImWhatsapp/>
                    </div>
                </button>
                {status === "authenticated" && data.user && (
                    <div
                        className="flex relative items-center gap-3 border p-2 px-3 border-solid border-grayLighter rounded-full">
                        <AiOutlineMenu
                            className="cursor-pointer"
                            onClick={handleMenuClick}
                            size={20}
                        />

                        <Image
                            className="rounded-full shadow-md"
                            width={35}
                            src={data.user.image!}
                            height={35}
                            alt={data.user.name!}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
