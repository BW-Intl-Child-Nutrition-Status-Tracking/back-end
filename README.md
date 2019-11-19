# API Documentation

_Description placeholder._

## Getting Started

_Description placeholder._

## Endpoints

_Description placeholder._

### Base Route

| Method | Endpoint | Access Control | Description                                   |
| ------ | -------- | -------------- | --------------------------------------------- |
| GET    | `/`      | all users      | Sanity check; use to see if server is running |

### Authorization Routes

| Method | Endpoint         | Access Control | Description                                            | Notes                            |
| ------ | ---------------- | -------------- | ------------------------------------------------------ | -------------------------------- |
| POST   | `/auth/add-user` | global admin   | Create new user; accessible only by global admins      | Open access for frontend testing |
| POST   | `/auth/login`    | existing users | Credentials checkpoint; only existing users may access |                                  |

### User Routes

| Method | Endpoint   | Access Control | Description               |
| ------ | ---------- | -------------- | ------------------------- |
| GET    | `/r/users` | existing users | Returns all current users |

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
