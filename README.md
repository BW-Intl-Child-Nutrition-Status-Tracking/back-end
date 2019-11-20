# API Documentation

_Description placeholder._

## Getting Started

_Description placeholder._

## Endpoints

Below are the various endpoints used to navigate the server. Click on the link, or right-click and copy the link's location, to obtain the URL.

### Base Route

| Method | Endpoint | Access Control | Description                                   | Links     |
| ------ | -------- | -------------- | --------------------------------------------- | --------- |
| GET    | `/`      | all users      | Sanity check; use to see if server is running | [Click Me](https://protected-gorge-38517.herokuapp.com/) |

### Authorization Routes

| Method | Endpoint         | Access Control | Description                                            | Notes                            |  Links     |
| ------ | ---------------- | -------------- | ------------------------------------------------------ | -------------------------------- |
| POST   | `/auth/add-user` | global admin   | Create new user; accessible only by global admins      | Open access for frontend testing | [Click Me](https://protected-gorge-38517.herokuapp.com/auth/add-user) |
| POST   | `/auth/login`    | existing users | Credentials checkpoint; only existing users may access |                                  | [Click Me](https://protected-gorge-38517.herokuapp.com/auth/login) |

### User Routes

| Method | Endpoint   | Access Control | Description               | Links     |
| ------ | ---------- | -------------- | ------------------------- | --------- |
| GET    | `/r/users` | existing users | Returns all current users | [Click Me](https://protected-gorge-38517.herokuapp.com/r/users) |


## Dummy Users

| username   | password | first_name | last_name | email                      |
| ---------- | -------- | ---------- | --------- | -------------------------- |
| testuser1  | password | Paul       | Atreides  | tabr4ever@sietch.com       |
| testuser2  | password | Korbin     | Dallas    | christucker@5thelement.com |
| tester     | password | Firston    | McLasty   | itslasty@futurama.com      |
| garryyyyyy | password | Gary       | Gary      | garrrygary@futurama.com    |

## Data Model

Below are the currently implemented data models.

### users

---

```
{
  id: UUID,
  username: STRING,
  first_name: STRING,
  last_name: STRING,
  email: STRING,
  country_access: STRING(name) foreign key in COUNTRIES table, <- (currently disabled)
}
```

### users_roles

---

```
{
  id: UUID,
  user_id: UUID foreign key in USERS table
  role_id: UUID foreign key in ROLES table
}
```

### roles

---

```{
  id: UUID,
  title: STRING [ 'global_admin', 'local_admin' ],
  is_global: BOOLEAN
}
```

### countries

---

```{
  id: UUID,
  name: STRING
}
```

### communities

---

```{
  id: UUID,
  name: STRING,
  country_id: UUID foreign key found in COUNTRIES table
}
```

### children

---

```{
  id: UUID,
  name: STRING
  gender: STRING,
  dob: DATE,
  weight_kg: DECIMAL,
  height_cm: DECIMAL,
  screening_date: DATE,
  screening_country: STRING(name) foreign key found in COUNTRIES table,
  community_id: UUID foreign key found in COMMUNITIES,
  parent_name: STRING,
  res_country: STRING,
  res_state: STRING,
  res_city: STRING,
  res_address: STRING,
  created_at: TIMESTAMP
}
```
