# Coral Companion API Documentation

> Version 1.0.0

Documentation for the API used in the Coral Companion app

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/characters](#getcharacters) | Get all characters |
| POST | [/characters](#postcharacters) | Create a new character |
| GET | [/characters/season/{season_id}](#getcharactersseasonseason_id) | Get all characters by season |
| GET | [/characters/{id}](#getcharactersid) | Get a character |
| PUT | [/characters/{id}](#putcharactersid) | Update a character |
| DELETE | [/characters/{id}](#deletecharactersid) | Delete a character |
| GET | [/crops](#getcrops) | Get all crops |
| GET | [/crops/{id}](#getcropsid) | Get crop by id |
| GET | [/profiles](#getprofiles) | Get all profiles |
| POST | [/profiles](#postprofiles) | Create a profile |
| GET | [/profiles/{id}](#getprofilesid) | Get a profile |
| PUT | [/profiles/{id}](#putprofilesid) | Update a profile |
| DELETE | [/profiles/{id}](#deleteprofilesid) | Delete a profile |
| GET | [/user/{id}/profiles](#getuseridprofiles) | Get profiles by user ID |
| GET | [/resources](#getresources) | Get all resources |
| POST | [/resources](#postresources) | Create a new resource |
| GET | [/resources/{id}](#getresourcesid) | Get a resource |
| PUT | [/resources/{id}](#putresourcesid) | Update a resource |
| DELETE | [/resources/{id}](#deleteresourcesid) | Delete a resource |
| POST | [/register](#postregister) | Register a new user |
| POST | [/login](#postlogin) | Login a user |
| DELETE | [/logout](#deletelogout) | Logout a user |
| GET | [/check-token](#getcheck-token) | Check if the token is valid |
| GET | [/seasons](#getseasons) | Get all seasons |
| GET | [/seasons/{id}](#getseasonsid) | Get season |
| GET | [/crops/season/{id}](#getcropsseasonid) | Get all crops for a specific season |
| GET | [/tasks](#gettasks) | Get all tasks |
| POST | [/tasks](#posttasks) | Create a new task |
| GET | [/tasks/{id}](#gettasksid) | Get a task |
| PUT | [/tasks/{id}](#puttasksid) | Update a task |
| DELETE | [/tasks/{id}](#deletetasksid) | Delete a task |
| GET | [/profile/{id}/tasks](#getprofileidtasks) | Get tasks by profile ID |
| GET | [/users](#getusers) | Get all users |
| GET | [/users/{id}](#getusersid) | Get user |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| Character | [#/components/schemas/Character](#componentsschemascharacter) |  |
| Crop | [#/components/schemas/Crop](#componentsschemascrop) |  |
| Profile | [#/components/schemas/Profile](#componentsschemasprofile) |  |
| Resource | [#/components/schemas/Resource](#componentsschemasresource) |  |
| Season | [#/components/schemas/Season](#componentsschemasseason) |  |
| SeasonalCrop | [#/components/schemas/SeasonalCrop](#componentsschemasseasonalcrop) |  |
| Task | [#/components/schemas/Task](#componentsschemastask) |  |
| User | [#/components/schemas/User](#componentsschemasuser) |  |
| CharacterCreate | [#/components/requestBodies/CharacterCreate](#componentsrequestbodiescharactercreate) |  |
| CharacterUpdate | [#/components/requestBodies/CharacterUpdate](#componentsrequestbodiescharacterupdate) |  |
| ProfileCreate | [#/components/requestBodies/ProfileCreate](#componentsrequestbodiesprofilecreate) |  |
| ProfileUpdate | [#/components/requestBodies/ProfileUpdate](#componentsrequestbodiesprofileupdate) |  |
| ResourceUpdate | [#/components/requestBodies/ResourceUpdate](#componentsrequestbodiesresourceupdate) |  |
| ResourceCreate | [#/components/requestBodies/ResourceCreate](#componentsrequestbodiesresourcecreate) |  |
| TaskUpdate | [#/components/requestBodies/TaskUpdate](#componentsrequestbodiestaskupdate) |  |
| TaskCreate | [#/components/requestBodies/TaskCreate](#componentsrequestbodiestaskcreate) |  |
| UserLogin | [#/components/requestBodies/UserLogin](#componentsrequestbodiesuserlogin) |  |
| UserRegister | [#/components/requestBodies/UserRegister](#componentsrequestbodiesuserregister) |  |
| sanctum | [#/components/securitySchemes/sanctum](#componentssecurityschemessanctum) |  |

## Path Details

***

### [GET]/characters

- Summary  
Get all characters

- Description  
Get all characters from the database

#### Responses

- 200 Success: Returns all characters

`application/json`

```ts
{
  id: integer
  name: string
  birthday?: integer
  season_id: {
    id: integer
    name: string
  }
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
  created_at?: string
  updated_at?: string
}[]
```

- 404 Not found: Characters don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/characters

- Summary  
Create a new character

- Description  
Create a new character using the data provided in the request body. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  name: string
  birthday?: integer
  season_id?: integer
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
}
```

#### Responses

- 201 Success: Character created

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized. Only admins can create characters

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/characters/season/{season_id}

- Summary  
Get all characters by season

- Description  
Get all characters by season ID sent in the URL from the database

#### Responses

- 200 Success: Returns all characters from the season

`application/json`

```ts
{
  id: integer
  name: string
  birthday?: integer
  season_id: {
    id: integer
    name: string
  }
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
  created_at?: string
  updated_at?: string
}[]
```

- 404 Not found: Characters don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/characters/{id}

- Summary  
Get a character

- Description  
Get a character by ID sent in the URL from the database

#### Responses

- 200 Success: Returns the character

`application/json`

```ts
{
  id: integer
  name: string
  birthday?: integer
  season_id: {
    id: integer
    name: string
  }
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
  created_at?: string
  updated_at?: string
}
```

- 404 Not found: Character doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/characters/{id}

- Summary  
Update a character

- Description  
Update a character by ID in the URL and data provided in the request body. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  name?: string
  birthday?: integer
  season_id?: integer
  gender?: string
  occupation?: string
  isRomanceable?: integer
  icon?: string
}
```

#### Responses

- 200 Success: Character updated

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad Request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can update characters

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Character doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/characters/{id}

- Summary  
Delete a character

- Description  
Delete a character by ID sent in the URL (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Character deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete characters

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Character doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/crops

- Summary  
Get all crops

- Description  
Returns all crops from the database

#### Responses

- 200 Success: Returns all crops

`application/json`

```ts
{
  // The unique identifier of the crop
  id: integer
  resource_id: {
    id: integer
    name: string
    icon: string
  }
  // The type of the crop
  type?: string
  // The rank of the crop
  rank?: string
  // The price of the seed for the crop
  seed_price?: integer
}[]
```

- 404 Not found: Crops don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/crops/{id}

- Summary  
Get crop by id

- Description  
Returns a crop from the database

#### Responses

- 200 Success: Returns a crop

`application/json`

```ts
{
  // The unique identifier of the crop
  id: integer
  resource_id: {
    id: integer
    name: string
    icon: string
  }
  // The type of the crop
  type?: string
  // The rank of the crop
  rank?: string
  // The price of the seed for the crop
  seed_price?: integer
}
```

- 404 Not found: Crop doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/profiles

- Summary  
Get all profiles

- Description  
Get all profiles from the database

#### Responses

- 200 Success: Return all profiles

`application/json`

```ts
{
  // The unique identifier of the profile
  id: integer
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  user_id: {
    id: integer
    email: string
    password: string
  }
}[]
```

- 404 No profiles found

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/profiles

- Summary  
Create a profile

- Description  
Create a new profile using the data provided in the request body. The user must be an admin to create a profile for other users. An user can create a profile for themselves (user_id not required).

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  // The user ID associated with the profile
  user_id?: integer
}
```

#### Responses

- 201 Success: A profile created

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad request: The request you sent was invalid

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins or the user themselves can create a profile

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/profiles/{id}

- Summary  
Get a profile

- Description  
Get a profile by ID in the URL

#### Responses

- 200 Success: Returns a profile

`application/json`

```ts
{
  // The unique identifier of the profile
  id: integer
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  user_id: {
    id: integer
    email: string
    password: string
  }
}
```

- 404 Not Found: Profile doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/profiles/{id}

- Summary  
Update a profile

- Description  
Update a profile by ID in the URL and data provided in the request body. Admins can update any profile, users can only update their own profiles

- Security  
sanctum  

#### RequestBody

- application/json

```ts
{
  // The updated name of the farmer
  farmer_name?: string
  // The updated name of the farm
  farm_name?: string
}
```

#### Responses

- 200 Success: Profile has been updated successfully

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad Request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins or the user who created the profile can update it

`application/json`

```ts
{
  message?: string
}
```

- 404 Not Found: Profile doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/profiles/{id}

- Summary  
Delete a profile

- Description  
Delete a profile by ID in the URL. Admins can delete any profile, users can only delete their own profiles

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Profile deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins or the user who created the profile can delete it

`application/json`

```ts
{
  message?: string
}
```

- 404 Not Found: Profile doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/user/{id}/profiles

- Summary  
Get profiles by user ID

- Description  
Retrieves profiles associated with a specific user ID

#### Responses

- 200 Success: Returns profiles associated with the user ID

`application/json`

```ts
{
  // The unique identifier of the profile
  id: integer
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  user_id: {
    id: integer
    email: string
    password: string
  }
}[]
```

- 404 Not Found: No profiles found for the user ID

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/resources

- Summary  
Get all resources

- Description  
Get all resources from the database

#### Responses

- 200 Success: Return all resources

`application/json`

```ts
{
  id: integer
  name: string
  icon: string
}[]
```

- 404 Not found: Resources don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/resources

- Summary  
Create a new resource

- Description  
Create a new resource using the data provided in the request body. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  name: string
  icon: string
}
```

#### Responses

- 201 Success: Resource created successfully

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad Request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can create items

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/resources/{id}

- Summary  
Get a resource

- Description  
Get a resource using the id provided in the request URL

#### Responses

- 200 Success: Return a resource

`application/json`

```ts
{
  id: integer
  name: string
  icon: string
}
```

- 404 Not found: Resource doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/resources/{id}

- Summary  
Update a resource

- Description  
Update a resource by ID in the URL and data provided in the request body. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  name?: string
  icon?: string
}
```

#### Responses

- 200 Success: Resource updated successfully

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad Request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can update resources

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Resource doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/resources/{id}

- Summary  
Delete a resource

- Description  
Delete a resource by ID sent in the URL. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Resource deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete resources

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Resource doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/register

- Summary  
Register a new user

- Description  
Register a new user with a unique email given in the request body

#### Headers

```ts
Content-Type: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  email: string
  password: string
}
```

#### Responses

- 201 Success: User created

`application/json`

```ts
{
  message?: string
  token?: string
}
```

- 400 Bad Request: Validation errors

`application/json`

```ts
{
  errors: {
  }
}
```

***

### [POST]/login

- Summary  
Login a user

- Description  
Login a user with an email and password given in the request body

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  email: string
  password: string
}
```

#### Responses

- 200 Success: User logged in

`application/json`

```ts
{
  message?: string
  token?: string
  user: {
    id: integer
    email: string
    password: string
  }
}
```

- 400 Bad Request: Validation errors

`application/json`

```ts
{
  errors: {
  }
}
```

- 401 Invalid login details

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/logout

- Summary  
Logout a user

- Description  
Logout a user by invalidating their token. (Requires authentication)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: User logged out

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthenticated: The user must be logged in to log out

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/check-token

- Summary  
Check if the token is valid

- Description  
Check if the token provided in the request is valid. (Requires authentication)

- Security  
sanctum  

#### Headers

```ts
Content-Type: string //default: application/json
```

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Token is valid

`application/json`

```ts
{
  message?: string
  user: {
    id: integer
    email: string
    password: string
  }
}
```

- 401 Unauthenticated: Invalid token

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/seasons

- Summary  
Get all seasons

- Description  
Returns all seasons from the database

#### Responses

- 200 Success: Returns all seasons

`application/json`

```ts
{
  id: integer
  name: string
}[]
```

- 404 Not found: Seasons don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/seasons/{id}

- Summary  
Get season

- Description  
Get a season by ID in the URL

#### Responses

- 200 Success: Returns season

`application/json`

```ts
{
  id: integer
  name: string
}
```

- 404 Not found: Season doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/crops/season/{id}

- Summary  
Get all crops for a specific season

- Description  
Returns all crops associated with a specific season from the database

#### Responses

- 200 Success: Returns all crops for the specified season

`application/json`

```ts
{
  id: integer
  season: {
    id: integer
    name: string
  }
  crop: {
    // The unique identifier of the crop
    id: integer
    resource_id: {
      id: integer
      name: string
      icon: string
    }
    // The type of the crop
    type?: string
    // The rank of the crop
    rank?: string
    // The price of the seed for the crop
    seed_price?: integer
  }
}[]
```

- 404 Not found: No crops found for this season

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/tasks

- Summary  
Get all tasks

- Description  
Get all tasks from the database

#### Responses

- 200 Success: Returns all tasks

`application/json`

```ts
{
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id?: integer
  resource_id?: integer
}[]
```

- 404 Not found: Tasks don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/tasks

- Summary  
Create a new task

- Description  
Create a new task using the data provided in the request body. (Admins can create tasks for other users)

- Security  
sanctum  

#### RequestBody

- application/json

```ts
{
  // The id of the profile
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  // The id of the character
  character_id?: integer
  // The id of the resource
  resource_id?: integer
}
```

#### Responses

- 201 Success: Task created

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Tasks can only be created by admins or the user themself

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/tasks/{id}

- Summary  
Get a task

- Description  
Get a task by ID sent in the URL from the database

#### Responses

- 200 Success: Returns a task

`application/json`

```ts
{
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id?: integer
  resource_id?: integer
}
```

- 404 Not found: Task doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/tasks/{id}

- Summary  
Update a task

- Description  
Update a task by ID sent in the URL and data provided in the request body. Only the user who created the task and admins can update it.

- Security  
sanctum  

#### RequestBody

- application/json

```ts
{
  // The id of the profile
  profile_id?: integer
  // The description of the task
  description?: string
  // The status of the task
  isCompleted?: integer
  // The id of the character
  character_id?: integer
  // The id of the resource
  resource_id?: integer
}
```

#### Responses

- 200 Success: Task updated

`application/json`

```ts
{
  message?: string
}
```

- 400 Bad request: Data validation error

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only the user who created the task and admins can update it

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Task doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/tasks/{id}

- Summary  
Delete a task

- Description  
Delete a task by ID sent in the URL. Only the user who created the task and admins can delete it.

- Security  
sanctum  

#### Responses

- 200 Success: Task deleted

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only the user who created the task and admins can delete it

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Task doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/profile/{id}/tasks

- Summary  
Get tasks by profile ID

- Description  
Get a task by the profile ID sent in the URL from the database

#### Responses

- 200 Success: Returns all tasks from a profile

`application/json`

```ts
{
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id?: integer
  resource_id?: integer
}[]
```

- 400 Bad Request: Profile doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/users

- Summary  
Get all users

- Description  
Returns all users from the database

#### Responses

- 200 Success: Returns an array of all users

`application/json`

```ts
{
  id: integer
  email: string
  password: string
}[]
```

***

### [GET]/users/{id}

- Summary  
Get user

- Description  
Get a user by ID sent in the URL from the database or a message the user is not found

#### Responses

- 200 Success: Returns the user

`application/json`

```ts
{
  id: integer
  email: string
  password: string
}
```

- 404 Not found: User with given id doesn't exist

`application/json`

```ts
{
  message?: string
}
```

## References

### #/components/schemas/Character

```ts
{
  id: integer
  name: string
  birthday?: integer
  season_id: {
    id: integer
    name: string
  }
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
  created_at?: string
  updated_at?: string
}
```

### #/components/schemas/Crop

```ts
{
  // The unique identifier of the crop
  id: integer
  resource_id: {
    id: integer
    name: string
    icon: string
  }
  // The type of the crop
  type?: string
  // The rank of the crop
  rank?: string
  // The price of the seed for the crop
  seed_price?: integer
}
```

### #/components/schemas/Profile

```ts
{
  // The unique identifier of the profile
  id: integer
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  user_id: {
    id: integer
    email: string
    password: string
  }
}
```

### #/components/schemas/Resource

```ts
{
  id: integer
  name: string
  icon: string
}
```

### #/components/schemas/Season

```ts
{
  id: integer
  name: string
}
```

### #/components/schemas/SeasonalCrop

```ts
{
  id: integer
  season: {
    id: integer
    name: string
  }
  crop: {
    // The unique identifier of the crop
    id: integer
    resource_id: {
      id: integer
      name: string
      icon: string
    }
    // The type of the crop
    type?: string
    // The rank of the crop
    rank?: string
    // The price of the seed for the crop
    seed_price?: integer
  }
}
```

### #/components/schemas/Task

```ts
{
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id?: integer
  resource_id?: integer
}
```

### #/components/schemas/User

```ts
{
  id: integer
  email: string
  password: string
}
```

### #/components/requestBodies/CharacterCreate

- application/json

```ts
{
  name: string
  birthday?: integer
  season_id?: integer
  gender?: string
  occupation?: string
  isRomanceable: integer
  icon: string
}
```

### #/components/requestBodies/CharacterUpdate

- application/json

```ts
{
  name?: string
  birthday?: integer
  season_id?: integer
  gender?: string
  occupation?: string
  isRomanceable?: integer
  icon?: string
}
```

### #/components/requestBodies/ProfileCreate

- application/json

```ts
{
  // The name of the farmer
  farmer_name: string
  // The name of the farm
  farm_name: string
  // The user ID associated with the profile
  user_id?: integer
}
```

### #/components/requestBodies/ProfileUpdate

- application/json

```ts
{
  // The updated name of the farmer
  farmer_name?: string
  // The updated name of the farm
  farm_name?: string
}
```

### #/components/requestBodies/ResourceUpdate

- application/json

```ts
{
  name?: string
  icon?: string
}
```

### #/components/requestBodies/ResourceCreate

- application/json

```ts
{
  name: string
  icon: string
}
```

### #/components/requestBodies/TaskUpdate

- application/json

```ts
{
  // The id of the profile
  profile_id?: integer
  // The description of the task
  description?: string
  // The status of the task
  isCompleted?: integer
  // The id of the character
  character_id?: integer
  // The id of the resource
  resource_id?: integer
}
```

### #/components/requestBodies/TaskCreate

- application/json

```ts
{
  // The id of the profile
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  // The id of the character
  character_id?: integer
  // The id of the resource
  resource_id?: integer
}
```

### #/components/requestBodies/UserLogin

- application/json

```ts
{
  email: string
  password: string
}
```

### #/components/requestBodies/UserRegister

- application/json

```ts
{
  email: string
  password: string
}
```

### #/components/securitySchemes/sanctum

```ts
{
  "type": "http",
  "scheme": "bearer"
}
```