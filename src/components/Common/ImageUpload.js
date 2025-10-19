"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Avatar, 
  Typography, 
  CircularProgress,
  Alert 
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const ImageUpload = ({ 
  currentImageUrl = null, 
  onImageUpload, 
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
}) => {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(currentImageUrl);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Update image preview when currentImageUrl prop changes
  useEffect(() => {
    setImagePreview(currentImageUrl);
  }, [currentImageUrl]);

  const validateFile = (file) => {
    if (!file) return 'No file selected';
    
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`;
    }
    
    if (file.size > maxSize) {
      return `File size too large. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(1)}MB`;
    }
    
    return null;
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      // Upload to Vercel Blob
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      
      // Notify parent component
      if (onImageUpload) {
        onImageUpload(url);
      }
      
      setImagePreview(url);
      
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      setError('Failed to upload image. Please try again.');
      setImagePreview(currentImageUrl); // Reset to original
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (onImageUpload) {
      onImageUpload(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* Image Preview */}
      <Avatar
        src={imagePreview}
        sx={{ 
          width: 120, 
          height: 120,
          border: '2px dashed #ccc',
          backgroundColor: '#f5f5f5'
        }}
      >
        {!imagePreview && <CloudUploadIcon sx={{ fontSize: 40, color: '#999' }} />}
      </Avatar>

      {/* Upload Controls */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleUploadClick}
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
          size="small"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </Button>
        
        {imagePreview && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemoveImage}
            disabled={uploading}
            size="small"
          >
            Remove
          </Button>
        )}
      </Box>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ width: '100%', maxWidth: 300 }}>
          {error}
        </Alert>
      )}

      {/* Help Text */}
      <Typography variant="caption" color="text.secondary" align="center">
        Supported formats: JPG, PNG, WebP<br />
        Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB
      </Typography>
    </Box>
  );
};

export default ImageUpload;