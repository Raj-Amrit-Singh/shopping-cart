import React from 'react';
import '../style/myStyle.css'

class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="fakeclass">
        <h1>Just for testing whether css is working</h1>
        <p>Don't judge the styling</p>
      </div>
    )
  }
}

export default HomePage;