import React from 'react'

const Loader: React.SFC<{}> = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loader
