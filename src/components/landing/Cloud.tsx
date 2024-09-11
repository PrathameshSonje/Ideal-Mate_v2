export const Cloud = () => {
    return (
        <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
                </filter>
            </defs>

            <circle cx="150" cy="180" r="120" fill="orange" filter="url(#blur)" opacity="0.25" />
            <circle cx="220" cy="130" r="115" fill="orange" filter="url(#blur)" opacity="0.16" />
            <circle cx="120" cy="220" r="105" fill="orange" filter="url(#blur)" opacity="0.14" />
            <circle cx="240" cy="210" r="130" fill="orange" filter="url(#blur)" opacity="0.18" />
            <circle cx="180" cy="260" r="115" fill="orange" filter="url(#blur)" opacity="0.2" />
        </svg>
    )
}