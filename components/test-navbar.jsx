import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function TestNavbar() {
  return (
    <header className="w-full fixed border-b z-50 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex w-full max-w-screen-3xl justify-between 3xl:px-0 px-3 py-2 sm:py-3 3xl:py-4">
        <div className="flex flex-row justify-between items-center w-full">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-full mt-1">
                  <Avatar>
                    <AvatarImage
                      src="/avatars/fallback.png"
                      alt="User Avatar"
                    />
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  <div className="inline-flex h-9 items-center w-max justify-center border-b px-4 py-2 text-xs sm:text-sm font-medium">
                    Hello, egarrisxn!
                  </div>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={` ${navigationMenuTriggerStyle()} sm:hidden`}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={` ${navigationMenuTriggerStyle()} sm:hidden`}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={` ${navigationMenuTriggerStyle()} sm:hidden`}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      View Profile
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/profile/edit" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Edit Profile
                    </NavigationMenuLink>
                  </Link>
                  <button className="inline-flex h-9 underline-offset-2 sm:hidden hover:underline w-max items-center justify-center border-b px-4 pt-2 pb-4 text-sm font-medium">
                    Sign Out
                  </button>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden sm:flex">
            <Button asChild variant="link">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="link" className="mr-2.5">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <div>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
