import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutMain from "~/components/LayoutMain";
import axios from "~/server/axios";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/router";

const Page = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [cats, setCats] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [description, setDescription] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function getCats() {
      try {
        const { data } = await axios.get("/reports/info");
        console.log("data", data);
        if (data.ok == false) {
          toast(data.msg, { type: "error" });
          return;
        }
        setCats(data.cats);
        setSelectedCat(data.cats[0]?.id || undefined);
      } catch (err) {
        console.log(err);
        toast("خطایی رخ داد", { type: "error" });
      }
    }
    getCats();
  }, []);

  useEffect(() => {
    if (cats) {
      let subCats = cats.find((i) => i.id == selectedCat)?.SubCategories;
      //   console.log("subCats", subCats);
      setSelectedSubCat(subCats[0]?.id || undefined);
    }
  }, [selectedCat]);

  function getActiveCat() {
    return cats.find((i) => i.id == selectedCat);
  }
  function getActiveSubCat() {
    return getActiveCat().SubCategories.find((i) => i.id == selectedSubCat);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedCat, selectedSubCat, description, ticketNumber);
    setIsPosting(true);
    const { data } = await axios.post("/reports/create", {
      catID: parseInt(selectedCat),
      subCatID: parseInt(selectedSubCat),
      description: description,
      ticketNumber: ticketNumber,
    });
    setIsPosting(false);

    if (data.ok != true) {
      return toast(data.msg, { type: "error" });
    }

    toast(data.msg, { type: "success" });
    router.push("/reports");
  }
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center" style={{ fontSize: "25px" }}>
                ثبت گزارش
              </h1>

              {!cats ? (
                <div className="row justify-content-center mt-3">
                  <div className="spinner-border text-primary">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>دسته گزارش</label>
                    <select
                      className="form-control"
                      onChange={(e) => setSelectedCat(e.target.value)}
                      value={selectedCat}
                    >
                      {cats?.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCat && getActiveCat().SubCategories.length > 0 && (
                    <>
                      <div className="form-group mb-0">
                        <label>زیر دسته گزارش</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            console.log("set value", e.target.value);
                            setSelectedSubCat(e.target.value);
                          }}
                          value={selectedSubCat}
                        >
                          {getActiveCat().SubCategories?.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <small>
                        {getActiveSubCat() &&
                          `${getActiveSubCat().pointDescription}: ${
                            getActiveSubCat().point
                          } امتیاز`}
                      </small>
                    </>
                  )}

                  <div className="form-group mt-2">
                    <label>
                      توضیحات
                      <small
                        style={{
                          fontSize: "12px",
                          position: "relative",
                          top: "-6px",
                        }}
                      >
                        {" (اختیاری)"}
                      </small>
                    </label>
                    <TextareaAutosize
                      className="form-control"
                      minRows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      شناسه تیکت
                      <small
                        style={{
                          fontSize: "12px",
                          position: "relative",
                          top: "-6px",
                        }}
                      >
                        {" (اختیاری)"}
                      </small>
                    </label>
                    <input
                      className="form-control"
                      style={{ width: "100%", maxWidth: "200px" }}
                      onChange={(e) => setTicketNumber(e.target.value)}
                      value={ticketNumber}
                    />
                  </div>

                  <div className="row px-3">
                    <button
                      className="btn btn-success"
                      type="submit"
                      disabled={isPosting}
                    >
                      {isPosting ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "ثبت گذارش"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.Layout = LayoutMain;
export default Page;
