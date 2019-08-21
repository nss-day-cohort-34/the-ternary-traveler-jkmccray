# The Ternary Traveler

You've been asked to put together a simple application for your client, Mira. Mira is a travel blogger who creates both videos and writes blog posts for her website. She tries to travel to three destinations per month, spending a week in each place. Then she takes a week off before starting the whole cycle again. She has requested a single page application where she can add points of interests for the next set of three places she will be visiting. She would like to be able to add a new point of interest in one of her destinations so she can have a list of places she needs to visit when she travels. As she visits each point of interest, she would like to be able to edit the point of interest by adjusting the cost and adding a review. She has also asked to be able to delete points of interest from her list. But to ensure she does not accidentally delete anything, she would like an alert to to confirm the delete action.

Mira expects an application that has a clean user interface with easy to read text and an intuitive interface. However, it is **much** more important that the application performs the required functionality than that it looks perfect.


To start you off, here's what the resources in your API should look like for this application:

### Places

```json
{
  "places": [
    { 
      "id": 1, 
      "name": "Italy", 
      "visa_required": false 
    },
    { 
      "id": 2, 
      "name": "Switzerland", 
      "visa_required": true 
    },
    { 
      "id": 3, 
      "name": "France", 
      "visa_required": false
    }
  ],
  "interests": []
}
```

### Interests

An example of what an interest would like when it is initially added:
```json
{ "id": 1, "placeId": 1, "name": "Local Market", "description": "Local market where you can purchase local products and try the local food", "cost": 0.00, "review": "" }
```

An example of what an interest would like after it has been visited and reviewed:
```json
{ "id": 1, "placeId": 1, "name": "Local Market", "description": "Local market where you can purchase local products and try the local food", "cost": 0.00, "review": "You can definitely get things for a lower price if you are willing to bargain!" }
```

## Story
As a user, I should be able to enter in an point of interest, and associate it with a place.

### Acceptance Criteria
**Given** a user has already has points of interests  
**When** the user opens the application  
**Then** all points of interests should be displayed with their name, description, cost, review if it's not blank and the place it is located

**Given** a user wants to keep track of a new point of interest  
**When** the user opens the application  
**Then** a form should be presented to the user in which the following properties of the point of interest can be provided

1. Name of the point of interest
1. Description of the point of interest
1. Cost of visiting the point of interest
1. Dropdown to pick which place the point of interest is located in

**Given** a user has entered in all details of a point of interest  
**When** the user performs a gesture to save the point of interest  
**Then** the point of interest should be displayed in the application

**Given** a user wants to change the cost of a point of interest or add/change the review to a point of interest  
**When** the user performs a gesture to edit the point of interest  
**Then** the user should be presented with a form that has the cost and review, if it's not blank, pre-filled  
**And** there should be an affordance to save the edited cost and review

**Given** a user has saved a point of interest  
**When** the user visits their application  
**Then** all points of interest should be displayed  
**And** each point of interest should have an affordance to delete it

**Given** a user wants to remove a previously stored point of interest  
**When** the user performs a gesture on the delete affordance  
**Then** the user should be prompted to confirm the delete

**Given** a user is viewing the delete prompt
**When** the user selects the confirmation affordance
**Then** the point of interest should be deleted
**And** the confirmation message should disappear
**And** the list of points of interest should be refreshed

**Given** a user is viewing the delete prompt
**When** the user selects the cancel affordance
**Then** the point of interest should NOT be deleted
**And** the confirmation message should disappear

## Technical Requirements

1. The application should be built using Webpack to assist your development process.
1. For persistent data storage, use [json-server](https://github.com/typicode/json-server). 
