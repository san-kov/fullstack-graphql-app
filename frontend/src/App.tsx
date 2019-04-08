import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { SeriesData } from './generated/SeriesData'
import { getSeries } from './graphql/seriesQuery'
import Header from './components/Header'

class GetSeries extends Query<SeriesData> {}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <GetSeries query={getSeries}>
          {({ data, error, loading }) => {
            if (loading || error || !data) return null
            console.log(data)
            return (
              <div className="series-list">
                {data.getAllSeries!.map(series => (
                  <div key={series.id} className="series">
                    <div className="info">
                      <p>{series.title}</p>
                      <p className="desc">{series.description}</p>
                    </div>
                    <div className="controls">
                      <button>more</button>
                    </div>
                    <img src={series.imageURL} />
                  </div>
                ))}
              </div>
            )
          }}
        </GetSeries>
      </div>
    )
  }
}

export default App
