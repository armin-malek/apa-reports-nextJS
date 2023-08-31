import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutMain from "~/components/LayoutMain";
import TableRowSkeleton from "~/components/TableRowSkeleton";
import axios from "~/server/axios";
import { parseDateFull } from "~/server/functions";
import Swal from "sweetalert2";
import UserCreateModal from "~/components/users/UserCreateModal";

const Page = () => {
  const [isLoading, setIsLoading] = useState();
  const [users, setUsers] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function getData() {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/users");
      setIsLoading(false);

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      setUsers(data.users);
    } catch (err) {
      console.log(err);
      toast("خطایی رخ داد", { type: "error" });
    }
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleRemove(userId) {
    console.log("yeah");
    const res = await Swal.fire({
      title: "از حذف کاربر مطمئن هستید؟",
      text: "گزارش های ثبت شده کاربر نیز حذف خواهد شد!",
      confirmButtonText: "حذف",
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      cancelButtonText: "لفو",
      showCancelButton: true,
      color: "red",
    });

    if (res.isConfirmed != true) return;

    const { data } = await axios.post("/users/remove", {
      userId,
    });

    if (data.ok != true) {
      return toast(data.msg, { type: "error" });
    }

    toast(data.msg, { type: "success" });
    getData();
  }
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <button
            className="btn btn-primary"
            style={{ borderRadius: "25px" }}
            onClick={() => {
              setShowCreateModal(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ height: "20px" }}
            ></FontAwesomeIcon>
            <span className="pr-1">ایجاد کاربر</span>
          </button>
          <div className="card mt-1">
            <div className="table-responsive">
              <table
                className="table text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <thead className="thead-light">
                  <tr className="">
                    <th className="align-middle">ایمیل</th>
                    <th className="align-middle">نوع</th>
                    <th className="align-middle">نام</th>
                    <th className="align-middle">تعداد گزارش</th>
                    <th className="align-middle">تاریخ ایجاد</th>
                    <th className="align-middle">عملیات</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {isLoading ? (
                    <TableRowSkeleton rows={10} cells={6} />
                  ) : (
                    users?.map((item, index) => (
                      <tr key={index}>
                        <td className="align-middle">{item.email}</td>
                        <td className="align-middle">
                          {item.role == "Apa" ? (
                            <span className="badge badge-success">
                              مرکز آپا
                            </span>
                          ) : (
                            <span className="badge badge-info">ناظر</span>
                          )}
                        </td>
                        <td className="align-middle">{item.name}</td>
                        <td className="align-middle">{item._count.Report}</td>

                        <td className="align-middle" dir="ltr">
                          {parseDateFull(item?.dateCreated)}
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn"
                            onClick={() => handleRemove(item.id)}
                          >
                            <FontAwesomeIcon
                              style={{
                                height: "23px",
                                color: "red",
                              }}
                              icon={faTrash}
                            ></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* {pageCount > 1 && (
              <div className="row justify-content-center">
                <Paginator pageCount={pageCount} setPageNum={setPageNum} />
              </div>
            )} */}
          </div>
        </div>
      </div>

      <UserCreateModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        getData={getData}
      />

      <style>{`
       td {
        padding-top: 4px;
        padding-bottom: 4px;
      }
      `}</style>
    </>
  );
};

Page.Layout = LayoutMain;
export default Page;
