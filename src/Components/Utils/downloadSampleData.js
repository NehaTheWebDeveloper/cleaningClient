export const downloadSampleData = (sampleDataUrl, fileName) => {
    const link = document.createElement("a");
    link.href = sampleDataUrl;
    link.target = "_blank"; // Open in a new tab/window
    link.download = fileName; // Set the download file name
    link.click();
  };
