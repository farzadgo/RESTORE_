import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { loadOBJModel  } from '../config/objloader'
import Spinner from '../components/Spinner'

const Model = () => {

  const [loading, setLoading] = useState(true)

  const refBody = useRef(null)

  const modelContainerRef = useRef(null)

  useEffect(() => {

    const initialCamX = 8
    const initialCamY = 8
    const initialCamZ = 10

    let animID

    const stopAnim = () => {
      cancelAnimationFrame(animID)
      console.log('animation stopped')
      // renderer.dispose()
    }

    const modelCallBack = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        animate()
      } else {
        stopAnim()
      }
    }

    // IMPORTANT HERE
    const container = refBody.current
    // OR // const { current: container } = refBody
    // IF USED OUTSIDE useEffect ALL NEED TO BE WRAPPED IN THIS
    // if (container && !renderer) {}

    const intersectOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.55
    }

    const observer = new IntersectionObserver(modelCallBack, intersectOptions)
    if (container) observer.observe(container)

    const handleWindowResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    const handleMouseMove = event => {
      let halfW = container.clientWidth / 2
      let halfH = container.clientHeight / 2
      let mX = (event.clientX - halfW) / 2
      let mY = (event.clientY - halfH) / 2
      camera.position.x += ((mX * 0.005 - camera.position.x) + initialCamX)
      camera.position.y += ((mY * 0.005 - camera.position.y) + initialCamY)
    }

    const sceneW = container.clientWidth
    const sceneH = container.clientHeight

    const scene = new THREE.Scene()

    // ------------ TEXTURE ------------
    const path = 'textures/'
    const format = '.jpg'
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]

    // -------- LOADING MANAGER --------
    const manager = new THREE.LoadingManager()
    manager.onLoad = () => {
      console.log("Loading complete!")
    }
    // manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    //   console.log(`Items loaded: ${itemsLoaded}/${itemsTotal} (${url})`)
    // }
    // manager.onError = (url) => console.log('There was an error loading ' + url)

    // ------------ TEXTURES ------------
    const reflectionCube = new THREE.CubeTextureLoader(manager).load(urls)
    // scene.background = reflectionCube

    // const refractionCube = new THREE.CubeTextureLoader(manager).load(urls)
    // refractionCube.mapping = THREE.CubeRefractionMapping

    // ----------- RENDERER -----------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(sceneW, sceneH)
    // renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)

    // ------------ CAMERA ------------
    const initialCamPosition = new THREE.Vector3(initialCamX, initialCamY, initialCamZ)
    const target = new THREE.Vector3(0, 0, 0)

    // const scale = sceneH * 0.08 + 4
    // const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale / 2, 0.01, 50000)
    const camera = new THREE.PerspectiveCamera(45, sceneW / sceneH, 1, 2000)

    // camera.position.set(10, 2, 4)
    // camera.position.z = 4
    // !!! IMPORTANT !!!
    camera.position.copy(initialCamPosition)

    camera.aspect = sceneW / sceneH
    camera.updateProjectionMatrix()

    // ----------- LIGHTING -----------
    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 2)
    scene.add(pointLight)

    scene.add(camera)

    // ----------- MATERIALS -----------
    // const cubeMaterial = new THREE.MeshPhongMaterial({
    //   color: 0xffffff,
    //   envMap: refractionCube,
    //   refractionRatio: 0.9,
    //   reflectivity: 0.6
    // })
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      envMap: reflectionCube,
      // envMap: refractionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.95
    })

    // ---------- LOAD MODEL ----------
    loadOBJModel(scene, '/models/glass.obj', cubeMaterial, {
      receiveShadow: true,
      castShadow: true,
    }).then(() => {
      // animate()
      setLoading(false)
    })

    // ASYNC/AWAIT LOADING HINTS
    /*
    async function loadModel() {
      let response = await fetch('api/data')
      response = await response.json()
      dataSet(response)
    }
    const loader = new GLTFLoader()
    const loadedData = await loader.loadAsync('path/to/yourModel.glb')
    */

    // ------------ ANIMATE ------------
    const animate = () => {
      // const timer = Date.now() * 0.0005
      // camera.position.set(Math.cos(timer) * 3, 1, Math.sin(timer) * 3)
      animID = requestAnimationFrame(animate)

      // ONLY WORKS HERE
      camera.lookAt(target)
      // camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', handleWindowResize)
    document.addEventListener('mousemove', handleMouseMove)
    console.log('renderer mounted')
    
    return () => {

      if (container) observer.unobserve(container)

      cancelAnimationFrame(animID)
      renderer.dispose()

      window.removeEventListener('resize', handleWindowResize)
      document.removeEventListener('mousemove', handleMouseMove)
      console.log('renderer unmount')
    }

  }, [])


  return (
    <div ref={modelContainerRef} style={{position: 'absolute', width: 'calc(100vw - 20px)', height: '100vh'}}>
      <div ref={refBody} style={{position: 'absolute', height: '100%', width: '100%', background: 'transparent'}}>
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default Model