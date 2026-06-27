export interface BloodDonor {
  id: string;
  fullName: string;
  bloodGroup: string;
  mobile: string;
  city: string;
  district: string;
  lastDonated: string;
  isAvailable: boolean;
}

export interface UserProfile {
  fullName: string;
  bloodGroup: string;
  profilePhoto: string;
  volunteerStatus: string;
  volunteerId?: string;
  serviceHours: number;
  communityPoints: number;
  certificates: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  registeredCount: number;
  image: string;
}

export interface HelpRequest {
  id: string;
  type: string;
  applicantName: string;
  mobile: string;
  description: string;
  amountRequested: string;
  documents?: string[];
  status: 'Pending' | 'In Progress' | 'Approved' | 'Completed';
  date: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}
