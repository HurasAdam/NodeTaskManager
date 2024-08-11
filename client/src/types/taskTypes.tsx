interface TeamMember {
  _id: string;
  name: string;
  title: string;
  role: string;
  email: string;
  isAdmin: boolean;
}

interface TaskFormData {
  title: string;
  description: string;
  date: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  stage: "TODO" | "IN_PROGRESS" | "DONE";
  team: TeamMember[];
}

interface TasksActivityType {
  type: string;
  activity: string;
}

interface SubTaskType {
  title: string;
  tag: string;
  date: string;
}

interface CommentType {
  _id: string;
  description: string;
  createdAt: string;
  likesCount: number;
  alreadyLiked: boolean;
  task: string;
  user: TeamMember;
}

interface CombinedTaskType {
  taskId: number;
  formData: TaskFormData;
  stage: string;
  isTrashed: boolean;
  commentId: number;
  activities: TasksActivityType[];
  subTasks: SubTaskType[];
  comments: CommentType[];
}

export type { CombinedTaskType };
