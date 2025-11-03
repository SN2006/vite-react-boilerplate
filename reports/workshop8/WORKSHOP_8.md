# Workshop-8 Report - Frontend

## Screenshots

In this section you can find screenshots of the implemented features.

### Root Page

![Root Page](./screenshots/root_page.png)

### Login Page

![Login Page](./screenshots/login_page.png)

### Dashboard Page

![Dashboard Page](./screenshots/dashboard_page.png)

### Types Page

![Types Page](./screenshots/types_page.png)

### Create Task Modal

![Create Task Modal](./screenshots/create_task_modal.png)

![Create Task Modal Filled](./screenshots/create_task_modal_filled.png)

![After Creating Task](./screenshots/after_creating_task.png)

### Edit Task Modal

![Edit Task Modal](./screenshots/edit_task_modal.png)

![Edit Task Modal Filled](./screenshots/edit_task_modal_filled.png)

![After Editing Task](./screenshots/after_editing_task.png)

### View Task Modal

![View Task Modal](./screenshots/view_task_modal.png)

### Delete Task Modal

![Delete Task Modal](./screenshots/delete_task_modal.png)

![After Deleting Task](./screenshots/after_deleting_task.png)

## Video Demonstration

I guess provided screenshots will be enough. However, in case you need to see all functionalities in action, 
you can find a video demonstration of the implemented features here: 
[Video Demonstration](https://www.youtube.com/watch?v=9OtyIDttCYY)

## Issue that I faced

While implementing the deletion of a state I understood that I had forgotten to adjust cascade deletion in the database schema.
So I had to update the mutation (1590519635401-SeedUsers) to include `ON DELETE CASCADE` for the foreign key constraint 
between `states` and `tasks` tables. (and `task_types` and `tasks` tables as well).
This change ensures that when a state or task type is deleted, all associated tasks are also removed from the database.