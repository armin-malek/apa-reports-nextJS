import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
// import "../styles/globals.css";
// import "../styles/vendor.css";
// import "../styles/vertical.css";
// import "../styles/custom-rtl.css";
// import "../styles/dark-layout.css";
// import "../styles/bordered-layout.css";
// import "../styles/colors.css";
// import "../styles/bootstrap-extend.css";
// import "../styles/vertical-menu.css";
// import "src/styles/bootstrap-extend.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "~/context/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="font-fa"
        />
      </AuthProvider>
    </>
  );
  return <Component {...pageProps} />;
};

export default MyApp;
