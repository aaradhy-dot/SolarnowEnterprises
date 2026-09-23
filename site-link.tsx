import * as React from "react";

type SiteLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, SiteLinkProps>(
  function SiteLink({ href, children, ...props }, ref) {
    return <a ref={ref} href={href} {...props}>{children}</a>;
  },
);
