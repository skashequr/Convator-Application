import { useState } from "react";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import JSZip from "jszip/dist/jszip.min.js"; // Import JSZip from the specific path
import Swal from "sweetalert2";

const HtmlToWord = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const convertToWord = async () => {
    if (!file) {
      Swal.fire("Login failed", "Email or password is incorrect", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const htmlString = reader.result;

      // Create a new div
      const tempDiv = document.createElement("div");
      // Set inner HTML to the HTML string
      tempDiv.innerHTML = htmlString;

      // Generate the Word document
      const doc = new Docxtemplater();

      // Load the Word template file using JSZip
      const zip = new JSZip();
      const wordTemplate = await fetch("/word-template.docx").then((response) =>
        response.arrayBuffer()
      );
      const loadedZip = await zip.loadAsync(wordTemplate);
      doc.loadZip(loadedZip);

      // Set the HTML content as the value for the template variable
      doc.setData({ content: tempDiv.innerHTML });

      try {
        doc.render();
        const output = doc.getZip().generate({ type: "blob" });
        saveAs(output, `${file.name}.docx`);
      } catch (error) {
        console.error("Error rendering Word document:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="pt-28">
      <div>
        <input type="file" accept=".html" onChange={handleFileChange} />
        {fileName && <p>Uploaded File: {fileName}</p>}
      </div>
      <button onClick={convertToWord}>Convert to Word</button>
    </div>
  );
};

export default HtmlToWord;
