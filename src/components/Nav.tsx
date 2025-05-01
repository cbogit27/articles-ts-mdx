import Image from "next/image";
import { FaBluesky } from "react-icons/fa6";
import Avi from "../../public/img/avatar.png"
import Link from "next/link";

export default function Nav(){

    return (
        <nav className="border-b-2 border-dotted border-gray-600/20 p-4 md:p-6">
            <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="flex space-x-2 md:space-x-4">
                <div className=" relative w-full overflow-hidden">
                    <Image width={70} height={70} src={Avi} alt="avatar" className="rounded-xl object-cover"/>
                </div>
                <div className="p-2">
                    <div>
                    <Link href={"/"}>
                        <h3 className="text-2xl text-gray-500/50 font-bold mb-1 md:mb-2 cursor-pointer">wildcardcal</h3>
                    </Link>
                    </div>
                    <div>
                        <ul className="flex text-lg space-x-4 font-normal cursor-pointer">
                            <Link href={"/articles"} className="border-r border-dotted pr-4">
                            <li>Articles</li>
                            </Link>
                            <Link href={"/projects"}>
                            <li>Projects</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <Link target="_blank" href="https://bsky.app/profile/winbeyondcrude.bsky.social" className="flex space-x-1">
                <div className="p-2">
                    <FaBluesky className="text-blue-800" size={15}/>
                </div>
                <div className="hidden md:flex p-0.5">
                    <h5>@socials</h5>
                </div>
                </Link>
            </div>
        </nav>
    )
}