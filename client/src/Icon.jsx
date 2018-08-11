import React from 'react';

export const Icon = props => {
  let iconString = props.src ? props.src : ''
  iconString = iconString.replace(/<\?xml.*?\?>/g, '')
  iconString = iconString.replace(/<!-- .* -->/g, '')
  iconString = iconString.replace(/\r?\n|\r/g, '')
  const svgString = props.src ? iconString : '<svg background="black"></svg>'
  const dataURI = `url(data:image/svg+xml;base64,${btoa(svgString)})`

  return (
    <div className="icon" style={{ background: dataURI, width: +props.size, height: +props.size, margin: 'auto' }}></div>
  )
}