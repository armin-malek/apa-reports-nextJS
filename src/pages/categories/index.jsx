import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutMain from "~/components/LayoutMain";
import TableRowSkeleton from "~/components/TableRowSkeleton";
import CatCreateModal from "~/components/categories/CatCreateModal";
import CatRemoveModal from "~/components/categories/CatRemoveModal";
import CategoriesTableRow from "~/components/categories/CategoriesTableRow";
import SubCatViewModal from "~/components/categories/SubCatViewModal";
import axios from "~/server/axios";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [activeItem, setActiveItem] = useState();
  const [deletableItem, setDeletableItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showCatCreate, setShowCatCreate] = useState(false);
  async function getCategories() {
    try {
      console.log("categories");
      setIsLoading(true);
      const { data } = await axios.get("/categories");

      if (data.ok != true) {
        return toast(data.msg, { type: "error" });
      }

      setIsLoading(false);
      setCategories(data.cats);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <button
            className="btn btn-primary"
            style={{ borderRadius: "25px" }}
            onClick={() => setShowCatCreate(true)}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ height: "20px" }}
            ></FontAwesomeIcon>
            <span className="pr-1"> افزودن</span>
          </button>
          <div className="card mt-1">
            <div className="table-responsive">
              <table
                className="table text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <thead className="thead-light">
                  <tr className="">
                    <th className="align-middle">عملیات</th>
                    <th className="align-middle">عنوان</th>
                    <th className="align-middle">سقف امتیاز</th>
                    <th className="align-middle">تعداد زیر دسته</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {isLoading ? (
                    <TableRowSkeleton rows={10} cells={4} />
                  ) : (
                    categories.map((item, index) => (
                      <CategoriesTableRow
                        key={index}
                        item={item}
                        // handleView={handleShowEdit}
                        setActiveItem={setActiveItem}
                        setDeletableItem={setDeletableItem}
                      ></CategoriesTableRow>
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
      <CatCreateModal
        show={showCatCreate}
        handleClose={() => setShowCatCreate(false)}
        reloadData={getCategories}
      />
      <SubCatViewModal
        item={activeItem}
        handleClose={() => setActiveItem()}
        reloadData={getCategories}
      />

      <CatRemoveModal
        item={deletableItem}
        handleClose={() => setDeletableItem()}
        reloadData={getCategories}
      />
    </>
  );
};

Page.Layout = LayoutMain;

export default Page;
