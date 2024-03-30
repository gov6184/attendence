import React, { useState, useRef, useEffect } from 'react';
import '../css/Userpage.css'; // Import your CSS file
import axios from "axios"

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]); // Array to store captured images
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const cleanup = () => {
      if (isCameraActive) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };

    return cleanup;
  }, [isCameraActive]);

  const handleCapture = async () => {
    if (isCameraActive) {
      if (!name || !location) {
        setErrorMessage('Please enter your Name and Location.');
        alert("Please enter your Name and Location.")
        return; // Prevent capture if either is empty
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0);
      video.pause();
      setIsCameraActive(false);

      const capturedImage = canvas.toDataURL('image/png');
      
      const obj = {
        image: capturedImage,
        name,
        location,
        date: new Date().toLocaleString(),
      };
      fetch("http://localhost:8080/attendence/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Adjust Content-Type if needed
        body: JSON.stringify(obj), // Convert data to JSON string (if applicable)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          return response.json();
        })
        .then((responseData) => {
          console.log('POST request successful:', responseData);
        })
        .catch((error) => {
          console.error('Error sending POST request:', error);
          // Handle errors here (e.g., display an error message to the user)
        });      setCapturedImages([...capturedImages, obj]); // Add captured info to the array
      setName(''); // Clear name input
      setLocation(''); // Clear location selection

      console.log('Captured image:', capturedImage);
    } else {
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
        });
    }
  };

  return (
    <div className="camera-container">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="input-field"
      />
      <br />
      <label htmlFor="location">Location:</label>
      <select
        id="location"
        name="location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        className="input-field"
      >
        {/* Add your location options here */}
        <option value="">selectlocation</option>
        <option value="shahapur">Shahapur</option>
        <option value="kalyan">Kalyan</option>
        <option value="badlapur1">Badlapur 1</option>
        <option value="badlapur2">Badlapur 2</option>
      </select>
      <br />
      <br />
      <div className="camera-wrapper">
        <video ref={videoRef} autoPlay muted width="100%" height="auto" style={{ display: isCameraActive ? 'block' : 'none' }} />
        <canvas ref={canvasRef} style={{ display: !isCameraActive ? 'none' : 'none' }} />
      </div>
      <button onClick={handleCapture} className="capture-button">
        {isCameraActive ? 'Capture Image' : 'Start Camera'}
      </button>
      {/* Scrollable container for captured images */}
      <div className="captured-images-wrapper">
        {capturedImages.map((capturedImage, index) => (
          <div key={index} className="captured-image-info">
            <img src={capturedImage.image} alt="Captured Image" className="captured-image" />
            <p>Name: {capturedImage.name}</p>
            <p>Location: {capturedImage.location}</p>
            <p>Date & Time: {capturedImage.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
