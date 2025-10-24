'use client'

export default function BWTest() {
  const bwImages = [
    "/assets/lid/states/BW/BW01_A.png",
    "/assets/lid/states/BW/BW01_B.png", 
    "/assets/lid/states/BW/BW01_C.png",
    "/assets/lid/states/BW/BW01_D.png"
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">BW Image Test</h1>
      <div className="grid grid-cols-2 gap-4">
        {bwImages.map((src, index) => (
          <div key={index} className="border p-4">
            <h3 className="font-semibold mb-2">BW Image {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">Path: {src}</p>
            <p className="text-sm text-gray-600 mb-2">Full URL: {typeof window !== 'undefined' ? window.location.origin + src : src}</p>
            <img 
              src={src} 
              alt={`BW test image ${index + 1}`}
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
