import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const lng = searchParams.get('lng')
    const lat = searchParams.get('lat')

    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            POSITION = {lng}, {lat}

            <button onClick={() => {
                setSearchParams({lat:21, lng:23})
            }}> change my LOC</button>
        </div>
    )
}

export default Map
