import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/userSlice";
import UserCard from "./components/UserCard";
import PaginationComponent from "./components/Pagination";
import FilterComponent from "./components/FilterUser";
import CreateUserForm from "./components/users/AddUser";
import ShowTeam from "./components/teams/TeamDetails";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const totalPages = useSelector((state) => state.users.totalPages);
  const currentPage = useSelector((state) => state.users.currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    available: "",
  });
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        search: searchTerm,
        ...filters,
      })
    );
  }, [dispatch, currentPage, searchTerm, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePageChange = (page) => {
    dispatch(fetchUsers({ page, search: searchTerm, filters }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      domain: "",
      gender: "",
      available: "",
    });
    dispatch(
      fetchUsers({
        page: 1,
        search: "",
        domain: "",
        gender: "",
        available: "",
      })
    );
  };

  const toggleSelectUser = (userId) => {
    if (isSelectionMode) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.includes(userId)
          ? prevSelectedUsers.filter((id) => id !== userId)
          : [...prevSelectedUsers, userId]
      );
    }
  };

  const handleCreateTeam = async () => {
    if (teamName && selectedUsers.length > 0) {
      const selectedUserDetails = users.filter((user) =>
        selectedUsers.includes(user._id)
      );

      // Check for unique domains
      const uniqueDomains = new Set(
        selectedUserDetails.map((user) => user.domain)
      );
      if (uniqueDomains.size !== selectedUserDetails.length) {
        alert("Users must have unique domains.");
        return;
      }

      // Check for availability
      const allAvailable = selectedUserDetails.every((user) => user.available);
      if (!allAvailable) {
        alert("All selected users must be available.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: teamName,
            userIds: selectedUsers,
          }),
        });

        if (response.ok) {
          const newTeam = await response.json();
          console.log("Team created:", newTeam);
          setSelectedTeamId(newTeam._id);
          setTeamName("");
          setSelectedUsers([]);
          setShowCreateTeam(false);
          setShowTeamDetails(true);
          setIsSelectionMode(false); 
        } else {
          console.error("Failed to create team");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please enter a team name and select users.");
    }
  };

  const handleCancelTeamCreation = () => {
    setShowCreateTeam(false);
    setTeamName("");
    setSelectedUsers([]);
    setIsSelectionMode(false); 
  };

  const handleClearTeam = () => {
    setShowTeamDetails(false);
    setSelectedTeamId(null);
  };

  return (
    <div className="container mx-auto p-6">
      <a href="/" className="text-3xl font-bold text-center mb-6">User Management</a>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Filter Component */}
      <FilterComponent
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      {/* Button to open Create User Form */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowCreateUserForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create New User
        </button>
      </div>
      {/* Create User Form */}
      {showCreateUserForm && (
        <CreateUserForm onClose={() => setShowCreateUserForm(false)} />
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setShowCreateTeam(true);
            setIsSelectionMode(true); 
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Create Team
        </button>
      </div>
      {/* Team Creation */}
      {showCreateTeam && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="p-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleCreateTeam}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Create
          </button>
          <button
            onClick={handleCancelTeamCreation}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Show Created Team Details */}
      {showTeamDetails && selectedTeamId && (
        <div className="relative">
          <button
            onClick={handleClearTeam}
            className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Clear
          </button>
          <ShowTeam teamId={selectedTeamId} />
        </div>
      )}

      {/* User Cards */}
      <div className="flex flex-wrap justify-center">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            toggleSelectUser={() => toggleSelectUser(user._id)}
            isSelected={selectedUsers.includes(user._id)}
            isSelectionMode={isSelectionMode} 
          />
        ))}
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
