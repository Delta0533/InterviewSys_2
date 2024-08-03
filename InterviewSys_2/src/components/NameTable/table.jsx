//TABLE PAGE
import DataTable from 'react-data-table-component';
import Button from './button';
import './table.css';


const columns = [
	{
		name: 'Name',
		selector: row => row.name,
		sortable: true,
	},
	{
		name: 'Student_ID',
		selector: row => row.student_id,
		sortable: true,
	},
    {
		name: 'Add_Score',
		selector: row => row.add_score,
		sortable: true,
	},

];

const data = [
  	{
		id: 1,
        name: 'Kimmana',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
	{
		id: 2,
		name: 'PrompipatJa',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
    {
		id: 1,
        name: 'Kimmana',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
	{
		id: 2,
		name: 'PrompipatJa',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
    {
		id: 1,
        name: 'Kimmana',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
	{
		id: 2,
		name: 'PrompipatJa',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
    {
		id: 1,
        name: 'Kimmana',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
	{
		id: 2,
		name: 'PrompipatJa',
		student_id: '6601XXXX',
        add_score: <Button />,
	},
]


const customStyles = {
	rows: {
		style: {
			minHeight: '60px', // override the row height
            backgroundColor: 'white',
            color: 'black',
            fontSize: '20px',
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
            backgroundColor: 'RoyalBlue',
            color: 'white',
            fontSize: '24px',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};


export default function Table() {
    return (
        <div className='box-table'>
            <DataTable
            columns={columns}
            data={data}
            highlightOnHover
            pointerOnHover
            fixedHeader
            responsive
            selectableRows
            pagination
            customStyles={customStyles}
            
            />
        </div>
    )
}