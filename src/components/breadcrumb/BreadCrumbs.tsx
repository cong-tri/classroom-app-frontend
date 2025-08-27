import React from "react";
import { Link, useLocation } from "react-router";
import { toSlugFromURLEncoded } from "../../utils";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const state = location.state as { title?: string } | null;

  if (pathnames.length === 0) return null;

  const truncateWords = (text: string, wordLimit: number = 20): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const formatName = (name: string) => {
    return name
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => {
        return word === "cms"
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  return (
    <nav aria-label="breadcrumb" className="py-0 px-4">
      <ol className="breadcrumb mb-0 d-flex align-items-center">
        <li className="breadcrumb-item d-flex align-items-center">
          <Link to="/" className="text-muted">
            Dashboard
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = formatName(name);

          return (
            <React.Fragment key={routeTo}>
              <li className="breadcrumb-separator d-flex align-items-center px-1">
                <i className="bi bi-chevron-right"></i>
              </li>
              <li
                className={`breadcrumb-item d-flex align-items-center ${
                  isLast ? "text-primary" : ""
                }`}
              >
                {isLast ? (
                  <span>
                    {state?.title && name === toSlugFromURLEncoded(state.title)
                      ? truncateWords(state.title)
                      : truncateWords(formattedName)}
                  </span>
                ) : (
                  <Link to={routeTo} className="text-muted">
                    {formattedName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
