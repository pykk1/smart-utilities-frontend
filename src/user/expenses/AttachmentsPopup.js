import React, {useEffect, useState} from 'react';
import '../style/AttachmentsPopup.css';
import {authFetch} from "../../shared-components/Functions";
import CustomSnackbar from "../../shared-components/CustomSnackbar";

const AttachmentsPopup = ({attachments, expenseId, onClose}) => {
    const token = sessionStorage.getItem('token');

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: '',
        message: ''
    });

    const handleDownload = async (attachmentId, attachmentFileName) => {
        try {
            const response = await authFetch(`{API_BASE_URL}/api/expense/attachment/${expenseId}/${attachmentId}`, {
                headers: {
                    responseType: 'blob',
                    'Authorization': `Bearer ${token}`
                }
            }, setSnackbar);

            if (response.ok) {
                const data = await response.blob();
                const url = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', attachmentFileName);
                document.body.appendChild(link);
                link.click();
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error downloading file'
            });
        }
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("attachments-popup")) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>
            {snackbar.open &&
                <CustomSnackbar
                    open={snackbar.open}
                    severity={snackbar.severity}
                    message={snackbar.message}
                    onClose={() => setSnackbar({open: false, severity: '', message: ''})}
                />
            }
            <div className="attachments-popup">
                <div className="attachments-popup-content">
                    <h2>Attachments</h2>
                    <div className="attachments-details">
                        {attachments.map((attachment, index) => (
                            <div key={index}>
                                <label>File:</label>
                                <span>{attachment.fileName}</span>
                                <button onClick={() => handleDownload(attachment.id, attachment.fileName)}>
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </>
    );


};

export default AttachmentsPopup;