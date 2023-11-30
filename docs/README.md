# Coral Companion API Documentation

> Version 1.0.0

Documentation for the API used in the Coral Companion app

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/characters](#getcharacters) | Get all characters |
| POST | [/characters](#postcharacters) | Create a new character |
| GET | [/characters/{id}](#getcharactersid) | Get a character |
| PUT | [/characters/{id}](#putcharactersid) | Update a character |
| DELETE | [/characters/{id}](#deletecharactersid) | Delete a character |
| GET | [/crops](#getcrops) | Get all crops |
| GET | [/crops/{id}](#getcropsid) | Get crop by id |
| GET | [/families](#getfamilies) | Get all families |
| POST | [/families](#postfamilies) | Create a new family |
| GET | [/families/{id}](#getfamiliesid) | Get a family |
| PUT | [/families/{id}](#putfamiliesid) | Update a family |
| DELETE | [/families/{id}](#deletefamiliesid) | Delete a family |
| GET | [/favlists](#getfavlists) | Get all favorite lists |
| POST | [/favlists](#postfavlists) | Create a new favorite list |
| GET | [/favlists/{id}](#getfavlistsid) | Get a favorite list |
| PUT | [/favlists/{id}](#putfavlistsid) | Update a favorite list |
| DELETE | [/favlists/{id}](#deletefavlistsid) | Delete a favorite list |
| GET | [/items](#getitems) | Get all items |
| POST | [/items](#postitems) | Create a new item |
| GET | [/items/{id}](#getitemsid) | Get an item |
| PUT | [/items/{id}](#putitemsid) | Update an item |
| DELETE | [/items/{id}](#deleteitemsid) | Delete an item |
| GET | [/profiles](#getprofiles) | Get all profiles |
| POST | [/profiles](#postprofiles) | Create a profile |
| GET | [/profiles/{id}](#getprofilesid) | Get a profile |
| PUT | [/profiles/{id}](#putprofilesid) | Update a profile |
| DELETE | [/profiles/{id}](#deleteprofilesid) | Delete a profile |
| POST | [/register](#postregister) | Register a new user |
| POST | [/login](#postlogin) | Login a user |
| POST | [/logout](#postlogout) | Logout an user |
| GET | [/check-token](#getcheck-token) | Check if the token is valid |
| GET | [/seasons](#getseasons) | Get all seasons |
| GET | [/seasons/{id}](#getseasonsid) | Get season |
| GET | [/crops/season/{id}](#getcropsseasonid) | Get all seasonal crops |
| GET | [/tasks](#gettasks) | Get all tasks |
| POST | [/tasks](#posttasks) | Create a new task |
| GET | [/tasks/{id}](#gettasksid) | Get a task |
| PUT | [/tasks/{id}](#puttasksid) | Update a task |
| DELETE | [/tasks/{id}](#deletetasksid) | Delete a task |
| GET | [/tasks/profile/{id}](#gettasksprofileid) | Get tasks by profile ID |
| GET | [/types](#gettypes) | Get all types |
| POST | [/types](#posttypes) | Create a new type |
| GET | [/types/{id}](#gettypesid) | Get a type by id |
| PUT | [/types/{id}](#puttypesid) | Update a type |
| DELETE | [/types/{id}](#deletetypesid) | Delete a type |
| GET | [/users](#getusers) | Get all users |
| GET | [/users/{id}](#getusersid) | Get user |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| Character | [#/components/schemas/Character](#componentsschemascharacter) |  |
| Crop | [#/components/schemas/Crop](#componentsschemascrop) |  |
| Family | [#/components/schemas/Family](#componentsschemasfamily) |  |
| FavList | [#/components/schemas/FavList](#componentsschemasfavlist) |  |
| Item | [#/components/schemas/Item](#componentsschemasitem) |  |
| Profile | [#/components/schemas/Profile](#componentsschemasprofile) |  |
| Season | [#/components/schemas/Season](#componentsschemasseason) |  |
| SeasonalCrop | [#/components/schemas/SeasonalCrop](#componentsschemasseasonalcrop) |  |
| Task | [#/components/schemas/Task](#componentsschemastask) |  |
| Type | [#/components/schemas/Type](#componentsschemastype) |  |
| User | [#/components/schemas/User](#componentsschemasuser) |  |
| CharacterCreate | [#/components/requestBodies/CharacterCreate](#componentsrequestbodiescharactercreate) |  |
| CharacterUpdate | [#/components/requestBodies/CharacterUpdate](#componentsrequestbodiescharacterupdate) |  |
| FamilyCreate | [#/components/requestBodies/FamilyCreate](#componentsrequestbodiesfamilycreate) |  |
| FamilyUpdate | [#/components/requestBodies/FamilyUpdate](#componentsrequestbodiesfamilyupdate) |  |
| FavListCreate | [#/components/requestBodies/FavListCreate](#componentsrequestbodiesfavlistcreate) |  |
| FavListUpdate | [#/components/requestBodies/FavListUpdate](#componentsrequestbodiesfavlistupdate) |  |
| ItemUpdate | [#/components/requestBodies/ItemUpdate](#componentsrequestbodiesitemupdate) |  |
| ItemCreate | [#/components/requestBodies/ItemCreate](#componentsrequestbodiesitemcreate) |  |
| ProfileCreate | [#/components/requestBodies/ProfileCreate](#componentsrequestbodiesprofilecreate) |  |
| ProfileUpdate | [#/components/requestBodies/ProfileUpdate](#componentsrequestbodiesprofileupdate) |  |
| TaskUpdate | [#/components/requestBodies/TaskUpdate](#componentsrequestbodiestaskupdate) |  |
| TaskCreate | [#/components/requestBodies/TaskCreate](#componentsrequestbodiestaskcreate) |  |
| Type | [#/components/requestBodies/Type](#componentsrequestbodiestype) |  |
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
  id: integer
  type_id: {
    name: string
  }
  isGigantic?: boolean
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
  id: integer
  type_id: {
    name: string
  }
  isGigantic?: boolean
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

### [GET]/families

- Summary  
Get all families

- Description  
Get all families from the database

#### Responses

- 200 Success: Returns all families

`application/json`

```ts
{
  id?: integer
  character_id: {
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
  familiar_id:#/components/schemas/Character
  relationship: string
  created_at?: string
  updated_at?: string
}[]
```

- 404 Not found: Families don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/families

- Summary  
Create a new family

- Description  
Create a new family using the data provided in the request body. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### RequestBody

- application/json

```ts
{
  character_id: integer
  familiar_id: integer
  relationship: string
}
```

#### Responses

- 201 Success: Family created

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

- 401 Unauthorized: Only admins can create a family

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/families/{id}

- Summary  
Get a family

- Description  
Get a family by ID in the URL

#### Responses

- 200 Success: Returns the family

`application/json`

```ts
{
  id?: integer
  character_id: {
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
  familiar_id:#/components/schemas/Character
  relationship: string
  created_at?: string
  updated_at?: string
}
```

- 404 Not found: Family doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/families/{id}

- Summary  
Update a family

- Description  
Update a family by ID in the URL and data provided in the request body. (Admin only)

- Security  
sanctum  

#### RequestBody

- application/json

```ts
{
  character_id?: integer
  familiar_id?: integer
  relationship?: string
}
```

#### Responses

- 200 Success: Family updated

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

- 401 Unauthorized: Only admins can update a family

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Family doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/families/{id}

- Summary  
Delete a family

- Description  
Delete a family by ID sent in the URL. (Admin only)

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

- 200 Success: Family deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete a family

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Family doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/favlists

- Summary  
Get all favorite lists

- Description  
Get all favorite lists from the database

#### Responses

- 200 Success: Returns all favorite lists

`application/json`

```ts
{
  id: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
}[]
```

- 404 No favorite lists found

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/favlists

- Summary  
Create a new favorite list

- Description  
Create a new favorite list using the data provided in the request body. (Admin only)

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
  character_id: integer
  item_id: integer
}
```

#### Responses

- 201 Sucess: Favorite list created

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

- 401 Unauthorized. Only admins can create new favorite lists

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/favlists/{id}

- Summary  
Get a favorite list

- Description  
Get a favorite lists by the ID in the URL

#### Responses

- 200 Success: Returns the favorite list

`application/json`

```ts
{
  id: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
}
```

- 404 Not Found: Favorite list doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/favlists/{id}

- Summary  
Update a favorite list

- Description  
Update a favorite list by ID in the URL and data provided in the request body. (Admin only)

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
  character_id: integer
  item_id: integer
}
```

#### Responses

- 200 Success: Favorite list updated

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

- 401 Unauthorized

`application/json`

```ts
{
  message?: string
}
```

- 404 Not Found: Favorite list doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/favlists/{id}

- Summary  
Delete a favorite list

- Description  
Deletes a favorite list by ID in the URL. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Favorite list deleted

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete favorite lists

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Favorite list doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/items

- Summary  
Get all items

- Description  
Get all items from the database

#### Responses

- 200 Success: Return all items

`application/json`

```ts
{
  id: integer
  name: string
  type_id: {
    name: string
  }
  icon: string
  created_at?: string
  updated_at?: string
}[]
```

- 404 Not found: Items don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/items

- Summary  
Create a new item

- Description  
Create a new item using the data provided in the request body. (Admin only)

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
  type_id?: integer
  icon: string
}
```

#### Responses

- 201 Success: Item created successfully

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

### [GET]/items/{id}

- Summary  
Get an item

- Description  
Get an item using the id provided in the request URL

#### Responses

- 200 Success: Return an item

`application/json`

```ts
{
  id: integer
  name: string
  type_id: {
    name: string
  }
  icon: string
  created_at?: string
  updated_at?: string
}
```

- 404 Not found: Item doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/items/{id}

- Summary  
Update an item

- Description  
Update an item by ID in the URL and data provided in the request body. (Admin only)

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
  type_id?: integer
  icon?: string
}
```

#### Responses

- 200 Success: Item updated successfully

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

- 401 Unauthorized: Only admins can update items

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Item doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/items/{id}

- Summary  
Delete an item

- Description  
Delete an item by ID sent in the URL. (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Item deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete items

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Item doesn't exist

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
  id: integer
  farmer_name: string
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
  farmer_name: string
  farm_name: string
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
  id: integer
  farmer_name: string
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
  farmer_name?: string
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
  email?: string
  password?: string
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
  email?: string
  password?: string
}
```

#### Responses

- 200 Success: User logged in

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

- 401 Invalid login details

`application/json`

```ts
{
  message?: string
}
```

***

### [POST]/logout

- Summary  
Logout an user

- Description  
Logout a user.

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
Check if the token is valid.

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Token is valid

`application/json`

```ts
{
  message?: string
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
Get all seasonal crops

- Description  
Returns all seasonal crops from the database

#### Responses

- 200 Success: Returns all seasonal crops

`application/json`

```ts
{
  id: integer
  season_id: {
    id: integer
    name: string
  }
  crop_id: {
    id: integer
    type_id: {
      name: string
    }
    isGigantic?: boolean
  }
}[]
```

- 404 Not found: Seasonal crops don't exist

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
  profile_id: {
    id: integer
    farmer_name: string
    farm_name: string
    user_id: {
      id: integer
      email: string
      password: string
    }
  }
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
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
  // The id of the profile
  profile_id: integer
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  // The id of the character
  character_id?: integer
  // The id of the item
  item_id?: integer
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
  profile_id: {
    id: integer
    farmer_name: string
    farm_name: string
    user_id: {
      id: integer
      email: string
      password: string
    }
  }
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
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
  // The id of the profile
  profile_id?: integer
  // The description of the task
  description?: string
  // The status of the task
  isCompleted?: integer
  // The id of the character
  character_id?: integer
  // The id of the item
  item_id?: integer
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

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: Task deleted

`application/json`

```ts
{
  message?: string
}
```

- 401 You are not authorized to delete this task

`application/json`

```ts
{
  message?: string
}
```

- 404 Task not found

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/tasks/profile/{id}

- Summary  
Get tasks by profile ID

- Description  
Get a task by the profile ID sent in the URL from the database

#### Responses

- 200 Success: Returns all tasks from a profile

`application/json`

```ts
{
  profile_id: {
    id: integer
    farmer_name: string
    farm_name: string
    user_id: {
      id: integer
      email: string
      password: string
    }
  }
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
}[]
```

- 400 Bad Request: Profile doesn't exist

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Tasks don't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/types

- Summary  
Get all types

- Description  
Get all types from the database

#### Responses

- 200 Success: Returns all types

`application/json`

```ts
{
  name: string
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

### [POST]/types

- Summary  
Create a new type

- Description  
Create a new type using the data provided in the request body.

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
}
```

#### Responses

- 201 Success: Type created

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

- 401 Unauthorized. Only admins can create types

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/types/{id}

- Summary  
Get a type by id

- Description  
Get a type by ID sent in the URL from the database

#### Responses

- 200 Success: Returns the type

`application/json`

```ts
{
  name: string
}
```

- 404 Not found: Type doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [PUT]/types/{id}

- Summary  
Update a type

- Description  
Update a type by ID in the URL and data provided in the request body. (Admin only)

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
}
```

#### Responses

- 200 Success: Type updated

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

- 401 Unauthorized: Only admins can update types

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Type doesn't exist

`application/json`

```ts
{
  message?: string
}
```

***

### [DELETE]/types/{id}

- Summary  
Delete a type

- Description  
Delete a type by ID sent in the URL (Admin only)

- Security  
sanctum  

#### Headers

```ts
Accept: string //default: application/json
```

#### Responses

- 200 Success: type deleted successfully

`application/json`

```ts
{
  message?: string
}
```

- 401 Unauthorized: Only admins can delete types

`application/json`

```ts
{
  message?: string
}
```

- 404 Not found: Type doesn't exist

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
Returns all users from the database or a message if no users found

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

- 404 Not found: No users found

`application/json`

```ts
{
  message?: string
}
```

***

### [GET]/users/{id}

- Summary  
Get user

- Description  
Get an user by ID sent in the URL from the database or a message the user is not found

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
  id: integer
  type_id: {
    name: string
  }
  isGigantic?: boolean
}
```

### #/components/schemas/Family

```ts
{
  id?: integer
  character_id: {
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
  familiar_id:#/components/schemas/Character
  relationship: string
  created_at?: string
  updated_at?: string
}
```

### #/components/schemas/FavList

```ts
{
  id: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
}
```

### #/components/schemas/Item

```ts
{
  id: integer
  name: string
  type_id: {
    name: string
  }
  icon: string
  created_at?: string
  updated_at?: string
}
```

### #/components/schemas/Profile

```ts
{
  id: integer
  farmer_name: string
  farm_name: string
  user_id: {
    id: integer
    email: string
    password: string
  }
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
  season_id: {
    id: integer
    name: string
  }
  crop_id: {
    id: integer
    type_id: {
      name: string
    }
    isGigantic?: boolean
  }
}
```

### #/components/schemas/Task

```ts
{
  profile_id: {
    id: integer
    farmer_name: string
    farm_name: string
    user_id: {
      id: integer
      email: string
      password: string
    }
  }
  // The description of the task
  description: string
  // The status of the task
  isCompleted: integer
  character_id: {
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
  item_id: {
    id: integer
    name: string
    type_id: {
      name: string
    }
    icon: string
    created_at?: string
    updated_at?: string
  }
  created_at?: string
  updated_at?: string
}
```

### #/components/schemas/Type

```ts
{
  name: string
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

### #/components/requestBodies/FamilyCreate

- application/json

```ts
{
  character_id: integer
  familiar_id: integer
  relationship: string
}
```

### #/components/requestBodies/FamilyUpdate

- application/json

```ts
{
  character_id?: integer
  familiar_id?: integer
  relationship?: string
}
```

### #/components/requestBodies/FavListCreate

- application/json

```ts
{
  character_id: integer
  item_id: integer
}
```

### #/components/requestBodies/FavListUpdate

- application/json

```ts
{
  character_id: integer
  item_id: integer
}
```

### #/components/requestBodies/ItemUpdate

- application/json

```ts
{
  name?: string
  type_id?: integer
  icon?: string
}
```

### #/components/requestBodies/ItemCreate

- application/json

```ts
{
  name: string
  type_id?: integer
  icon: string
}
```

### #/components/requestBodies/ProfileCreate

- application/json

```ts
{
  farmer_name: string
  farm_name: string
  user_id?: integer
}
```

### #/components/requestBodies/ProfileUpdate

- application/json

```ts
{
  farmer_name?: string
  farm_name?: string
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
  // The id of the item
  item_id?: integer
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
  // The id of the item
  item_id?: integer
}
```

### #/components/requestBodies/Type

- application/json

```ts
{
  name: string
}
```

### #/components/requestBodies/UserLogin

- application/json

```ts
{
  email?: string
  password?: string
}
```

### #/components/requestBodies/UserRegister

- application/json

```ts
{
  email?: string
  password?: string
}
```

### #/components/securitySchemes/sanctum

```ts
{
  "type": "http",
  "scheme": "bearer"
}
```