import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon.tsx";
import type { iconPaths } from "./IconPaths.ts";

export interface BaseNavItem {
  label: string;
  href?: string;
  target?: string;
}

export interface TextNavItem extends BaseNavItem {
  children?: TextNavItem[];
}

export interface IconNavItem extends BaseNavItem {
  iconName: keyof typeof iconPaths;
}

export interface NavProps {
  textLinks: TextNavItem[];
  iconLinks: IconNavItem[];
}

const isSsr = typeof window === "undefined";

const { BASE_URL } = import.meta.env;

const Nav: React.FC<NavProps> = ({ textLinks, iconLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const isCurrentPage = (href?: string): string | boolean => {
    let pathname = window.location.pathname.replace(BASE_URL, "");

    if (!href) return pathname === "";

    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event: MouseEvent): void => {
    // Ignore click events that occur inside the nav
    if (navRef?.current?.contains(event?.target as Node)) return;
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isSsr) return;

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav ref={navRef} className="nav">
      <div className="nav__header">
        <a href={BASE_URL} className="nav__site-title">
          <img
            src={`${BASE_URL}assets/frostbreak-logo-64x64.png`}
            width="32"
            height="32"
            alt="The logo of Frostbreak. A crested shield that is split into four quadrants. From top-left ot bottom-right, the quadrants contain a blue dragon, a pride progress flag, a snowflake, and a fox. "
          />
          Frostbreak
        </a>
        <button
          className="button nav__menu-button no-bg"
          onClick={handleMenuToggle}
        >
          <span>Menu</span>
          <Icon icon="list" />
        </button>
      </div>
      <div
        className="nav__menu"
        ref={menuRef}
        aria-expanded={isMenuOpen}
        // style={{
        //   display: isMenuOpen ? 'block' : 'none'
        // }}
      >
        <ul className="nav__items">
          {textLinks.map(({ label, href, children, target }) => (
            <li key={label} className="nav__items-item text-center">
              {children ? (
                <details>
                  <summary
                    className="link"
                    aria-current={isCurrentPage(href) ? "page" : undefined}
                  >
                    {label}
                  </summary>
                  <ul className="nav__dropdown">
                    {children.map(
                      ({
                        label: childLabel,
                        href: childHref,
                        target: childTarget,
                      }) => (
                        <li key={childLabel} className="nav__dropdown-item">
                          <a
                            aria-current={
                              isCurrentPage(childHref) ? "page" : undefined
                            }
                            className="link"
                            href={`${BASE_URL}${childHref}`}
                            target={childTarget}
                          >
                            {childLabel}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </details>
              ) : (
                <a
                  aria-current={isCurrentPage(href) ? "page" : undefined}
                  className="link"
                  href={`${BASE_URL}${href}`}
                  target={target}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="nav__socials justify-content-center align-items-center">
          {iconLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="nav__social"
              aria-label={link.label}
            >
              <Icon icon={link.iconName} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
