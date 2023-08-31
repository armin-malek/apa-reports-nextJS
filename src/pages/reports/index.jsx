import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutMain from "~/components/LayoutMain";
import TableRowSkeleton from "~/components/TableRowSkeleton";
import ReportViewModal from "~/components/reports/ReportViewModal";
import ReportsTableRow from "~/components/reports/ReportsTableRow";
import { AuthContext } from "~/context/AuthContext";
import axios from "~/server/axios";

const Page = () => {
  const [isLoading, setIsLoading] = useState();
  const [reports, setReports] = useState();
  const [activeReport, setActiveReport] = useState();

  const auth = useContext(AuthContext);
  const router = useRouter();
  async function getReports() {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/reports");
      setIsLoading(false);

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      setReports(data.reports);
    } catch (err) {
      console.log(err);
      toast("خطایی رخ داد", { type: "error" });
    }
  }
  useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          {auth.role == "Apa" && (
            <button
              className="btn btn-primary"
              style={{ borderRadius: "25px" }}
              onClick={() => {
                router.push("/reports/submit");
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ height: "20px" }}
              ></FontAwesomeIcon>
              <span className="pr-1">ثبت گزارش</span>
            </button>
          )}

          <div className="card mt-1">
            <div className="table-responsive">
              <table
                className="table text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <thead className="thead-light">
                  <tr className="">
                    <th className="align-middle">مشاهده</th>
                    {auth.role != "Apa" && (
                      <th className="align-middle">مرکز</th>
                    )}
                    <th className="align-middle">دسته</th>
                    <th className="align-middle">وضعیت</th>
                    <th className="align-middle">تاریخ ثبت</th>
                    <th className="align-middle">تاریخ بررسی</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {isLoading ? (
                    <TableRowSkeleton rows={10} cells={6} />
                  ) : (
                    reports?.map((item, index) => (
                      <ReportsTableRow
                        key={index}
                        item={item}
                        setActiveReport={setActiveReport}
                      ></ReportsTableRow>
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

      <ReportViewModal
        item={activeReport}
        handleClose={() => setActiveReport()}
        getReports={getReports}
      />
    </>
  );
};

Page.Layout = LayoutMain;
export default Page;
