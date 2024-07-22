import React from 'react';

function FileUploader({ label, onFileRead }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            onFileRead(data);
        };
        reader.readAsText(file);
    };

    return (
        <div className="file-input-container">
            <label>{label}</label>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default FileUploader;
