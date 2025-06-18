"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Toolbar from "./toolbar";
import { Category } from "../../../types/category";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountMenu from "./accountMenu/accountMenu";

interface NavBar {
  // All optional properties
  cartItemCount?: number;
  isLoggedIn?: boolean;
  // userName?: string;
  categories?: Category[];
  // onCategorySelect?: (CategoryId: string) => void;
}

// destructuring + defaults: React.FC => It tells this is a React component
const Navbar: React.FC<NavBar> = ({
  cartItemCount = 0,
  isLoggedIn = true, // just for mock test
  categories = [],
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TypeScript for form events
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // To prevent it to reload the page when submitted.

    // Future logic for the search functionality:
    // a variable to contain a promise of a function that search product names, descriptions, etc
    // which receives the user search query as parameter
    // and push the result to a router, adding the the query as URL params

    console.log("Searching for:", searchQuery);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <>
      <nav className="navbar">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className="navbar-logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/logo.png"
            alt="Artisan Marketplace"
            width={100}
            height={100}
            priority
          />
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for handmade items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="navbar-actions">
          <AccountMenu />

          <div className="cart-section" onClick={handleCartClick}>
            <div className="cart-icon-container">
              <ShoppingCart size={20} />
              {/* {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )} */}
            </div>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <form className="mobile-search" onSubmit={handleSearch}>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search for handmade items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <Search size={20} />
                </button>
              </div>
            </form>

            <AccountMenu />

            <div className="mobile-toolbar-section">
              <h3
                style={{
                  color: "var(--artisan-terracotta)",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  paddingLeft: "8px",
                }}
              >
                Categories
              </h3>
              <Toolbar
                categories={categories}
                // onCategorySelect={onCategorySelect}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
