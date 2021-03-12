import { useState } from 'react';

const UseModal = () => {
    const [isVisible, setIsVisible] = useState(true);

    function toggleModal() {
        setIsVisible(!isVisible);
    }

    return {
        isVisible,
        toggleModal,
    }
};

export default UseModal;