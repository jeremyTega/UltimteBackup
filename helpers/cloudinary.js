const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'dsml73vio', 
    api_key: '855818916975188', 
    api_secret: 'dIVo-elNdAeGOALdA_AIPIaRXO4' 
  });

  // Retrieve current upload preset settings
cloudinary.api.upload_preset('z8wu9tkt', (error, result) => {
  if (error) {
    console.error('Error retrieving upload preset:', error);
  } else {
    // Modify the allowed formats to include .txt and .docx
    const updatedPreset = {
      ...result.settings,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'txt']
    };

    // Update the upload preset with the modified settings
    cloudinary.api.update_upload_preset('z8wu9tkt', updatedPreset, (updateError, updateResult) => {
      if (updateError) {
        console.error('Error updating upload preset:', updateError);
      } else {
        console.log('Upload preset updated successfully:', updateResult);
      }
    });
  }
});



module.exports = cloudinary;