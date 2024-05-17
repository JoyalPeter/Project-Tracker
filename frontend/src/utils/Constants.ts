export enum Status {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export const MarkDownSkeleton =
  "# projectTitle\n**Summary** : noOfComplete/totalNoOfTodos completed\n## Pending\npendingTodos\n## Completed\ncompletedTodos";

export enum ToasterMessages {
  CREATE_PROJECT_SUCCESS = "Project creation successful!",
  CREATE_PROJECT_ERROR = "Project creation failed!",
  UPDATE_PROJECT_SUCCESS = "Project updation successful!",
  UPDATE_PROJECT_ERROR = "Project updation failed!",
  CREATE_TODO_SUCCESS = "Todo creation successful!",
  CREATE_TODO_ERROR = "Todo creation failed!",
  UPDATE_TODO_SUCCESS = "Todo updation successful!",
  UPDATE_TODO_ERROR = "Todo updation failed!",
  DELETE_TODO_SUCCESS = "Todo deleted successfully!",
  DELETE_TODO_ERROR = "Todo delete failed!",
  FETCH_PROJECTS_ERROR = "Fetching Projects failed!",
  SEARCH_PROJECTS_ERROR = "Searching Projects failed!",
  EXPORT_N_SAVE_SUCCESS = "Exported and save successful!",
  EXPORT_N_SAVE_ERROR = "Exported and save failed!",
  SIGNIN_ERROR = "Sign-in failed!",
  SIGNUP_SUCCESS = "Sign-up successful! Use credentials to sign-in.",
  SIGNUP_ERROR = "Sign-up failed!",
}

export const PasswordRegex = new RegExp(
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$"
);

export enum Api_Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
