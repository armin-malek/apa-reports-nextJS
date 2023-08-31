import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "~/server/axios";
import { toast } from "react-toastify";

export default function SubCatRemoveModal({ handleClose, item, reloadData }) {
  const [isPosting, setIsPosting] = useState(false);

  async function submitRemove() {
    try {
      setIsPosting(true);
      const { data } = await axios.post("/categories/remove-sub-category", {
        subCatId: item.id,
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
        show={item ? true : false}
        onHide={() => handleClose()}
        backdrop="static"
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
              <h1
                className="text-center"
                style={{ color: "red", fontSize: "24px" }}
              >
                از حذف این زیر دسته اطمینان دارید؟
              </h1>
              <div className="row mt-3 justify-content-center">
                {isPosting ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => submitRemove()}
                    >
                      بله
                    </button>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => handleClose()}
                    >
                      لغو
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <style jsx>{`
          select > option {
            background-color: blue !important;
          }
        `}</style>
      </Modal>
      <style>
        {`
      .my-modal {
        width: 90vw;
        max-width: 90vw;
    } 
    `}
      </style>
    </>
  );
}
