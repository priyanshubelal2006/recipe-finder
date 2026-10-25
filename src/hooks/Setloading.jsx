import React, { useState } from 'react'

function SetLoading() {
    const [loading, setLoading] = useState(true);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    return {
        loading,
        startLoading,
        stopLoading,
    };
}
export default SetLoading