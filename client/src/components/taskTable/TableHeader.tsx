const TableHeader:React.FC =()=>{
    return(
<thead className="border-b border-gray-300">

<tr className="text-black text-left">
    <th className="py-2">Task Title</th>
    <th className="py-2">Priority</th>
    <th className="py-2">Team</th>
    <th className="py-2 hidden md:block">Created At</th>
</tr>
</thead>
    )
}

export default TableHeader;