import React, { useEffect, useState } from "react";

const AutoSearchComplete = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      if (data && data.users && data.users.length) {
        setUsers(data.users);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const filtered = users.filter((user) => {
    const search = input.toLowerCase().trim();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="font-semibold text-3xl">
          Loading the data! PLease wait...
        </p>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        name="search-users"
        placeholder="Please search name here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ul className="space-y-2">
        {filtered.length > 0 &&
           filtered.map((item, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-md">
                {item.firstName} {item.lastName} {item.height} cm
              </li>
            ))
          }
      </ul>
    </div>
  );
};

export default AutoSearchComplete;
