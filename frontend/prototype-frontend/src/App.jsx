import React from 'react';
import RobotDetails from './RobotDetails';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const App = () => {
  const robotName = 'IRB1300'; // or get this dynamically based on user input or route parameters

  return (
    <div>
      <RobotDetails robotName={robotName} />
    </div>
  );
};

export default App;
