// FileList.jsx

import React from "react";
import FileCard from "./FileCard";
import { Box } from "@mui/joy";

export default function FileList({ files, setFile, selectedFile }) {
    return (
        <Box sx={{display:"flex", margin:"auto", justifyContent:"flex-start", flexWrap:"wrap"}}>
            {files ? (
                files.map((file, index) => (
                    <FileCard
                        key={index}
                        setName={setFile}
                        fileName={file}
                        isSelected={file === selectedFile}
                    />
                ))
            ) : (
                <div>You don't have any files</div>
            )}
        </Box>
    );
}
