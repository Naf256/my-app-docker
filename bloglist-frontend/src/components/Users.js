import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <h3>blogs created</h3>
        <table>
          {console.log(users)}
          <tbody>
            {
              users.map((user, i) =>
                <tr key={i}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users
