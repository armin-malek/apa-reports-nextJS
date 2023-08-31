import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "~/context/AuthContext";
import { parseDateFull } from "~/server/functions";
import { useContext } from "react";

export default function ReportsTableRow({ item, setActiveReport }) {
  const auth = useContext(AuthContext);

  function statusBadge(status) {
    if (status == "Pending") {
      return <span className="badge badge-secondary">در انتظار</span>;
    }
    if (status == "Accepted") {
      return <span className="badge badge-success">تایید شده</span>;
    }
    if (status == "Rejected") {
      return <span className="badge badge-danger">رد شده</span>;
    }
  }
  return (
    <>
      <tr>
        <td className="align-middle">
          <button className="btn" onClick={() => setActiveReport(item)}>
            <FontAwesomeIcon
              style={{
                height: "25px",
                color: "#0081C9",
              }}
              icon={faEye}
            ></FontAwesomeIcon>
          </button>
        </td>
        {auth.role != "Apa" && (
          <td className="align-middle">{item.User.name}</td>
        )}
        <td
          className="align-middle"
          style={{
            maxWidth: "400px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.Category.title}
        </td>
        <td className="align-middle">{statusBadge(item.status)}</td>
        <td className="align-middle" dir="ltr">
          {parseDateFull(item.dateCreated)}
        </td>
        <td className="align-middle" dir="ltr">
          {parseDateFull(item?.dateReview)}
        </td>
      </tr>
      <style jsx>{`
        td {
          padding-top: 4px;
          padding-bottom: 4px;
        }
      `}</style>
    </>
  );
}
