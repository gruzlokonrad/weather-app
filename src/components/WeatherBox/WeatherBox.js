import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../../components/ErrorBox/ErrorBox'

const WeatherBox = (props) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)

  const handleCityChange = useCallback(city => {
    setPending(true)
    setWeatherData(null)
    setError(false)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=069ea07d4fe9160179beeb9325549fd4&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json().then(data => {
            // console.log(data);
            setWeatherData({
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            })
            setPending(false);
          })
        } else {
          setPending(false);
          setError(true)
        }
      })

  }, [])

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && <WeatherSummary {...weatherData} />}
      {error && <ErrorBox />}
      {pending && <Loader />}
    </section>
  )
};

export default WeatherBox;