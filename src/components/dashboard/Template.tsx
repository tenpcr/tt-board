import NavbarDashboard from "./Navbar";
import Sidebar from "./Sidebar";
import { ComponentType } from "react";

function TemplateDashboard<P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> {
  const ComponentWithTemplate = (props: P) => {
    return (
      <div className="w-full max-w-full flex-1 relative">
        <div className="flex flex-row flex-1">
          <div className="sticky flex-none top-[0px] h-[calc(100vh)] border-r border-gray-100 overflow-y-auto">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1 shrink overflow-x-hidden relative">
            <div className="sticky top-0 h-[55px]">
              <NavbarDashboard />
            </div>
            <div className="flex-1 shrink h-full overflow-y-auto overflow-x-hidden">
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return ComponentWithTemplate;
}

export default TemplateDashboard;
