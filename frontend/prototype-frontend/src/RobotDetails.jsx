import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import './RobotDetails.css';  // Assuming you will add some global styles here

const RootContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const RobotCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Media = styled(CardMedia)`
  height: 70vh;
  background-size:cover;
`;

const SectionCard = styled(Card)`
  margin-bottom: 20px;
`;

const SectionTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const SectionContent = styled(Typography)`
  margin-bottom: 10px;
  color: #555;
`;

const RobotDetails = ({ robotName }) => {
  const [robotData, setRobotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/robots/name/IRB1300`);
        setRobotData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [robotName]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const renderProperties = (properties) => {
    if (!properties) return null;
    return Object.entries(properties).map(([key, value]) => (
      <SectionContent key={key}>
        <strong>{key}</strong>: {value}
      </SectionContent>
    ));
  };

  const renderSection = (title, data) => (
    <Grid item xs={12} sm={6} md={4}>
      <SectionCard>
        <CardContent>
          <SectionTitle variant="h6" gutterBottom>
            {title}
          </SectionTitle>
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id}>
                <SectionContent variant="subtitle1">
                  <strong>Name</strong>: {item.name}
                </SectionContent>
                <SectionContent variant="body2">
                  <strong>ID</strong>: {item.Id}
                </SectionContent>
                {renderProperties(item.properties)}
                {renderProperties(item.features)}
              </div>
            ))
          ) : (
            <SectionContent variant="body2">
              No data available
            </SectionContent>
          )}
        </CardContent>
      </SectionCard>
    </Grid>
  );

  return (
    <RootContainer>
      <RobotCard>
        <Media
          image="./irb1300.jpg"  // Replace with actual robot image URL
          title={robotData.robotData.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {robotData.robotData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            ID: {robotData.robotData.Id}
          </Typography>
        </CardContent>
      </RobotCard>

      <Grid container spacing={3}>
        {renderSection('Manipulators', robotData.manipulators)}
        {renderSection('Control Modules', robotData.controlModules)}
        {renderSection('Floors', robotData.floors)}
        {renderSection('Basics', robotData.basics)}
        {renderSection('Controllers', robotData.controllers)}
        {renderSection('Additional Options', robotData.additionals)}
        {renderSection('Applications', robotData.applications)}
        {renderSection('Robotwares', robotData.robotwares)}
      </Grid>
    </RootContainer>
  );
};

export default RobotDetails;
