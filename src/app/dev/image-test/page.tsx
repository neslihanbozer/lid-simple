'use client'

export default function ImageTest() {
  const testImages = [
    "/assets/lid/states/BE/BE01_A.png",
    "/assets/lid/states/BE/BE01_B.png", 
    "/assets/lid/states/BE/BE01_C.png",
    "/assets/lid/states/BE/BE01_D.png"
  ]

  const absoluteImages = [
    "http://localhost:3000/assets/lid/states/BE/BE01_A.png",
    "http://localhost:3000/assets/lid/states/BE/BE01_B.png",
    "http://localhost:3000/assets/lid/states/BE/BE01_C.png", 
    "http://localhost:3000/assets/lid/states/BE/BE01_D.png"
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Image Test</h1>
      
      <h2 className="text-xl font-semibold mb-4">Relative Paths</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {testImages.map((src, index) => (
          <div key={index} className="border p-4">
            <h3 className="font-semibold mb-2">Image {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">Path: {src}</p>
            <img 
              src={src} 
              alt={`Test image ${index + 1}`}
              className="w-full h-32 object-contain border"
              onError={(e) => {
                console.error('Failed to load:', src)
                e.currentTarget.style.border = '2px solid red'
              }}
              onLoad={() => {
                console.log('Loaded successfully:', src)
              }}
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Absolute URLs</h2>
      <div className="grid grid-cols-2 gap-4">
        {absoluteImages.map((src, index) => (
          <div key={index} className="border p-4">
            <h3 className="font-semibold mb-2">Image {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">Path: {src}</p>
            <img 
              src={src} 
              alt={`Test image ${index + 1}`}
              className="w-full h-32 object-contain border"
              onError={(e) => {
                console.error('Failed to load:', src)
                e.currentTarget.style.border = '2px solid red'
              }}
              onLoad={() => {
                console.log('Loaded successfully:', src)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
