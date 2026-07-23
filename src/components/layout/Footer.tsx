import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#070a08]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-semibold tracking-tight text-foreground">COzero <span className="font-normal text-text-secondary">/ Atlas</span></p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Environmental intelligence for cities. Emissions, air quality, and
              sustainability data in one platform.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Platform
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/", label: "Overview" },
                  { href: "/explorer", label: "Explorer" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-brand transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                COzero
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://cozero.life"
                    className="text-sm text-text-secondary hover:text-brand transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    COzero.life
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} COzero Atlas
          </p>
        </div>
      </div>
    </footer>
  );
}
