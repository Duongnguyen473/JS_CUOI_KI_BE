import { StudentProfile } from "@/modules/profile/entities/stutent-profile.entity";
import { Enrollment } from "../entities/enrollment.entity";

export enum EnrollmentStatus {
  STUDYING = 'STUDYING',
  COMPLETED = 'COMPLETED',
}

export interface TutorManagerEnrollment extends Enrollment {
  // student_profile: StudentProfile;
}