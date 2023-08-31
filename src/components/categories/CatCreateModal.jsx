import {
  faPenToSquare,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "~/server/axios";
import { toast } from "react-toastify";
import SubCatRemoveModal from "./SubCatRemoveModal";
import { Field, Form, Formik } from "formik";

export default function CatCreateModal({ handleClose, show, reloadData }) {
  const [isPosting, setIsPosting] = useState(false);
  const [activeItem, setActiveItem] = useState();

  async function handleSubmit(values) {
    try {
      setIsPosting(true);
      const { data } = await axios.post("/categories/create", {
        ...values,
      });
      setIsPosting(false);

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      toast(data.msg, { type: "success" });
      handleClose();
      reloadData();
    } catch (err) {
      console.log(err);
      setIsPosting(false);
      toast("خطایی رخ داد", { type: "error" });
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        // dialogClassName="my-modal"
      >
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
                  title: "",
                  maxPoints: null,
                }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group float-label">
                    <label
                      className="form-control-label"
                      style={{ top: "-3px", color: "black" }}
                    >
                      عنوان دسته:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      name="title"
                      required
                    />
                  </div>
                  <div className="form-group float-label">
                    <label
                      className="form-control-label"
                      style={{ top: "-3px", color: "black" }}
                    >
                      سقف امتیاز:
                    </label>
                    <Field
                      type="number"
                      inputMode="numeric"
                      className="form-control"
                      name="maxPoints"
                      required
                    />
                  </div>

                  <div className="row justify-content-center">
                    {isPosting ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
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
      {/* <style>
        {`
      .my-modal {
        width: 90vw;
        max-width: 90vw;
    } 
    `}
      </style> */}
      <SubCatRemoveModal
        item={activeItem}
        handleClose={() => {
          setActiveItem();
          handleClose();
        }}
        reloadData={reloadData}
      />
    </>
  );
}
