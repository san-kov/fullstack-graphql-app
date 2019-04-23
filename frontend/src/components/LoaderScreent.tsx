import React from 'react'

const LoaderScreen: React.SFC<{}> = () => {
  return (
    <div className="loader-screen">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default LoaderScreen
