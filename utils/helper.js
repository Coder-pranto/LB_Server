const fs = require('fs');

// Helper to delete a file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.warn('File not found:', filePath);
    }
  } catch (err) {
    console.error('Error deleting file:', err.message);
  }
};

module.exports = {
  deleteFile,
};
