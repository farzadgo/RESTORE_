import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export function loadOBJModel(
  scene,
  objPath,
  material,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new OBJLoader()
    loader.load(
      objPath,
      object => {
        const obj = object.children[0]
        // obj.name = 'dog'
        obj.position.x = 0
        obj.position.y = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        obj.material = material
        scene.add(obj)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}