interface Activity {
  id: number;
  name: string;
  description: string;
  userId: number;
}

export interface NewActivity {
  name: string;
  description: string;
}

export default Activity;
