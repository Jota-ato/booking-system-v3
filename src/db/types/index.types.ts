import {
  accounts,
  appointmentServices,
  appointmentStatus,
  appointments,
  blockScope,
  blockTimes,
  customers,
  paymentStatus,
  services,
  sessions,
  staff,
  staffInvitations,
  staffSchedules,
  staffServices,
  userRoles,
  users,
  verifications,
  weekday,
} from "../schemes";

export type UserRole = (typeof userRoles.enumValues)[number];
export type AppointmentStatus = (typeof appointmentStatus.enumValues)[number];
export type PaymentStatus = (typeof paymentStatus.enumValues)[number];
export type BlockScope = (typeof blockScope.enumValues)[number];
export type Weekday = (typeof weekday.enumValues)[number];

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdateUser = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type UpdateSession = Partial<
  Omit<Session, "id" | "createdAt" | "updatedAt">
>;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type UpdateAccount = Partial<
  Omit<Account, "id" | "createdAt" | "updatedAt">
>;

export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;
export type UpdateVerification = Partial<
  Omit<Verification, "id" | "createdAt" | "updatedAt">
>;

export type Staff = typeof staff.$inferSelect;
export type NewStaff = typeof staff.$inferInsert;
export type UpdateStaff = Partial<
  Omit<Staff, "id" | "createdAt" | "updatedAt">
>;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type UpdateService = Partial<
  Omit<Service, "id" | "createdAt" | "updatedAt">
>;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type UpdateCustomer = Partial<
  Omit<Customer, "id" | "createdAt" | "updatedAt">
>;

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type UpdateAppointment = Partial<
  Omit<Appointment, "id" | "createdAt" | "updatedAt">
>;

export type AppointmentService = typeof appointmentServices.$inferSelect;
export type NewAppointmentService = typeof appointmentServices.$inferInsert;
export type UpdateAppointmentService = Partial<
  Omit<AppointmentService, "id" | "createdAt" | "updatedAt">
>;

export type StaffService = typeof staffServices.$inferSelect;
export type NewStaffService = typeof staffServices.$inferInsert;
export type UpdateStaffService = Partial<
  Omit<StaffService, "id" | "createdAt" | "updatedAt">
>;

export type StaffSchedule = typeof staffSchedules.$inferSelect;
export type NewStaffSchedule = typeof staffSchedules.$inferInsert;
export type UpdateStaffSchedule = Partial<
  Omit<StaffSchedule, "id" | "createdAt" | "updatedAt">
>;

export type StaffInvitation = typeof staffInvitations.$inferSelect;
export type NewStaffInvitation = typeof staffInvitations.$inferInsert;
export type UpdateStaffInvitation = Partial<
  Omit<StaffInvitation, "id" | "createdAt" | "updatedAt">
>;

export type BlockTime = typeof blockTimes.$inferSelect;
export type NewBlockTime = typeof blockTimes.$inferInsert;
export type UpdateBlockTime = Partial<
  Omit<BlockTime, "id" | "createdAt" | "updatedAt">
>;
