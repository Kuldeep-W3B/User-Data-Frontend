import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTeam = ({ teamId }) => {
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/team/${teamId}`);
        setTeamDetails(response.data);
      } catch (error) {
        setError('Failed to load team details.');
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchTeamDetails();
    }
  }, [teamId]);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>{error}</p>;

  if (!teamDetails) return <p>No team details available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Team Details</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold mb-2">Team Name: {teamDetails.name}</h3>
      </div>
      <h3 className="text-xl font-semibold mb-2">Team Members</h3>
      {teamDetails.members && teamDetails.members.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Domain</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Availability</th>
              </tr>
            </thead>
            <tbody>
              {teamDetails.members.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user.first_name} {user.last_name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.domain}</td>
                  <td className="p-2">{user.gender}</td>
                  <td className="p-2"> {user.available ? 'Available' : 'Not Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No team members to display.</p>
      )}
    </div>
  );
};

export default ShowTeam;
