const { BlobServiceClient } = require("@azure/storage-blob");

// Azure Storage account SAS token and container details
const sasUrl = "https://<your-storage-account-name>.blob.core.windows.net/<container-name>?<sas-token>";

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  
  if (!file) {
    document.getElementById("status").innerText = "Please select a file.";
    return;
  }

  document.getElementById("status").innerText = "Uploading...";

  try {
    // Create BlobServiceClient
    const blobServiceClient = new BlobServiceClient(sasUrl);

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient("<container-name>");

    // Get the block blob client
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // Upload the file
    await blobClient.uploadBrowserData(file);

    document.getElementById("status").innerText = `File "${file.name}" uploaded successfully.`;
  } catch (error) {
    document.getElementById("status").innerText = `Error: ${error.message}`;
  }
}
