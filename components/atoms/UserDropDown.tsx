import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";


const UserDropDown = ({ user, logoutUser }: { user: User, logoutUser: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logoutUser}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropDown;