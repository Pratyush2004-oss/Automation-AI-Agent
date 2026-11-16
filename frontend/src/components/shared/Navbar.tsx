import { Bot, LogOut, Menu, Plus, Settings2, Workflow } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthSelector } from "../../features/auth/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLogoutMutation } from "../../features/auth/tanstack";
import { clearUser } from "../../features/auth/store/user.slice";

const hideScrollBar = "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const darkPanel = "border border-white/10 bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl";
const whiteBtn = "rounded-xl border-0 bg-white text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900";
const menuContent = "rounded-2xl border border-white/10 bg-[#1d2026]/95 p-1.5 text-zinc-100 shadow-2xl shadow-black/50 backdrop-blur-xl";
const menuItem = "rounded-xl text-zinc-300 focus:bg-white focus:text-white"
const menuSeparator = "bg-white/10";
const iconBtn = "size-9 rounded-xl border border-white/10 bg-white/5 p-0 texxt-zinc-300 hover:bg-white/10 hover:text-white"


const Navbar = () => {
    const user = useAuthSelector(state => state.user.user);
    const authDispatch = useAuthDispatch();
    const avatarFallback = `${user?.name.slice(0, 1).toUpperCase()}${user?.name.split(" ")[1].slice(0, 1).toUpperCase()}`;
    const navigate = useNavigate();
    const logoutMutation = useLogoutMutation();
    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                authDispatch(clearUser());
                navigate("/");
            }
        });
    }
    return (
        <header className="z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
            <Link to={"/dashboard"} className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-white text-zinc-900"><Workflow size={17} /></span>
                <span className="text-sm font-medium tracking-tight">Automate AI</span>
            </Link>

            <div className="flex items-center gap-2.5">

                {/* Navigation options */}
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" className={iconBtn} />}>
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`w-56 ${menuContent}`}>
                        <DropdownMenuItem className={menuItem}>
                            <Link className="flex items-center gap-2.5 hover:text-white py-2" to={"/dashboard/agents"}><Bot size={18} /> My Agents</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className={menuSeparator} />
                        <DropdownMenuItem className={menuItem}>
                            <Link className="flex items-center gap-2.5 hover:text-white py-2" to={"/dashboard/agents/create"}><Plus size={18} /> Create new Agent</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className={menuSeparator} />
                        <DropdownMenuItem className={menuItem}>
                            <Link className="flex items-center gap-2.5 hover:text-white py-2" to={"/dashboard/integrations"}><Settings2 size={18} /> Create new Agent</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* profile Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" aria-label="Open Profile Menu" className={"flex size-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5"} />}>
                        <Avatar>
                            <AvatarImage src={user?.profilePic} />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`w-64 ${menuContent}`}>
                        <div className="flex items-center gap-3 px-3 py-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm capitalize">{user?.name || "User"}</p>
                                <p className="text-xs truncate text-zinc-500">{user?.email || "No email"}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator className={menuSeparator} />
                        <DropdownMenuItem className={"cursor-pointer gap-2.5 rounded-xl py-2.5 text-red-400 focus:bg-red-500/10 focus:text-red-400 group-hover:text-red-400 "} onClick={handleLogout}>
                            <LogOut className=" group-hover:text-red-400" size={18} /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Navbar;