import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css";
import "./App.css";
import { createCloudinary } from "./cloudinaryServer";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview,
  FilePondPluginFileValidateType
);

function App() {
  const [state, setState] = useState({
    images: [],
    videos: [],
    body: "",
    files: [],
  });
  const updateLinks = (link, file) => {
    return setState({
      ...state,
      files: [...state.files, link],
      images: [...state.images, file],
    });
  };
  const removeFiles = (filename) => {
    console.log("delete");
    var filesArray = state.files.filter((file) => file.name !== filename);
    var imagesArray = state.images.filter((image) => image.name !== filename);
    setState({
      ...state,
      files: filesArray,
      images: imagesArray,
    });
  };
  console.log(state);

  return (
    <div className="App">
      <div class="control">
        <textarea
          class="textarea has-fixed-size"
          placeholder="Fixed size textarea"
        ></textarea>
      </div>
      <FilePond
        files={state.images}
        allowMultiple={true}
        acceptedFileTypes={["image/*"]}
        maxFiles={3}
        server={createCloudinary("xklusivo", "kzlfjrv5", updateLinks)}
        name="images"
        labelIdle='<p><span class="icon is-large">
                    <span class="fa-lg">
                      <i class="fas fa-camera fas fa-2x has-text-info"></i>
                    </span>                    
                  </span>Adicionar foto</p>'
        onremovefile={(error, file) => {
          if (error) {
            console.log(error);
          }
          removeFiles(file.filename);
        }}
      />
      <FilePond
        files={state.videos}
        allowMultiple={true}
        acceptedFileTypes={["video/*"]}
        maxFiles={1}
        server={createCloudinary("xklusivo", "kzlfjrv5")}
        name="videos"
        labelIdle='<p><span class="icon is-large">
                    <span class="fa-lg">
                      <i class="fas fa-video fas fa-2x has-text-info"></i>
                    </span>                    
                  </span>Adicionar video</p>'
        onupdatefiles={(fileItems) => {
          setState({
            ...state,
            videos: fileItems.map((fileItem) => fileItem.file),
          });
        }}
      />
    </div>
  );
}

export default App;
