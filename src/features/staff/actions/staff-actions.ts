"use server";

import { staffAction } from "@/shared/lib/actions";
import { UpdateStaffInput, updateStaffSchema } from "../schemes/staff-schemes";
import { AppError } from "@/shared/lib/errors";
import { staffService } from "../services/staff-service";

export const updateStaffDataAction = staffAction(
  async ({
    staffId,
    userId,
    data,
  }: {
    staffId: string;
    userId: string;
    data: UpdateStaffInput;
  }) => {
    const zodResponse = updateStaffSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Invalid data");
    }

    await staffService.updateStaffInfo({
      staffId,
      userId,
      data: zodResponse.data,
    });

    const changedImage = zodResponse.data.image !== undefined;

    return {
      success: true,
      message: "Staff data updated successfully",
      changedImage,
    };
  },
);
