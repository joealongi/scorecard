import * as React from "react";
import { Link } from "react-router";

export default function CopyrightComponent() {
  return (
    <React.Fragment>
      <footer className="relative block mt-[9vh] text-xs subpixel-antialiased font-light text-left uppercase text-neutral-300">
        <p className="flex flex-col md:flex-row flex-auto my-3">
          <span>
            © {new Date()?.getFullYear()} Availing Inc. All rights
            reserved.{" "}
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
              target="_blank"
              to="https://availing.io/privacy"
            >
              Privacy policy
            </Link>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <Link
              className="hover:text-neutral-600 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              to="https://status.availing.io/"
            >
              Service monitor
            </Link>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <Link
              className="hover:text-neutral-600 transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="mailto:contact@availing.io"
            >
              contact@availing.io
            </Link>
          </span>
        </p>
      </footer>
    </React.Fragment>
  );
}
