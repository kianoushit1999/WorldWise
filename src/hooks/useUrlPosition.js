import { useSearchParams } from "react-router-dom"

function useUrlPosition() {
    const [latlng] = useSearchParams()
    const lat = latlng.get('lat')
    const lng = latlng.get('lng')

    return [lat, lng]
}

export default useUrlPosition
