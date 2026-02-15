import * as React from "react";
import { Link } from "react-router";

export default function CopyrightComponent() {
  return (
    <React.Fragment>
      <footer className="relative block mt-[9vh] text-xs subpixel-antialiased font-light text-left uppercase text-neutral-300">
        <p className="flex flex-col md:flex-row flex-auto my-3">
          <span>© {new Date()?.getFullYear()} Pinpointscore</span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            Crafted by{" "}
            <a
              href="https://joealongi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-600 transition-all"
            >
              Joe Alongi
            </a>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <Link
              className="hover:text-neutral-600 transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="/about"
            >
              About
            </Link>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <Link
              className="hover:text-neutral-600 transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="mailto:contact@pinpointscore.golf"
            >
              contact@pinpointscore.golf
            </Link>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <a
              href="https://railway.com?referralCode=BpTk0g"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-600 transition-all"
            >
              Powered by Railway
            </a>
          </span>
        </p>
      </footer>
    </React.Fragment>
  );
}
