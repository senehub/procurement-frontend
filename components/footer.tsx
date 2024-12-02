import React from "react";

function Footer() {
  return (
    <footer className="bg-accent/20 mt-6 text-accent-foreground py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} <strong>SeneHub</strong>. All rights
          reserved.
        </p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="/about"
                className="hover:underline text-muted-foreground hover:text-foreground transition text-sm"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline text-muted-foreground hover:text-foreground transition text-sm"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:underline text-muted-foreground hover:text-foreground transition text-sm"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
