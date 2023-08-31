import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableRowSkeleton({ cells = 5, rows = 1, widths = [] }) {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((item, index) => (
          <tr key={index}>
            {Array(cells)
              .fill(0)
              .map((item, idx) => (
                <td
                  key={idx}
                  style={{ width: widths[idx] && `${widths[idx]}%` }}
                >
                  <Skeleton></Skeleton>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
}
