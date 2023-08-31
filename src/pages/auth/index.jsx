import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import LayoutBase from "~/components/LayoutBase";
import { AuthContext } from "~/context/AuthContext";
import axios from "~/server/axios";
// import axios from "axios";

const Page = () => {
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);

  async function handleSubmit({ email, password }) {
    try {
      console.log(email, password);
      setIsPosting(true);
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      setIsPosting(false);

      if (data.ok == false) {
        toast(data.msg, { type: "error" });
        return;
      }

      // toast(data.msg, { type: "success" });
      console.log("data.role", data.role);
      auth.setMyRole(data.role);
      router.push("/");

      // console.log("data", data);
    } catch (err) {
      console.log(err);
      setIsPosting(false);
    }
  }
  return (
    <>
      <div className="row no-gutters vh-100 proh bg-template">
        <div className="col align-self-center px-3 text-center">
          <h1 className="text-white mt-3 " style={{ fontSize: "30px" }}>
            <span className="font-weight-light ">ورود به سیستم</span>
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form className="form-signin shadow">
              <div className="form-group float-label">
                <label
                  className="form-control-label"
                  style={{ top: "-3px", color: "black" }}
                >
                  ایمیل:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  name="email"
                  required
                />
              </div>
              <div className="form-group float-label">
                <label
                  className="form-control-label"
                  style={{ top: "-3px", color: "black" }}
                >
                  رمز عبور:
                </label>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                  required
                />
              </div>
              <div className="row justify-content-center">
                {isPosting ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">در حال انجام ...</span>
                  </div>
                ) : (
                  <div className="col-auto">
                    <button className="btn btn-lg btn-default btn-rounded shadow">
                      <span>ورود</span>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{ paddingRight: "5px" }}
                      ></FontAwesomeIcon>
                    </button>
                  </div>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
Page.Layout = LayoutBase;
export default Page;
