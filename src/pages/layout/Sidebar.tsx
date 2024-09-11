import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  sidebar: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  sidebar,
}: SidebarLinkProps) => {
  const pathname = useLocation().pathname;
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link to={href}>
      <div
        className={`cursor-pointer flex items-center ${
          sidebar ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            sidebar ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

function Sidebar({
  sidebarState: { sidebar },
}: {
  sidebarState: {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  const rootPath = import.meta.env.VITE_JSP_DEFAULT_PATH;

  return (
    <div
      className={`fixed flex flex-col ${
        sidebar ? "w-16" : "w-64"
      } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`}
    >
      {/* TOP */}
      <div
        className={`flex gap-3 justify-normal items-center pt-8 ${
          sidebar ? "px-5" : "px-8"
        }`}
      >
        <div className="w-6 h-6 logo-bg rounded-sm"></div>
        <h1 className={`${sidebar ? "hidden" : "block"} font-bold text-2xl`}>
          TEAM.T
        </h1>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href={`${rootPath}/dashboard`}
          icon={Layout}
          label="Dashboard"
          sidebar={sidebar}
        />
        <SidebarLink
          href={`${rootPath}/inventory`}
          icon={Archive}
          label="Inventory"
          sidebar={sidebar}
        />
        <SidebarLink
          href={`${rootPath}/products`}
          icon={Clipboard}
          label="Products"
          sidebar={sidebar}
        />
        <SidebarLink
          href={`${rootPath}/users`}
          icon={User}
          label="Users"
          sidebar={sidebar}
        />
        <SidebarLink
          href={`${rootPath}/settings`}
          icon={SlidersHorizontal}
          label="Settings"
          sidebar={sidebar}
        />
        <SidebarLink
          href={`${rootPath}/expenses`}
          icon={CircleDollarSign}
          label="Expenses"
          sidebar={sidebar}
        />
      </div>

      {/* FOOTER */}
      <div className={`${sidebar ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 TEAM.T</p>
      </div>
    </div>
  );
}

export default Sidebar;
