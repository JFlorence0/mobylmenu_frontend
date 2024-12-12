import React, { useMemo } from 'react';

const Image = ({ src, alt, className, ...props }) => {
    // Memoize the image element
    const memoizedImage = useMemo(
        () => (
            <img
                src={src}
                alt={alt}
                className={className}
                {...props}
            />
        ),
        [src, alt, className]
    );

    return memoizedImage;
};

export default Image;