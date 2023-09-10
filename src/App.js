import React, { Component } from 'react';
import './App.css';
import FoodList from './FoodList';
import jsonData from './foods.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calorieLimit: '',
      recommendedFoods: [],
      selectedFoods: [],
    };
  }

  componentDidMount() {
    this.setState({ recommendedFoods: jsonData.recommendedFoods });
  }

  handleCalorieLimitChange = (e) => {
    this.setState({ calorieLimit: e.target.value });
  };

  handleRecommendationClick = () => {
    const { calorieLimit } = this.state;
    if (calorieLimit !== '') {
      const recommendedFoods = this.generateRecommendedFoods(calorieLimit);
      this.setState({ recommendedFoods });
    }
  };

  generateRecommendedFoods = (calorieLimit) => {
    const foods = jsonData.recommendedFoods;
    return foods.filter((food) => food.calories <= calorieLimit);
  };

  handleFoodSelect = (food) => {
    this.setState((prevState) => ({
      selectedFoods: [...prevState.selectedFoods, food],
    }));
  };

  handleFoodDelete = (foodToDelete) => {
    this.setState((prevState) => ({
      selectedFoods: prevState.selectedFoods.filter(
        (food) => food !== foodToDelete
      ),
    }));
  };

  render() {
    const { calorieLimit, recommendedFoods, selectedFoods } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Calorie-based Food Recommendation</h1>
        </header>
        <section className="search-section">
          <div className="search-container">
            <label htmlFor="calorieLimit">Enter Calorie Limit:</label>
            <input
              type="number"
              id="calorieLimit"
              value={calorieLimit}
              onChange={this.handleCalorieLimitChange}
              placeholder="e.g., 500"
            />
            <button onClick={this.handleRecommendationClick}>Recommend</button>
          </div>
        </section>
        <section className="food-list-section">
          <FoodList
            recommendedFoods={recommendedFoods}
            selectedFoods={selectedFoods}
            onFoodSelect={this.handleFoodSelect}
            onFoodDelete={this.handleFoodDelete}
          />
        </section>
      </div>
    );
  }
}

export default App;
