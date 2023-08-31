import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "~/server/axios";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";

export default function UserCreateModal({ handleClose, show, getData }) {
  const [isPosting, setIsPosting] = useState(false);

  async function handleSubmit(values) {
    try {
      setIsPosting(true);
      console.log("va", values);
      const { data } = await axios.post("/users/create", {
        ...values,
      });
      setIsPosting(false);

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      toast(data.msg, { type: "success" });
      handleClose();
      getData();
    } catch (err) {
      console.log(err);
      setIsPosting(false);
      toast("خطایی رخ داد", { type: "error" });
    }
  }
  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Body dir="rtl" className="font-fa pt-1">
        <div className="row w-100 justify-content-start ">
          <button
            className="btn"
            style={{ marginRight: "15px" }}
            onClick={() => handleClose()}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <div className="text-right">
          <i className="fa fa-close close" data-dismiss="modal" />
        </div>
        <div className="row w-100 justify-content-center ">
          <div className="col-12">
            <Formik
              initialValues={{
                email: "",
                password: "",
                role: "Apa",
                name: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group float-label">
                  <label
                    className="form-control-label"
                    style={{ top: "-3px", color: "black" }}
                  >
                    نام کاربر:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    required
                  />
                </div>
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

                <div className="form-group float-label">
                  <label
                    className="form-control-label"
                    style={{ top: "-3px", color: "black" }}
                  >
                    نقش کاربر:
                  </label>
                  <Field as="select" name="role" className="form-control">
                    <option value="Apa">مرکز آپا</option>
                    <option value="Supervisor">ناظر</option>
                  </Field>
                </div>

                <div className="row justify-content-center">
                  {isPosting ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">در حال انجام ...</span>
                    </div>
                  ) : (
                    <div className="col-auto">
                      <button className="btn btn-success">
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{
                            paddingLeft: "5px",
                            verticalAlign: "middle",
                          }}
                        ></FontAwesomeIcon>
                        <span>ایجاد</span>
                      </button>
                    </div>
                  )}
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Modal.Body>
      <style jsx>{`
        select > option {
          background-color: blue !important;
        }
      `}</style>
    </Modal>
  );
}
