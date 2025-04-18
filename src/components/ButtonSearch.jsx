import React, { useEffect, useState } from "react";

const ButtonSearch = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");
  const categories = ["All", "Male", "Female"];

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
    const matchesCategory =
      selectCategory === "All"
        ? users
        : user.gender.toLowerCase() === selectCategory.toLowerCase();
    const search = searchTerm.toLowerCase().trim();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search) && matchesCategory;
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

  const handleSearch = () => {
    setSearchTerm(input);
  };

  return (
    <div>
      <div className="flex gap-4">
        <div>
          <input
            type="text"
            name="search-users"
            className="px-4 py-2 bg-gray-300 rounded-l-md "
            placeholder="Please search name here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="p-2 rounded-r-md bg-green-500 hover:bg-green-700 text-gray-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <select
          name="gender-category"
          onChange={(e) => setSelectCategory(e.target.value)}
          className="px-6 py-2 rounded bg-gray-300"
        >
          {categories.map((category, index) => (
            <option value={category} key={index} className="py-4">
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-2">
        {filtered.length > 0 &&
          filtered.map((item, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {item.firstName} {item.lastName} {item.height} cm
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ButtonSearch;
