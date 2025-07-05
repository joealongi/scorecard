import * as React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      <footer className="absolute bottom-9 block mt-auto text-xs uppercase text-neutral-300">
        <p className="flex flex-col md:flex-row flex-auto my-3 text-xs subpixel-antialiased font-light text-left uppercase">
          <span>
            © {new Date()?.getFullYear()} Availing Inc. All rights
            reserved.{" "}
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <a
              className="transition-all text-xs subpixel-antialiased font-light text-left uppercase"
              rel="noopener noreferrer"
              target="_blank"
              href="https://availing.io/privacy"
            >
              Privacy policy
            </a>
          </span>
          <span className="mx-3 invisible md:visible">|</span>
          <span>
            <a
              className="transition-all text-xs subpixel-antialiased font-light text-left uppercase"
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:contact@availing.io"
            >
              contact@availing.io
            </a>
          </span>
        </p>
      </footer>
    </React.Fragment>
  );
}
