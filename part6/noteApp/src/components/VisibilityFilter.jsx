import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filterToDisplay = useSelector((state) => state.filter);

  return (
    <div>
      <input
        type="radio"
        value=""
        id="all"
        name="filterRadio"
        onChange={() => dispatch(filterChange("ALL"))}
        checked={filterToDisplay === "ALL"}
      />
      <label htmlFor="all">All</label>
      <label>
        <input
          type="radio"
          value=""
          name="filterRadio"
          onChange={() => dispatch(filterChange("IMPORTANT"))}
        />
        Important Only
      </label>
      <label>
        <input
          type="radio"
          value=""
          name="filterRadio"
          onChange={() => dispatch(filterChange("NOT-IMPORTANT"))}
        />
        Not-Important Only
      </label>
    </div>
  );
};

export default VisibilityFilter;
