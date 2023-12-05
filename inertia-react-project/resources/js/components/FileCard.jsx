// FileCard.jsx

import React from 'react';
import styles from "./style.module.css";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box } from '@mui/joy';

export default function FileCard({ fileName, setName, isSelected }) {
    const setNameHandle = () => {
        setName(fileName);
    };

    return (
        <Box className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={setNameHandle}>
            <Box className={styles.cardIcon}>
                <TextSnippetIcon sx={{ height: "100px", width: "100px", color: "#fff" }} />
            </Box>
            {fileName}
        </Box>
    );
}
