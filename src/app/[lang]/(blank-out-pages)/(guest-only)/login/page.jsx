// Util Imports
import { getDictionary } from "@/utils/getDictionary";

// View Imports
import Login from "@/views/blank-layout-pages/Login";
import Demo from "@/views/blank-layout-pages/Demo";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

// Metadata
export const metadata = {
  title: "Login",
};

/**
 * Page
 */
const LoginPage = async ({ params }) => {
  // Vars
  const mode = getServerMode();
  const dictionary = await getDictionary(params?.lang);

  return <Login />;
};

export default LoginPage;
