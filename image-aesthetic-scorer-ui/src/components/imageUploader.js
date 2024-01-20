// ImageUploader.js
import React, { useState, useRef } from 'react';
import ApiService from '../services/scoreService';
import {
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Input,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import '../styles.css';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(false);
  const videoRef = useRef();

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const aestheticScore = await ApiService.predictAestheticScore(formData);
      setUploadSuccess(true);
    } catch (error) {
      // Handle errors
    }
  };

  const handleRealTimeProcessing = () => {
    // Placeholder for real-time processing logic
    console.log('Real-time processing initiated');
    // Add your real-time processing logic here
  };

  const handleToggleChange = () => {
    setRealTimeMode((prev) => !prev);
  };

  const handleCaptureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCaptureButtonClick = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setSelectedImage(new File([blob], 'captured_image.png'));
    });

    // Stop the video stream
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  return (
    <Container component="main" maxWidth="md" className="form-container">
      <Paper elevation={3} className="form-paper">
        <Typography component="h1" variant="h4" align="center">
          Image Aesthetic Score Predictor
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <FormControlLabel
                control={<Switch checked={realTimeMode} onChange={handleToggleChange} />}
                label="Real Time"
              />
            </Box>
          </Grid>
          {realTimeMode ? (
            <Grid item xs={12}>
              {/* Real-time processing UI */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<CameraAltIcon />}
                onClick={handleRealTimeProcessing}
              >
                Start Real-Time Processing
              </Button>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                {/* Camera Capture UI */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<CameraAltIcon />}
                  onClick={handleCaptureImage}
                >
                  Capture Image from Camera
                </Button>
              </Grid>
              <Grid item xs={12}>
                {/* File Upload UI */}
                <Input
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  fullWidth
                  style={{ display: 'none' }}
                  id="file-upload-input"
                />
                <label htmlFor="file-upload-input">
                  <Button
                    component="span"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
            </>
          )}
          {uploadSuccess && (
            <Grid item xs={12}>
              <Paper elevation={3} className="success-popup">
                <Typography variant="body1">Image uploaded successfully!</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>
      {/* Video element for camera capture */}
      <video ref={videoRef} style={{ display: 'none' }} />
      {/* Button to capture image from camera */}
      <Button
        variant="contained"
        color="primary"
        style={{ display: 'none' }}
        onClick={handleCaptureButtonClick}
      >
        Capture Image
      </Button>
    </Container>
  );
};

export default ImageUploader;
