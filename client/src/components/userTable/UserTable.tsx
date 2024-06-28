import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const UserTable:React.FC = ({ users }) => {

    return (
        <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
          <table className='w-full mb-5'>
            <TableHeader />
            <tbody>
              {users?.map((user, index) => (
                <TableRow key={index + user?._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    export default UserTable;