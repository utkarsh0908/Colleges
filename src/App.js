import { createColumnHelper } from "@tanstack/react-table";
import CollegeTable from "./components/Table";
import tabledata from "./data/tableData";
import {
  CDRank,
  Colleges,
  Fees,
  Package,
  UserReviews,
  Ranking,
} from "./components/TableColumns";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("CDRank", {
    header: "CD Rank",
    cell: (item) => <CDRank item={item} />,
  }),
  columnHelper.accessor("name", {
    header: "Colleges",
    cell: (item) => <Colleges item={item} />,
  }),
  columnHelper.accessor("fees", {
    header: "Course Fees",
    cell: (item) => <Fees item={item} />,
  }),
  columnHelper.accessor("package", {
    header: "Placements",
    cell: (item) => <Package item={item} />,
  }),
  columnHelper.accessor("reviews", {
    header: "User Reviews",
    cell: (item) => <UserReviews item={item} />,
  }),
  columnHelper.accessor("rank", {
    header: "Ranking",
    cell: (item) => <Ranking item={item} />,
  }),
];

function App() {
  return (
    <div className="flex justify-center">
      <CollegeTable columns={columns} data={tabledata} />
    </div>
  );
}

export default App;
