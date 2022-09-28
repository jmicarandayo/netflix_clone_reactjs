import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'

const Home = () => {
  return (
    <div>
        <Main/>
        <Row title='Upcoming' url={requests.requestUpcoming}/>
        <Row title='Popular' url={requests.requestPopular}/>
        <Row title='Trending' url={requests.requestTrending}/>
        <Row title='Top Rated' url={requests.requestTopRated}/>
        <Row title='Horror' url={requests.requestHorror}/>
    </div>
  )
}

export default Home