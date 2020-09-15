export const createCloudinary = (
  cloudName,
  unsignedUploadPreset,
  updateLinks
) => ({
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    // `fieldName` and `meta` are not used for now

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.upload.addEventListener("progress", (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        load(response.public_id);
        updateLinks(
          {
            publicId: response.public_id,
            resourceType: response.resource_type,
            url: response.url,
            name: `${response.original_filename}.${response.format}`,
          },
          file
        );
        return console.log(response.public_id);
      }

      error("oh no!");
    };

    formData.append("upload_preset", unsignedUploadPreset);
    formData.append("tags", "browser_upload");
    formData.append("file", file);
    xhr.send(formData);

    return {
      abort: () => {
        xhr.abort();
      },
    };
  },
  revert: null,
});
