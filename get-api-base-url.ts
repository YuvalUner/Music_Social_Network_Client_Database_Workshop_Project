import {useEffect, useState} from "react";

function useApiBaseUrl(): string {
    const [apiBaseUrl, setApiBaseUrl] = useState('');

    useEffect(() => {
        // Load the configuration file
        fetch('/config.json')
            .then((response) => response.json())
            .then((data) => {
                // Set the API base URL from the config file
                setApiBaseUrl(data.apiBaseUrl);
            });
    }, []);

    return apiBaseUrl;
}