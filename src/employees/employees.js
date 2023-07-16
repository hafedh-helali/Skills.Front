import React from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function Employees() {
  async function fetchEmployees() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  }

  const { data, error, isError, isLoading } = useQuery(
    "getEmployees",
    fetchEmployees
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>User List</h1>
        <ul>
          {data &&
            data.length > 0 &&
            data.map((userObj, index) => (
              <li key={userObj.id}>{userObj.name}</li>
            ))}
        </ul>
      </main>
    </QueryClientProvider>
  );
}
