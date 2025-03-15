import React from 'react'

function VideoTitle({title, overview}) {
  return (
    <div className='pt-28'>
      <h1>{title}</h1>
      <p>{overview}</p>
      <div>
        <button>Play</button>
        <button>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle