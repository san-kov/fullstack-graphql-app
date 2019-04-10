import React from 'react'
import { SeriesData_getAllSeries } from '../../generated/SeriesData'
import { Link } from 'react-router-dom'
import { TiStar } from 'react-icons/ti'
interface ISeriesProps {
  series: SeriesData_getAllSeries
  item?: boolean
}

const Series: React.SFC<ISeriesProps> = ({ series, item = false }) => {
  return (
    <div key={series.id} className="series">
      <div className="info">
        <div className="p">
          {series.title}
          <div>
            <TiStar color="yellow" />
            {series.rating}
          </div>
        </div>
        {!item && <p className="desc">{series.description}</p>}
      </div>
      {!item && (
        <div className="controls">
          <button>
            <Link to={`/series/${series.id}`}>more</Link>
          </button>
        </div>
      )}
      <img src={series.imageURL} />
    </div>
  )
}

export default Series
