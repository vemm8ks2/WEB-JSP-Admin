import Navbar from "@/pages/layout/Navbar";
import Sidebar from "@/pages/layout/Sidebar";

const DashboardWrapper = ({
  sidebarState,
  children,
}: {
  sidebarState: {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  children: React.ReactNode;
}) => {
  return (
    <div className="flex bg-gray-50 text-gray-900 w-full min-w-max max-w-[100vw] min-h-screen">
      <Sidebar sidebarState={sidebarState} />
      <main
        className={`flex flex-col w-screen h-full py-7 px-9 bg-gray-50 ${
          sidebarState.sidebar ? "pl-24" : "pl-72"
        }`}
      >
        <Navbar sidebarState={sidebarState} />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
