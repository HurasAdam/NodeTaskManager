export enum ETaskActivityType {
    Assigned = "assigned",
    Started = "started",
    InProgress = "in progress",
    Bug = "bug",
    Completed = "completed",
    Commented = "commented",
  }


  export enum ActionType {
    CREATE_PROJECT = "CREATE_PROJECT",
    CREATE_TASK = "CREATE_TASK",
    CREATE_SUBTASK = "CREATE_SUBTASK",
    UPDATE_TASK = "UPDATE_TASK",
    ADD_COMMENT= "ADD_COMMENT",
    UPDATE_COMMENT= "UPDATE_COMMENT",
    DELETE_COMMENT= "DELETE_COMMENT",
  }

  export enum EAddNewType{
    PROJECT= "PROJECT",
    TASK = "TASK",
    SUBTASK = "SUBTASK"
  }