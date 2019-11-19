# API Documentation

_Description placeholder._

## Getting Started

_Description placeholder._

## Endpoints

_Description placeholder._

### Base Routes

| Method | Endpoint | Access Control | Description                                   |
| ------ | -------- | -------------- | --------------------------------------------- |
| GET    | `/`      | all users      | Sanity check; use to see if server is running |

### Authorization Route

| Method | Endpoint | Access Control | Description                                              |
| ------ | -------- | -------------- | -------------------------------------------------------- |
| POST   | `/login` | existing users | Authorization checkpoint; only existing users may access |

### User Routes

| Method | Endpoint     | Access Control | Description                                 |
| ------ | ------------ | -------------- | ------------------------------------------- |
| GET    | `/users`     | existing users | Returns all current users                   |
| GET    | `/users/:id` | existing users | Returns a user associated with requested ID |

### Country Routes

| Method | Endpoint         | Access Control                | Description                                    |
| ------ | ---------------- | ----------------------------- | ---------------------------------------------- |
| GET    | `/countries`     | global admins                 | Returns all countries in database              |
| GET    | `/countries/:id` | assigned users, global admins | Returns a country associated with requested ID |
| POST   | `/countries/add` | global admins                 | Creates a new country for the database         |

The routes below are preceded by `countries/:id`. From this point forward, those who are local administrators are assigned a country and over which they hold limited privileges. Global administrators are not restricted.

| Method | Endpoint           | Access Control              | Description                                        |
| ------ | ------------------ | --------------------------- | -------------------------------------------------- |
| GET    | `/communities`     | local admins, global admins | Returns all communities associated with country ID |
| GET    | `/communities/:id` | local admins, global admins | Returns a community associated with requested ID   |
| POST   | `/communities/add` | local admins, global admins | Creates a new community for the database           |

The routes below are preceded by `countries/:id/communities/:id`.

| Method | Endpoint         | Access Control                     | Description                                                         |
| ------ | ---------------- | ---------------------------------- | ------------------------------------------------------------------- |
| GET    | `/children`      | local admins, global admins        | Returns all children associated with requested community ID         |
| GET    | `/children/:id`  | local admins, global admins        | Returns a child associated with requested ID                        |
| POST   | `/children/add`  | local admins, global admins        | Creates a new child profile for the database                        |
| PUT    | `/children/edit` | local admins, global admins        | Allows administrators to edit a child's profile                     |
| DELETE | `/children/edit/remove` | local admins, global admins | Allows administrators to remove a child's profile from the database |

### Generic Logins for Testing

| Login | Password |
| ----- | -------- |
| N/a   | N/a      |

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
  country_access: STRING(name) foreign key in COUNTRIES table,
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

```
{
  id: UUID,
  title: STRING [ 'global_admin', 'local_admin' ],
  is_global: BOOLEAN
}
```

### countries

---

```
{
  id: UUID,
  name: STRING
}
```

### communities

---

```
{
  id: UUID,
  name: STRING,
  country_id: UUID foreign key found in COUNTRIES table
}
```

### children

---

```
{
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
