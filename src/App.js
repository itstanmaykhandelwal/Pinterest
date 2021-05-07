import React, {useState, useEffect} from 'react'
import './App.css';
import unsplash from './api/unsplash';
import Header from './component/Header';
import MainBoard from './component/MainBoard';

function App() {
  const [pins, setNewPins] = useState([])

  const getImages = (term) => {
    return unsplash.get("https://api.unsplash.com/search/photos", {
      params: {
        query:term
      }
    })
  }

  const onSearchSubmit = (term) =>{
    getImages(term).then((res) => {
      let results = res.data.results;

      let newPins = [
        ...results,
        ...pins
      ]

      newPins.sort(function(a,b){
        return 0.5 - Math.random();
      });
      setNewPins(newPins);
    })
  }

  const getNewPins = () => {
    let promises = [];
    let pinData = [];

    let pins = ['ocean','gaming','cars','house','dogs','avengers','India']

    pins.forEach((pinTerm) =>{
      promises.push(
        getImages(pinTerm).then((res) => {
          let results = res.data.results;

          pinData = pinData.concat(results);

          pinData.sort(function (a,b) {
            return 0.8 - Math.random()
          })
        })
      )
    })
    Promise.all(promises).then(() => {
      setNewPins(pinData);
    })
  }

  useEffect(() => {
    getNewPins();
  }, [])


  return (
      <div className="app">
        <Header onSubmit={onSearchSubmit} />
        <MainBoard pins={pins} />
      </div> 
  );
}

export default App;
