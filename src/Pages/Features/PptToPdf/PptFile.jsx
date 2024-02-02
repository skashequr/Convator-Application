import React from 'react';
import { CloudConvert } from 'cloudconvert';

class PptFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: 'Sheikh Ashequr Rahman ', // your CloudConvert API key
      inputFormat: 'ppt', // the format of your input file
      outputFormat: 'pdf', // the format of your output file
      inputFile: null, // the input file object
      outputFile: null, // the output file object
      loading: false, // the loading state
      error: null, // the error state
    };
  }

  // handle the file input change event
  handleFileChange = (event) => {
    this.setState({ inputFile: event.target.files[0] });
  };

  // handle the file conversion event
  handleConvert = async () => {
    // check if the input file is valid
    if (!this.state.inputFile) {
      this.setState({ error: 'Please select a file to convert.' });
      return;
    }

    // set the loading state to true
    this.setState({ loading: true, error: null });

    try {
      // create a new CloudConvert instance
      const cloudConvert = new CloudConvert(this.state.apiKey);

      // create a new conversion task
      const task = await cloudConvert.tasks.create({
        operation: 'convert',
        input_format: this.state.inputFormat,
        output_format: this.state.outputFormat,
      });

      // upload the input file to CloudConvert
      await cloudConvert.tasks.upload(task, this.state.inputFile);

      // wait for the conversion to finish
      const result = await cloudConvert.tasks.wait(task);

      // download the output file from CloudConvert
      const outputFile = await cloudConvert.tasks.download(result);

      // set the output file and the loading state to false
      this.setState({ outputFile, loading: false });
    } catch (error) {
      // handle the error and set the loading state to false
      this.setState({ error: error.message, loading: false });
    }
  };

  // handle the file download event
  handleDownload = () => {
    // check if the output file is valid
    if (!this.state.outputFile) {
      this.setState({ error: 'Please convert a file first.' });
      return;
    }

    // create a URL for the output file
    const url = URL.createObjectURL(this.state.outputFile);

    // create a link element and click it to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = this.state.outputFile.name;
    link.click();

    // revoke the URL and clear the error state
    URL.revokeObjectURL(url);
    this.setState({ error: null });
  };

  render() {
    return (
      <div className="p-36">
        <h1>PowerPoint to PDF Converter</h1>
        <p>Select a PowerPoint file and click Convert to get a PDF file.</p>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleConvert}>Convert</button>
        <button onClick={this.handleDownload}>Download</button>
        {this.state.loading && <p>Loading...</p>}
        {this.state.error && <p>Error: {this.state.error}</p>}
      </div>
    );
  }
}

export default PptFile;
