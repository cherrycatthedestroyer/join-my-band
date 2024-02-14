import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const NavBar: React.FC<PropsFromRedux> = ({ stateList, setSelectedPage }) => {
  const pathname = usePathname();
  const router = useRouter();
  function routeToSubmissionsPage() {
    router.push("/submissions");
  }
  function routeToHomePage() {
    router.push("/");
  }
  return (
    <nav className="flex gap-4 p-4 mb-8">
      <button
        onClick={routeToHomePage}
        className={`block text-s pb-2 pl-1 rounded self-start hover:text-white ${
          pathname === "/" ? "text-white" : "text-stone-700"
        }`}
      >
        Home
      </button>
      <button
        onClick={routeToSubmissionsPage}
        className={`block text-s pb-2 pl-1 rounded self-start hover:text-white ${
          pathname === "/submissions" ? "text-white" : "text-stone-700"
        }`}
      >
        Submissions
      </button>
      <button
        className={`block text-s pb-2 pl-1 rounded self-start hover:text-white ${
          stateList.selected_page === "about" ? "text-white" : "text-stone-700"
        }`}
      >
        About
      </button>
    </nav>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(NavBar);
