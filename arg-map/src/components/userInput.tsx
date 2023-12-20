import React from 'react';

export type UserInputProps = {
  onOk: (props: { latitude: number; longitude: number }) => Promise<void>;
};

const UserInput: React.FC<UserInputProps> = ({ onOk }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const latitude = e.currentTarget.latitude.value;
    const longitude = e.currentTarget.longitude.value;

    if (!latitude || !longitude) return;
    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) return;
    return onOk({ latitude: Number(latitude), longitude: Number(longitude) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Search vehicles around you</h3>
      <label>Longitude:</label>
      <input name='longitude' />

      <label>Latitude:</label>
      <input name='latitude' />

      <button type='submit'>Search Around</button>
    </form>
  );
};

export default UserInput;
