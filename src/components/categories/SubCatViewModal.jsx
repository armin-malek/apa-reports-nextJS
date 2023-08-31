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
import SubCatCreateModal from "./SubCatCreateModal";

export default function SubCatViewModal({ handleClose, item, reloadData }) {
  const [isPosting, setIsPosting] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const [showSubCatCreate, setShowSubCatCreate] = useState(false);

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
        dialogClassName="my-modal"
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
              <button
                className="btn btn-primary mb-1"
                style={{ borderRadius: "25px" }}
                onClick={() => setShowSubCatCreate(true)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ height: "20px" }}
                ></FontAwesomeIcon>
                <span className="pr-1"> افزودن</span>
              </button>
              <div className="table-responsive">
                <table
                  className="table text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <thead className="thead-light">
                    <tr className="">
                      <th className="align-middle">عملیات</th>
                      <th className="align-middle">عنوان</th>
                      <th className="align-middle">توضیح امتیاز</th>
                      <th className="align-middle">امتیاز</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.SubCategories?.map((i, idx) => (
                      <tr key={idx}>
                        <td>
                          {/* <button className="btn btn-warning">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button> */}

                          <button
                            className="btn btn-danger mr-1"
                            onClick={() => setActiveItem(i)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                        <td>{i?.title}</td>
                        <td>{i?.pointDescription}</td>
                        <td>{i?.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {item?.status == "Pending" && (
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
      <SubCatCreateModal
        catId={item?.id}
        show={showSubCatCreate}
        handleClose={() => {
          setShowSubCatCreate(false);
          handleClose();
        }}
        reloadData={reloadData}
      />
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
