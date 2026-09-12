import { useState } from 'react';
import API from '../api/axios';

const SearchTrains = () => {
  const [form, setForm] = useState({ from: '', to: '' });
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await API.get('/trains/search', { params: form });
      setTrains(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Search Trains 🚆
        </h2>

        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-md flex gap-4 flex-wrap"
        >
          <input
            type="text"
            name="from"
            placeholder="From (e.g. Delhi)"
            value={form.from}
            onChange={handleChange}
            className="flex-1 min-w-[150px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="to"
            placeholder="To (e.g. Mumbai)"
            value={form.to}
            onChange={handleChange}
            className="flex-1 min-w-[150px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading && <p className="text-center mt-4">Searching...</p>}

        {!loading && searched && trains.length === 0 && !error && (
          <p className="text-center mt-6 text-gray-500">No trains found</p>
        )}

        <div className="mt-6 space-y-4">
          {trains.map((train) => (
            <div
              key={train._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{train.name}</h3>
                <p className="text-sm text-gray-500">
                  #{train.trainNo} | {train.source} → {train.destination}
                </p>
                <p className="text-sm text-gray-500">
                  Dep: {train.departureTime} | Arr: {train.arrivalTime}
                </p>
              </div>
              <div className="flex gap-2">
                {train.classes.map((cls) => (
                  <span
                    key={cls.type}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    {cls.type}: ₹{cls.fare}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTrains;