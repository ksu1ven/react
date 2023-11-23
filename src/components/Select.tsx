import { useRouter } from "next/router";
import { updateQueryParams } from "@/utils/helpFunctions";

function SelectLimit(props: Record<"pageSize", number>) {
  const { pageSize } = props;
  const optionValues = [5, 10, 20, 50, 100];

  const router = useRouter();

  return (
    <label className="flex justify-end mr-32 font-extrabold text-xl">
      Limit per page:
      <select
        className="bg-lime-700 text-white"
        name="itemsPerPage"
        id="itemsPerPage"
        data-testid="select"
        value={pageSize.toString()}
        onChange={(e) => {
          router.push(
            "?" + updateQueryParams(router.query, "limit", e.target.value)
          );
        }}
      >
        {optionValues.map((el) => (
          <option value={el} key={el} data-testid="select-option">
            {el}
          </option>
        ))}
      </select>
    </label>
  );
}
export default SelectLimit;
