import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseDateFull } from "~/server/functions";

export default function CategoriesTableRow({
  item,
  setActiveItem,
  setDeletableItem,
}) {
  return (
    <>
      <tr>
        <td className="align-middle">
          <button className="btn btn-info" onClick={() => setActiveItem(item)}>
            <FontAwesomeIcon
              style={
                {
                  // height: "25px",
                  // color: "#0081C9",
                }
              }
              icon={faEye}
            ></FontAwesomeIcon>
          </button>
          {/* <button
            className="btn btn-warning mr-1"
            onClick={() => {
              console.log("set null");
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button> */}

          <button
            className="btn btn-danger mr-1"
            onClick={() => {
              setDeletableItem(item);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
        <td className="align-middle">{item.title}</td>
        <td className="align-middle">{item.maxPoints}</td>
        <td className="align-middle">{item.SubCategories?.length}</td>
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
