import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: Roles[];
}

type Roles = 'admin' | 'user';

interface SeedExercise {
  title: string;
  primaryMuscle: Muscle;
  secondaryMuscle?: Muscle[];
  equipmentId: number;
  file: File;
  instruction: string[];
}

interface File {
  url: string;
  publicId: string;
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
  equipments: SeedEquipment[];
}

interface SeedEquipment {
  id: number;
  name: Equipment;
}

export const initialData: SeedData = {
  users: [
    {
      email: 'harold@gmail.com',
      fullName: 'Harold Gonzalez',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'olga@google.com',
      fullName: 'Olga Mancipe',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
    },
  ],
  exercises: [
    {
      title: 'Bench Press (Barbell)',
      equipmentId: 2, // Barbell
      primaryMuscle: 'Chest',
      secondaryMuscle: ['Triceps', 'Shoulders'],
      instruction: [
        'Lie on the bench.',
        'Extend your arms and grab the bar evenly, having your hands slightly wider than shoulder-width apart.',
        'Bring your shoulder blades back and dig them into the bench.',
        'Arch your lower back and plant your feet flat on the floor.',
        'Take a breath, unrack the bar, and bring it over your chest.',
        'Inhale again and lower the barbell to your lower chest, tapping it slightly.',
        'Hold for a moment and press the bar until your elbows are straight. Exhale.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1771051550/exercises/00251201-Barbell-Bench-Press_Chest_ydmn6f.mp4',
        publicId: 'exercises/00251201-Barbell-Bench-Press_Chest_ydmn6f',
      },
    },
    {
      title: 'Hack Squat (Machine)',
      equipmentId: 5, // Machine
      primaryMuscle: 'Quadriceps',
      secondaryMuscle: ['Glutes', 'Hamstrings'],
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

      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1771051589/exercises/07431201-Sled-Hack-Squat_Hips_xq4asz.mp4',
        publicId: 'exercises/07431201-Sled-Hack-Squat_Hips_xq4asz',
      },
    },
  ],
  equipments: [
    {
      id: 1,
      name: 'All Equipment',
    },
    {
      id: 2,
      name: 'Barbell',
    },
    {
      id: 3,
      name: 'Dumbbell',
    },
    {
      id: 4,
      name: 'Kettlebell',
    },
    {
      id: 5,
      name: 'Machine',
    },
    {
      id: 6,
      name: 'Plate',
    },
    {
      id: 7,
      name: 'Resistance Band',
    },
    {
      id: 8,
      name: 'Suspension Band',
    },
    {
      id: 9,
      name: 'None',
    },
    {
      id: 10,
      name: 'Other',
    },
  ],
};
