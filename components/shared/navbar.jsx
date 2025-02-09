import Link from "next/link";
import Image from "next/image";
import { getUserAndAvatar, signOutUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default async function Navbar() {
  const user = await getUserAndAvatar();

  return (
    <header className="w-full fixed border-b z-50 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex w-full max-w-screen-3xl justify-between 3xl:px-0 p-2 sm:p-3 3xl:py-4">
        {!user ? (
          <>
            <div className="flex flex-row justify-between items-center w-full">
              <NavigationMenu className="sm:hidden">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-full mt-1">
                      <Image
                        src="/logos/xp.svg"
                        alt="Navbar Logo"
                        width={40}
                        height={40}
                        className="aspect-square rounded-full"
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full">
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          About
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/sign-in" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Sign In
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/sign-up" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Sign Up
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href="/" className="hidden sm:flex items-center">
                <Image
                  src="/logos/xp.svg"
                  alt="Navbar Logo"
                  width={40}
                  height={40}
                  className="aspect-square rounded-full"
                />
              </Link>
              <div className="hidden sm:flex">
                <Button asChild variant="link">
                  <Link href="/">Home</Link>
                </Button>
                <Button asChild variant="link">
                  <Link href="/about">About</Link>
                </Button>
                <Button asChild variant="link" className="mr-2.5">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-between items-center w-full">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-full m-1">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="rounded-full aspect-square"
                        />
                      ) : (
                        <Image
                          src="/avatars/user.png"
                          alt="Fallback Avatar"
                          width={40}
                          height={40}
                          className="rounded-full aspect-square"
                        />
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full">
                      <div className="inline-flex h-9 items-center w-max justify-center border-b px-4 py-2 text-xs sm:text-sm font-medium">
                        Hello, {user.email?.split("@")[0] || "User"}!
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
                      <form action={signOutUser}>
                        <button
                          type="submit"
                          className="inline-flex h-9 underline-offset-2 sm:hidden hover:underline w-max items-center justify-center border-b px-4 pt-2 pb-4 text-sm font-medium"
                        >
                          Sign Out
                        </button>
                      </form>
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
                <form action={signOutUser}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
