import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Container } from "@mui/material";

const NavBar: React.FC<PropsFromRedux> = () => {
  const pathname = usePathname();
  const router = useRouter();
  function routeToSubmissionsPage() {
    router.push("/submissions");
  }
  function routeToHomePage() {
    router.push("/");
  }
  function routeToAbout() {
    router.push("/about");
  }
  return (
    <Container>
      <nav className="flex gap-4 p-4 justify-center">
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
          onClick={routeToAbout}
          className={`block text-s pb-2 pl-1 rounded self-start hover:text-white ${
            pathname === "/about" ? "text-white" : "text-stone-700"
          }`}
        >
          About
        </button>
      </nav>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(NavBar);
