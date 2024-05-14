import { useEffect, useState, useRef, useCallback, memo } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useWindowSize from '../hooks/useWindowSize'
import Spinner from '../components/Spinner'
import Image from 'next/image'

// // NEXT and SWR
// // INSTEAD OF USING THIS:
// import * as locationData from '../content/locations-data.json'
// // USE THIS TO LOAD [json] DATA FROM A FILE:
// import useSWR from 'swr'
// const fetcher = (url) => fetch(url).then((res) => res.json())\
// // AND IN THE COMPONENT BODY:
// const { data } = useSWR(mounted ? '/api/staticdata' : null, fetcher)
// // AND IN THE /api DIRECTORY AT staticdata.js:
// import path from 'path';
// import { promises as fs } from 'fs';
// export default async function handler(req, res) {
//   const jsonDirectory = path.join(process.cwd(), 'content'); /* this is the absolute path */
//   const fileContents = await fs.readFile(jsonDirectory + '/locations-data.json', 'utf8');
//   res.status(200).json(fileContents);
//   console.log(fileContents);
// }


// // WEBMERCATORVIEWPORT:
// import WebMercatorViewport from '@math.gl/web-mercator'
// const applyToArray = (func, array) => func.apply(Math, array)
// const getBoundsForPoints = (points) => {
//   // Calculate corner values of bounds
//   const pointsLat = points.map(point => point.geometry.coordinates[0])
//   const pointsLong = points.map(point => point.geometry.coordinates[1])
//   const cornersLongLat = [
//     [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
//     [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
//   ]
//   // Use WebMercatorViewport to get center longitude/latitude and zoom
//   const viewport = new WebMercatorViewport({ width: 800, height: 600 })
//     .fitBounds(cornersLongLat, { padding: 200 }) // Can also use option: offset: [0, -100]
//   const { longitude, latitude, zoom } = viewport
//   return { longitude, latitude, zoom }
// }
// // CALL THIS IN THE COMPONENT BODY:
// const bounds = getBoundsForPoints(mapData)
// // AND IN THE [viewport] useState ADD THIS INSIDE THE OBJECT:
// const [viewport, setViewport] = useState ({
//   // zoom etc.
//   ...bounds
// })



const Mapbox = ({mapData, setSelectedDocu}) => {

  const mapRef = useRef()
  const popupRef = useRef()

  const mobileThreshold = 569
  const {width} = useWindowSize()

  const [mapDisplay, setMapDisplay] = useState(0)
  const [loading, setLoading] = useState(true)

  const [selectedShop, setSelectedShop] = useState(null)
  
  const [viewport, setViewport] = useState ({
    // width: '100vw',
    // height: '100vh',
    latitude: 53.108,
    longitude: 8.777,
    scrollZoom: false,
    dragPan: false,
    zoom: 13.5,
  })

  // const onMapLoad = (event) => {
  //   // mapRef.current.on('move', () => {
  //   //   // do something
  //   // })
  //   setLoading(false)
  // }

  const onMapLoad = useCallback(() => {
    setMapDisplay(1.0)
    setLoading(false)
  }, [])

  const popImage = {
    width: width < mobileThreshold ? 290 : 420,
    height: width < mobileThreshold ? 290 : 420
  }

  const mapContainerStyle = {
    position: 'relative',
    textAligh: 'center',
    height: '100vh',
    width: '100vw',
    cursor: 'default',
    opacity: mapDisplay,
    transition: 'opacity 0.5s'
  }

  const markerBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transform: 'translate(-50%, 10%)'
  }


  useEffect(() => {

    const handlePopupClick = () => {
      setSelectedDocu(selectedShop.ID)
    }

    if (popupRef.current) {
      let popBody = popupRef.current._content;
      popBody.addEventListener('click', handlePopupClick);
      popBody.style.borderRadius = 0
      popBody.style.padding = '3px'
      popBody.style.cursor = 'pointer'
      popBody.children[0].children[0].style.display = 'flex'

      let popTipStyle = popupRef.current._tip.style;
      width < mobileThreshold ? popTipStyle.display = 'none' : popTipStyle.display = 'block'
    }

    return () => {
      if (popupRef.current) {
        let popup = popupRef.current._content;
        if (popup) popup.removeEventListener('click', handlePopupClick)
      }
    }
  }, [popupRef.current, selectedShop, width])


  useEffect(() => {

    const handleCloseSelected = (e) => {
      if (e.key === "Escape") setSelectedShop(null)
    }

    if (width > 1900) {
      setViewport({...viewport, zoom: 13.5})
    } else if (width < 1899 && width > 1500) {
      setViewport({...viewport, zoom: 13})
    } else if (width < 1499 && width > 900) {
      setViewport({...viewport, zoom: 12.5})
    } else if (width < 899 && width > 570) {
      setViewport({...viewport, zoom: 12})
    } else {
      setViewport({...viewport, zoom: 11.7})
    }

    window.addEventListener('keydown', handleCloseSelected)
    return () => {
      window.removeEventListener('keydown', handleCloseSelected)
    }
  }, [width])

  
  return (
    <>
      {loading && <Spinner />}

      <Map
        ref={mapRef}
        {...viewport}
        style={mapContainerStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/farzadgo/cl9y8dasd001q15p5wce2cjsu"
        // initialViewState={}
        onViewportChange={setViewport}
        onLoad={onMapLoad}
      >

        {mapData && mapData.map(shop => (
          <Marker 
            key={shop.ID}
            latitude={shop.COORDINATES[0]}
            longitude={shop.COORDINATES[1]}
            offset={[30, -30]}
          >
            <button
              style={markerBtnStyle}
              onClick={(e) => {
                e.preventDefault()
                // setSelectedShop(shop)
                shop.ID === selectedShop?.ID ? setSelectedShop(null) : setSelectedShop(shop)
              }}
            >
              <Image src='/pin-64-white.svg' alt='Icon' width={48} height={48}/>
            </button>
          </Marker>
        ))}
  
        {selectedShop && (
          <Popup
            ref={popupRef}
            latitude={selectedShop.COORDINATES[0]}
            longitude={width < mobileThreshold ? 8.777 : selectedShop.COORDINATES[1]}
            closeButton={false}
            closeOnClick={false}
            // onOpen={} /* previously used for styling and add event listeners */
            onClose={() => {
              setSelectedShop(null);
            }}
            maxWidth="500px" /* important */
            anchor={selectedShop.ID === 'groepelingen' ? 'top' : 'bottom'}
            offset={selectedShop.ID === 'groepelingen' ? [0, 0] : [0, -55]}
          >
            <Image
              src={`/cover-${selectedShop.ID}.png`}
              alt={`${selectedShop.AREA} Cover`}
              // unoptimized
              width={popImage.width}
              height={popImage.height}
            />
          </Popup>
        )}
  
      </Map>
    </>
  )
}
    
export default memo(Mapbox)