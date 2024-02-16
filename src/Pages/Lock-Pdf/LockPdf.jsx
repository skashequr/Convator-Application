import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const LockPdf = () => {
  const [password, setPassword] = useState("");
  const [pdfBytes, setPdfBytes] = useState(null);

  const handleEncryptPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.setPassword(password); // Using setPassword instead of setUserPassword

      const encryptedPdfBytes = await pdfDoc.save();

      const blob = new Blob([encryptedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "encrypted.pdf";
      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error encrypting PDF:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const buffer = reader.result;
      setPdfBytes(new Uint8Array(buffer));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="pt-28">
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleEncryptPdf}>Encrypt PDF and Download</button>
    </div>
  );
};

export default LockPdf;
