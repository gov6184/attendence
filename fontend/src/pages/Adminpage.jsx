import React, { useState, useEffect } from 'react';
import style from '../css/Adminpage.module.css'; // Import the CSS module
import axios from 'axios';

function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [locations, setLocations] = useState([]); // State for unique locations
  const [selectedLocation, setSelectedLocation] = useState(''); // State for selected location filter
  let [another,setanother] = useState()

  let [capturedImages,setCapturedImages] =useState( [])

let funn=async()=>{
  let ans= await axios.get("https://attendence-b5l7.onrender.com/attendence")
  console.log(ans.data)
  setCapturedImages(ans.data)
}
 useEffect(()=>{
funn()
 },[])

  useEffect(() => {
    // Extract unique locations from captured images
    
    console.log(capturedImages,"hi")
    const uniqueLocations = [...new Set(capturedImages.map((image) => image.location))];
    setLocations(uniqueLocations);

    // Fetch captured images from your data source (replace with your logic)
    const images = capturedImages; // Replace with your data access logic
    setFilteredImages(images);
  }, [capturedImages]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const applyFilters = () => {
    let filtered = capturedImages.slice(); // Create a copy to avoid mutation

    // Filter by name (search query)
    if (searchQuery !== '') {
      filtered = filtered.filter((image) => image.name.toLowerCase().includes(searchQuery));
    }

    // Filter by location (if selected)
    if (selectedLocation !== '') {
      filtered = filtered.filter((image) => image.location === selectedLocation);
    }

    setFilteredImages(filtered);
  };

  return (
    <div className={style.admin_page}>
      <h1>Captured Images - Admin Panel</h1>
      <div className={style.search_container}>
        <input
          type="text"
          id="search_name"
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={style.searchInput}
        />
        <select
          id="search_location"
          value={selectedLocation}
          onChange={handleLocationChange}
          className={style.searchLocation}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <button onClick={applyFilters} className={style.searchButton}>
          Filter
        </button>
      </div>
      <div className={style.captured_images_container}>
        {filteredImages.map((image) => (
         <div key={image.id} className={style.captured_image_info}>
            <img src={image.image} alt="Captured Image" className={style.captured_image} />
            <p>Name: {image.name}</p>
            <p>Location: {image.location}</p>
            <p>Date & Time: {image.date}</p>
          </div>          
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
