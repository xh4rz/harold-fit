import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedExercise {
  title: string;
  primaryMuscle: Muscle;
  secondaryMuscle?: Muscle[];
  equipment: Equipment;
  videoUrl: string;
  instruction: string[];
}

type Muscle =
  | 'All Muscles'
  | 'Abdominals'
  | 'Abductors'
  | 'Biceps'
  | 'Calves'
  | 'Cardio'
  | 'Chest'
  | 'Forearms'
  | 'Full Body'
  | 'Glutes'
  | 'Hamstrings'
  | 'Lats'
  | 'Lower Back'
  | 'Neck'
  | 'Quadriceps'
  | 'Shoulders'
  | 'Traps'
  | 'Triceps'
  | 'Upper Back'
  | 'Other';

type Equipment =
  | 'All Equipment'
  | 'Barbell'
  | 'Dumbbell'
  | 'Kettlebell'
  | 'Machine'
  | 'Plate'
  | 'Resistance Band'
  | 'Suspension Band'
  | 'None'
  | 'Other';

interface SeedData {
  users: SeedUser[];
  exercises: SeedExercise[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      fullName: 'Test One',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'test2@google.com',
      fullName: 'Test Two',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user', 'super'],
    },
  ],
  exercises: [
    {
      title: 'Bench Press (Barbell)',
      equipment: 'Barbell',
      primaryMuscle: 'Chest',
      secondaryMuscle: ['Triceps', 'Shoulders'],
      videoUrl: '00251201-Barbell-Bench-Press_Chest.mp4',
      instruction: [
        'Lie on the bench.',
        'Extend your arms and grab the bar evenly, having your hands slightly wider than shoulder-width apart.',
        'Bring your shoulder blades back and dig them into the bench.',
        'Arch your lower back and plant your feet flat on the floor.',
        'Take a breath, unrack the bar, and bring it over your chest.',
        'Inhale again and lower the barbell to your lower chest, tapping it slightly.',
        'Hold for a moment and press the bar until your elbows are straight. Exhale.',
      ],
    },
    {
      title: 'Hack Squat (Machine)',
      equipment: 'Machine',
      primaryMuscle: 'Quadriceps',
      secondaryMuscle: ['Glutes', 'Hamstrings'],
      videoUrl: '07431201-Sled-Hack-Squat_Hips.mp4',
      instruction: [
        'Add weight to the machine.',
        'Position yourself inside the machine with your shoulders against the pad.',
        'Have your feet in a comfortable squatting stance on the platform below.',
        'Bring your shoulders back and engage your abs.',
        'Extend your knees to unrack the weight and remove the safety latch.',
        'Inhale and descend by bending your knees.',
        'Move down until your knees form a 90-degree angle.',
        'Press through your heels and straighten your legs, exhaling near the top.',
        'Once finished, put the safety on, rack the weight, and relax your body.',
      ],
    },
  ],
};
