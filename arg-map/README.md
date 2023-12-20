CHALLENGE

DESCRIPTION

There is a public API with data on bus locations in the City of Buenos Aires (updated every certain period of time). Is required:
Show an interactive map focused on the City of Buenos Aires.
Show the positions of the groups returned by the API. By clicking on the bus you should be able to view the information (bus line, time the message was issued and where it is going).
Support the following filters:
By bus line.
By proximity to a location (it can be assumed that the client enters their latitude and longitude). The distance to the point does not need to be calculated like the distance of trajectories, simply calculating the geographical distance between two points.
Create the frontend in React JS, being able to use any library.

API

In the following link you can enter the email to obtain a token to use the API: Transport API | Buenos Aires City - Government of the Autonomous City of Buenos Aires

Documentation of the available services is attached in the response email. Use the API: /collectives/vehiclePositionsSimple.

RECOMMENDATIONS

After creating an account and making some test queries to the API, investigate how to develop a map in react (this is understood to be the biggest challenge). Any library can be used for these purposes.

Queries can be made without any inconvenience, even if you cannot find a way to graph the interactive map.
