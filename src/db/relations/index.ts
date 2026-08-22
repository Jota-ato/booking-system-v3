import { defineRelations } from "drizzle-orm";
import * as schema from "../schemes";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
    staff: r.many.staff({
      from: r.users.id,
      to: r.staff.userId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  staff: {
    user: r.one.users({
      from: r.staff.userId,
      to: r.users.id,
    }),
    appointments: r.many.appointments({
      from: r.staff.id,
      to: r.appointments.staffId,
    }),
    invitations: r.many.staffInvitations({
      from: r.staff.id,
      to: r.staffInvitations.staffId,
    }),
    schedules: r.many.staffSchedules({
      from: r.staff.id,
      to: r.staffSchedules.staffId,
    }),
    services: r.many.staffServices({
      from: r.staff.id,
      to: r.staffServices.staffId,
    }),
    blockTimes: r.many.blockTimes({
      from: r.staff.id,
      to: r.blockTimes.staffId,
    }),
  },
  customers: {
    appointments: r.many.appointments({
      from: r.customers.id,
      to: r.appointments.customerId,
    }),
  },
  services: {
    staffServices: r.many.staffServices({
      from: r.services.id,
      to: r.staffServices.serviceId,
    }),
    appointmentServices: r.many.appointmentServices({
      from: r.services.id,
      to: r.appointmentServices.serviceId,
    }),
  },
  appointments: {
    staff: r.one.staff({
      from: r.appointments.staffId,
      to: r.staff.id,
    }),
    customer: r.one.customers({
      from: r.appointments.customerId,
      to: r.customers.id,
    }),
    appointmentServices: r.many.appointmentServices({
      from: r.appointments.id,
      to: r.appointmentServices.appointmentId,
    }),
  },
  staffInvitations: {
    staff: r.one.staff({
      from: r.staffInvitations.staffId,
      to: r.staff.id,
    }),
  },
  staffSchedules: {
    staff: r.one.staff({
      from: r.staffSchedules.staffId,
      to: r.staff.id,
    }),
  },
  staffServices: {
    staff: r.one.staff({
      from: r.staffServices.staffId,
      to: r.staff.id,
    }),
    service: r.one.services({
      from: r.staffServices.serviceId,
      to: r.services.id,
    }),
  },
  appointmentServices: {
    appointment: r.one.appointments({
      from: r.appointmentServices.appointmentId,
      to: r.appointments.id,
    }),
    service: r.one.services({
      from: r.appointmentServices.serviceId,
      to: r.services.id,
    }),
  },
  blockTimes: {
    staff: r.one.staff({
      from: r.blockTimes.staffId,
      to: r.staff.id,
    }),
  },
}));
