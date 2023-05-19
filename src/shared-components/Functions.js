export const authFetch = async (url, options, setSnackbar) => {

    const response = await fetch(url, options);

    if (!response.ok) {
        setSnackbar({
            open: true,
            severity: 'error',
            message: 'Something went wrong'
        });
    }

    if (response.status === 401) {
        setSnackbar({
            open: true,
            severity: 'error',
            message: 'Please login, token expired'
        });
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
    }

    return response;
};

export const formatDate = (date) => {
    const optionsDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
        hour12: false
    };

    let formattedDate = new Date(date).toLocaleDateString(undefined, optionsDate);
    let formattedTime = new Date(date).toLocaleTimeString(undefined, optionsTime);

    if (formattedTime === "24:00") {
        formattedTime = "00:00";
    }

    return `${formattedDate}, ${formattedTime}`;
};
