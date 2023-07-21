
# Project Title

Design an endpoint that will allow users to send an unordered Flight Itinerary array. The endpoint should order the itinerary and return the result to the user.



## Authors

- [TonyDo99](https://github.com/TonyDo99)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_HOST`

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_DATABASE`
## API Reference

#### Get item

```http
  POST /api/booking-flight
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `flights`      | `array` | **Required**. unorder flight itinerary  |

## API Reference

#### Save flight

```http
  POST /api/booking-flight
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `flights`      | `array` | **Required**. unorder flight itinerary  |


#### Example input
``` bash
flights: [
           {
               from: 'EZE',
               to: 'MIA'
           },
           {
               from: 'MIA',
               to: 'SFO'
           },
           {
               from: 'SFO',
               to: 'GRU'
           },
           {
               from: 'GRU',
               to: 'SCL'
           }
        ]	
```