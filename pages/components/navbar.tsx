import React from "react";
import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/rules">
                <p>Rules</p>
              </Link>
            </li>
            <li>
              <Link href="/leaderboard">
                <p>Leaderboard</p>
              </Link>
            </li>
            <li>
              <Link href="/customizeBoard">
                <p>Customize Board</p>
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl" href="/">
          TSTetris
        </a>
      </div>
      <div className="navbar-end">
        <label htmlFor="contactModal" className="btn">
          Contact me
        </label>
      </div>
    </nav>
  );
}