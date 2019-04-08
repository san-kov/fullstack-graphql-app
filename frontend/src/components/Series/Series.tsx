import React from 'react'
import { SeriesData_getAllSeries } from '../../generated/SeriesData'
import { Link } from 'react-router-dom'

interface ISeriesProps {
  series: SeriesData_getAllSeries
}

const Series: React.SFC<ISeriesProps> = ({ series }) => {
  return (
    <div key={series.id} className="series">
      <div className="info">
        <p>{series.title}</p>
        <p className="desc">{series.description}</p>
      </div>
      <div className="controls">
        <button>
          <Link to={`/series/${series.id}`}>more</Link>
        </button>
      </div>
      <img src={series.imageURL} />
    </div>
  )
}

export default Series
