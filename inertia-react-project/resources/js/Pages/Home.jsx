// Home.jsx (React)

import React, { useState, useRef, useEffect } from "react";
import FileList from "../components/FileList";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ButtonGroup, Button, Box } from "@mui/joy";
import axios from "axios";

export default function Home(props) {
    const server = "http://127.0.0.1:8000";
    const [files, setFiles] = useState(props.files || []); // Use initial files from props
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${server}/files`);
            setFiles(response.data.files);
        } catch (error) {
            console.error("Error fetching file list:", error);
        }
    };

    const handleFileSelection = (fileName) => {
        setSelectedFile(fileName);
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected File:", file);

            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios.post(`${server}/file/upload`, formData);

                console.log("File Upload Response:", response.data);

                fetchFiles();
            } catch (error) {
                console.error("File Upload Error:", error);
            }
        }
    };

    const handleFileDownload = async () => {
        if (selectedFile) {
            try {
                const response = await axios.get(`${server}/file/download/${selectedFile}`, {
                    responseType: 'blob',
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', selectedFile);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("File Download Error:", error);
            }
        }
    };

    const handleFileDelete = async () => {
        if (selectedFile) {
            try {
                const response = await axios.delete(`${server}/file/delete/${selectedFile}`);

                console.log("File Delete Response:", response.data);

                fetchFiles();
            } catch (error) {
                console.error("File Delete Error:", error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup size="lg">
                    <Button onClick={handleFileDownload}>
                        <DownloadIcon />
                    </Button>
                    <Button onClick={handleFileDelete}>
                        <DeleteForeverIcon />
                    </Button>
                    <Button onClick={handleFileUpload}>
                        <UploadIcon />
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </ButtonGroup>
            </Box>

            <FileList files={files} setFile={handleFileSelection} selectedFile={selectedFile} />
        </Box>
    );
}
