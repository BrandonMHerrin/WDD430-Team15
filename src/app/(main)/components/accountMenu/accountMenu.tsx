"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useTransition } from "react";
import styles from "./accountMenu.module.css";
import { ArrowBigRight, ArrowDown, ArrowRightIcon, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { set } from "zod/v4";
import { signOut } from "auth";
import { handleLogout } from "./actions";

export default function AccountMenu(): React.JSX.Element {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userName: string | null = session?.user?.name || null;

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isPending, startStransition] = useTransition();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  function DropDownMenu(): React.JSX.Element | null {
    if (!isDropdownOpen) {
      return null;
    }
    return (
      <div className={styles.dropdownMenu}>
        <Link href="/profile" className={styles.dropdownItem}>
          Profile
        </Link>
        <button
          className={styles.dropdownItem}
          disabled={isPending}
          onClick={() => startStransition(() => handleLogout(pathname))}
        >
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.accountMenu}>
      {!userName ? (
        <Link href="/auth/login" className={styles.loginLink}>
          <User size={24} />
          <span>Login</span>
        </Link>
      ) : (
        <>
          <button
            className={styles.profileButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {/* <User size={24} /> */}
              Hi, {userName}
            </span>
            <ChevronDown size={16} className={`${styles.chevron} ${isDropdownOpen ? styles.chevronRotated : ''}`} />
          </button>
          <DropDownMenu />
        </>
      )}
    </div>
  );
}
