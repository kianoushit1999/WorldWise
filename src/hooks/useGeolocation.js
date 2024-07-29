import { useState } from "react"

export function useGeolocation(defaultPosition = null) {

    const [isLoading, setIsLoading] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const [err, setErr] = useState(null)

    function getPosition() {
        if(!navigator.geolocation) return setErr("Your browser doesn't support geolocation.")
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log(pos.coords.latitude, pos.coords.longitude)
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
                setIsLoading(false);
            },
            (error) => {
                setErr(error.message);
                setIsLoading(false);
            }
        );
    }

    return {isLoading, position, err, getPosition}
}

