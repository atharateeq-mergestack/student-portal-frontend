import TableRow from 'components/Table/TableRow';
import TableHeader from 'components/Table/TableHeader';
import NoRecord from 'components/NoRecord';
import { IResultData } from 'utils/types';

interface TableProps{
  results: IResultData[]
}

const Table = ({ results }: TableProps) => {
  return (
    <div className="table-section">
      <TableHeader />
      {results.length === 0 ? (
        <NoRecord />
      ):(
        results.map((result, index) => (
        <TableRow
          key={index}
          student={result}
        />
      ))
    )}
    </div>
  );
};

export default Table;
