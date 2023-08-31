import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import axios from "~/server/axios";
import { toast } from "react-toastify";
import { AuthContext } from "~/context/AuthContext";

export default function ReportViewModal({ handleClose, item, getReports }) {
  const [isPosting, setIsPosting] = useState(false);
  const auth = useContext(AuthContext);

  async function submitReview(status) {
    try {
      setIsPosting(true);
      const { data } = await axios.post("/reports/review", {
        status: status,
        reportID: item.id,
      });
      setIsPosting(false);

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      toast(data.msg, { type: "success" });
      handleClose();
      getReports();
    } catch (err) {
      console.log(err);
      setIsPosting(false);
      toast("خطایی رخ داد", { type: "error" });
    }
  }
  return (
    <Modal show={item ? true : false} onHide={() => handleClose()}>
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
            <div className="form-group">
              <label>دسته بندی:</label>
              <textarea className="form-control" readOnly>
                {item?.Category.title}
              </textarea>
            </div>
            <div className="form-group">
              <label>زیر دسته:</label>
              <textarea className="form-control" readOnly>
                {item?.SubCategory.title}
              </textarea>
            </div>
            <div className="form-group">
              <label>توضیحات:</label>
              <textarea className="form-control" readOnly>
                {item?.description}
              </textarea>
            </div>
            <div className="form-group">
              <label>شناسه تیکت:</label>
              <textarea className="form-control" readOnly>
                {item?.thicketNumber}
              </textarea>
            </div>
          </div>
        </div>
        {["Admin", "Supervisor"].includes(auth.role) && (
          <div className="row justify-content-center">
            {isPosting ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-success ml-2"
                  onClick={() => submitReview("Accepted")}
                >
                  تایید گزارش
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => submitReview("Rejected")}
                >
                  رد گزارش
                </button>
              </>
            )}
          </div>
        )}
      </Modal.Body>
      <style jsx>{`
        select > option {
          background-color: blue !important;
        }
        textarea[readonly] {
          background-color: white;
          resize: none;
        }
      `}</style>
    </Modal>
  );
}
