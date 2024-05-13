import { useEffect, useState, useRef, useCallback } from 'react'
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

  const {width} = useWindowSize();
  const [smallScreen, setSmallScreen] = useState(false)

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

  // const onMapLoad = event => { }
  const onMapLoad = useCallback(() => {
    // mapRef.current.on('move', () => {
    //   // do something
    // })
    setMapDisplay(1.0)
    setLoading(false)
  }, [])


  const onPopLoad = event => {
    const popTip = event.target._container.children[0]
    if (smallScreen) {
      popTip.style.display = 'none'
    }
    const popContainer = event.target._content
    popContainer.addEventListener('click', handlePopupClick);
    popContainer.style.borderRadius = 0
    popContainer.style.padding = '3px'
    popContainer.style.cursor = 'pointer'
    popContainer.children[0].children[0].style.display = 'flex'
  }

  // const popImageStyle = {
  //   width: smallScreen ? '290px' : '390px',
  //   height: smallScreen ? '290px' : '390px'
  // }
  const popImage = {
    width: smallScreen ? 290 : 390,
    height: smallScreen ? 290 : 390
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
  // const markerBtnImgStyle = {
  //   width: '48px',
  //   height: '48px',
  //   // background: 'blue',
  //   // padding: '10px'
  // }

  const handlePopupClick = () => {
    setSelectedDocu(selectedShop.ID)
  }

  const handleCloseSelected = (e) => {
    if (e.key === "Escape") {
      setSelectedShop(null)
    }
  }


  useEffect(() => {
    window.addEventListener('keydown', handleCloseSelected)

    if (width > 1900) {
      setViewport({...viewport, zoom: 13.5})
    } else if (width < 1899 && width > 1500) {
      setViewport({...viewport, zoom: 13})
    } else if (width < 1499 && width > 900) {
      setViewport({...viewport, zoom: 12.5})
    } else if (width < 899 && width > 570) {
      setViewport({...viewport, zoom: 12})
    } else if (width < 569) {
      setViewport({...viewport, zoom: 11.7})
      setSmallScreen(true)
    }

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
        // mapStyle="mapbox://styles/mapbox/dark-v10"
        mapStyle="mapbox://styles/farzadgo/cl9y8dasd001q15p5wce2cjsu"
        // initialViewState={{
        //   latitude: 53.108,
        //   longitude: 8.775,
        //   scrollZoom: false,
        //   dragPan: false,
        //   zoom: 13.5
        // }}
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
                setSelectedShop(shop)
              }}
            >
              <Image src='/pin-64-white.svg' alt='Icon' width={48} height={48}/>
            </button>
          </Marker>
        ))}
  
        {selectedShop ? (
          <Popup
            latitude={selectedShop.COORDINATES[0]}
            longitude={smallScreen ? 8.745 : selectedShop.COORDINATES[1]}
            closeButton={false}
            onOpen={onPopLoad}
            onClose={() => {
              setSelectedShop(null);
            }}
            maxWidth="400px" /* important */
          >
            <Image
              src={`/cover-${selectedShop.ID}.png`}
              alt={`${selectedShop.AREA} Cover`}
              unoptimized
              width={popImage.width}
              height={popImage.height}
              // width={400}
              // height={400}
              // style={popImageStyle}
            />
          </Popup>
        ) : null}
  
      </Map>
    </>
  )
}
    
export default Mapbox