import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableRow from 'components/Table/TableRow';
import TableHeader from 'components/Table/TableHeader';
import NoRecord from 'components/NoRecord';
import { RootState } from 'store';
import { fetchResultsRequest } from 'reduxStore/actions/resultActions';


const Table = () => {
  const dispatch = useDispatch();
 
  const { results, fetched } = useSelector((state : RootState) => state.results);

  useEffect(() => {  
    if(!fetched)  
      dispatch(fetchResultsRequest());
  }, [dispatch, fetched]);


  return (
    <div className="table-section">
      <TableHeader />
      {results.length === 0 ? (
        <NoRecord />
      ):(
        results.map((results, index) => (
        <TableRow
          key={index}
          student={results}
        />
      ))
    )}
    </div>
  );
}

export default Table;
