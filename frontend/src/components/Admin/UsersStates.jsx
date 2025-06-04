import React, {useEffect} from "react";
import useUserStore from "../../stores/useUserStore";
import {Edit, Trash2, Eye} from "lucide-react";

const UsersStates = () => {
  const {users, getAllUsers, isUsersLoading} = useUserStore();
  console.log("Users data: ", users);
  console.log("Is users loading: ", isUsersLoading);
  console.log("Get all users function: ", getAllUsers);

  useEffect(() => {
    getAllUsers();
    console.log("Users data: ", users);
  }, [getAllUsers]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">
        Users List
      </h3>
      {isUsersLoading ? (
        <div className="text-center text-[var(--muted-foreground)] py-8">
          Loading users...
        </div>
      ) : users && users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead className="bg-[var(--background)]">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--card)] divide-y divide-[var(--border)]">
              {users.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-[var(--secondary)] transition-colors"
                >
                  <td className="px-4 py-2 font-medium text-[var(--foreground)]">
                    {user.username || user.name || "-"}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {user.role || "user"}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="p-2 rounded hover:bg-[var(--primary)]/10 text-[var(--primary)]"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-[var(--accent)]/10 text-[var(--accent)]"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-[var(--destructive)]/10 text-[var(--destructive)]"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-[var(--muted-foreground)] py-8">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UsersStates;
