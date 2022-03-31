import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { loadOBJModel  } from '../config/objloader'
import Spinner from '../components/Spinner'

const Model = () => {

  const [mobile, setMobile] = useState(false)

  const initialCamX = 8
  const initialCamY = 8
  const initialCamZ = 10

  const refBody = useRef(null)
  const [loading, setLoading] = useState(true)
  
  const [renderer, setRenderer] = useState()
  const [scene] = useState(new THREE.Scene())
  const [camera, setCamera] = useState()
  const [target] = useState(new THREE.Vector3(0, 0, 0))
  const [initialCamPosition, setInitialCamPosition] = useState(new THREE.Vector3(initialCamX, initialCamY, initialCamZ))

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth < 600) {
      setMobile(true)
    } else {
      setMobile(false)
    }
    const { current: container } = refBody
    if (container && renderer) {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
  }, [renderer])

  const handleMouseMove = useCallback(event => {
    const { current: container } = refBody
    if (container && camera && !mobile) {
      let halfW = container.clientWidth / 2
      let halfH = container.clientHeight / 2
      let mX = (event.clientX - halfW) / 2
      let mY = (event.clientY - halfH) / 2
      camera.position.x += ((mX * 0.005 - camera.position.x) + initialCamX)
      camera.position.y += ((mY * 0.005 - camera.position.y) + initialCamY)
    }
  }, [camera])


  useEffect(() => {
    const { current: container } = refBody
    if (container && !renderer) {
      const sceneW = container.clientWidth
      const sceneH = container.clientHeight

      // ---------- TEXTURE ----------
      const path = 'textures/'
      const format = '.jpg'
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ]

      const reflectionCube = new THREE.CubeTextureLoader().load(urls)
      // scene.background = reflectionCube

      const refractionCube = new THREE.CubeTextureLoader().load(urls)
      refractionCube.mapping = THREE.CubeRefractionMapping

      // ---------- RENDERER ----------
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(sceneW, sceneH)
      // renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      // ---------- CAMERA ----------
      // const scale = scH * 0.08 + 4
      // const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale / 2, 0.01, 50000)
      const camera = new THREE.PerspectiveCamera(45, sceneW / sceneH, 1, 2000)

      // camera.position.set(10, 2, 4)
      // camera.position.z = 4
      // !!! IMPORTANT !!!
      camera.position.copy(initialCamPosition)

      camera.aspect = sceneW / sceneH
      camera.updateProjectionMatrix()
      setCamera(camera)

      // ---------- LIGHTING ----------
      const ambientLight = new THREE.AmbientLight(0xffffff)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 2)
      scene.add(pointLight)

      // camera.add(pointLight)
      scene.add(camera)

      // ---------- MATERIALS ----------
      // const cubeMaterial = new THREE.MeshPhongMaterial({
      //   color: 0xffffff,
      //   envMap: refractionCube,
      //   refractionRatio: 0.9,
      //   reflectivity: 0.6
      // })
			// const cubeMaterial = new THREE.MeshLambertMaterial({
      //   color: 0xffffff,
      //   envMap: refractionCube,
      //   refractionRatio: 0.95
      // })
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        envMap: reflectionCube,
        combine: THREE.MixOperation,
        reflectivity: 0.95
      })
			// const cubeMaterial = new THREE.MeshLambertMaterial({
      //   color: 0x0000ff,
      //   envMap: reflectionCube
      // })

      // ---------- LOAD MODEL ----------
      loadOBJModel(scene, '/models/glass.obj', cubeMaterial, {
        receiveShadow: true,
        castShadow: true,
      }).then(() => {
        animate()
        setLoading(false)
      })

      // ---------- ANIMATE ----------
      let req
      const animate = () => {
        // const timer = Date.now() * 0.0005;
        // camera.position.set(Math.cos( timer ) * 3, 1, Math.sin( timer ) * 3)
        // camera.position.set(Math.cos( timer ) * -3, 1, mY * .05)
        req = requestAnimationFrame(animate)

        // --- ONLY WORKS HERE ---
        camera.lookAt(target)
        // camera.lookAt(scene.position)

        renderer.render(scene, camera)        
      }

      console.log('renderer mounted')

      return () => {
        console.log('renderer unmount')
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])


  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobile(true)
    }
    window.addEventListener('resize', handleWindowResize)
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [renderer, handleWindowResize, handleMouseMove])


  return (
    <div style={{ position: 'absolute', width: 'calc(100vw - 20px)', height: '100vh' }}>
      <div ref={refBody} style={{ position: 'absolute', height: '100%', width: '100%', background: 'transparent' }}>
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default Model